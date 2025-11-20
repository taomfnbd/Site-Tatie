// =====================================================
// CONTEXTE MODE ÉDITION (comme Webflow/WordPress)
// =====================================================
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface EditModeContextType {
  isEditMode: boolean;
  enableEditMode: () => void;
  disableEditMode: () => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Vérifier le mot de passe
  const login = (password: string): boolean => {
    // @ts-ignore
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'alaiselisa1';
    console.log('[EditModeContext] login - password match:', password === correctPassword);
    if (password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');

      // Activer immédiatement le mode édition si ?admin est présent
      const params = new URLSearchParams(window.location.search);
      if (params.has('admin')) {
        console.log('[EditModeContext] login - Activating edit mode immediately');
        setIsEditMode(true);
      }

      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsEditMode(false);
    sessionStorage.removeItem('admin_auth');
    // Retirer le paramètre ?admin de l'URL
    const newUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, '', newUrl);
  };

  const enableEditMode = () => {
    if (isAuthenticated) {
      setIsEditMode(true);
    }
  };

  const disableEditMode = () => {
    setIsEditMode(false);
  };

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const authStored = sessionStorage.getItem('admin_auth');
    console.log('[EditModeContext] Initial load - authStored:', authStored);
    if (authStored === 'true') {
      setIsAuthenticated(true);

      // Si déjà authentifié et ?admin présent, activer le mode édition
      const params = new URLSearchParams(window.location.search);
      if (params.has('admin')) {
        console.log('[EditModeContext] Initial load - Activating edit mode');
        setIsEditMode(true);
      }
    }
  }, []);

  // Détecter ?admin dans l'URL et activer automatiquement le mode édition
  // Avec HashRouter, ?admin est toujours présent pendant toute la session
  useEffect(() => {
    const checkAdminParam = () => {
      const params = new URLSearchParams(window.location.search);
      const hasAdminParam = params.has('admin');

      console.log('[EditModeContext] checkAdminParam - hasAdmin:', hasAdminParam, 'isAuth:', isAuthenticated);

      if (hasAdminParam && isAuthenticated) {
        console.log('[EditModeContext] Setting isEditMode to TRUE');
        setIsEditMode(true);
      } else if (!hasAdminParam) {
        console.log('[EditModeContext] No admin param, setting isEditMode to FALSE');
        setIsEditMode(false);
      }
    };

    checkAdminParam();

    // Re-vérifier quand l'URL change (pour les cas où on retire ?admin)
    window.addEventListener('popstate', checkAdminParam);
    return () => window.removeEventListener('popstate', checkAdminParam);
  }, [isAuthenticated]);

  // Log de l'état actuel à chaque render
  console.log('[EditModeContext] Rendering with isEditMode:', isEditMode, 'isAuthenticated:', isAuthenticated);

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        enableEditMode,
        disableEditMode,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within EditModeProvider');
  }
  return context;
};
