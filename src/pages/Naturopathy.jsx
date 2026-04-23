import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import StaticDragonfly from '../common/StaticDragonfly';
import EditableText from '../components/admin/EditableText';
import EditableImage from '../components/admin/EditableImage';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiClock, FiCheckCircle } = FiIcons;

const Naturopathy = () => {
  const [content, setContent] = useState({
    hero: {
      title: 'La naturopathie',
      subtitle: 'Une approche naturelle et globale pour devenir acteur de votre bien-être, en harmonie avec votre corps et votre environnement.',
      imageUrl: 'https://raw.githubusercontent.com/taomfnbd/image2/main/4.svg',
    },
    about: {
      title: 'Qu\'est-ce que la naturopathie ?',
      paragraphs: [
        'Le naturopathe est un <strong>éducateur de santé</strong>. Il accompagne son client à comprendre le fonctionnement de son organisme, à devenir autonome et acteur de son bien-être.',
        'Son rôle est de révéler en chacun sa propre capacité d\'auto-guérison.',
        'J\'accompagne chaque personne à retrouver vitalité et harmonie grâce à une approche naturelle et globale de la santé : alimentation, émotions, rythme de vie et équilibre intérieur.',
        'La naturopathie s\'adresse à toute personne souhaitant améliorer son bien-être, retrouver vitalité et équilibre au naturel : enfants, adolescents, adultes.',
        'Chaque accompagnement est personnalisé selon votre mode de vie, vos besoins et votre rythme.',
      ],
    },
    consultation: {
      title: 'Comment se déroule l\'accompagnement ?',
    },
    cta: {
      title: 'Prêt(e) à commencer votre accompagnement ?',
    },
  });

  const consultationReasons = [
    'Troubles digestifs : ballonnements, constipation, reflux',
    'Intolérances ou allergies alimentaires',
    'Rééquilibrage alimentaire',
    'Perte ou prise de poids',
    'Fatigue, manque d\'énergie : sommeil non réparateur, période de surmenage',
    'Gestion du stress et des émotions : anxiété, insomnies, difficultés d\'endormissement, accompagnement en période difficile',
    'Problèmes de peau, cheveux, ongles',
    'Accompagnement à chaque étape de la vie : troubles du cycle menstruel, SPM, pré-ménopause, ménopause',
  ];

  return (
    <div className="py-20 relative overflow-hidden bg-stone-25">
      <StaticDragonfly type={1} className="absolute top-24 right-16 w-28 h-28 opacity-80 hidden lg:block" />
      <StaticDragonfly type={2} className="absolute bottom-40 left-16 w-24 h-24 opacity-75 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left relative"
          >
            <StaticDragonfly type={2} className="absolute -top-12 left-1/2 transform -translate-x-1/2 lg:left-0 lg:transform-none w-24 h-24 opacity-90" />
            <h1 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6 tracking-wide pt-8">
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
                alt="Consultation de naturopathie avec plantes médicinales"
                onChange={(val) => setContent({ ...content, hero: { ...content.hero, imageUrl: val } })}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-green-25 to-stone-25 rounded-2xl p-8 lg:p-10 mb-16 relative border border-stone-100"
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

        {/* Consultation Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 relative"
        >
          <EditableText
            value={content.consultation.title}
            onChange={(val) => setContent({ ...content, consultation: { ...content.consultation, title: val } })}
            element="h2"
            className="text-2xl font-medium text-stone-800 mb-12 text-center tracking-wide"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden border border-stone-100"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-[#95a58d] text-white rounded-lg flex items-center justify-center font-semibold text-lg">
                  1
                </div>
                <h3 className="text-lg font-medium text-stone-800 tracking-wide">Première consultation</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#95a58d] bg-green-50 px-3 py-1 rounded-full flex items-center space-x-1 font-light">
                    <SafeIcon icon={FiClock} className="text-xs" />
                    <span>1h30</span>
                  </span>
                  <p className="text-xl font-semibold text-[#95a58d]">70€</p>
                </div>
                <p className="text-stone-600 leading-relaxed pt-2 font-light">
                  Un bilan de vitalité est établi à partir de questions sur votre parcours de vie, vos habitudes alimentaires et votre quotidien.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden border border-stone-100"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-[#95a58d] text-white rounded-lg flex items-center justify-center font-semibold text-lg">
                  2
                </div>
                <h3 className="text-lg font-medium text-stone-800 tracking-wide">Conseils & suivi</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#95a58d] bg-green-50 px-3 py-1 rounded-full flex items-center space-x-1 font-light">
                    <SafeIcon icon={FiClock} className="text-xs" />
                    <span>1h</span>
                  </span>
                  <p className="text-xl font-semibold text-[#95a58d]">50€</p>
                </div>
                <p className="text-stone-600 leading-relaxed pt-2 font-light">
                  Des conseils personnalisés simples et naturels vous sont proposés. Les séances suivantes permettent de suivre l'évolution et d'ajuster les recommandations.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Consultation Reasons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 relative"
        >
          <h2 className="text-2xl font-medium text-stone-800 mb-12 text-center tracking-wide">
            Motifs de consultation
          </h2>
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm relative overflow-hidden border border-stone-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
              {consultationReasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-start space-x-3 p-2"
                >
                  <SafeIcon icon={FiCheckCircle} className="text-[#95a58d] flex-shrink-0 mt-1 text-sm" />
                  <span className="text-stone-700 leading-relaxed font-light text-sm">{reason}</span>
                </motion.div>
              ))}
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
          <StaticDragonfly type={1} className="absolute top-8 left-8 w-20 h-20 opacity-70 filter brightness-0 invert" />
          <div className="max-w-4xl mx-auto text-center">
            <EditableText
              value={content.cta.title}
              onChange={(val) => setContent({ ...content, cta: { ...content.cta, title: val } })}
              element="h2"
              className="text-3xl lg:text-4xl font-light mb-8 tracking-wide"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-medium mb-2">Première consultation</h3>
                <p className="text-green-100 mb-4 font-light">Bilan de vitalité complet</p>
                <div className="flex items-center justify-center space-x-2">
                  <SafeIcon icon={FiClock} />
                  <span>1h30</span>
                  <span className="mx-2">•</span>
                  <span className="text-xl font-semibold">70€</span>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-medium mb-2">Séances suivantes</h3>
                <p className="text-green-100 mb-4 font-light">Suivi personnalisé</p>
                <div className="flex items-center justify-center space-x-2">
                  <SafeIcon icon={FiClock} />
                  <span>1h</span>
                  <span className="mx-2">•</span>
                  <span className="text-xl font-semibold">50€</span>
                </div>
              </div>
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

export default Naturopathy;
