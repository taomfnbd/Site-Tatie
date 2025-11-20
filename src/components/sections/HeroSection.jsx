import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiMail } = FiIcons;

const HeroSection = ({ content, onUpdate }) => {
  // Valeurs par défaut si le contenu est vide
  const data = {
    firstName: 'Alaïs',
    lastName: 'Tavernier',
    profession: 'Naturopathe',
    subtitle: 'Massage bien-être',
    description: 'Éducatrice de la santé, je vous accompagne pour que vous deveniez autonome et acteur de votre bien-être.',
    quote: 'La force qui est en chacun de nous est notre plus grand médecin',
    quoteAuthor: 'Hippocrate',
    ...content
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-25 via-green-25 to-stone-50 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-24 sm:w-32 h-24 sm:h-32 bg-[#95a58d] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-32 sm:w-40 h-32 sm:h-40 bg-green-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 sm:w-24 h-16 sm:h-24 bg-stone-300 rounded-full blur-2xl"></div>
      </div>
      <StaticDragonfly
        type={1}
        className="absolute top-16 sm:top-20 lg:top-32 right-4 sm:right-10 lg:right-20 w-16 sm:w-20 lg:w-28 h-16 sm:h-20 lg:h-28 opacity-60 sm:opacity-80 hidden sm:block"
      />
      <div className="relative max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 w-full">
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full max-w-5xl"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-stone-800 mb-6 sm:mb-8 tracking-wide leading-tight">
              <EditableText
                value={data.firstName}
                onChange={(val) => updateField('firstName', val)}
                element="span"
                className="inline"
              />
              {' '}
              <EditableText
                value={data.lastName}
                onChange={(val) => updateField('lastName', val)}
                element="span"
                className="text-[#95a58d] font-normal inline"
              />
            </h1>
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <EditableText
                value={data.profession}
                onChange={(val) => updateField('profession', val)}
                element="p"
                className="text-lg sm:text-xl lg:text-2xl text-stone-600 mb-2 sm:mb-3 font-light"
              />
              <EditableText
                value={data.subtitle}
                onChange={(val) => updateField('subtitle', val)}
                element="p"
                className="text-base sm:text-lg lg:text-xl text-stone-500 font-light"
              />
            </div>
            <EditableText
              value={data.description}
              onChange={(val) => updateField('description', val)}
              element="p"
              className="text-base sm:text-lg lg:text-xl text-stone-600 mb-6 sm:mb-8 lg:mb-10 max-w-4xl mx-auto leading-relaxed font-light"
            />
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 sm:mb-10 lg:mb-12 text-center"
            >
              <EditableText
                value={`"${data.quote}"`}
                onChange={(val) => updateField('quote', val.replace(/"/g, ''))}
                element="p"
                className="text-base sm:text-lg lg:text-xl text-[#95a58d] font-light italic"
              />
              <p className="text-sm sm:text-base text-stone-500 mt-2 sm:mt-3 font-light">
                — <EditableText
                  value={data.quoteAuthor}
                  onChange={(val) => updateField('quoteAuthor', val)}
                  element="span"
                  className="inline"
                />
              </p>
            </motion.blockquote>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center">
              <a
                href="https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-[#95a58d] text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-medium hover:bg-[#7a8471] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <SafeIcon icon={FiCalendar} />
                <span>Prendre rendez-vous</span>
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center space-x-2 border border-[#95a58d] text-[#95a58d] px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-medium hover:bg-[#95a58d] hover:text-white transition-all duration-300"
              >
                <SafeIcon icon={FiMail} />
                <span>Me contacter</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
