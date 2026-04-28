import React, { Suspense, lazy, useState, useEffect } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { useEditMode } from '../../contexts/EditModeContext';

const EditableSection = lazy(() => import('./EditableSection'));
const AddSectionButton = lazy(() => import('./AddSectionButton'));
const SectionLibraryModal = lazy(() => import('./SectionLibraryModal'));

// Mapping des types de sections vers leurs composants React
const SECTION_COMPONENTS = {
  'hero': lazy(() => import('../sections/HeroSection')),
  'about': lazy(() => import('../sections/AboutSection')),
  'cta': lazy(() => import('../sections/CTASection')),
  'services_list': lazy(() => import('../sections/ServicesListSection')),
  'services_header': lazy(() => import('../sections/ServicesHeaderSection')),
  'service_card': lazy(() => import('../sections/ServiceCardSection')),
  'service_hero': lazy(() => import('../sections/ServiceHeroSection')),
  'service_content': lazy(() => import('../sections/ServiceContentSection')),
  'service_process': lazy(() => import('../sections/ServiceProcessSection')),
  'service_process_cards': lazy(() => import('../sections/ServiceProcessCardsSection')),
  'service_benefits': lazy(() => import('../sections/ServiceBenefitsSection')),
  'service_cta': lazy(() => import('../sections/ServiceCTASection')),
  'contact_hero': lazy(() => import('../sections/ContactHeroSection')),
  'contact_form': lazy(() => import('../sections/ContactFormSection')),
  'contact_details': lazy(() => import('../sections/ContactDetailsSection')),
  'legal_content': lazy(() => import('../sections/LegalContentSection')),
  'faq': lazy(() => import('../sections/FAQSection')),
};

const SectionFallback = () => <div className="min-h-24" aria-hidden="true" />;

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

        const renderedSection = (
          <Suspense fallback={<SectionFallback />}>
            <Component
              content={section.content}
              onUpdate={(newContent) => handleUpdateSection(index, newContent)}
            />
          </Suspense>
        );

        if (!isEditMode) {
          return <React.Fragment key={section.id}>{renderedSection}</React.Fragment>;
        }

        return (
          <React.Fragment key={section.id}>
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

            <Suspense fallback={renderedSection}>
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
                {renderedSection}
              </EditableSection>
            </Suspense>
          </React.Fragment>
        );
      })}

      {/* Bouton ajouter à la fin */}
      {isEditMode && (
        <Suspense fallback={null}>
          <div className="py-6 flex justify-center relative z-20">
            <AddSectionButton onClick={() => handleAddSectionClick(sections.length)} />
          </div>
        </Suspense>
      )}

      {isEditMode && isLibraryOpen && (
        <Suspense fallback={null}>
          <SectionLibraryModal
            isOpen={isLibraryOpen}
            onClose={() => setIsLibraryOpen(false)}
            onSelect={handleAddSectionSelect}
          />
        </Suspense>
      )}
    </div>
  );
};

export default SectionManager;
