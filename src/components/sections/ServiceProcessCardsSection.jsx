import React from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';

const ServiceProcessCardsSection = ({ content, onUpdate }) => {
  const data = {
    title: 'Déroulement de la séance',
    steps: [
      {
        title: 'Installation',
        description: 'Vous êtes installé(e) confortablement sur une chaise de massage spécialement conçue, en position assise.',
      },
      {
        title: 'Massage ciblé',
        description: 'Les zones massées sont le crâne, les épaules, le dos, les bras et les mains avec des techniques précises.',
      },
      {
        title: 'Détente immédiate',
        description: 'Ressentez les bienfaits dès la fin de la séance : détente, soulagement des tensions et regain d\'énergie.',
      },
    ],
    ...content
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
      steps: [...data.steps, { title: 'Nouvelle étape', description: 'Description...' }] 
    });
  };

  const removeStep = (index) => {
    const newSteps = data.steps.filter((_, i) => i !== index);
    onUpdate({ ...data, steps: newSteps });
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {data.steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative text-center border border-stone-100 group"
          >
            <button 
              onClick={() => removeStep(index)}
              className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity z-10"
              title="Supprimer cette étape"
            >
              ×
            </button>
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12">
                <StaticDragonfly type={(index % 3) + 1} />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-stone-800 tracking-wide">
                <EditableText value={step.title} onChange={(val) => updateStep(index, 'title', val)} />
              </h3>
              <EditableText
                value={step.description}
                onChange={(val) => updateStep(index, 'description', val)}
                element="p"
                className="text-stone-600 leading-relaxed font-light"
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button 
          onClick={addStep}
          className="text-sm text-[#95a58d] hover:text-[#7a8471] border border-[#95a58d] rounded-full px-4 py-2 hover:bg-green-50 transition-colors"
        >
          + Ajouter une étape
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceProcessCardsSection;
