import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from './CMSContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiTrash2, FiType, FiImage, FiAlignLeft, FiGrid, FiX, FiChevronUp, FiChevronDown, FiMove } = FiIcons;

const SECTION_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  TEXT_IMAGE: 'text-image',
  IMAGE_TEXT: 'image-text',
  TWO_COLUMNS: 'two-columns'
};

const SectionManager = ({ pageId }) => {
  const { isEditMode, getContent, updateContent } = useCMS();
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [insertPosition, setInsertPosition] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const sections = getContent(`${pageId}.sections`, []);

  const addSection = (type, position = null) => {
    const newSection = {
      id: `section-${Date.now()}`,
      type,
      content: getDefaultContent(type)
    };

    let newSections;
    if (position !== null) {
      newSections = [...sections];
      newSections.splice(position, 0, newSection);
    } else {
      newSections = [...sections, newSection];
    }

    updateContent(`${pageId}.sections`, newSections);
    setShowAddMenu(false);
    setInsertPosition(null);
  };

  const deleteSection = (sectionId) => {
    if (confirm('Voulez-vous vraiment supprimer cette section ?')) {
      const newSections = sections.filter(s => s.id !== sectionId);
      updateContent(`${pageId}.sections`, newSections);
    }
  };

  const moveSection = (fromIndex, direction) => {
    const newSections = [...sections];
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;

    if (toIndex < 0 || toIndex >= newSections.length) return;

    [newSections[fromIndex], newSections[toIndex]] = [newSections[toIndex], newSections[fromIndex]];
    updateContent(`${pageId}.sections`, newSections);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newSections = [...sections];
    const draggedSection = newSections[draggedIndex];
    
    newSections.splice(draggedIndex, 1);
    newSections.splice(dropIndex, 0, draggedSection);

    updateContent(`${pageId}.sections`, newSections);
    setDraggedIndex(null);
  };

  const updateSectionContent = (sectionId, field, value) => {
    const newSections = sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          content: {
            ...s.content,
            [field]: value
          }
        };
      }
      return s;
    });
    updateContent(`${pageId}.sections`, newSections);
  };

  if (!isEditMode) {
    return (
      <div className="space-y-8">
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bouton pour ajouter en première position */}
      <div className="relative">
        <button
          onClick={() => {
            setInsertPosition(0);
            setShowAddMenu(true);
          }}
          className="w-full border-2 border-dashed border-[#95a58d] rounded-xl p-4 hover:bg-green-50 transition-all group"
        >
          <div className="flex items-center justify-center space-x-2 text-[#95a58d]">
            <SafeIcon icon={FiPlus} className="text-xl" />
            <span className="font-medium text-sm">Ajouter une section au début</span>
          </div>
        </button>

        {showAddMenu && insertPosition === 0 && (
          <AddSectionMenu
            onSelect={(type) => addSection(type, 0)}
            onClose={() => {
              setShowAddMenu(false);
              setInsertPosition(null);
            }}
          />
        )}
      </div>

      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={`relative border-2 rounded-xl p-6 transition-all bg-white cursor-move ${
              draggedIndex === index 
                ? 'border-blue-500 shadow-2xl scale-105' 
                : 'border-stone-300 hover:border-[#95a58d] border-dashed'
            }`}
          >
            {/* Indicateur de drag */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-stone-600 text-white px-4 py-1 rounded-full flex items-center space-x-2 cursor-move z-20">
              <SafeIcon icon={FiMove} className="text-sm" />
              <span className="text-xs font-medium">Glisser pour déplacer</span>
            </div>

            {/* Section Controls */}
            <div className="absolute top-2 right-2 flex items-center space-x-2 z-10">
              {/* Boutons de déplacement */}
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => moveSection(index, 'up')}
                  disabled={index === 0}
                  className={`p-1 bg-stone-700 text-white rounded hover:bg-stone-800 transition-colors ${
                    index === 0 ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                  title="Déplacer vers le haut"
                >
                  <SafeIcon icon={FiChevronUp} className="text-sm" />
                </button>
                <button
                  onClick={() => moveSection(index, 'down')}
                  disabled={index === sections.length - 1}
                  className={`p-1 bg-stone-700 text-white rounded hover:bg-stone-800 transition-colors ${
                    index === sections.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                  title="Déplacer vers le bas"
                >
                  <SafeIcon icon={FiChevronDown} className="text-sm" />
                </button>
              </div>

              <button
                onClick={() => deleteSection(section.id)}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                title="Supprimer"
              >
                <SafeIcon icon={FiTrash2} className="text-sm" />
              </button>
            </div>

            {/* Position indicator */}
            <div className="absolute top-2 left-2 bg-[#95a58d] text-white px-3 py-1 rounded-full text-xs font-medium">
              Position {index + 1}
            </div>

            {/* Section Editor */}
            <div className="pt-12">
              <SectionEditor
                section={section}
                onUpdate={(field, value) => updateSectionContent(section.id, field, value)}
              />
            </div>

            {/* Drop zone indicator */}
            {draggedIndex !== null && draggedIndex !== index && (
              <div className="absolute inset-0 border-4 border-dashed border-blue-400 bg-blue-50 bg-opacity-20 rounded-xl pointer-events-none z-30 flex items-center justify-center">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
                  Déposer ici
                </div>
              </div>
            )}
          </motion.div>

          {/* Bouton pour ajouter après cette section */}
          <div className="relative">
            <button
              onClick={() => {
                setInsertPosition(index + 1);
                setShowAddMenu(true);
              }}
              className="w-full border-2 border-dashed border-stone-300 rounded-xl p-3 hover:border-[#95a58d] hover:bg-green-50 transition-all group"
            >
              <div className="flex items-center justify-center space-x-2 text-stone-400 group-hover:text-[#95a58d]">
                <SafeIcon icon={FiPlus} className="text-lg" />
                <span className="font-medium text-xs">Insérer une section ici</span>
              </div>
            </button>

            {showAddMenu && insertPosition === index + 1 && (
              <AddSectionMenu
                onSelect={(type) => addSection(type, index + 1)}
                onClose={() => {
                  setShowAddMenu(false);
                  setInsertPosition(null);
                }}
              />
            )}
          </div>
        </React.Fragment>
      ))}

      {/* Bouton pour ajouter à la fin (si aucune section) */}
      {sections.length === 0 && (
        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="w-full border-2 border-dashed border-[#95a58d] rounded-xl p-6 hover:bg-green-50 transition-all group"
          >
            <div className="flex items-center justify-center space-x-2 text-[#95a58d]">
              <SafeIcon icon={FiPlus} className="text-2xl" />
              <span className="font-medium">Ajouter une première section</span>
            </div>
          </button>

          {showAddMenu && (
            <AddSectionMenu
              onSelect={(type) => addSection(type)}
              onClose={() => setShowAddMenu(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

const AddSectionMenu = ({ onSelect, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-stone-200 p-4 z-20"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-medium text-stone-800">Choisir un type de section</h3>
      <button
        onClick={onClose}
        className="p-1 hover:bg-stone-100 rounded"
      >
        <SafeIcon icon={FiX} />
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <SectionTypeCard
        icon={FiType}
        title="Texte seul"
        description="Paragraphe de texte"
        onClick={() => onSelect(SECTION_TYPES.TEXT)}
      />
      <SectionTypeCard
        icon={FiImage}
        title="Image seule"
        description="Image pleine largeur"
        onClick={() => onSelect(SECTION_TYPES.IMAGE)}
      />
      <SectionTypeCard
        icon={FiAlignLeft}
        title="Texte + Image"
        description="Texte à gauche, image à droite"
        onClick={() => onSelect(SECTION_TYPES.TEXT_IMAGE)}
      />
      <SectionTypeCard
        icon={FiAlignLeft}
        title="Image + Texte"
        description="Image à gauche, texte à droite"
        onClick={() => onSelect(SECTION_TYPES.IMAGE_TEXT)}
      />
      <SectionTypeCard
        icon={FiGrid}
        title="Deux colonnes"
        description="Deux blocs de texte côte à côte"
        onClick={() => onSelect(SECTION_TYPES.TWO_COLUMNS)}
        className="sm:col-span-2"
      />
    </div>
  </motion.div>
);

const SectionTypeCard = ({ icon, title, description, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`p-4 border border-stone-200 rounded-lg hover:border-[#95a58d] hover:bg-green-50 transition-all text-left group ${className}`}
  >
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 bg-[#95a58d] text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
        <SafeIcon icon={icon} />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-stone-800 mb-1">{title}</h4>
        <p className="text-xs text-stone-600">{description}</p>
      </div>
    </div>
  </button>
);

const SectionEditor = ({ section, onUpdate }) => {
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const startEdit = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue || '');
  };

  const saveEdit = (field) => {
    onUpdate(field, tempValue);
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleImageUpload = (field, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdate(field, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderField = (field, label, multiline = false) => {
    const value = section.content[field] || '';

    if (editingField === field) {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">{label}</label>
          {multiline ? (
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full px-4 py-3 border border-[#95a58d] rounded-lg focus:ring-2 focus:ring-[#95a58d] resize-none"
              rows={6}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full px-4 py-3 border border-[#95a58d] rounded-lg focus:ring-2 focus:ring-[#95a58d]"
              autoFocus
            />
          )}
          <div className="flex space-x-2">
            <button
              onClick={() => saveEdit(field)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
            >
              Enregistrer
            </button>
            <button
              onClick={cancelEdit}
              className="px-4 py-2 bg-stone-300 text-stone-700 rounded-lg hover:bg-stone-400 text-sm"
            >
              Annuler
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        onClick={() => startEdit(field, value)}
        className="cursor-pointer p-4 border border-stone-200 rounded-lg hover:border-[#95a58d] hover:bg-green-50 transition-all"
      >
        <p className="text-xs text-stone-500 mb-1">{label}</p>
        <p className="text-stone-700 whitespace-pre-wrap">
          {value || `Cliquer pour ajouter ${label.toLowerCase()}`}
        </p>
      </div>
    );
  };

  const renderImageField = (field, label) => {
    const value = section.content[field] || '';

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-stone-700">{label}</label>
        {value ? (
          <div className="relative">
            <img
              src={value}
              alt={label}
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={() => onUpdate(field, '')}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <SafeIcon icon={FiTrash2} className="text-sm" />
            </button>
          </div>
        ) : (
          <label className="block w-full p-8 border-2 border-dashed border-stone-300 rounded-lg hover:border-[#95a58d] cursor-pointer text-center">
            <SafeIcon icon={FiImage} className="text-4xl text-stone-400 mx-auto mb-2" />
            <span className="text-sm text-stone-600">Cliquer pour ajouter une image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(field, e)}
              className="hidden"
            />
          </label>
        )}
      </div>
    );
  };

  switch (section.type) {
    case SECTION_TYPES.TEXT:
      return (
        <div className="space-y-4">
          <div className="text-sm font-medium text-[#95a58d] mb-4">Section Texte</div>
          {renderField('title', 'Titre (optionnel)')}
          {renderField('content', 'Contenu', true)}
        </div>
      );

    case SECTION_TYPES.IMAGE:
      return (
        <div className="space-y-4">
          <div className="text-sm font-medium text-[#95a58d] mb-4">Section Image</div>
          {renderImageField('image', 'Image')}
          {renderField('caption', 'Légende (optionnel)')}
        </div>
      );

    case SECTION_TYPES.TEXT_IMAGE:
      return (
        <div className="space-y-4">
          <div className="text-sm font-medium text-[#95a58d] mb-4">Section Texte + Image</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              {renderField('title', 'Titre')}
              {renderField('content', 'Contenu', true)}
            </div>
            <div>
              {renderImageField('image', 'Image')}
            </div>
          </div>
        </div>
      );

    case SECTION_TYPES.IMAGE_TEXT:
      return (
        <div className="space-y-4">
          <div className="text-sm font-medium text-[#95a58d] mb-4">Section Image + Texte</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              {renderImageField('image', 'Image')}
            </div>
            <div className="space-y-4">
              {renderField('title', 'Titre')}
              {renderField('content', 'Contenu', true)}
            </div>
          </div>
        </div>
      );

    case SECTION_TYPES.TWO_COLUMNS:
      return (
        <div className="space-y-4">
          <div className="text-sm font-medium text-[#95a58d] mb-4">Section Deux Colonnes</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              {renderField('title1', 'Titre colonne 1')}
              {renderField('content1', 'Contenu colonne 1', true)}
            </div>
            <div className="space-y-4">
              {renderField('title2', 'Titre colonne 2')}
              {renderField('content2', 'Contenu colonne 2', true)}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

const SectionRenderer = ({ section }) => {
  const { content } = section;

  switch (section.type) {
    case SECTION_TYPES.TEXT:
      return (
        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-stone-100">
          {content.title && (
            <h2 className="text-2xl font-medium text-stone-800 mb-4">{content.title}</h2>
          )}
          <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
            {content.content}
          </p>
        </div>
      );

    case SECTION_TYPES.IMAGE:
      return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100">
          {content.image && (
            <img
              src={content.image}
              alt={content.caption || 'Image'}
              className="w-full h-auto"
            />
          )}
          {content.caption && (
            <p className="text-sm text-stone-600 p-4 text-center italic">
              {content.caption}
            </p>
          )}
        </div>
      );

    case SECTION_TYPES.TEXT_IMAGE:
      return (
        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              {content.title && (
                <h2 className="text-2xl font-medium text-stone-800 mb-4">{content.title}</h2>
              )}
              <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                {content.content}
              </p>
            </div>
            {content.image && (
              <img
                src={content.image}
                alt={content.title || 'Image'}
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
        </div>
      );

    case SECTION_TYPES.IMAGE_TEXT:
      return (
        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {content.image && (
              <img
                src={content.image}
                alt={content.title || 'Image'}
                className="w-full h-auto rounded-lg"
              />
            )}
            <div>
              {content.title && (
                <h2 className="text-2xl font-medium text-stone-800 mb-4">{content.title}</h2>
              )}
              <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                {content.content}
              </p>
            </div>
          </div>
        </div>
      );

    case SECTION_TYPES.TWO_COLUMNS:
      return (
        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {content.title1 && (
                <h3 className="text-xl font-medium text-stone-800 mb-4">{content.title1}</h3>
              )}
              <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                {content.content1}
              </p>
            </div>
            <div>
              {content.title2 && (
                <h3 className="text-xl font-medium text-stone-800 mb-4">{content.title2}</h3>
              )}
              <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                {content.content2}
              </p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

const getDefaultContent = (type) => {
  switch (type) {
    case SECTION_TYPES.TEXT:
      return { title: '', content: '' };
    case SECTION_TYPES.IMAGE:
      return { image: '', caption: '' };
    case SECTION_TYPES.TEXT_IMAGE:
      return { title: '', content: '', image: '' };
    case SECTION_TYPES.IMAGE_TEXT:
      return { title: '', content: '', image: '' };
    case SECTION_TYPES.TWO_COLUMNS:
      return { title1: '', content1: '', title2: '', content2: '' };
    default:
      return {};
  }
};

export default SectionManager;