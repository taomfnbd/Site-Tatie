// =====================================================
// CONTEXT GLOBAL POUR GÉRER LE CONTENU DE TOUTES LES PAGES
// Permet de centraliser les modifications et la sauvegarde
// =====================================================
import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Section } from '../types/cms';
import { initialSiteContent } from '../data/siteContent';

interface PageContent {
  pageKey: string;
  sections: Section[];
  hasChanges: boolean;
}

interface ContentContextType {
  pagesContent: Record<string, PageContent>;
  globalContent: Record<string, any>;
  updatePageSections: (pageKey: string, sections: Section[]) => void;
  updateGlobalContent: (key: string, data: any) => void;
  saveAllChanges: () => Promise<void>;
  exportData: () => void;
  publishToGitHub: () => Promise<void>;
  getPageSections: (pageKey: string) => Section[];
  getGlobalContent: (key: string) => any;
  hasUnsavedChanges: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialiser les pages depuis le localStorage ou default
  const [pagesContent, setPagesContent] = useState<Record<string, PageContent>>(() => {
    const saved = {};
    // Parcourir les pages initiales pour initialiser le state
    Object.keys(initialSiteContent.pages).forEach(pageKey => {
      try {
        const localData = localStorage.getItem(`page_${pageKey}`);
        if (localData) {
          saved[pageKey] = {
            pageKey,
            sections: JSON.parse(localData),
            hasChanges: false
          };
        } else {
          saved[pageKey] = {
            pageKey,
            sections: initialSiteContent.pages[pageKey],
            hasChanges: false
          };
        }
      } catch (e) {
        console.error(`Erreur chargement page ${pageKey}`, e);
        saved[pageKey] = {
          pageKey,
          sections: initialSiteContent.pages[pageKey],
          hasChanges: false
        };
      }
    });
    return saved;
  });
  
  // Charger le contenu global initial
  const [globalContent, setGlobalContent] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem('cms_global_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge avec les defaults pour s'assurer que toutes les clés existent
        return {
          ...initialSiteContent,
          ...parsed,
          // S'assurer que header et footer sont mergés aussi
          header: { ...initialSiteContent.header, ...(parsed.header || {}) },
          footer: { ...initialSiteContent.footer, ...(parsed.footer || {}) }
        };
      }
      return {
        header: initialSiteContent.header,
        footer: initialSiteContent.footer
      };
    } catch {
      return {
        header: initialSiteContent.header,
        footer: initialSiteContent.footer
      };
    }
  });
  
  const [globalHasChanges, setGlobalHasChanges] = useState(false);

  // Protection contre la perte de données
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const hasChanges = Object.values(pagesContent).some((page) => page.hasChanges) || globalHasChanges;
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = 'Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir quitter ?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pagesContent, globalHasChanges]);

  // Mettre à jour les sections d'une page
  const updatePageSections = useCallback((pageKey: string, sections: Section[]) => {
    setPagesContent((prev) => ({
      ...prev,
      [pageKey]: {
        pageKey,
        sections,
        hasChanges: true,
      },
    }));
  }, []);

  // Mettre à jour le contenu global (ex: footer)
  const updateGlobalContent = useCallback((key: string, data: any) => {
    setGlobalContent(prev => ({
      ...prev,
      [key]: data
    }));
    setGlobalHasChanges(true);
  }, []);

  // Récupérer les sections d'une page
  const getPageSections = useCallback(
    (pageKey: string): Section[] => {
      // Si la page n'est pas dans le state (ex: nouvelle page ajoutée au code), on prend le default
      if (!pagesContent[pageKey]) {
        return initialSiteContent.pages[pageKey] || [];
      }
      return pagesContent[pageKey].sections;
    },
    [pagesContent]
  );

  // Récupérer le contenu global
  const getGlobalContent = useCallback((key: string) => {
    return globalContent[key] || (initialSiteContent as any)[key];
  }, [globalContent]);

  // Vérifier si des changements non sauvegardés existent
  const hasUnsavedChanges = Object.values(pagesContent).some((page) => page.hasChanges) || globalHasChanges;

  // Sauvegarder toutes les modifications (localStorage uniquement)
  const saveAllChanges = useCallback(async () => {
    console.log('💾 Sauvegarde des modifications en localStorage...');

    // Sauvegarder les pages
    Object.entries(pagesContent).forEach(([pageKey, content]) => {
      if (content.hasChanges) {
        localStorage.setItem(`page_${pageKey}`, JSON.stringify(content.sections));
      }
    });

    // Sauvegarder le global
    if (globalHasChanges) {
      localStorage.setItem('cms_global_content', JSON.stringify(globalContent));
      setGlobalHasChanges(false);
    }

    // Marquer tout comme sauvegardé
    setPagesContent((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key] = { ...updated[key], hasChanges: false };
      });
      return updated;
    });

    console.log('✅ Modifications sauvegardées');
  }, [pagesContent, globalContent, globalHasChanges]);

  // Exporter les données en JSON
  const exportData = useCallback(() => {
    const data = {
      ...globalContent,
      pages: {}
    };
    
    // Récupérer les sections actuelles de toutes les pages
    Object.keys(initialSiteContent.pages).forEach(pageKey => {
        data.pages[pageKey] = getPageSections(pageKey);
    });

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `site-content-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [globalContent, getPageSections]);

  // Publier vers GitHub via Netlify Function
  const publishToGitHub = useCallback(async () => {
    // Préparer les données complètes
    const data = {
      ...globalContent,
      pages: {}
    };
    
    Object.keys(initialSiteContent.pages).forEach(pageKey => {
        data.pages[pageKey] = getPageSections(pageKey);
    });

    // Appel à la fonction Netlify
    const response = await fetch('/.netlify/functions/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: data })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la publication');
    }

    const result = await response.json();
    console.log('🚀 Publié sur GitHub:', result);
  }, [globalContent, getPageSections]);

  return (
    <ContentContext.Provider
      value={{
        pagesContent,
        globalContent,
        updatePageSections,
        updateGlobalContent,
        saveAllChanges,
        exportData,
        publishToGitHub,
        getPageSections,
        getGlobalContent,
        hasUnsavedChanges,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent doit être utilisé dans un ContentProvider');
  }
  return context;
};
