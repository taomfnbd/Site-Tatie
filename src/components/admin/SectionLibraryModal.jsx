// =====================================================
// MODAL BIBLIOTHÈQUE DE SECTIONS
// Pour choisir quel type de section ajouter
// =====================================================
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const availableSections = [
  {
    type: 'hero',
    label: 'Hero',
    description: 'Section d\'en-tête avec titre, sous-titre et appel à l\'action',
    icon: '🎯',
  },
  {
    type: 'about',
    label: 'À propos',
    description: 'Section avec texte et image pour présenter du contenu',
    icon: '📝',
  },
  {
    type: 'cta',
    label: 'Appel à l\'action',
    description: 'Section pour inciter à prendre rendez-vous',
    icon: '📞',
  },
  {
    type: 'services_list',
    label: 'Liste Complète Prestations',
    description: 'Tous les services groupés (Naturopathie, Massage)',
    icon: '📋',
  },
  {
    type: 'services_header',
    label: 'En-tête Prestations',
    description: 'Titre et introduction de la page prestations',
    icon: '🏷️',
  },
  {
    type: 'service_card',
    label: 'Bloc Service',
    description: 'Un service individuel avec détails et tarifs (ex: Réflexologie)',
    icon: '💆‍♀️',
  },
  {
    type: 'service_hero',
    label: 'Hero Service',
    description: 'En-tête de page de service (Titre + Image)',
    icon: '🖼️',
  },
  {
    type: 'service_content',
    label: 'Contenu Service',
    description: 'Bloc de texte riche pour décrire un service',
    icon: '📝',
  },
  {
    type: 'service_process',
    label: 'Déroulement (Liste)',
    description: 'Étapes de la séance avec description (Liste verticale)',
    icon: '🔢',
  },
  {
    type: 'service_process_cards',
    label: 'Déroulement (Cartes)',
    description: 'Étapes de la séance en cartes centrées (Style Massage)',
    icon: '🎴',
  },
  {
    type: 'service_benefits',
    label: 'Bienfaits',
    description: 'Liste des bienfaits avec icônes',
    icon: '✨',
  },
  {
    type: 'service_cta',
    label: 'Appel à l\'action Service',
    description: 'Bloc de fin de page avec prix et bouton réservation',
    icon: '🔔',
  },
  {
    type: 'contact_hero',
    label: 'En-tête Contact',
    description: 'Titre de la page contact',
    icon: '👋',
  },
  {
    type: 'contact_details',
    label: 'Infos Contact',
    description: 'Coordonnées, Horaires, Carte, Réseaux',
    icon: '📍',
  },
];

const SectionLibraryModal = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#95a58d] text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-light">Ajouter une section</h2>
                <p className="text-green-100 text-sm mt-1">
                  Choisissez le type de section à ajouter
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 hover:bg-white/20 rounded-full transition-all flex items-center justify-center"
              >
                <span className="text-xl">×</span>
              </button>
            </div>
          </div>

          {/* Liste des sections */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableSections.map((section) => (
                <button
                  key={section.type}
                  onClick={() => {
                    onSelect(section.type);
                    onClose();
                  }}
                  className="group relative bg-white border-2 border-stone-200 hover:border-[#95a58d] rounded-xl p-6 text-left transition-all hover:shadow-lg"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-stone-100 group-hover:bg-[#95a58d]/10 rounded-lg flex items-center justify-center mb-4 transition-all">
                    <span className="text-2xl">{section.icon}</span>
                  </div>

                  {/* Titre */}
                  <h3 className="text-lg font-medium text-stone-800 mb-2">
                    {section.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-stone-600">
                    {section.description}
                  </p>

                  {/* Indicateur hover */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 bg-[#95a58d] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">+</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-stone-200 p-4 bg-stone-50">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-all"
              >
                Annuler
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SectionLibraryModal;
