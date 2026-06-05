import { useEffect, useMemo, useState } from "react";
import Hero from "./components/Hero";
import CelebrityGallery from "./components/CelebrityGallery";
import ImageUploader from "./components/ImageUploader";
import PredictionResult from "./components/PredictionResult";

const API_URL = "http://localhost:5000/classify_image";

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function normalizeBackendResponse(data) {
  if (Array.isArray(data)) {
    return data[0] ?? null;
  }

  return data;
}

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageData, setImageData] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const predictedClass = useMemo(() => result?.class ?? "", [result]);

  async function handleImageSelected(file) {
    setSelectedFile(file);
    setResult(null);
    setError("");

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
    setImageData(await fileToDataUrl(file));
  }

  async function handleClassify() {
    if (!imageData) {
      setError("Please upload an image before classifying.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image_data", imageData);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}.`);
      }

      const data = await response.json();
      const normalized = normalizeBackendResponse(data);

      if (!normalized?.class) {
        throw new Error("No face prediction was returned by the backend.");
      }

      setResult(normalized);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not classify the selected image."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee]">
      <Hero />
      <CelebrityGallery predictedClass={predictedClass} />
      <ImageUploader
        previewUrl={previewUrl}
        selectedFile={selectedFile}
        onImageSelected={handleImageSelected}
        onClassify={handleClassify}
        isLoading={isLoading}
      />
      <PredictionResult result={result} error={error} />
    </main>
  );
}
