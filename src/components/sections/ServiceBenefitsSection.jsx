import React from 'react';
import { motion } from 'framer-motion';
import EditableText from '../admin/EditableText';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheckCircle } = FiIcons;

const ServiceBenefitsSection = ({ content, onUpdate }) => {
  const data = {
    title: 'Bienfaits',
    benefits: [
      'Bienfait 1',
      'Bienfait 2',
      'Bienfait 3',
      'Bienfait 4'
    ],
    ...content
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
    onUpdate({ ...data, benefits: [...data.benefits, 'Nouveau bienfait'] });
  };

  const removeBenefit = (index) => {
    const newBenefits = data.benefits.filter((_, i) => i !== index);
    onUpdate({ ...data, benefits: newBenefits });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-16 relative"
    >
      <EditableText
        value={data.title}
        onChange={(val) => updateField('title', val)}
        element="h2"
        className="text-2xl font-medium text-stone-800 mb-12 text-center tracking-wide"
      />
      <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm relative overflow-hidden border border-stone-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {data.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-start space-x-3 p-2 group"
            >
              <SafeIcon icon={FiCheckCircle} className="text-[#95a58d] flex-shrink-0 mt-1 text-sm" />
              <span className="text-stone-700 leading-relaxed font-light text-sm w-full">
                <EditableText value={benefit} onChange={(val) => updateBenefit(index, val)} element="span" />
              </span>
              <button 
                onClick={() => removeBenefit(index)}
                className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity"
                title="Supprimer ce bienfait"
              >
                ×
              </button>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button 
            onClick={addBenefit}
            className="text-sm text-[#95a58d] hover:text-[#7a8471] border border-[#95a58d] rounded-full px-4 py-2 hover:bg-green-50 transition-colors"
          >
            + Ajouter un bienfait
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceBenefitsSection;
