import React from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../contexts/ContentContext";
import EditableText from "../admin/EditableText";
export default function HomeServicesSection({ content = {}, onUpdate }) {
  const { getPageSections } = useContent();
  const cards = getPageSections("services").filter(
    (section) => section.type === "service_card",
  );
  return (
    <section
      className="bg-[#f2f4ef] px-4 sm:px-6 lg:px-8 py-14 sm:py-20"
      aria-label="Les prestations"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-9">
          <p className="uppercase tracking-[0.18em] text-xs font-semibold text-[#5e7056] mb-3">
            Au cabinet à Vacqueyras
          </p>
          <EditableText
            value={content.title || "Un accompagnement à votre rythme"}
            onChange={(title) => onUpdate({ ...content, title })}
            element="h2"
            className="font-editorial text-4xl sm:text-5xl font-light text-stone-800"
          />
          <p className="text-stone-600 leading-relaxed mt-4">
            Trois façons de prendre un temps pour vous, selon vos besoins et vos
            envies.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((section, index) => {
            const c = section.content;
            return (
              <article
                key={section.id}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/70 flex flex-col shadow-sm hover:shadow-lg hover:border-[#95a58d] transition-[box-shadow,border-color] duration-300"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#f2f4ef] text-xs text-[#5e7056] font-medium">
                  0{index + 1}
                </span>
                <h3 className="font-editorial text-3xl text-stone-800 mt-4 mb-3">{c.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed flex-1">
                  {c.description}
                </p>
                <div className="border-t border-stone-100 mt-6 pt-4">
                  <p className="text-stone-700 text-sm">
                    {c.prices?.[0]?.duration} · {c.prices?.[0]?.price}
                  </p>
                  <Link
                    to={
                      c.linkUrl ||
                      ["/naturopathie", "/reflexologie", "/massage-assis"][
                        index
                      ]
                    }
                    className="inline-flex min-h-11 items-center gap-3 text-[#5e7056] font-medium mt-2"
                  >
                    Découvrir la séance <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
