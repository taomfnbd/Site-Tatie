import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';
import * as FiIcons from 'react-icons/fi';

const { FiLeaf, FiHeart, FiClock, FiEuro } = FiIcons;

const ServicesListSection = ({ content, onUpdate }) => {
  const data = {
    header: {
      titlePrefix: 'Mes',
      title: 'prestations',
      subtitle: 'Des accompagnements personnalisés pour votre bien-être global',
      imageUrl: 'https://raw.githubusercontent.com/taomfnbd/image2/main/3.svg',
    },
    naturopathy: {
      title: 'Naturopathie',
      subtitle: 'Bilan de vitalité et conseils personnalisés',
      description: 'Un accompagnement complet pour retrouver votre équilibre naturel grâce à un bilan de vitalité personnalisé.',
      benefits: [
        'Bilan de vitalité complet',
        'Conseils alimentaires personnalisés',
        'Recommandations en hygiène de vie',
        'Suivi de votre évolution'
      ],
      price1: { type: 'Première consultation', duration: '1h30', price: '70€' },
      price2: { type: 'Séances suivantes', duration: '1h', price: '50€' }
    },
    massage: {
      title: 'Massage assis',
      subtitle: 'Détente immédiate sans se déshabiller',
      description: 'Un massage relaxant pratiqué habillé, ciblé sur les zones de tensions du dos, nuque et épaules.',
      benefits: [
        'Réduction du stress et des tensions',
        'Amélioration du sommeil',
        'Stimulation de la circulation',
        'Boost d\'énergie immédiat'
      ],
      price1: { type: 'Séance complète', duration: '30 min', price: '30€' }
    },
    ...content
  };

  const updateField = (path, value) => {
    // Helper simple pour mettre à jour un objet imbriqué
    // Pour simplifier ici on va faire du spread manuel ou utiliser une lib comme lodash/set
    // Mais comme la structure est connue, on peut faire des helpers spécifiques
    // Pour l'instant, je simplifie en supposant que content contient tout
    
    // Note: Une implémentation robuste de deep merge serait nécessaire ici
    // Je vais faire simple : on met à jour tout l'objet data modifié
    const newData = JSON.parse(JSON.stringify(data));
    
    // Path parsing "naturopathy.title" -> newData['naturopathy']['title']
    const parts = path.split('.');
    let current = newData;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    
    onUpdate(newData);
  };

  return (
    <div className="py-20 relative overflow-hidden bg-stone-25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left relative"
          >
            <h1 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6 tracking-wide">
              <EditableText 
                value={data.header.titlePrefix} 
                onChange={(v) => updateField('header.titlePrefix', v)} 
                element="span" 
              />
              {' '}
              <EditableText 
                value={data.header.title} 
                onChange={(v) => updateField('header.title', v)} 
                element="span" 
                className="text-[#95a58d]" 
              />
            </h1>
            <EditableText
              value={data.header.subtitle}
              onChange={(v) => updateField('header.subtitle', v)}
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
                src={data.header.imageUrl}
                alt="Séance de naturopathie"
                onChange={(v) => updateField('header.imageUrl', v)}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Services List */}
        <div className="space-y-8">
          {/* Naturopathie */}
          <div className="bg-gradient-to-br from-green-25 to-stone-25 rounded-2xl p-8 lg:p-10 border border-stone-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 flex items-center justify-center bg-white rounded-xl shadow-sm border border-stone-100">
                    <SafeIcon icon={FiLeaf} className="text-[#95a58d] text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-medium text-stone-800 tracking-wide">
                      <EditableText value={data.naturopathy.title} onChange={(v) => updateField('naturopathy.title', v)} />
                    </h2>
                    <EditableText
                      value={data.naturopathy.subtitle}
                      onChange={(v) => updateField('naturopathy.subtitle', v)}
                      element="p"
                      className="text-base text-stone-600 font-light"
                    />
                  </div>
                </div>

                <EditableText
                  value={data.naturopathy.description}
                  onChange={(v) => updateField('naturopathy.description', v)}
                  element="p"
                  className="text-base text-stone-700 leading-relaxed font-light"
                />

                <div>
                  <h3 className="text-lg font-medium text-stone-800 mb-4">Bienfaits :</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.naturopathy.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-[#95a58d] rounded-full"></div>
                        <span className="text-stone-700 font-light text-sm">
                          <EditableText 
                            value={benefit} 
                            onChange={(v) => {
                              const newBenefits = [...data.naturopathy.benefits];
                              newBenefits[idx] = v;
                              updateField('naturopathy.benefits', newBenefits);
                            }} 
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Tarifs Naturopathie */}
              <div className="bg-white/80 rounded-xl p-6 space-y-4 relative border border-stone-100">
                 <h3 className="text-lg font-medium text-stone-800 flex items-center space-x-2">
                  <SafeIcon icon={FiEuro} className="text-[#95a58d]" />
                  <span>Tarifs</span>
                </h3>
                <div className="border-b border-stone-200 pb-3">
                   <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-stone-800 text-sm">
                        <EditableText value={data.naturopathy.price1.type} onChange={(v) => updateField('naturopathy.price1.type', v)} />
                      </p>
                       <p className="text-xs text-stone-500 flex items-center space-x-1 font-light">
                        <SafeIcon icon={FiClock} className="text-xs" />
                        <span>
                          <EditableText value={data.naturopathy.price1.duration} onChange={(v) => updateField('naturopathy.price1.duration', v)} element="span"/>
                        </span>
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-[#95a58d]">
                      <EditableText value={data.naturopathy.price1.price} onChange={(v) => updateField('naturopathy.price1.price', v)} />
                    </p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Massage */}
          <div className="bg-gradient-to-br from-stone-25 to-green-25 rounded-2xl p-8 lg:p-10 border border-stone-100">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 flex items-center justify-center bg-white rounded-xl shadow-sm border border-stone-100">
                    <SafeIcon icon={FiHeart} className="text-[#95a58d] text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-medium text-stone-800 tracking-wide">
                      <EditableText value={data.massage.title} onChange={(v) => updateField('massage.title', v)} />
                    </h2>
                    <EditableText
                      value={data.massage.subtitle}
                      onChange={(v) => updateField('massage.subtitle', v)}
                      element="p"
                      className="text-base text-stone-600 font-light"
                    />
                  </div>
                </div>

                <EditableText
                  value={data.massage.description}
                  onChange={(v) => updateField('massage.description', v)}
                  element="p"
                  className="text-base text-stone-700 leading-relaxed font-light"
                />

                 <div>
                  <h3 className="text-lg font-medium text-stone-800 mb-4">Bienfaits :</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.massage.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-[#95a58d] rounded-full"></div>
                        <span className="text-stone-700 font-light text-sm">
                          <EditableText 
                            value={benefit} 
                            onChange={(v) => {
                              const newBenefits = [...data.massage.benefits];
                              newBenefits[idx] = v;
                              updateField('massage.benefits', newBenefits);
                            }} 
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesListSection;
