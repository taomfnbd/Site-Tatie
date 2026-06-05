import React from "react";
import { motion } from "framer-motion";
import EditableText from "../admin/EditableText";
import { useEditMode } from "../../contexts/EditModeContext";

const ServiceContentSection = ({ content, onUpdate }) => {
  const { isEditMode } = useEditMode();
  const data = {
    title: "Titre de la section",
    paragraphs: [
      "Paragraphe 1. Cliquez pour éditer ce texte.",
      "Paragraphe 2. Ajoutez autant de détails que nécessaire.",
    ],
    ...content,
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const updateParagraph = (index, value) => {
    const newParagraphs = [...data.paragraphs];
    newParagraphs[index] = value;
    onUpdate({ ...data, paragraphs: newParagraphs });
  };

  const addParagraph = () => {
    onUpdate({
      ...data,
      paragraphs: [...data.paragraphs, "Nouveau paragraphe"],
    });
  };

  const removeParagraph = (index) => {
    const newParagraphs = data.paragraphs.filter((_, i) => i !== index);
    onUpdate({ ...data, paragraphs: newParagraphs });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
    >
      <div className="text-center mb-8">
        <EditableText
          value={data.title}
          onChange={(val) => updateField("title", val)}
          element="h2"
          className="text-2xl sm:text-3xl font-light text-stone-800 tracking-wide"
        />
        <div className="w-12 h-[2px] bg-[#95a58d]/40 mx-auto mt-4" />
      </div>
      <div className="max-w-3xl mx-auto space-y-5">
        {data.paragraphs.map((paragraph, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="relative group"
          >
            <EditableText
              value={paragraph}
              onChange={(val) => updateParagraph(index, val)}
              element="p"
              allowHTML={true}
              className="text-base sm:text-lg text-stone-600 leading-relaxed font-light text-center"
            />
            {isEditMode && (
              <button
                onClick={() => removeParagraph(index)}
                className="absolute -right-8 top-0 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity"
                title="Supprimer ce paragraphe"
              >
                ×
              </button>
            )}
          </motion.div>
        ))}
        {isEditMode && (
          <button
            onClick={addParagraph}
            className="block mx-auto text-sm text-[#95a58d] hover:text-[#7a8471] mt-4 opacity-50 hover:opacity-100 transition-opacity"
          >
            + Ajouter un paragraphe
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceContentSection;
