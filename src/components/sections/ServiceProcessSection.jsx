import React from "react";
import { motion } from "framer-motion";
import EditableText from "../admin/EditableText";
import SafeIcon from "../../common/SafeIcon";
import { useEditMode } from "../../contexts/EditModeContext";
import { FiClock } from "react-icons/fi";

const ServiceProcessSection = ({ content, onUpdate }) => {
  const { isEditMode } = useEditMode();

  const data = {
    title: "Déroulement de la séance",
    steps: [
      {
        title: "Étape 1",
        description: "Description de l'étape 1.",
        price: "70€",
        duration: "1h30",
      },
      {
        title: "Étape 2",
        description: "Description de l'étape 2.",
        price: "50€",
        duration: "1h",
      },
    ],
    ...content,
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const updateStep = (index, field, value) => {
    const newSteps = [...data.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    onUpdate({ ...data, steps: newSteps });
  };

  const addStep = () => {
    onUpdate({
      ...data,
      steps: [
        ...data.steps,
        {
          title: "Nouvelle étape",
          description: "Description...",
          price: "",
          duration: "",
        },
      ],
    });
  };

  const removeStep = (index) => {
    const newSteps = data.steps.filter((_, i) => i !== index);
    onUpdate({ ...data, steps: newSteps });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
    >
      <div className="text-center mb-12">
        <EditableText
          value={data.title}
          onChange={(val) => updateField("title", val)}
          element="h2"
          className="text-2xl sm:text-3xl font-light text-stone-800 tracking-wide"
        />
        <div className="w-12 h-[2px] bg-[#95a58d]/40 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {data.steps.map((step, index) => {
          const hasPrice = step.price && step.price.trim() !== "";
          const hasDuration = step.duration && step.duration.trim() !== "";
          const showMeta = hasPrice || hasDuration || isEditMode;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 relative overflow-hidden border border-stone-100 group"
            >
              {isEditMode && (
                <button
                  onClick={() => removeStep(index)}
                  className="absolute top-3 right-3 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity z-10"
                  title="Supprimer cette étape"
                >
                  ×
                </button>
              )}

              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 bg-[#95a58d]/10 text-[#95a58d] rounded-xl flex items-center justify-center font-semibold text-base flex-shrink-0">
                  {index + 1}
                </div>
                <h3 className="text-lg font-medium text-stone-800 tracking-wide pt-1">
                  <EditableText
                    value={step.title}
                    onChange={(val) => updateStep(index, "title", val)}
                  />
                </h3>
              </div>

              <EditableText
                value={step.description}
                onChange={(val) => updateStep(index, "description", val)}
                element="p"
                className="text-stone-600 leading-relaxed font-light text-sm sm:text-base mb-5"
              />

              {showMeta && (
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  {(hasDuration || isEditMode) && (
                    <span className="text-xs sm:text-sm text-[#95a58d] bg-[#95a58d]/8 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-light">
                      <SafeIcon icon={FiClock} className="text-[10px]" />
                      <EditableText
                        value={step.duration}
                        onChange={(val) => updateStep(index, "duration", val)}
                        element="span"
                        className={
                          !hasDuration && isEditMode
                            ? "text-gray-400 italic"
                            : ""
                        }
                      />
                    </span>
                  )}
                  {(hasPrice || isEditMode) && (
                    <span className="text-lg font-semibold text-[#95a58d] ml-auto">
                      <EditableText
                        value={step.price}
                        onChange={(val) => updateStep(index, "price", val)}
                        className={
                          !hasPrice && isEditMode
                            ? "text-gray-400 italic text-sm"
                            : ""
                        }
                      />
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      {isEditMode && (
        <div className="text-center mt-6">
          <button
            onClick={addStep}
            className="text-sm text-[#95a58d] hover:text-[#7a8471] border border-[#95a58d]/40 rounded-full px-5 py-2 hover:bg-[#95a58d]/5 transition-colors"
          >
            + Ajouter une étape
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceProcessSection;
