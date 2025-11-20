import React from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock } = FiIcons;

const ServiceCTASection = ({ content, onUpdate }) => {
  const data = {
    title: 'Prêt(e) à commencer votre accompagnement ?',
    showPriceBox: true,
    serviceName: 'Nom du service',
    duration: '30 minutes',
    price: '30€',
    ...content
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-[#95a58d] to-[#7a8471] rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden"
    >
      <StaticDragonfly
        type={2}
        className="absolute bottom-8 right-8 w-20 h-20 opacity-70 filter brightness-0 invert"
      />
      <div className="max-w-4xl mx-auto text-center">
        <EditableText
          value={data.title}
          onChange={(val) => updateField('title', val)}
          element="h2"
          className="text-3xl lg:text-4xl font-light mb-8 tracking-wide"
        />
        
        {data.showPriceBox && (
          <div className="bg-white/10 rounded-xl p-8 mb-8 max-w-md mx-auto border border-white/20">
            <h3 className="text-xl font-medium mb-4">
              <EditableText value={data.serviceName} onChange={(val) => updateField('serviceName', val)} />
            </h3>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <SafeIcon icon={FiClock} className="text-xl" />
              <span className="text-lg">
                <EditableText value={data.duration} onChange={(val) => updateField('duration', val)} element="span" />
              </span>
            </div>
            <p className="text-3xl font-semibold">
              <EditableText value={data.price} onChange={(val) => updateField('price', val)} />
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#95a58d] px-8 py-3 rounded-full text-base font-medium hover:bg-stone-100 transition-all duration-300 shadow-sm"
          >
            Réserver sur Resalib
          </a>
          <a
            href="tel:0781660929"
            className="border border-white text-white px-8 py-3 rounded-full text-base font-medium hover:bg-white hover:text-[#95a58d] transition-all duration-300"
          >
            07.81.66.09.29
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCTASection;
