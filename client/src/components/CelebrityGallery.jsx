import { celebrities } from "../data/celebrities.js";

export default function CelebrityGallery({ predictedClass }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink">Celebrity Gallery</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {celebrities.map((celebrity) => {
          const isPredicted =
            predictedClass &&
            celebrity.shortName.toLowerCase() === predictedClass.toLowerCase();

          return (
            <article
              key={celebrity.id}
              className={`overflow-hidden rounded-lg border bg-white shadow-sm transition ${
                isPredicted
                  ? "border-saffron ring-4 ring-saffron/25"
                  : "border-neutral-200"
              }`}
            >
              <div className="aspect-[4/5] bg-neutral-200">
                <img
                  src={celebrity.image}
                  alt={celebrity.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-3 py-3">
                <h3 className="text-sm font-bold text-ink sm:text-base">
                  {celebrity.name}
                </h3>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
