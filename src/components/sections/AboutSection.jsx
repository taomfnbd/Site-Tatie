import React from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

const AboutSection = ({ content, onUpdate }) => {
  const data = {
    titlePrefix: 'Mon',
    title: 'parcours de vie',
    subtitle: 'Découvrez mon cheminement vers la naturopathie',
    content: 'Je suis Alaïs, j\'ai 40 ans. Mon parcours professionnel a débuté dans le domaine médical, en tant que secrétaire médicale, avant d\'évoluer vers la comptabilité au sein d\'un cabinet d\'expertise... L\'expérience du télétravail pendant la période du COVID m\'a offert une véritable prise de conscience : mon activité ne correspondait plus à mes aspirations profondes. C\'est donc tout naturellement que la naturopathie s\'est imposée à moi comme une évidence. En 2022, j\'ai ainsi intégré avec enthousiasme l\'école Aesculape, école libre de naturopathie à Aix-en-Provence, pour y suivre trois années de formation riches d\'apprentissage et de sens.',
    imageUrl: 'https://raw.githubusercontent.com/taomfnbd/image2/main/1.svg',
    ...content
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative px-4 sm:px-6 lg:px-8">
      <StaticDragonfly
        type={3}
        className="absolute top-12 sm:top-16 lg:top-24 right-4 sm:right-8 lg:right-16 w-12 sm:w-16 lg:w-24 h-12 sm:h-16 lg:h-24 opacity-60 sm:opacity-75 hidden md:block"
      />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-stone-800 mb-4 tracking-wide">
            <EditableText
              value={data.titlePrefix}
              onChange={(val) => updateField('titlePrefix', val)}
              element="span"
              className="inline"
            />
            {' '}
            <EditableText
              value={data.title}
              onChange={(val) => updateField('title', val)}
              element="span"
              className="text-[#95a58d] inline"
            />
          </h2>
          <EditableText
            value={data.subtitle}
            onChange={(val) => updateField('subtitle', val)}
            element="p"
            className="text-sm sm:text-base lg:text-lg text-stone-600 max-w-2xl mx-auto font-light"
          />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-green-25 to-stone-25 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden border border-stone-100"
          >
            <EditableText
              value={data.content}
              onChange={(val) => updateField('content', val)}
              element="div"
              className="space-y-3 sm:space-y-4 text-stone-700 leading-relaxed font-light text-sm sm:text-base"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone-100">
              <EditableImage
                src={data.imageUrl}
                alt="Formation en naturopathie - École Aesculape Aix-en-Provence"
                onChange={(val) => updateField('imageUrl', val)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#95a58d]/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-200/20 rounded-full blur-lg"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
