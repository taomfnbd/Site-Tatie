import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EditableText from "../admin/EditableText";
import { useEditMode } from "../../contexts/EditModeContext";
import { FiChevronDown } from "react-icons/fi";

const FAQSection = ({ content, onUpdate }) => {
  const { isEditMode } = useEditMode();
  const [openItems, setOpenItems] = useState(() => new Set([0]));
  const data = {
    title: "Questions fréquentes",
    intro:
      "Réponses aux questions les plus courantes avant de prendre rendez-vous.",
    items: [
      {
        question: "Comment se déroule une séance ?",
        answer:
          "La séance commence par un échange sur vos besoins, votre rythme de vie et vos attentes. Les conseils proposés sont personnalisés et adaptés à votre situation.",
      },
    ],
    ...content,
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const updateItem = (index, field, value) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    onUpdate({ ...data, items });
  };

  const addItem = () => {
    onUpdate({
      ...data,
      items: [
        ...data.items,
        { question: "Nouvelle question", answer: "Nouvelle réponse." },
      ],
    });
  };

  const removeItem = (index) => {
    onUpdate({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  const toggleItem = (index) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
    >
      <div className="text-center mb-10">
        <EditableText
          value={data.title}
          onChange={(val) => updateField("title", val)}
          element="h2"
          className="text-2xl sm:text-3xl font-light text-stone-800 tracking-wide"
        />
        <div className="w-12 h-[2px] bg-[#95a58d]/40 mx-auto mt-4 mb-4" />
        <EditableText
          value={data.intro}
          onChange={(val) => updateField("intro", val)}
          element="p"
          className="text-sm sm:text-base text-stone-500 font-light leading-relaxed max-w-xl mx-auto"
        />
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {data.items.map((item, index) => {
          const isOpen = isEditMode || openItems.has(index);
          const answerId = `faq-answer-${index}`;
          const buttonId = `faq-question-${index}`;

          return (
            <div
              key={index}
              className={`group rounded-xl border bg-white transition-all duration-200 ${
                isOpen
                  ? "border-[#95a58d]/30 shadow-md shadow-stone-200/50"
                  : "border-stone-100 shadow-sm hover:border-[#95a58d]/20 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-3 p-4 sm:p-5">
                <span
                  className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                    isOpen
                      ? "bg-[#95a58d] text-white"
                      : "bg-stone-50 text-[#7a8471]"
                  }`}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {isEditMode ? (
                  <EditableText
                    value={item.question}
                    onChange={(val) => updateItem(index, "question", val)}
                    element="h3"
                    className="text-base sm:text-lg font-medium text-stone-800 flex-1 leading-snug"
                  />
                ) : (
                  <h3 className="flex-1">
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggleItem(index)}
                      className="flex w-full items-start justify-between gap-4 text-left text-base sm:text-lg font-medium text-stone-800 transition-colors hover:text-[#7a8471] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#95a58d]"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="leading-snug">{item.question}</span>
                      <FiChevronDown
                        className={`mt-0.5 h-5 w-5 flex-shrink-0 text-[#6b7563] transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                )}
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={answerId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={isEditMode ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden border-t border-stone-100"
                  >
                    <div className="px-4 pb-5 pt-4 sm:px-5 sm:pl-[4.25rem] sm:pr-12">
                      <EditableText
                        value={item.answer}
                        onChange={(val) => updateItem(index, "answer", val)}
                        element="p"
                        className="text-sm sm:text-base text-stone-600 leading-7 font-light"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isEditMode && (
                <button
                  onClick={() => removeItem(index)}
                  className="ml-4 sm:ml-[4.25rem] mb-4 text-red-400 text-sm opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity"
                  title="Supprimer cette question"
                >
                  Supprimer
                </button>
              )}
            </div>
          );
        })}

        {isEditMode && (
          <div className="text-center pt-3">
            <button
              onClick={addItem}
              className="text-sm text-[#6b7563] hover:text-[#7a8471] border border-[#95a58d]/40 rounded-full px-5 py-2 hover:bg-white transition-colors"
            >
              + Ajouter une question
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default FAQSection;
