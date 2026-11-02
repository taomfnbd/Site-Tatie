import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
interface EditModeContextType {
  isEditMode: boolean;
  isAuthenticated: boolean;
  enableEditMode: () => void;
  disableEditMode: () => void;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}
const EditModeContext = createContext<EditModeContextType | undefined>(undefined);
export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const sessionGeneration = useRef(0);
  const location = useLocation();
  const adminRequested = new URLSearchParams(location.search).has('admin');
  useEffect(() => {
    if (!adminRequested) return;
    let active = true; const generation=sessionGeneration.current;
    fetch('/api/admin/session', { credentials: 'same-origin', cache: 'no-store' })
      .then(r => r.json()).then(data => { if (active && generation===sessionGeneration.current) { setIsAuthenticated(data.authenticated === true); setIsEditMode(data.authenticated === true); } }).catch(() => { if (active && generation===sessionGeneration.current) setIsAuthenticated(false); });
    return () => { active = false; };
  }, [adminRequested]);
  const login = useCallback(async (password: string) => {
    sessionGeneration.current += 1;
    const response = await fetch('/api/admin/login', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (response.status === 401) return false;
    if (!response.ok) throw new Error(response.status === 429 ? 'Trop de tentatives. Réessayez dans une minute.' : 'Connexion indisponible. Réessayez plus tard.');
    setIsAuthenticated(true); setIsEditMode(true); return true;
  }, []);
  const logout = useCallback(async () => {
    sessionGeneration.current += 1;
    const response = await fetch('/api/admin/session', { method: 'DELETE', credentials: 'same-origin' });
    if (!response.ok) throw new Error('La déconnexion a échoué. Réessayez.');
    setIsAuthenticated(false); setIsEditMode(false);
    window.location.assign(window.location.pathname);
  }, []);
  return <EditModeContext.Provider value={{ isEditMode, isAuthenticated, login, logout, enableEditMode: () => { if (isAuthenticated) setIsEditMode(true); }, disableEditMode: () => setIsEditMode(false) }}>{children}</EditModeContext.Provider>;
};
export function useEditMode() {
  const context = useContext(EditModeContext);
  if (!context) throw new Error('EditModeProvider manquant');
  return context;
}
