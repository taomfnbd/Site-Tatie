import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePageSEO, getStructuredData } from '../utils/seo';

const SEOHead = () => {
  const location = useLocation();

  useEffect(() => {
    // Configuration SEO par page
    const seoConfig = {
      '/': {
        title: 'Alaïs Tavernier - Naturopathe & Massage Bien-être | Vacqueyras',
        description: 'Alaïs Tavernier, naturopathe et praticienne en massage bien-être à Vacqueyras. Consultations personnalisées, bilan de vitalité, rééquilibrage alimentaire.',
        keywords: 'naturopathe Vacqueyras, naturopathie Vaucluse, bilan de vitalité, rééquilibrage alimentaire, massage bien-être',
        canonicalUrl: 'https://alais-tavernier-naturopathe.fr/'
      },
      '/prestations': {
        title: 'Mes prestations - Naturopathie & Massage | Alaïs Tavernier',
        description: 'Découvrez mes prestations : naturopathie avec bilan de vitalité (70€), massage assis relaxant (30€). Consultations à Vacqueyras.',
        keywords: 'prestations naturopathe, tarifs naturopathie, massage assis, consultation naturopathe Vaucluse',
        canonicalUrl: 'https://alais-tavernier-naturopathe.fr/prestations'
      },
      '/naturopathie': {
        title: 'Naturopathie - Bilan de vitalité & Conseils | Alaïs Tavernier',
        description: 'Consultations de naturopathie personnalisées : bilan de vitalité, conseils alimentaires, gestion du stress. Première consultation 70€, suivi 50€.',
        keywords: 'naturopathie consultation, bilan de vitalité, troubles digestifs, gestion stress, rééquilibrage alimentaire',
        canonicalUrl: 'https://alais-tavernier-naturopathe.fr/naturopathie'
      },
      '/massage-assis': {
        title: 'Massage assis - Détente immédiate | Alaïs Tavernier',
        description: 'Massage assis habillé de 30 minutes à Vacqueyras. Soulage tensions du dos, nuque, épaules. Tarif : 30€. Réservation en ligne.',
        keywords: 'massage assis, massage habillé, détente, tensions dos nuque, relaxation Vacqueyras',
        canonicalUrl: 'https://alais-tavernier-naturopathe.fr/massage-assis'
      },
      '/contact': {
        title: 'Contact & Rendez-vous - Alaïs Tavernier Naturopathe',
        description: 'Prenez rendez-vous avec Alaïs Tavernier à Vacqueyras. Téléphone : 07.81.66.09.29. Horaires : Lundi, Jeudi 9h-17h, Samedi 9h-12h.',
        keywords: 'contact naturopathe Vacqueyras, rendez-vous, horaires consultation, téléphone naturopathe',
        canonicalUrl: 'https://alais-tavernier-naturopathe.fr/contact'
      }
    };

    const pageConfig = seoConfig[location.pathname] || seoConfig['/'];
    updatePageSEO(pageConfig);

    // Ajouter les données structurées sur la page d'accueil
    if (location.pathname === '/') {
      let structuredDataScript = document.getElementById('structured-data');
      
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.id = 'structured-data';
        structuredDataScript.type = 'application/ld+json';
        document.head.appendChild(structuredDataScript);
      }
      
      structuredDataScript.textContent = JSON.stringify(getStructuredData());
    }
  }, [location.pathname]);

  return null; // Ce composant ne rend rien visuellement
};

export default SEOHead;
