import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageUploadModal = ({ isOpen, onClose, currentSrc, currentAlt, onSave }) => {
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [url, setUrl] = useState(currentSrc);
  const [alt, setAlt] = useState(currentAlt || '');
  const [preview, setPreview] = useState(currentSrc);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("L'image est trop volumineuse (> 2Mo).");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Si mode upload, on utilise la preview (qui est en base64)
    // Si mode url, on utilise l'url saisie
    const finalSrc = mode === 'upload' && fileInputRef.current?.files?.[0] ? preview : (mode === 'url' ? url : currentSrc);
    
    onSave(finalSrc, alt);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="bg-[#95a58d] text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">Modifier l'image</h3>
            <button onClick={onClose} className="text-white/80 hover:text-white">×</button>
          </div>

          <div className="p-6 space-y-6">
            {/* Tabs */}
            <div className="flex space-x-4 border-b border-stone-200 pb-2">
              <button
                onClick={() => setMode('upload')}
                className={`pb-2 text-sm font-medium transition-colors ${mode === 'upload' ? 'text-[#95a58d] border-b-2 border-[#95a58d]' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Importer
              </button>
              <button
                onClick={() => setMode('url')}
                className={`pb-2 text-sm font-medium transition-colors ${mode === 'url' ? 'text-[#95a58d] border-b-2 border-[#95a58d]' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Lien URL
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {mode === 'upload' ? (
                <div 
                  className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center hover:bg-stone-50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <span className="text-4xl mb-2 block">📁</span>
                  <p className="text-stone-600 text-sm font-medium">Cliquez pour choisir une image</p>
                  <p className="text-stone-400 text-xs mt-1">Max 2Mo</p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">URL de l'image</label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setPreview(e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#95a58d] focus:border-[#95a58d] outline-none text-sm"
                    placeholder="https://..."
                  />
                </div>
              )}

              {/* Preview */}
              {preview && (
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Aperçu</label>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
                    <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                </div>
              )}

              {/* Alt Text */}
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Description (Texte alternatif pour SEO)</label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#95a58d] focus:border-[#95a58d] outline-none text-sm"
                  placeholder="Décrivez l'image..."
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-[#95a58d] hover:bg-[#7a8471] rounded-lg shadow-sm"
            >
              Enregistrer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ImageUploadModal;
