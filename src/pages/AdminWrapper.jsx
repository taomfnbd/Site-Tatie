import React from 'react';
import { useCMS } from '../cms/CMSContext';
import CMSAuth from '../cms/CMSAuth';
import { useNavigate } from 'react-router-dom';

const AdminWrapper = () => {
  const { isAuthenticated, login } = useCMS();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/');
  };

  // Si déjà authentifié, rediriger vers l'accueil
  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  // Sinon afficher le formulaire de connexion
  return <CMSAuth onLogin={handleLogin} />;
};

export default AdminWrapper;