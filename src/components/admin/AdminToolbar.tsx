// =====================================================
// TOOLBAR ADMIN (comme Webflow/WordPress)
// Barre flottante en haut du site en mode édition
// =====================================================
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';
import { useContent } from '../../contexts/ContentContext';
import { motion } from 'framer-motion';
import ConfirmModal from './ConfirmModal';
import ToastContainer, { type ToastItem } from './ToastContainer';

export const AdminToolbar: React.FC = () => {
  const { isEditMode, disableEditMode, logout } = useEditMode();
  const { saveAllChanges, hasUnsavedChanges, exportData, publishToGitHub } = useContent();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [confirmAction, setConfirmAction] = useState<null | 'publish' | 'logout'>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastItem['type']) => {
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, type === 'error' ? 5000 : 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await saveAllChanges();
      setSaveStatus('success');
      addToast('Brouillon enregistré localement.', 'success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      setSaveStatus('error');
      addToast('Erreur pendant l’enregistrement local.', 'error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  }, [addToast, saveAllChanges]);

  const handlePreview = () => {
    disableEditMode();
    addToast('Mode aperçu activé.', 'info');
  };

  const handleLogout = () => {
    if (hasUnsavedChanges) {
      setConfirmAction('logout');
      return;
    }
    logout();
  };

  const handlePublish = useCallback(async () => {
    setIsPublishing(true);
    try {
      await publishToGitHub();
      addToast('Publication lancée. Netlify va redéployer le site.', 'success');
    } catch (error) {
      console.error('Erreur publication:', error);
      const message = error instanceof Error ? error.message : 'Erreur lors de la publication';
      addToast(message, 'error');
    } finally {
      setIsPublishing(false);
      setConfirmAction(null);
    }
  }, [addToast, publishToGitHub]);

  useEffect(() => {
    if (!isEditMode) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      if (!isCtrlOrCmd || event.key.toLowerCase() !== 's') return;

      event.preventDefault();

      if (!hasUnsavedChanges || isSaving) return;
      void handleSave();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, hasUnsavedChanges, isEditMode, isSaving]);

  const statusLabel = useMemo(() => {
    if (isPublishing) return 'Publication en cours';
    if (isSaving) return 'Enregistrement en cours';
    if (hasUnsavedChanges) return 'Modifications non sauvegardées';
    return 'Aucun changement en attente';
  }, [hasUnsavedChanges, isPublishing, isSaving]);

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
              <span className="hidden sm:inline">Exporter</span>
            </button>

            {/* Bouton Publier */}
            <button
              onClick={() => setConfirmAction('publish')}
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
              <span className="font-medium text-stone-300">État :</span> {statusLabel}
            </div>
            <div>
              <span className="hidden md:inline">Raccourci : </span>
              <span className="font-medium text-white">Ctrl/Cmd + S</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spacer pour ne pas cacher le contenu */}
      <div className="h-[88px]" />

      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <ConfirmModal
        isOpen={confirmAction === 'publish'}
        title="Publier le site"
        message="Les modifications vont être envoyées sur GitHub puis redéployées sur Netlify. Continuer ?"
        confirmLabel="Publier"
        onConfirm={() => {
          void handlePublish();
        }}
        onCancel={() => setConfirmAction(null)}
      />

      <ConfirmModal
        isOpen={confirmAction === 'logout'}
        title="Se déconnecter"
        message="Des modifications locales ne sont pas encore enregistrées. Voulez-vous quand même vous déconnecter ?"
        confirmLabel="Se déconnecter"
        confirmVariant="danger"
        onConfirm={() => {
          logout();
          setConfirmAction(null);
        }}
        onCancel={() => setConfirmAction(null)}
      />
    </>
  );
};

export default AdminToolbar;
