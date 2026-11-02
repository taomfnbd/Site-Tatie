import React, { useEffect, useRef, useState } from "react";
const labels = {
  pageview: "Pages vues",
  resalib: "Clics vers Resalib",
  phone: "Clics téléphone",
  email: "Clics email",
  maps: "Clics itinéraire",
  instagram: "Clics Instagram",
  direct: "Accès direct / source inconnue",
  google: "Google",
  bing: "Bing",
  social: "Réseaux sociaux",
  other: "Autres sites",
  mobile: "Mobile",
  desktop: "Ordinateur / tablette",
};
const metrics = ["pageview", "resalib", "phone", "email", "maps", "instagram"];
function Breakdown({ title, values }) {
  return (
    <section className="border rounded-xl p-4">
      <h3 className="font-semibold mb-3">{title}</h3>
      {Object.keys(values).length ? (
        <ul className="space-y-2">
          {Object.entries(values)
            .sort((a, b) => b[1] - a[1])
            .map(([key, count]) => (
              <li key={key} className="flex justify-between gap-4">
                <span className="break-all">{labels[key] || key}</span>
                <strong>{count}</strong>
              </li>
            ))}
        </ul>
      ) : (
        <p className="text-stone-600">Aucune donnée sur cette période.</p>
      )}
    </section>
  );
}
export default function AudienceDashboard({ onClose }) {
  const dialog = useRef(null);
  const [days, setDays] = useState(30);
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const node = dialog.current;
    node.showModal();
    return () => node.close();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setData(null);
    fetch(`/api/admin/audience?days=${days}`, {
      credentials: "same-origin",
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok)
          throw new Error(result.error || "Chargement impossible.");
        return result;
      })
      .then(setData)
      .catch((error) => {
        if (error.name !== "AbortError") setError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [days, refresh]);
  const exportCSV = () => {
    const rows = [
      ["Date UTC", ...metrics.map((key) => labels[key])],
      ...data.daily.map((row) => [row.day, ...metrics.map((key) => row[key])]),
    ];
    const csv =
      "\uFEFF" +
      rows
        .map((row) =>
          row
            .map((value) => `"${String(value).replaceAll('"', '""')}"`)
            .join(";"),
        )
        .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `statistiques-site-${days}j.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return (
    <dialog
      ref={dialog}
      onCancel={onClose}
      aria-labelledby="audience-title"
      className="w-[calc(100%-1.5rem)] max-w-5xl max-h-[90dvh] rounded-2xl p-0 text-stone-900 backdrop:bg-black/50"
    >
      <div className="p-5 sm:p-8">
        <div className="flex justify-between gap-4">
          <div>
            <h2 id="audience-title" className="text-2xl font-semibold">
              Statistiques du site
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Mesure disponible à partir de son activation. Journées en UTC.
            </p>
          </div>
          <button
            onClick={onClose}
            className="border rounded-lg px-4 py-2 self-start"
          >
            Fermer
          </button>
        </div>
        <div className="flex flex-wrap gap-3 items-center my-5">
          <label>
            Période{" "}
            <select
              className="border rounded-lg p-2 ml-2"
              value={days}
              onChange={(event) => setDays(Number(event.target.value))}
            >
              <option value={7}>7 jours</option>
              <option value={30}>30 jours</option>
              <option value={90}>90 jours</option>
            </select>
          </label>
          <button
            className="border rounded-lg px-4 py-2"
            onClick={() => setRefresh((v) => v + 1)}
            disabled={loading}
          >
            Actualiser
          </button>
          <button
            className="border rounded-lg px-4 py-2"
            onClick={exportCSV}
            disabled={!data || loading}
          >
            Exporter CSV
          </button>
        </div>
        <p className="bg-stone-100 rounded-lg p-4 text-sm">
          Ces chiffres concernent les visiteurs ayant accepté la mesure. Les
          pages vues et les clics ne représentent pas des personnes uniques. Un
          clic téléphone ou email ne confirme pas un appel ou un message envoyé.
          Les robots connus et l’administration sont exclus au mieux ; ces
          compteurs ne sont pas une preuve comptable.
        </p>
        {loading && (
          <p role="status" className="py-6">
            Chargement des statistiques…
          </p>
        )}
        {error && (
          <p role="alert" className="py-6 text-red-800">
            {error}
          </p>
        )}
        {data && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
              {metrics.map((key) => (
                <div key={key} className="border rounded-xl p-4">
                  <div className="text-sm text-stone-600">{labels[key]}</div>
                  <strong className="text-3xl">{data.totals[key]}</strong>
                </div>
              ))}
            </div>
            <section className="border rounded-xl p-4 mb-5">
              <h3 className="font-semibold">
                Rendez-vous confirmés : non connectés
              </h3>
              <p className="text-sm mt-2">
                Resalib ne transmet actuellement aucune confirmation à ce site.
                Les emails reçus et les appels aboutis ne sont pas connectés non
                plus. Ces résultats ne peuvent pas être déduits des clics.
              </p>
              <a
                href="https://www.resalib.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline inline-block py-2"
              >
                Consulter Resalib
              </a>
            </section>
            <div className="grid sm:grid-cols-3 gap-4">
              <Breakdown title="Pages consultées" values={data.pages} />
              <Breakdown
                title="Provenance des pages vues"
                values={data.sources}
              />
              <Breakdown title="Écrans des pages vues" values={data.devices} />
            </div>
            <details className="mt-5 border rounded-xl p-4">
              <summary className="cursor-pointer font-semibold">
                Détail quotidien
              </summary>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm text-left">
                  <caption className="sr-only">
                    Compteurs par journée UTC
                  </caption>
                  <thead>
                    <tr>
                      <th className="p-2">Date</th>
                      {metrics.map((key) => (
                        <th className="p-2" key={key}>
                          {labels[key]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.daily.map((row) => (
                      <tr key={row.day} className="border-t">
                        <th className="p-2 whitespace-nowrap font-normal">
                          {row.day}
                        </th>
                        {metrics.map((key) => (
                          <td className="p-2" key={key}>
                            {row[key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
            <p className="text-xs text-stone-600 mt-4">
              Conservation : 90 jours. Les sources peuvent être masquées par les
              navigateurs ; « accès direct » inclut les provenances inconnues.
              Actualisé le {new Date(data.generatedAt).toLocaleString("fr-FR")}.
            </p>
          </>
        )}
      </div>
    </dialog>
  );
}
