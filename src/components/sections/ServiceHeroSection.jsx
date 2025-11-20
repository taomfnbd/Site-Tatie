import React from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

const ServiceHeroSection = ({ content, onUpdate }) => {
  const data = {
    title: 'Titre du service',
    subtitle: 'Description courte du service',
    imageUrl: 'https://raw.githubusercontent.com/taomfnbd/image2/main/2.svg',
    ...content
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 pt-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center lg:text-left relative"
      >
        <StaticDragonfly type={3} className="absolute -top-6 -right-16 w-20 h-20 opacity-90" />
        <h1 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6 tracking-wide">
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
          className="text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-light"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone-100 bg-white flex items-center justify-center">
          <EditableImage
            src={data.imageUrl}
            alt="Service illustration"
            onChange={(val) => updateField('imageUrl', val)}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceHeroSection;
