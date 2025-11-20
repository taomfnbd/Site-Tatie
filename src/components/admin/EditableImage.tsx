import React, { useState } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';
import ImageUploadModal from './ImageUploadModal';

interface EditableImageProps {
  src: string;
  alt: string;
  onChange: (src: string, alt?: string) => void;
  className?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onChange,
  className = '',
}) => {
  const { isEditMode } = useEditMode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (isEditMode) {
      setIsModalOpen(true);
    }
  };

  const handleSave = (newSrc: string, newAlt: string) => {
    onChange(newSrc, newAlt); // Note: Il faudrait que le composant parent gère le changement d'alt aussi
  };

  return (
    <>
      <div className={`relative group ${className.includes('h-full') ? 'h-full' : ''} ${className.includes('w-full') ? 'w-full' : ''}`}>
        <img
          src={src}
          alt={alt}
          className={`${className} ${isEditMode ? 'cursor-pointer' : ''}`}
          onClick={handleClick}
          loading="lazy"
        />
        
        {isEditMode && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 pointer-events-none">
            <div className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-auto cursor-pointer" onClick={handleClick}>
              📷 Modifier
            </div>
          </div>
        )}
      </div>

      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentSrc={src}
        currentAlt={alt}
        onSave={handleSave}
      />
    </>
  );
};

export default EditableImage;
