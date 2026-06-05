export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 opacity-30">
        <img
          src="/celebrities/dulquer.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,20,20,0.92),rgba(20,20,20,0.72),rgba(20,20,20,0.28))]" />
      <div className="relative mx-auto flex min-h-[420px] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:px-8 lg:px-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-saffron">
          Face recognition demo
        </p>
        <h1 className="max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
          Mollywood Celebrity Classifier
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
          Upload a face image and compare the model confidence across familiar
          Mollywood stars.
        </p>
      </div>
    </section>
  );
}
