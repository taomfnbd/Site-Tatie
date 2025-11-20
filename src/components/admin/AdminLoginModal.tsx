// =====================================================
// MODAL DE CONNEXION ADMIN
// =====================================================
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditMode } from '../../contexts/EditModeContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, enableEditMode } = useEditMode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(password);
    if (success) {
      enableEditMode();
      onClose();
      setPassword('');
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#95a58d] rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">A</span>
            </div>
          </div>

          {/* Titre */}
          <h2 className="text-2xl font-light text-stone-800 text-center mb-2">
            Mode Édition
          </h2>
          <p className="text-stone-600 text-center mb-8">
            Entrez le mot de passe pour éditer le site
          </p>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#95a58d] focus:border-transparent transition-all"
                placeholder="Entrez votre mot de passe"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-all font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-[#95a58d] text-white rounded-lg hover:bg-[#7a8471] transition-all font-medium shadow-sm"
              >
                Se connecter
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="mt-6 text-center text-xs text-stone-500">
            Mot de passe par défaut : <code className="bg-stone-100 px-2 py-1 rounded">admin123</code>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminLoginModal;
