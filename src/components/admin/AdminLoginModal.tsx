import React, { useEffect, useRef, useState } from "react";
import { useEditMode } from "../../contexts/EditModeContext";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function AdminLoginModal({ isOpen, onClose }: Props) {
  const { login } = useEditMode();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) dialog.current?.showModal();
    else dialog.current?.close();
  }, [isOpen]);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (await login(password)) {
        setPassword("");
        onClose();
      } else setError("Mot de passe incorrect.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <dialog
      ref={dialog}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
      aria-labelledby="login-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl p-8 shadow-xl backdrop:bg-black/50"
    >
      <h2 id="login-title" className="text-2xl text-stone-800 mb-2">
        Éditer le site
      </h2>
      <p className="text-stone-600 mb-6">
        Connectez-vous pour retrouver vos brouillons et modifier le site.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <label htmlFor="admin-password" className="block text-sm font-medium">
          Mot de passe
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
        {error && (
          <p role="alert" className="text-red-700 text-sm">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border rounded-lg p-3"
          >
            Annuler
          </button>
          <button
            disabled={loading}
            type="submit"
            className="flex-1 rounded-lg p-3 bg-[#5e7056] text-white disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
