// =====================================================
// BOUTON FLOTTANT POUR AJOUTER UNE SECTION
// =====================================================
import React from 'react';
import { motion } from 'framer-motion';
import { useEditMode } from '../../contexts/EditModeContext';

interface AddSectionButtonProps {
  onClick: () => void;
}

export const AddSectionButton: React.FC<AddSectionButtonProps> = ({ onClick }) => {
  const { isEditMode } = useEditMode();

  console.log('[AddSectionButton] isEditMode:', isEditMode);

  if (!isEditMode) return null;

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 z-[9998] w-14 h-14 bg-[#95a58d] hover:bg-[#7a8471] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
      title="Ajouter une section"
    >
      <span className="text-2xl font-light">+</span>
    </motion.button>
  );
};

export default AddSectionButton;
