// =====================================================
// TOOLBAR ADMIN (comme Webflow/WordPress)
// Barre flottante en haut du site en mode édition
// =====================================================
import React, { useState } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';
import { useContent } from '../../contexts/ContentContext';
import { motion } from 'framer-motion';

export const AdminToolbar: React.FC = () => {
  const { isEditMode, disableEditMode, logout } = useEditMode();
  const { saveAllChanges, hasUnsavedChanges, exportData, publishToGitHub } = useContent();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await saveAllChanges();
      // Note: Si publishToGitHub est configuré, on pourrait l'appeler ici aussi.
      // Pour l'instant on sépare pour éviter les commits trop fréquents.
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    disableEditMode();
  };

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      logout();
    }
  };

  if (!isEditMode) return null;

  return (
    <>
      <motion.div
        key="admin-toolbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-[9999] bg-stone-900 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo / Titre */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#95a58d] rounded flex items-center justify-center font-bold text-sm">
              A
            </div>
            <div>
              <div className="text-sm font-medium">Mode Édition</div>
              <div className="text-xs text-stone-400">Alaïs Tavernier - CMS</div>
            </div>
          </div>

          {/* Actions centrales */}
          <div className="flex items-center space-x-2">
            {/* Bouton Enregistrer */}
            <button
              onClick={handleSave}
              disabled={isSaving || !hasUnsavedChanges}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 relative ${
                saveStatus === 'success'
                  ? 'bg-green-600 text-white'
                  : saveStatus === 'error'
                  ? 'bg-red-600 text-white'
                  : isSaving
                  ? 'bg-stone-700 text-stone-400 cursor-not-allowed'
                  : !hasUnsavedChanges
                  ? 'bg-stone-700 text-stone-500 cursor-not-allowed'
                  : 'bg-[#95a58d] hover:bg-[#7a8471] text-white'
              }`}
            >
              {hasUnsavedChanges && saveStatus === 'idle' && !isSaving && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></span>
              )}
              {isSaving ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Enregistrement...</span>
                </>
              ) : saveStatus === 'success' ? (
                <>
                  <span>✓</span>
                  <span>Enregistré</span>
                </>
              ) : saveStatus === 'error' ? (
                <>
                  <span>✗</span>
                  <span>Erreur</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>Enregistrer</span>
                </>
              )}
            </button>

            {/* Bouton Aperçu */}
            <button
              onClick={handlePreview}
              className="px-4 py-2 bg-stone-700 hover:bg-stone-600 rounded-lg font-medium transition-all flex items-center space-x-2"
            >
              <span>👁️</span>
              <span>Aperçu</span>
            </button>
            
            {/* Bouton Export */}
            <button
              onClick={exportData}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center space-x-2"
              title="Télécharger la configuration (JSON)"
            >
              <span>📥</span>
            </button>

            {/* Bouton Publier */}
            <button
              onClick={async () => {
                if (confirm('Voulez-vous publier les modifications en ligne ? Cela peut prendre quelques minutes.')) {
                  setIsPublishing(true);
                  try {
                    await publishToGitHub();
                    alert('✅ Modifications publiées avec succès ! Le site sera mis à jour dans quelques instants.');
                  } catch (e) {
                    console.error(e);
                    alert('❌ Erreur lors de la publication. Vérifiez la configuration GitHub.');
                  } finally {
                    setIsPublishing(false);
                  }
                }
              }}
              disabled={isPublishing}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                isPublishing ? 'bg-purple-700 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
              }`}
              title="Publier sur le site en ligne"
            >
              {isPublishing ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Publication...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Publier</span>
                </>
              )}
            </button>
          </div>

          {/* Actions droite */}
          <div className="flex items-center space-x-2">
            {/* Aide */}
            <button className="p-2 hover:bg-stone-800 rounded-lg transition-all" title="Aide">
              <span className="text-lg">❓</span>
            </button>

            {/* Déconnexion */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-all flex items-center space-x-2"
            >
              <span>🚪</span>
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Barre d'info */}
        <div className="bg-stone-800 px-4 py-2 text-xs text-stone-400 border-t border-stone-700">
          <div className="flex items-center justify-between">
            <div>
              💡 <span className="font-medium text-stone-300">Astuce :</span> Cliquez
              directement sur les textes et images pour les modifier
            </div>
            <div>
              Page : <span className="font-medium text-white">{window.location.pathname}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spacer pour ne pas cacher le contenu */}
      <div className="h-[88px]" />
    </>
  );
};

export default AdminToolbar;
