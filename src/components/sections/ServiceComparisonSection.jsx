import React from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../contexts/ContentContext";
import EditableText from "../admin/EditableText";
export default function ServiceComparisonSection({ content = {}, onUpdate }) {
  const { getPageSections } = useContent();
  const cards = getPageSections("services").filter(
    (section) => section.type === "service_card",
  );
  return (
    <section
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
      aria-label="Comparatif des séances et tarifs"
    >
      <EditableText
        value={content.title || "Quelle séance choisir à Vacqueyras ?"}
        element="h2"
        onChange={(title) => onUpdate({ ...content, title })}
        className="text-2xl sm:text-3xl font-light text-stone-800 mb-4"
      />
      <p className="text-stone-600 mb-6 max-w-3xl">
        Comparez le format, la durée et le tarif des séances proposées par Alaïs
        Tavernier. Chaque prestation relève du bien-être et ne remplace pas un
        suivi médical.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <caption className="sr-only">
            Prestations, formats, durées et tarifs au cabinet d’Alaïs Tavernier
            à Vacqueyras
          </caption>
          <thead className="bg-stone-100 text-stone-800">
            <tr>
              {["Prestation", "Séance", "Durée", "Tarif"].map((label) => (
                <th key={label} scope="col" className="p-4 font-semibold">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cards.flatMap((card) =>
              (card.content.prices || []).map((price, index) => (
                <tr
                  key={`${card.id}-${index}`}
                  className="border-t border-stone-100"
                >
                  <th scope="row" className="p-4 font-medium">
                    <Link
                      to={card.content.linkUrl}
                      className="inline-flex min-h-11 items-center text-[#5e7056] underline underline-offset-4"
                    >
                      {card.content.title}
                    </Link>
                  </th>
                  <td className="p-4 text-stone-600">{price.type}</td>
                  <td className="p-4 whitespace-nowrap text-stone-700">
                    {price.duration}
                  </td>
                  <td className="p-4 font-semibold text-stone-800 whitespace-nowrap">
                    {price.price.replace("€", " €")}
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
      <p className="text-stone-600 text-sm mt-4">
        Les disponibilités sont consultables sur Resalib. Pour une question
        avant de réserver,{" "}
        <Link
          to="/contact"
          className="text-[#5e7056] underline underline-offset-4"
        >
          contactez le cabinet
        </Link>
        .
      </p>
    </section>
  );
}
