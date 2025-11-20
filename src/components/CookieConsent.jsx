import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiInfo, FiX, FiCheck } = FiIcons;

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Attendre un peu avant d'afficher pour ne pas être intrusif
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 shadow-lg"
      >
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiInfo} className="text-[#95a58d] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-stone-800 mb-1">Respect de votre vie privée</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Ce site utilise des cookies essentiels pour son bon fonctionnement et peut utiliser des outils d'analyse pour améliorer votre expérience.
                    {!showDetails && (
                      <button
                        onClick={() => setShowDetails(true)}
                        className="text-[#95a58d] hover:text-[#7a8471] ml-1 underline"
                      >
                        En savoir plus
                      </button>
                    )}
                  </p>
                  
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 text-xs text-stone-500 space-y-2 overflow-hidden"
                      >
                        <div>
                          <strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (navigation, préférences).
                        </div>
                        <div>
                          <strong>Cookies d'analyse :</strong> Nous aident à comprendre l'utilisation du site pour l'améliorer (Netlify Analytics).
                        </div>
                        <div>
                          <strong>Vos droits :</strong> Vous pouvez modifier vos préférences à tout moment en vidant le cache de votre navigateur.
                        </div>
                        <button
                          onClick={() => setShowDetails(false)}
                          className="text-[#95a58d] hover:text-[#7a8471] underline"
                        >
                          Masquer les détails
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
              >
                Refuser les cookies optionnels
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm bg-[#95a58d] text-white rounded-lg hover:bg-[#7a8471] transition-colors flex items-center justify-center space-x-1"
              >
                <SafeIcon icon={FiCheck} className="text-xs" />
                <span>Accepter tous les cookies</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent;