import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from './CMSContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiImage, FiUpload, FiX, FiCheck, FiLink } = FiIcons;

const EditableImage = ({
  id,
  defaultSrc = '',
  alt = '',
  className = '',
  children
}) => {
  const { isEditMode, getContent, updateContent } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const content = getContent(id, defaultSrc);
    setImageSrc(content);
  }, [id, defaultSrc, getContent]);

  const handleClick = (e) => {
    if (isEditMode) {
      e.preventDefault();
      e.stopPropagation();
      setIsEditing(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("L'image est trop grande. Taille maximale : 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (previewSrc) {
      updateContent(id, previewSrc);
      setImageSrc(previewSrc);
      setPreviewSrc('');
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPreviewSrc('');
    setIsEditing(false);
  };

  const handleUrlInput = () => {
    const url = prompt("Entrez l'URL de l'image :");
    if (url) {
      setPreviewSrc(url);
    }
  };

  if (isEditing) {
    return (
      <div className="relative w-full">
        <div className="border-2 border-dashed border-[#95a58d] rounded-lg p-8 bg-stone-50">
          {previewSrc ? (
            <div className="relative">
              <img
                src={previewSrc}
                alt="Aperçu"
                className={`${className} max-h-96 mx-auto rounded-lg`}
              />
              <button
                onClick={() => setPreviewSrc('')}
                className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700"
              >
                <SafeIcon icon={FiX} />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <SafeIcon icon={FiImage} className="text-stone-400 text-6xl mx-auto mb-4" />
              <p className="text-stone-600 mb-4">Choisissez une nouvelle image</p>
              <div className="space-y-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center space-x-2 bg-[#95a58d] text-white px-4 py-3 rounded-lg hover:bg-[#7a8471] transition-colors"
                >
                  <SafeIcon icon={FiUpload} />
                  <span>Télécharger depuis l'ordinateur</span>
                </button>
                <button
                  onClick={handleUrlInput}
                  className="w-full flex items-center justify-center space-x-2 border border-[#95a58d] text-[#95a58d] px-4 py-3 rounded-lg hover:bg-[#95a58d] hover:text-white transition-colors"
                >
                  <SafeIcon icon={FiLink} />
                  <span>Utiliser une URL</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <button
            onClick={handleSave}
            disabled={!previewSrc}
            className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SafeIcon icon={FiCheck} />
            <span>Enregistrer</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <SafeIcon icon={FiX} />
            <span>Annuler</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block ${isEditMode ? 'cursor-pointer' : ''}`}
    >
      <div
        className={`${
          isEditMode
            ? 'hover:outline hover:outline-2 hover:outline-[#95a58d] rounded transition-all'
            : ''
        }`}
      >
        {children || (
          <img
            src={imageSrc || defaultSrc}
            alt={alt}
            className={className}
          />
        )}
      </div>

      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-2 right-2 bg-[#95a58d] text-white px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg"
          >
            <SafeIcon icon={FiImage} className="text-xs" />
            <span className="text-xs font-medium">Modifier</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditableImage;