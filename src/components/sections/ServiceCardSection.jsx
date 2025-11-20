import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import EditableText from '../admin/EditableText';
import * as FiIcons from 'react-icons/fi';

const { FiLeaf, FiHeart, FiClock, FiEuro, FiStar } = FiIcons;

// Mapping pour choisir l'icône
const ICONS = {
  'leaf': FiLeaf,
  'heart': FiHeart,
  'star': FiStar,
};

const ServiceCardSection = ({ content, onUpdate }) => {
  const data = {
    iconType: 'leaf', // 'leaf' | 'heart' | 'star'
    gradient: 'from-green-25 to-stone-25', // ou 'from-stone-25 to-green-25'
    title: 'Naturopathie',
    subtitle: 'Bilan de vitalité et conseils personnalisés',
    description: 'Un accompagnement complet pour retrouver votre équilibre naturel grâce à un bilan de vitalité personnalisé.',
    benefits: [
      'Bilan de vitalité complet',
      'Conseils alimentaires personnalisés',
      'Recommandations en hygiène de vie',
      'Suivi de votre évolution'
    ],
    prices: [
      { type: 'Première consultation', duration: '1h30', price: '70€' },
      { type: 'Séances suivantes', duration: '1h', price: '50€' }
    ],
    linkUrl: '/naturopathie',
    linkText: 'En savoir plus',
    ...content
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const IconComponent = ICONS[data.iconType] || FiLeaf;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`bg-gradient-to-br ${data.gradient} rounded-2xl p-8 lg:p-10 hover:shadow-lg transition-all duration-300 relative overflow-hidden border border-stone-100`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 flex items-center justify-center bg-white rounded-xl shadow-sm border border-stone-100">
                <SafeIcon icon={IconComponent} className="text-[#95a58d] text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-stone-800 tracking-wide">
                  <EditableText value={data.title} onChange={(v) => updateField('title', v)} />
                </h2>
                <EditableText
                  value={data.subtitle}
                  onChange={(v) => updateField('subtitle', v)}
                  element="p"
                  className="text-base text-stone-600 font-light"
                />
              </div>
            </div>

            <EditableText
              value={data.description}
              onChange={(v) => updateField('description', v)}
              element="p"
              className="text-base text-stone-700 leading-relaxed font-light"
            />

            <div>
              <h3 className="text-lg font-medium text-stone-800 mb-4">Bienfaits :</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-[#95a58d] rounded-full"></div>
                    <span className="text-stone-700 font-light text-sm">
                      <EditableText 
                        value={benefit} 
                        onChange={(v) => {
                          const newBenefits = [...data.benefits];
                          newBenefits[idx] = v;
                          updateField('benefits', newBenefits);
                        }} 
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
               {/* Lien éditable ou fixe ? Pour l'instant simple bouton */}
               <Link
                to={data.linkUrl}
                className="inline-flex items-center space-x-2 bg-[#95a58d] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#7a8471] transition-colors duration-200 text-sm"
              >
                <EditableText 
                  value={data.linkText} 
                  onChange={(v) => updateField('linkText', v)} 
                  element="span"
                />
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white/80 rounded-xl p-6 space-y-4 relative border border-stone-100">
            <h3 className="text-lg font-medium text-stone-800 flex items-center space-x-2">
              <SafeIcon icon={FiEuro} className="text-[#95a58d]" />
              <span>Tarifs</span>
            </h3>

            {data.prices.map((price, idx) => (
              <div key={idx} className="border-b border-stone-200 pb-3 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-stone-800 text-sm">
                      <EditableText 
                        value={price.type} 
                        onChange={(v) => {
                          const newPrices = [...data.prices];
                          newPrices[idx] = { ...newPrices[idx], type: v };
                          updateField('prices', newPrices);
                        }} 
                      />
                    </p>
                    <p className="text-xs text-stone-500 flex items-center space-x-1 font-light">
                      <SafeIcon icon={FiClock} className="text-xs" />
                      <span>
                        <EditableText 
                          value={price.duration} 
                          onChange={(v) => {
                            const newPrices = [...data.prices];
                            newPrices[idx] = { ...newPrices[idx], duration: v };
                            updateField('prices', newPrices);
                          }} 
                          element="span"
                        />
                      </span>
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-[#95a58d]">
                    <EditableText 
                      value={price.price} 
                      onChange={(v) => {
                        const newPrices = [...data.prices];
                        newPrices[idx] = { ...newPrices[idx], price: v };
                        updateField('prices', newPrices);
                      }} 
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceCardSection;
