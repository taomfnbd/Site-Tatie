import React from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';

const ContactHeroSection = ({ content, onUpdate }) => {
  const data = {
    title: 'Contact & <span class="text-[#95a58d]">Infos pratiques</span>',
    subtitle: 'Toutes les informations pour me contacter et organiser votre rendez-vous',
    ...content
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16 relative"
    >
      <StaticDragonfly type={1} className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 opacity-60" />
      <h1 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6 tracking-wide pt-8">
        <EditableText
          value={data.title}
          onChange={(val) => updateField('title', val)}
          element="span"
          allowHTML={true}
          className="inline"
        />
      </h1>
      <EditableText
        value={data.subtitle}
        onChange={(val) => updateField('subtitle', val)}
        element="p"
        className="text-lg text-stone-600 max-w-2xl mx-auto font-light"
      />
    </motion.div>
  );
};

export default ContactHeroSection;
