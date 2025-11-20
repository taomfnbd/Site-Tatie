import React from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';

const ServiceContentSection = ({ content, onUpdate }) => {
  const data = {
    title: 'Titre de la section',
    paragraphs: [
      'Paragraphe 1. Cliquez pour éditer ce texte.',
      'Paragraphe 2. Ajoutez autant de détails que nécessaire.',
    ],
    ...content
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
    onUpdate({ ...data, paragraphs: [...data.paragraphs, 'Nouveau paragraphe'] });
  };

  const removeParagraph = (index) => {
    const newParagraphs = data.paragraphs.filter((_, i) => i !== index);
    onUpdate({ ...data, paragraphs: newParagraphs });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gradient-to-br from-stone-25 to-green-25 rounded-2xl p-8 lg:p-10 mb-16 relative border border-stone-100"
    >
      <StaticDragonfly type={3} className="absolute top-8 right-8 w-16 h-16 opacity-85" />
      <EditableText
        value={data.title}
        onChange={(val) => updateField('title', val)}
        element="h2"
        className="text-2xl font-medium text-stone-800 mb-6 text-center tracking-wide"
      />
      <div className="max-w-4xl mx-auto space-y-6">
        {data.paragraphs.map((paragraph, index) => (
          <div key={index} className="relative group">
            <EditableText
              value={paragraph}
              onChange={(val) => updateParagraph(index, val)}
              element="p"
              allowHTML={true}
              className="text-base text-stone-700 leading-relaxed font-light"
            />
            <button 
              onClick={() => removeParagraph(index)}
              className="absolute -right-8 top-0 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity"
              title="Supprimer ce paragraphe"
            >
              ×
            </button>
          </div>
        ))}
        <button 
          onClick={addParagraph}
          className="text-sm text-[#95a58d] hover:text-[#7a8471] mt-2 opacity-50 hover:opacity-100 transition-opacity"
        >
          + Ajouter un paragraphe
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceContentSection;
