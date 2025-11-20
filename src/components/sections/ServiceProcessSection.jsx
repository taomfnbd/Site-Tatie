import React from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';
import SafeIcon from '../../common/SafeIcon';
import { useEditMode } from '../../contexts/EditModeContext';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiEuro } = FiIcons;

const ServiceProcessSection = ({ content, onUpdate }) => {
  const { isEditMode } = useEditMode();
  
  const data = {
    title: 'Déroulement de la séance',
    steps: [
      {
        title: 'Étape 1',
        description: 'Description de l\'étape 1.',
        price: '70€',
        duration: '1h30'
      },
      {
        title: 'Étape 2',
        description: 'Description de l\'étape 2.',
        price: '50€',
        duration: '1h'
      }
    ],
    ...content
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const updateStep = (index, field, value) => {
    const newSteps = [...data.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    onUpdate({ ...data, steps: newSteps });
  };

  const addStep = () => {
    onUpdate({ 
      ...data, 
      steps: [...data.steps, { title: 'Nouvelle étape', description: 'Description...', price: '', duration: '' }] 
    });
  };

  const removeStep = (index) => {
    const newSteps = data.steps.filter((_, i) => i !== index);
    onUpdate({ ...data, steps: newSteps });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-16 relative"
    >
      <EditableText
        value={data.title}
        onChange={(val) => updateField('title', val)}
        element="h2"
        className="text-2xl font-medium text-stone-800 mb-12 text-center tracking-wide"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.steps.map((step, index) => {
          // Vérifier si prix/durée sont vides
          const hasPrice = step.price && step.price.trim() !== '';
          const hasDuration = step.duration && step.duration.trim() !== '';
          const showMeta = hasPrice || hasDuration || isEditMode;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden border border-stone-100 group"
            >
              <button 
                onClick={() => removeStep(index)}
                className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity z-10"
                title="Supprimer cette étape"
              >
                ×
              </button>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-[#95a58d] text-white rounded-lg flex items-center justify-center font-semibold text-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-medium text-stone-800 tracking-wide">
                  <EditableText value={step.title} onChange={(val) => updateStep(index, 'title', val)} />
                </h3>
              </div>
              <div className="space-y-3">
                {showMeta && (
                  <div className={`flex items-center justify-between ${isEditMode ? 'bg-gray-50 p-2 rounded border border-dashed border-gray-200' : ''}`}>
                    {(hasDuration || isEditMode) && (
                      <span className="text-sm text-[#95a58d] bg-green-50 px-3 py-1 rounded-full flex items-center space-x-1 font-light">
                        <SafeIcon icon={FiClock} className="text-xs" />
                        <span>
                          <EditableText 
                            value={step.duration} 
                            onChange={(val) => updateStep(index, 'duration', val)} 
                            element="span"
                            className={!hasDuration && isEditMode ? "text-gray-400 italic" : ""}
                          />
                          {!hasDuration && isEditMode && <span className="text-xs text-gray-400 ml-1">(durée)</span>}
                        </span>
                      </span>
                    )}
                    
                    {(hasPrice || isEditMode) && (
                      <p className="text-xl font-semibold text-[#95a58d]">
                        <EditableText 
                          value={step.price} 
                          onChange={(val) => updateStep(index, 'price', val)} 
                          className={!hasPrice && isEditMode ? "text-gray-400 italic text-sm" : ""}
                        />
                        {!hasPrice && isEditMode && <span className="text-xs text-gray-400 ml-1">(prix)</span>}
                      </p>
                    )}
                  </div>
                )}
                
                <EditableText
                  value={step.description}
                  onChange={(val) => updateStep(index, 'description', val)}
                  element="p"
                  className="text-stone-600 leading-relaxed pt-2 font-light"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="text-center mt-4">
        <button 
          onClick={addStep}
          className="text-sm text-[#95a58d] hover:text-[#7a8471] border border-[#95a58d] rounded-full px-4 py-2 hover:bg-green-50 transition-colors"
        >
          + Ajouter une étape
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceProcessSection;
