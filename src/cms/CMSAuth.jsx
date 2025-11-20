import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLock, FiEye, FiEyeOff } = FiIcons;

const CMSAuth = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mot de passe par défaut (À CHANGER EN PRODUCTION)
  const DEFAULT_PASSWORD = 'alais2024admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulation d'une vérification
    setTimeout(() => {
      if (password === DEFAULT_PASSWORD) {
        // Stocker l'authentification
        localStorage.setItem('cms-auth', 'true');
        localStorage.setItem('cms-auth-time', new Date().getTime().toString());
        onLogin();
      } else {
        setError('Mot de passe incorrect');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-25 to-green-25 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-stone-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#95a58d] rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiLock} className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-medium text-stone-800 mb-2">
              Accès Administrateur
            </h1>
            <p className="text-stone-600 font-light">
              Connectez-vous pour modifier le contenu du site
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#95a58d] focus:border-transparent transition-colors font-light pr-12"
                  placeholder="Entrez votre mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 hover:text-stone-700"
                >
                  <SafeIcon icon={showPassword ? FiEyeOff : FiEye} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#95a58d] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#7a8471] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Connexion...</span>
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800 font-medium mb-2">
              ℹ️ Informations de connexion par défaut :
            </p>
            <p className="text-xs text-blue-700">
              <strong>Mot de passe :</strong> alais2024admin
            </p>
            <p className="text-xs text-blue-600 mt-2">
              (À changer en production pour plus de sécurité)
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-stone-500">
              Mot de passe oublié ? Contactez le développeur
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CMSAuth;