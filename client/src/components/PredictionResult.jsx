import { displayNames } from "../data/celebrities.js";

function probabilityRows(result) {
  if (!result?.class_probability || !result?.class_dictionary) {
    return [];
  }

  const classByIndex = Object.entries(result.class_dictionary).reduce(
    (acc, [name, index]) => {
      acc[index] = name;
      return acc;
    },
    {}
  );

  return result.class_probability
    .map((probability, index) => {
      const modelName = classByIndex[index] ?? `Class ${index}`;
      return {
        modelName,
        name: displayNames[modelName] ?? modelName,
        probability: Number(probability)
      };
    })
    .sort((a, b) => b.probability - a.probability);
}

export default function PredictionResult({ result, error }) {
  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-800">
          <h2 className="font-bold">Classification failed</h2>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      </section>
    );
  }

  if (!result) {
    return null;
  }

  const rows = probabilityRows(result);
  const predictedName = displayNames[result.class] ?? result.class;

  return (
    <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <article className="rounded-lg border border-saffron/50 bg-white p-6 shadow-soft">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">
            Prediction
          </p>
          <h2 className="mt-3 text-3xl font-black text-ink">{predictedName}</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            The highlighted row below is the backend model&apos;s top class.
          </p>
        </article>

        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-neutral-600">
                    Celebrity
                  </th>
                  <th className="w-32 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-neutral-600">
                    Probability
                  </th>
                  <th className="min-w-[220px] px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-neutral-600">
                    Progress Bar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {rows.map((row) => {
                  const isPredicted = row.modelName === result.class;

                  return (
                    <tr
                      key={row.modelName}
                      className={isPredicted ? "bg-saffron/12" : "bg-white"}
                    >
                      <td className="px-4 py-4 text-sm font-bold text-ink">
                        {row.name}
                        {isPredicted && (
                          <span className="ml-2 rounded bg-saffron px-2 py-1 text-xs font-black text-ink">
                            Predicted
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-neutral-700">
                        {row.probability.toFixed(2)}%
                      </td>
                      <td className="px-4 py-4">
                        <div className="h-3 overflow-hidden rounded-full bg-neutral-100">
                          <div
                            className={`h-full rounded-full ${
                              isPredicted ? "bg-saffron" : "bg-palm"
                            }`}
                            style={{
                              width: `${Math.max(0, Math.min(100, row.probability))}%`
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
