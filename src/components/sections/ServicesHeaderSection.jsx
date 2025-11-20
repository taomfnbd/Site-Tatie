import React from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

const ServicesHeaderSection = ({ content, onUpdate }) => {
  const data = {
    titlePrefix: 'Mes',
    title: 'prestations',
    subtitle: 'Des accompagnements personnalisés pour votre bien-être global',
    imageUrl: 'https://raw.githubusercontent.com/taomfnbd/image2/main/3.svg',
    ...content
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left relative"
          >
            <StaticDragonfly type={1} className="absolute -top-8 -right-8 w-20 h-20 opacity-85" />
            <h1 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6 tracking-wide">
              <EditableText 
                value={data.titlePrefix} 
                onChange={(v) => updateField('titlePrefix', v)} 
                element="span" 
              />
              {' '}
              <EditableText 
                value={data.title} 
                onChange={(v) => updateField('title', v)} 
                element="span" 
                className="text-[#95a58d]" 
              />
            </h1>
            <EditableText
              value={data.subtitle}
              onChange={(v) => updateField('subtitle', v)}
              element="p"
              className="text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-light"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone-100 bg-white">
              <EditableImage
                src={data.imageUrl}
                alt="Illustration services"
                onChange={(v) => updateField('imageUrl', v)}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesHeaderSection;
