import React, { useState, useEffect } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { useEditMode } from '../../contexts/EditModeContext';
import EditableSection from './EditableSection';
import AddSectionButton from './AddSectionButton';
import SectionLibraryModal from './SectionLibraryModal';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import CTASection from '../sections/CTASection';
import ServicesListSection from '../sections/ServicesListSection';
import ServicesHeaderSection from '../sections/ServicesHeaderSection';
import ServiceCardSection from '../sections/ServiceCardSection';
import ServiceHeroSection from '../sections/ServiceHeroSection';
import ServiceContentSection from '../sections/ServiceContentSection';
import ServiceProcessSection from '../sections/ServiceProcessSection';
import ServiceProcessCardsSection from '../sections/ServiceProcessCardsSection';
import ServiceBenefitsSection from '../sections/ServiceBenefitsSection';
import ServiceCTASection from '../sections/ServiceCTASection';
import ContactHeroSection from '../sections/ContactHeroSection';
import ContactFormSection from '../sections/ContactFormSection';
import ContactDetailsSection from '../sections/ContactDetailsSection';
import LegalContentSection from '../sections/LegalContentSection';

// Mapping des types de sections vers leurs composants React
const SECTION_COMPONENTS = {
  'hero': HeroSection,
  'about': AboutSection,
  'cta': CTASection,
  'services_list': ServicesListSection,
  'services_header': ServicesHeaderSection,
  'service_card': ServiceCardSection,
  'service_hero': ServiceHeroSection,
  'service_content': ServiceContentSection,
  'service_process': ServiceProcessSection,
  'service_process_cards': ServiceProcessCardsSection,
  'service_benefits': ServiceBenefitsSection,
  'service_cta': ServiceCTASection,
  'contact_hero': ContactHeroSection,
  'contact_form': ContactFormSection,
  'contact_details': ContactDetailsSection,
  'legal_content': LegalContentSection,
};

const SectionManager = ({ pageKey, defaultSections = [] }) => {
  const { getPageSections, updatePageSections } = useContent();
  const { isEditMode } = useEditMode();
  const [sections, setSections] = useState([]);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [insertIndex, setInsertIndex] = useState(null);

  // Charger les sections au montage ou quand pageKey change
  useEffect(() => {
    const savedSections = getPageSections(pageKey);
    if (savedSections && savedSections.length > 0) {
      setSections(savedSections);
    } else if (defaultSections.length > 0) {
      // Initialiser avec les sections par défaut si rien de sauvegardé
      setSections(defaultSections);
      updatePageSections(pageKey, defaultSections);
    }
  }, [pageKey, getPageSections, updatePageSections]); // defaultSections retiré des dépendances pour éviter boucle infinie si objet littéral

  const handleUpdateSection = (index, newContent) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], content: newContent };
    setSections(newSections);
    updatePageSections(pageKey, newSections);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[index - 1];
    newSections[index - 1] = temp;
    setSections(newSections);
    updatePageSections(pageKey, newSections);
  };

  const handleMoveDown = (index) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[index + 1];
    newSections[index + 1] = temp;
    setSections(newSections);
    updatePageSections(pageKey, newSections);
  };

  const handleDelete = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
    updatePageSections(pageKey, newSections);
  };

  const handleDuplicate = (index) => {
    const newSections = [...sections];
    const sectionToDuplicate = { 
      ...newSections[index], 
      id: Date.now().toString() // Nouvel ID unique
    };
    newSections.splice(index + 1, 0, sectionToDuplicate);
    setSections(newSections);
    updatePageSections(pageKey, newSections);
  };

  const handleAddSectionClick = (index) => {
    setInsertIndex(index);
    setIsLibraryOpen(true);
  };

  const handleAddSectionSelect = (type) => {
    const newSection = {
      id: Date.now().toString(),
      type: type,
      content: {} // Contenu vide par défaut, le composant utilisera ses defaults
    };

    const newSections = [...sections];
    // Si insertIndex est null, ajouter à la fin, sinon à l'index spécifié
    const index = insertIndex !== null ? insertIndex : sections.length;
    newSections.splice(index, 0, newSection);
    
    setSections(newSections);
    updatePageSections(pageKey, newSections);
    setIsLibraryOpen(false);
    setInsertIndex(null);
  };

  return (
    <div className="section-manager">
      {sections.map((section, index) => {
        const Component = SECTION_COMPONENTS[section.type];
        
        if (!Component) {
          return <div key={section.id} className="p-4 bg-red-100 text-red-800">Type de section inconnu: {section.type}</div>;
        }

        return (
          <React.Fragment key={section.id}>
            {/* Zone d'insertion avant la section (visible seulement en mode édition) */}
            {isEditMode && (
              <div className="relative h-2 group">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button 
                    onClick={() => handleAddSectionClick(index)}
                    className="bg-[#95a58d] text-white text-xs px-2 py-1 rounded-full shadow-sm transform hover:scale-110 transition-transform"
                  >
                    + Ajouter une section ici
                  </button>
                </div>
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#95a58d] opacity-0 group-hover:opacity-50"></div>
              </div>
            )}

            <EditableSection
              sectionIndex={index}
              sectionType={section.type}
              canMoveUp={index > 0}
              canMoveDown={index < sections.length - 1}
              onMoveUp={() => handleMoveUp(index)}
              onMoveDown={() => handleMoveDown(index)}
              onDelete={() => handleDelete(index)}
              onDuplicate={() => handleDuplicate(index)}
            >
              <Component 
                content={section.content} 
                onUpdate={(newContent) => handleUpdateSection(index, newContent)} 
              />
            </EditableSection>
          </React.Fragment>
        );
      })}

      {/* Bouton ajouter à la fin */}
      {isEditMode && (
        <div className="h-0 relative group flex justify-center items-center z-20" style={{ transform: 'translateY(-50%)' }}>
          <div className="absolute inset-x-0 h-8 flex items-center justify-center cursor-pointer">
             <div className="absolute inset-x-0 h-[1px] bg-[#95a58d] opacity-0 group-hover:opacity-50 transition-opacity"></div>
             <div className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
               <AddSectionButton onClick={() => handleAddSectionClick(sections.length)} />
             </div>
          </div>
        </div>
      )}

      <SectionLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelect={handleAddSectionSelect}
      />
    </div>
  );
};

export default SectionManager;
