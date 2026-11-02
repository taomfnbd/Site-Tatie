import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-24 text-center">
      <p className="text-[#5e7056] font-medium mb-3">Erreur 404</p>
      <h1 className="text-4xl font-light text-stone-800 mb-5">
        Cette page est introuvable
      </h1>
      <p className="text-stone-600 mb-8">
        Le lien a peut-être changé. Retrouvez les prestations et les
        informations du cabinet depuis l’accueil.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center min-h-11 px-6 py-3 rounded-full bg-[#5e7056] text-white"
      >
        Revenir à l’accueil
      </Link>
    </section>
  );
}
