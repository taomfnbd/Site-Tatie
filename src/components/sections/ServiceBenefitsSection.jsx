import React from "react";
import { motion } from "framer-motion";
import EditableText from "../admin/EditableText";
import { useEditMode } from "../../contexts/EditModeContext";

const ServiceBenefitsSection = ({ content, onUpdate }) => {
  const { isEditMode } = useEditMode();
  const data = {
    title: "Bienfaits",
    benefits: ["Bienfait 1", "Bienfait 2", "Bienfait 3", "Bienfait 4"],
    ...content,
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const updateBenefit = (index, value) => {
    const newBenefits = [...data.benefits];
    newBenefits[index] = value;
    onUpdate({ ...data, benefits: newBenefits });
  };

  const addBenefit = () => {
    onUpdate({ ...data, benefits: [...data.benefits, "Nouveau bienfait"] });
  };

  const removeBenefit = (index) => {
    const newBenefits = data.benefits.filter((_, i) => i !== index);
    onUpdate({ ...data, benefits: newBenefits });
  };

  return (
    <motion.div
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
        <div className="w-12 h-[2px] bg-[#95a58d]/40 mx-auto mt-4" />
      </div>

      <div className="bg-[#95a58d]/5 rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#95a58d]/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {data.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-stone-100/80 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#95a58d] mt-2 flex-shrink-0" />
              <span className="text-stone-700 leading-relaxed font-light text-sm sm:text-base flex-1">
                <EditableText
                  value={benefit}
                  onChange={(val) => updateBenefit(index, val)}
                  element="span"
                />
              </span>
              {isEditMode && (
                <button
                  onClick={() => removeBenefit(index)}
                  className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity flex-shrink-0"
                  title="Supprimer ce bienfait"
                >
                  ×
                </button>
              )}
            </motion.div>
          ))}
        </div>
        {isEditMode && (
          <div className="text-center mt-5">
            <button
              onClick={addBenefit}
              className="text-sm text-[#6b7563] hover:text-[#7a8471] border border-[#95a58d]/40 rounded-full px-5 py-2 hover:bg-white transition-colors"
            >
              + Ajouter un bienfait
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceBenefitsSection;
