import React from "react";
import { motion } from "framer-motion";
import EditableText from "../admin/EditableText";
import SafeIcon from "../../common/SafeIcon";
import { FiClock } from "react-icons/fi";

const ServiceCTASection = ({ content, onUpdate }) => {
  const data = {
    title: "Prêt(e) à commencer votre accompagnement ?",
    showPriceBox: true,
    serviceName: "Nom du service",
    duration: "30 minutes",
    price: "30€",
    ...content,
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
    >
      <div className="bg-gradient-to-br from-[#95a58d] to-[#7a8471] rounded-2xl p-8 sm:p-10 lg:p-12 text-white relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <EditableText
            value={data.title}
            onChange={(val) => updateField("title", val)}
            element="h2"
            className="text-2xl sm:text-3xl lg:text-4xl font-light mb-8 tracking-wide leading-snug"
          />

          {data.showPriceBox && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 mb-8 max-w-xs mx-auto border border-white/15">
              <h3 className="text-lg font-medium mb-3">
                <EditableText
                  value={data.serviceName}
                  onChange={(val) => updateField("serviceName", val)}
                />
              </h3>
              <div className="flex items-center justify-center gap-2 mb-3 text-white/80">
                <SafeIcon icon={FiClock} className="text-base" />
                <span className="text-sm font-light">
                  <EditableText
                    value={data.duration}
                    onChange={(val) => updateField("duration", val)}
                    element="span"
                  />
                </span>
              </div>
              <p className="text-3xl font-semibold">
                <EditableText
                  value={data.price}
                  onChange={(val) => updateField("price", val)}
                />
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#95a58d] px-7 py-3 rounded-full text-sm font-medium hover:bg-stone-100 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Réserver sur Resalib
            </a>
            <a
              href="tel:0781660929"
              className="border border-white/50 text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-[#95a58d] transition-all duration-300"
            >
              07.81.66.09.29
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCTASection;
