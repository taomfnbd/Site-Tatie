import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from './CMSContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEdit2, FiCheck, FiX } = FiIcons;

const EditableText = ({
  id,
  defaultValue = '',
  as: Component = 'p',
  className = '',
  multiline = false,
  placeholder = 'Cliquez pour modifier...',
  children
}) => {
  const { isEditMode, getContent, updateContent } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [originalValue, setOriginalValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const content = getContent(id, children || defaultValue);
    setValue(content);
    setOriginalValue(content);
  }, [id, children, defaultValue, getContent]);

  const handleClick = (e) => {
    if (isEditMode && !isEditing) {
      e.preventDefault();
      e.stopPropagation();
      setIsEditing(true);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (multiline) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
      }
    }
  }, [isEditing, multiline]);

  const handleSave = () => {
    updateContent(id, value);
    setOriginalValue(value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(originalValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (multiline && inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  };

  if (isEditing) {
    return (
      <div className="relative w-full my-2">
        {multiline ? (
          <textarea
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`${className} w-full border-2 border-[#95a58d] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#95a58d] resize-none bg-white`}
            placeholder={placeholder}
            rows={3}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`${className} w-full border-2 border-[#95a58d] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#95a58d] bg-white`}
            placeholder={placeholder}
          />
        )}
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700 transition-colors"
          >
            <SafeIcon icon={FiCheck} className="text-xs" />
            <span>Enregistrer</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition-colors"
          >
            <SafeIcon icon={FiX} className="text-xs" />
            <span>Annuler</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block ${
        isEditMode ? 'cursor-pointer' : ''
      } ${
        isEditMode
          ? 'hover:bg-[#95a58d]/10 hover:outline hover:outline-2 hover:outline-[#95a58d]/50 rounded transition-all'
          : ''
      }`}
    >
      <Component className={className}>
        {value || placeholder}
      </Component>

      <AnimatePresence>
        {isEditMode && !isEditing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-2 -right-2 bg-[#95a58d] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg pointer-events-none"
          >
            <SafeIcon icon={FiEdit2} className="text-xs" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditableText;