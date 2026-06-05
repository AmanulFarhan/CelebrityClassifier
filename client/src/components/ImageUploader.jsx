import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader({
  previewUrl,
  selectedFile,
  onImageSelected,
  onClassify,
  isLoading
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        onImageSelected(file);
      }
    },
    [onImageSelected]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"]
    },
    maxFiles: 1,
    noClick: true
  });

  return (
    <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div
          {...getRootProps()}
          className={`flex min-h-[280px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white px-6 py-10 text-center shadow-sm transition ${
            isDragActive
              ? "border-palm bg-palm/5"
              : "border-neutral-300 hover:border-palm"
          }`}
        >
          <input {...getInputProps()} />
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-palm/10 text-2xl text-palm">
            +
          </div>
          <h2 className="text-xl font-bold text-ink">Upload a face image</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-neutral-600">
            Drag and drop a JPG, PNG, or WebP image here.
          </p>
          <button
            type="button"
            onClick={open}
            className="mt-5 rounded-md bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-ink/20"
          >
            Choose Image
          </button>
          {selectedFile && (
            <p className="mt-4 break-all text-xs font-medium text-neutral-500">
              {selectedFile.name}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="aspect-[4/3] overflow-hidden rounded-md bg-neutral-100">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Selected preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-neutral-500">
                Image preview appears here after upload.
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClassify}
            disabled={!selectedFile || isLoading}
            className="mt-4 w-full rounded-md bg-palm px-5 py-3 text-sm font-bold text-white transition hover:bg-palm/90 focus:outline-none focus:ring-4 focus:ring-palm/20 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {isLoading ? "Classifying..." : "Classify"}
          </button>
        </div>
      </div>
    </section>
  );
}
