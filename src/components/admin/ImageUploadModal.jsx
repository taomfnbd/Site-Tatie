import React, { useEffect, useRef, useState } from 'react';
export default function ImageUploadModal({ isOpen, onClose, currentSrc, currentAlt, onSave }) {
  const dialog = useRef(null); const [src,setSrc] = useState(currentSrc); const [alt,setAlt] = useState(currentAlt || ''); const [uploading,setUploading] = useState(false); const [error,setError] = useState('');
  useEffect(() => { if (isOpen) dialog.current?.showModal(); else dialog.current?.close(); }, [isOpen]);
  const upload = async event => {
    const file = event.target.files?.[0]; if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('Choisissez une image de moins de 5 Mo.'); return; }
    setUploading(true); setError('');
    try { const response = await fetch('/api/cms/image', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': file.type }, body: file }); const data = await response.json(); if (!response.ok) throw new Error(data.error); setSrc(data.src); }
    catch (err) { setError(err.message || 'Import impossible.'); } finally { setUploading(false); }
  };
  return <dialog ref={dialog} onCancel={onClose} aria-labelledby="image-dialog-title" className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl p-6 backdrop:bg-black/50">
    <h2 id="image-dialog-title" className="text-xl font-medium mb-5">Modifier l’image</h2>
    <label htmlFor="image-file" className="block font-medium mb-2">Importer une photo</label><input id="image-file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={upload} disabled={uploading} className="block w-full mb-3" />
    <p className="text-sm text-stone-600 mb-4">JPG, PNG, WebP ou AVIF, 5 Mo maximum. La photo est automatiquement optimisée.</p>
    {src && <img src={src} alt={alt} className="w-full h-40 object-contain bg-stone-50 rounded-lg mb-5" />}
    <label htmlFor="image-alt" className="block text-sm font-medium mb-2">Description de l’image</label><input id="image-alt" value={alt} onChange={e => setAlt(e.target.value)} className="w-full border rounded-lg p-3" />
    {error && <p role="alert" className="text-red-700 mt-3">{error}</p>}
    <p role="status" className="text-sm mt-3">{uploading ? 'Import et optimisation en cours…' : ''}</p>
    <div className="flex justify-end gap-3 mt-5"><button onClick={onClose} className="p-3 border rounded-lg">Annuler</button><button disabled={uploading || !src} onClick={() => { onSave(src,alt); onClose(); }} className="p-3 bg-[#5e7056] text-white rounded-lg disabled:opacity-50">Enregistrer</button></div>
  </dialog>;
}
