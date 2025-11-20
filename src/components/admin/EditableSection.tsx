// =====================================================
// WRAPPER POUR SECTIONS ÉDITABLES (comme Webflow)
// Ajoute overlay avec contrôles au survol
// =====================================================
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditMode } from '../../contexts/EditModeContext';

interface EditableSectionProps {
  children: React.ReactNode;
  sectionIndex: number;
  sectionType: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
}

export const EditableSection: React.FC<EditableSectionProps> = ({
  children,
  sectionIndex,
  sectionType,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onDelete,
  onDuplicate,
}) => {
  const { isEditMode } = useEditMode();
  const [isHovered, setIsHovered] = useState(false);

  // Si pas en mode édition, afficher juste le contenu
  if (!isEditMode) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay au survol */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Bordure */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 pointer-events-none z-[100] ring-2 ring-[#95a58d] ring-inset"
            />

            {/* Badge type de section */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute top-2 left-2 z-[101] bg-[#95a58d] text-white px-3 py-1 rounded-md text-xs font-medium shadow-lg"
            >
              {sectionType}
            </motion.div>

            {/* Boutons de contrôle */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute top-2 right-2 z-[101] flex gap-1"
            >
              {/* Déplacer vers le haut */}
              {canMoveUp && (
                <button
                  onClick={onMoveUp}
                  className="w-8 h-8 bg-white hover:bg-stone-100 text-stone-700 rounded shadow-lg transition-all flex items-center justify-center border border-stone-200"
                  title="Déplacer vers le haut"
                >
                  <span className="text-sm font-bold">↑</span>
                </button>
              )}

              {/* Déplacer vers le bas */}
              {canMoveDown && (
                <button
                  onClick={onMoveDown}
                  className="w-8 h-8 bg-white hover:bg-stone-100 text-stone-700 rounded shadow-lg transition-all flex items-center justify-center border border-stone-200"
                  title="Déplacer vers le bas"
                >
                  <span className="text-sm font-bold">↓</span>
                </button>
              )}

              {/* Dupliquer */}
              {onDuplicate && (
                <button
                  onClick={onDuplicate}
                  className="w-8 h-8 bg-white hover:bg-stone-100 text-stone-700 rounded shadow-lg transition-all flex items-center justify-center border border-stone-200"
                  title="Dupliquer cette section"
                >
                  <span className="text-sm">📋</span>
                </button>
              )}

              {/* Supprimer */}
              <button
                onClick={() => {
                  if (window.confirm('Voulez-vous vraiment supprimer cette section ?')) {
                    onDelete();
                  }
                }}
                className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded shadow-lg transition-all flex items-center justify-center"
                title="Supprimer cette section"
              >
                <span className="text-sm">🗑️</span>
              </button>
            </motion.div>

            {/* Indicateur de position */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-2 left-2 z-[101] bg-stone-800/80 text-white px-2 py-1 rounded text-xs font-medium"
            >
              Section #{sectionIndex + 1}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contenu de la section */}
      {children}
    </div>
  );
};

export default EditableSection;
