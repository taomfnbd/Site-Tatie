import React, { createContext, useContext, useState, useEffect } from 'react';

const CMSContext = createContext();

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within CMSProvider');
  }
  return context;
};

export const CMSProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contentData, setContentData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const authStatus = localStorage.getItem('cms-auth');
    const authTime = localStorage.getItem('cms-auth-time');
    
    if (authStatus === 'true' && authTime) {
      const elapsed = new Date().getTime() - parseInt(authTime);
      // Session expire après 24 heures
      if (elapsed < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('cms-auth');
        localStorage.removeItem('cms-auth-time');
      }
    }

    // Charger le contenu sauvegardé
    const savedContent = localStorage.getItem('cms-content');
    if (savedContent) {
      try {
        setContentData(JSON.parse(savedContent));
      } catch (e) {
        console.error('Error loading saved content:', e);
      }
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsEditMode(false);
    localStorage.removeItem('cms-auth');
    localStorage.removeItem('cms-auth-time');
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const updateContent = (key, value) => {
    setContentData(prev => {
      const newData = { ...prev, [key]: value };
      return newData;
    });
    setHasChanges(true);
  };

  const saveChanges = () => {
    // Sauvegarder dans localStorage
    localStorage.setItem('cms-content', JSON.stringify(contentData));
    setHasChanges(false);
    
    // TODO: Envoyer au serveur si besoin
    return true;
  };

  const discardChanges = () => {
    const savedContent = localStorage.getItem('cms-content');
    if (savedContent) {
      setContentData(JSON.parse(savedContent));
    }
    setHasChanges(false);
  };

  const getContent = (key, defaultValue = '') => {
    return contentData[key] || defaultValue;
  };

  return (
    <CMSContext.Provider
      value={{
        isEditMode,
        isAuthenticated,
        hasChanges,
        login,
        logout,
        toggleEditMode,
        updateContent,
        saveChanges,
        discardChanges,
        getContent,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};