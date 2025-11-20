// =====================================================
// VISUAL EDITOR - Wrapper simple pour le CMS
// L'édition réelle se fait via EditableText, EditableImage, EditableSection
// =====================================================
import React from 'react';

const VisualEditor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Simple wrapper - l'édition se fait via les composants Editable*
  return <>{children}</>;
};

export default VisualEditor;
