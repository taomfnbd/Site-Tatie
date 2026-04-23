import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import StaticDragonfly from '../common/StaticDragonfly';
import EditableText from '../components/admin/EditableText';
import EditableImage from '../components/admin/EditableImage';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiClock, FiCheckCircle } = FiIcons;

const Massage = () => {
  const [content, setContent] = useState({
    hero: {
      title: 'Massage assis',
      subtitle: 'Une pause bien-être pratique et efficace pour soulager les tensions, réduire le stress et retrouver de l\'énergie, le tout en restant habillé.',
      imageUrl: 'https://raw.githubusercontent.com/taomfnbd/image2/main/2.svg',
    },
    about: {
      title: 'Qu\'est-ce que le massage assis ?',
      paragraphs: [
        'Le massage assis est un <strong>enchaînement précis</strong> composé de pressions et d\'étirements. Il est pratiqué <strong>habillé et sans huile</strong>, ce qui le rend particulièrement pratique et accessible.',
        'Cette technique permet une <strong>détente immédiate</strong> en ciblant les zones où s\'accumulent le plus souvent les tensions : nuque, épaules, dos.',
      ],
    },
    cta: {
      title: 'Offrez-vous un moment de détente',
    },
  });

  const benefits = [
    'Réduit le stress et les tensions (nuque, dos...)',
    'Améliore la qualité du sommeil',
    'Favorise la circulation sanguine et lymphatique',
    'Stimule l\'énergie et la vitalité',
    'Procure une détente immédiate',
    'Soulage les douleurs musculaires',
  ];

  const processSteps = [
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
  ];

  return (
    <div className="py-20 relative overflow-hidden bg-stone-25">
      <StaticDragonfly type={2} className="absolute top-24 right-16 w-28 h-28 opacity-80 hidden lg:block" />
      <StaticDragonfly type={1} className="absolute bottom-1/3 left-16 w-24 h-24 opacity-75 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left relative"
          >
            <StaticDragonfly type={3} className="absolute -top-6 -right-16 w-20 h-20 opacity-90" />
            <h1 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6 tracking-wide">
              <EditableText
                value={content.hero.title}
                onChange={(val) => setContent({ ...content, hero: { ...content.hero, title: val } })}
                element="span"
                allowHTML={true}
                className="inline"
              />
            </h1>
            <EditableText
              value={content.hero.subtitle}
              onChange={(val) => setContent({ ...content, hero: { ...content.hero, subtitle: val } })}
              element="p"
              className="text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-light"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone-100 bg-white flex items-center justify-center">
              <EditableImage
                src={content.hero.imageUrl}
                alt="Illustration massage assis relaxant - Alaïs Tavernier naturopathe"
                onChange={(val) => setContent({ ...content, hero: { ...content.hero, imageUrl: val } })}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-stone-25 to-green-25 rounded-2xl p-8 lg:p-10 mb-16 relative border border-stone-100"
        >
          <StaticDragonfly type={3} className="absolute top-8 right-8 w-16 h-16 opacity-85" />
          <EditableText
            value={content.about.title}
            onChange={(val) => setContent({ ...content, about: { ...content.about, title: val } })}
            element="h2"
            className="text-2xl font-medium text-stone-800 mb-6 text-center tracking-wide"
          />
          <div className="max-w-4xl mx-auto space-y-6">
            {content.about.paragraphs.map((paragraph, index) => (
              <EditableText
                key={index}
                value={paragraph}
                onChange={(val) => {
                  const newParagraphs = [...content.about.paragraphs];
                  newParagraphs[index] = val;
                  setContent({ ...content, about: { ...content.about, paragraphs: newParagraphs } });
                }}
                element="p"
                allowHTML={true}
                className="text-base text-stone-700 leading-relaxed font-light"
              />
            ))}
          </div>
        </motion.div>

        {/* Déroulement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 relative"
        >
          <h2 className="text-2xl font-medium text-stone-800 mb-12 text-center tracking-wide">
            Déroulement de la séance
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative text-center border border-stone-100"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12">
                    <StaticDragonfly type={(index % 3) + 1} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-stone-800 tracking-wide">{step.title}</h3>
                  <p className="text-stone-600 leading-relaxed font-light">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 relative"
        >
          <h2 className="text-2xl font-medium text-stone-800 mb-12 text-center tracking-wide">
            Bienfaits du massage assis
          </h2>
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm relative overflow-hidden border border-stone-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-2"
                >
                  <SafeIcon icon={FiCheckCircle} className="text-[#95a58d] flex-shrink-0 mt-1 text-sm" />
                  <span className="text-stone-700 leading-relaxed font-light">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-green-25 to-stone-25 rounded-2xl p-8 lg:p-10 relative overflow-hidden border border-stone-100">
            <h2 className="text-2xl font-medium text-stone-800 mb-8 text-center tracking-wide">
              Pourquoi choisir le massage assis ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto">
                  <StaticDragonfly type={1} />
                </div>
                <h3 className="text-lg font-medium text-stone-800 tracking-wide">Rapide</h3>
                <p className="text-stone-600 font-light">
                  Seulement 30 minutes pour une détente profonde et durable
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto">
                  <StaticDragonfly type={2} />
                </div>
                <h3 className="text-lg font-medium text-stone-800 tracking-wide">Pratique</h3>
                <p className="text-stone-600 font-light">
                  Habillé(e), sans huile, accessible à tous
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto">
                  <StaticDragonfly type={3} />
                </div>
                <h3 className="text-lg font-medium text-stone-800 tracking-wide">Efficace</h3>
                <p className="text-stone-600 font-light">
                  Résultats immédiats sur le stress et les tensions
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#95a58d] to-[#7a8471] rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden"
        >
          <StaticDragonfly
            type={2}
            className="absolute bottom-8 right-8 w-20 h-20 opacity-70 filter brightness-0 invert"
          />
          <div className="max-w-4xl mx-auto text-center">
            <EditableText
              value={content.cta.title}
              onChange={(val) => setContent({ ...content, cta: { ...content.cta, title: val } })}
              element="h2"
              className="text-3xl lg:text-4xl font-light mb-8 tracking-wide"
            />
            <div className="bg-white/10 rounded-xl p-8 mb-8 max-w-md mx-auto border border-white/20">
              <h3 className="text-xl font-medium mb-4">Massage assis</h3>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <SafeIcon icon={FiClock} className="text-xl" />
                <span className="text-lg">30 minutes</span>
              </div>
              <p className="text-3xl font-semibold">30€</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#95a58d] px-8 py-3 rounded-full text-base font-medium hover:bg-stone-100 transition-all duration-300 shadow-sm"
              >
                Réserver sur Resalib
              </a>
              <a
                href="tel:0781660929"
                className="border border-white text-white px-8 py-3 rounded-full text-base font-medium hover:bg-white hover:text-[#95a58d] transition-all duration-300"
              >
                07.81.66.09.29
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Massage;
