import React from "react";
import { useId } from "react";
import { useContent } from "../../contexts/ContentContext";
import { resolveFAQItems } from "../../utils/faq";
import EditableText from "../admin/EditableText";
import { useEditMode } from "../../contexts/EditModeContext";
export default function FAQSection({ content, onUpdate }) {
  const { isEditMode } = useEditMode();
  const headingId = useId();
  const { globalContent, pagesContent } = useContent();
  const site = {
    ...globalContent,
    pages: Object.fromEntries(
      Object.entries(pagesContent).map(([key, page]) => [key, page.sections]),
    ),
  };
  const data = {
    title: "Questions fréquentes",
    intro: "Quelques réponses pour préparer votre séance.",
    items: [],
    ...content,
  };
  data.items = resolveFAQItems(data, site);
  const updateItem = (index, field, value) =>
    onUpdate({
      ...data,
      items: data.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    });
  return (
    <section
      className="max-w-4xl mx-auto px-4 sm:px-6 mb-16"
      aria-labelledby={headingId}
    >
      <div className="text-center mb-8">
        <h2
          id={headingId}
          className="text-2xl sm:text-3xl font-light text-stone-800 mb-3"
        >
          <EditableText
            value={data.title}
            element="span"
            onChange={(title) => onUpdate({ ...data, title })}
          />
        </h2>
        <EditableText
          value={data.intro}
          element="p"
          className="text-stone-600"
          onChange={(intro) => onUpdate({ ...data, intro })}
        />
      </div>
      <div className="space-y-3">
        {data.items.map((item, index) => (
          <details
            key={index}
            open={isEditMode || index === 0 || undefined}
            className="group bg-white border border-stone-200 rounded-xl overflow-hidden"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 p-5 min-h-14 font-medium text-stone-800 hover:bg-stone-50">
              <span aria-hidden="true" className="text-[#5e7056] text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="flex-1">
                <EditableText
                  value={item.question}
                  element="span"
                  onChange={(v) => updateItem(index, "question", v)}
                />
              </h3>
              <span
                aria-hidden="true"
                className="text-[#5e7056] group-open:rotate-45 transition-transform text-xl"
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-5 border-t border-stone-100 pt-4 text-stone-600 leading-relaxed text-sm sm:text-base">
              {item.priceSummary || item.priceRef ? (
                <p>{item.answer}</p>
              ) : (
                <EditableText
                  value={item.answer}
                  element="p"
                  onChange={(v) => updateItem(index, "answer", v)}
                />
              )}
              {isEditMode && (
                <button
                  onClick={() =>
                    onUpdate({
                      ...data,
                      items: data.items.filter((_, i) => i !== index),
                    })
                  }
                  className="text-red-700 px-3 py-3 mt-2"
                >
                  Supprimer la question
                </button>
              )}
            </div>
          </details>
        ))}
      </div>
      {isEditMode && (
        <button
          onClick={() =>
            onUpdate({
              ...data,
              items: [
                ...data.items,
                { question: "Nouvelle question", answer: "Nouvelle réponse." },
              ],
            })
          }
          className="p-3 mt-4 border rounded-lg"
        >
          Ajouter une question
        </button>
      )}
    </section>
  );
}
