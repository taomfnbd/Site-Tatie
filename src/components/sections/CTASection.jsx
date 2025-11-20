import React from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';

const CTASection = ({ content, onUpdate }) => {
  const data = {
    title: 'Prêt(e) à prendre soin de votre bien-être ?',
    description: 'Prenez rendez-vous dès maintenant pour un accompagnement personnalisé',
    ...content
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-gradient-to-r from-[#95a58d] to-[#7a8471] relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <StaticDragonfly
        type={2}
        className="absolute top-6 sm:top-8 lg:top-12 left-4 sm:left-8 lg:left-12 w-12 sm:w-16 lg:w-24 h-12 sm:h-16 lg:h-24 opacity-50 sm:opacity-65 filter brightness-0 invert hidden md:block"
      />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light text-white mb-4 sm:mb-6 tracking-wide">
            <EditableText
              value={data.title}
              onChange={(val) => updateField('title', val)}
              element="span"
              className="inline"
            />
          </h2>
          <EditableText
            value={data.description}
            onChange={(val) => updateField('description', val)}
            element="p"
            className="text-sm sm:text-base lg:text-lg text-green-100 mb-6 sm:mb-8 font-light"
          />
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#95a58d] px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-medium hover:bg-stone-100 transition-all duration-300 shadow-sm"
            >
              Réserver sur Resalib
            </a>
            <a
              href="tel:0781660929"
              className="border border-white text-white px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-medium hover:bg-white hover:text-[#95a58d] transition-all duration-300"
            >
              Appeler directement
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
