import React from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';

const LegalContentSection = ({ content, onUpdate }) => {
  const data = {
    title: 'Titre de la page',
    content: '<h1>1. Titre section</h1><p>Paragraphe de texte légal.</p>',
    ...content
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="py-20 relative overflow-hidden bg-stone-25">
      <StaticDragonfly type={1} className="absolute top-20 right-20 w-32 h-32 opacity-35 hidden lg:block" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6 tracking-wide">
            <EditableText
              value={data.title}
              onChange={(val) => updateField('title', val)}
              element="span"
              allowHTML={true}
              className="inline"
            />
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-stone-100"
        >
          <div className="prose prose-stone max-w-none prose-h2:text-xl prose-h2:font-medium prose-h2:text-stone-800 prose-h3:text-lg prose-h3:font-medium prose-h3:text-stone-700 prose-p:font-light prose-strong:font-medium prose-strong:text-[#95a58d]">
             <EditableText
              value={data.content}
              onChange={(val) => updateField('content', val)}
              element="div"
              allowHTML={true}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalContentSection;
