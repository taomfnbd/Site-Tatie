import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import StaticDragonfly from '../common/StaticDragonfly';
import EditableText from '../components/admin/EditableText';
import EditableImage from '../components/admin/EditableImage';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiMail } = FiIcons;

const Home = () => {
  // État local pour gérer le contenu éditable
  const [content, setContent] = useState({
    hero: {
      firstName: 'Alaïs',
      lastName: 'Tavernier',
      profession: 'Naturopathe',
      subtitle: 'Massage bien-être',
      description: 'Éducatrice de la santé, je vous accompagne pour que vous deveniez autonome et acteur de votre bien-être.',
      quote: 'La force qui est en chacun de nous est notre plus grand médecin',
      quoteAuthor: 'Hippocrate',
    },
    about: {
      title: 'Mon Parcours',
      subtitle: 'Une formation solide et une approche humaine',
      content: 'Diplômée en naturopathie de l\'École Aesculape à Aix-en-Provence, je vous accompagne avec bienveillance dans votre quête d\'équilibre et de vitalité.\n\nMa pratique s\'inscrit dans une démarche holistique, prenant en compte votre individualité et votre environnement pour vous proposer des conseils personnalisés et naturels.',
      imageUrl: 'https://raw.githubusercontent.com/taomfnbd/image2/main/1.svg',
    },
    services: {
      title: 'Mes Prestations',
      subtitle: 'Des approches naturelles pour votre bien-être',
    },
  });

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
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
                  value={content.hero.firstName}
                  onChange={(val) => setContent({...content, hero: {...content.hero, firstName: val}})}
                  element="span"
                  className="inline"
                />
                {' '}
                <EditableText
                  value={content.hero.lastName}
                  onChange={(val) => setContent({...content, hero: {...content.hero, lastName: val}})}
                  element="span"
                  className="text-[#95a58d] font-normal inline"
                />
              </h1>
              <div className="mb-6 sm:mb-8 lg:mb-10">
                <EditableText
                  value={content.hero.profession}
                  onChange={(val) => setContent({...content, hero: {...content.hero, profession: val}})}
                  element="p"
                  className="text-lg sm:text-xl lg:text-2xl text-stone-600 mb-2 sm:mb-3 font-light"
                />
                <EditableText
                  value={content.hero.subtitle}
                  onChange={(val) => setContent({...content, hero: {...content.hero, subtitle: val}})}
                  element="p"
                  className="text-base sm:text-lg lg:text-xl text-stone-500 font-light"
                />
              </div>
              <EditableText
                value={content.hero.description}
                onChange={(val) => setContent({...content, hero: {...content.hero, description: val}})}
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
                  value={`"${content.hero.quote}"`}
                  onChange={(val) => setContent({...content, hero: {...content.hero, quote: val.replace(/"/g, '')}})}
                  element="p"
                  className="text-base sm:text-lg lg:text-xl text-[#95a58d] font-light italic"
                />
                <p className="text-sm sm:text-base text-stone-500 mt-2 sm:mt-3 font-light">
                  — <EditableText
                    value={content.hero.quoteAuthor}
                    onChange={(val) => setContent({...content, hero: {...content.hero, quoteAuthor: val}})}
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

      {/* Mon parcours */}
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
              Mon <EditableText
                value={content.about.title.replace('Mon ', '')}
                onChange={(val) => setContent({...content, about: {...content.about, title: `Mon ${val}`}})}
                element="span"
                className="text-[#95a58d] inline"
              />
            </h2>
            <EditableText
              value={content.about.subtitle}
              onChange={(val) => setContent({...content, about: {...content.about, subtitle: val}})}
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
              <div className="space-y-3 sm:space-y-4 text-stone-700 leading-relaxed font-light text-sm sm:text-base">
                {content.about.content.split('\n\n').map((paragraph, index) => (
                  <EditableText
                    key={index}
                    value={paragraph}
                    onChange={(val) => {
                      const paragraphs = content.about.content.split('\n\n');
                      paragraphs[index] = val;
                      setContent({...content, about: {...content.about, content: paragraphs.join('\n\n')}});
                    }}
                    element="p"
                  />
                ))}
              </div>
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
                  src={content.about.imageUrl}
                  alt="Formation en naturopathie - École Aesculape Aix-en-Provence"
                  onChange={(val) => setContent({...content, about: {...content.about, imageUrl: val}})}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#95a58d]/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-200/20 rounded-full blur-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-stone-25 to-green-25 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <StaticDragonfly
          type={1}
          className="absolute bottom-12 sm:bottom-16 lg:bottom-20 right-4 sm:right-10 lg:right-20 w-16 sm:w-20 lg:w-28 h-16 sm:h-20 lg:h-28 opacity-50 sm:opacity-70 hidden md:block"
        />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <EditableText
              value={content.services.title}
              onChange={(val) => setContent({...content, services: {...content.services, title: val}})}
              element="h2"
              className="text-xl sm:text-2xl lg:text-3xl font-light text-stone-800 mb-4 tracking-wide"
            />
            <EditableText
              value={content.services.subtitle}
              onChange={(val) => setContent({...content, services: {...content.services, subtitle: val}})}
              element="p"
              className="text-sm sm:text-base lg:text-lg text-stone-600 max-w-2xl mx-auto font-light"
            />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group relative overflow-hidden border border-stone-100"
            >
              <h3 className="text-base sm:text-lg lg:text-xl font-medium text-stone-800 mb-3 sm:mb-4 tracking-wide">
                Naturopathie
              </h3>
              <p className="text-stone-600 mb-4 sm:mb-6 font-light leading-relaxed text-sm sm:text-base">
                Bilan de vitalité personnalisé et conseils naturels pour retrouver votre équilibre.
              </p>
              <div className="space-y-1 mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-stone-500 font-light">
                  Première consultation (1h30) : <strong className="text-[#95a58d]">70€</strong>
                </p>
                <p className="text-xs sm:text-sm text-stone-500 font-light">
                  Séances suivantes (1h) : <strong className="text-[#95a58d]">50€</strong>
                </p>
              </div>
              <Link
                to="/naturopathie"
                className="inline-flex items-center text-[#95a58d] hover:text-[#7a8471] transition-colors text-sm font-medium"
              >
                En savoir plus →
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group relative overflow-hidden border border-stone-100"
            >
              <h3 className="text-base sm:text-lg lg:text-xl font-medium text-stone-800 mb-3 sm:mb-4 tracking-wide">
                Massage assis
              </h3>
              <p className="text-stone-600 mb-4 sm:mb-6 font-light leading-relaxed text-sm sm:text-base">
                Détente immédiate avec un massage habillé ciblé sur le dos, nuque et épaules.
              </p>
              <p className="text-xs sm:text-sm text-stone-500 font-light mb-4 sm:mb-6">
                30 minutes : <strong className="text-[#95a58d]">30€</strong>
              </p>
              <Link
                to="/massage-assis"
                className="inline-flex items-center text-[#95a58d] hover:text-[#7a8471] transition-colors text-sm font-medium"
              >
                En savoir plus →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <StaticDragonfly
          type={2}
          className="absolute top-12 sm:top-16 lg:top-24 left-4 sm:left-10 lg:left-20 w-16 sm:w-20 lg:w-28 h-16 sm:h-20 lg:h-28 opacity-60 sm:opacity-80 hidden md:block"
        />
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-stone-800 mb-4 tracking-wide">
              Prêt à prendre soin de vous ?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-stone-600 mb-8 sm:mb-10 font-light">
              Réservez votre consultation et commencez votre parcours vers un bien-être naturel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#95a58d] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[#7a8471] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Réserver sur Resalib
              </a>
              <a
                href="tel:0781660929"
                className="border border-[#95a58d] text-[#95a58d] px-8 py-4 rounded-full text-base font-medium hover:bg-[#95a58d] hover:text-white transition-all duration-300"
              >
                Appeler directement
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
