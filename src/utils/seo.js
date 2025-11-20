// Utilitaires SEO pour optimiser le référencement
export const updatePageSEO = (pageData) => {
  const { title, description, keywords, canonicalUrl } = pageData;

  // Mettre à jour le titre
  if (title) {
    document.title = title;
  }

  // Mettre à jour ou créer les meta tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);
  
  // Open Graph
  updateMetaTag('og:title', title, 'property');
  updateMetaTag('og:description', description, 'property');
  updateMetaTag('og:url', canonicalUrl || window.location.href, 'property');
  
  // Twitter Cards
  updateMetaTag('twitter:title', title, 'name');
  updateMetaTag('twitter:description', description, 'name');
  
  // Canonical URL
  updateCanonicalUrl(canonicalUrl);
};

const updateMetaTag = (name, content, attribute = 'name') => {
  if (!content) return;
  
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
};

const updateCanonicalUrl = (url) => {
  if (!url) return;
  
  let canonical = document.querySelector('link[rel="canonical"]');
  
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  
  canonical.setAttribute('href', url);
};

// Données structurées JSON-LD pour le SEO local
export const getStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://alais-tavernier-naturopathe.netlify.app",
    "name": "Alaïs Tavernier - Naturopathe",
    "description": "Naturopathe et praticienne en massage bien-être à Vacqueyras. Consultations personnalisées, massage assis, rééquilibrage alimentaire.",
    "url": "https://alais-tavernier-naturopathe.netlify.app",
    "telephone": "+33781660929",
    "email": "contact@alais-tavernier.fr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "729 route de Sarrians",
      "addressLocality": "Vacqueyras",
      "postalCode": "84190",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "44.1397",
      "longitude": "4.9764"
    },
    "openingHours": [
      "Mo 09:00-17:00",
      "Th 09:00-17:00",
      "Sa 09:00-12:00"
    ],
    "priceRange": "€€",
    "image": "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1761924359406-1P.png",
    "logo": "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1761924359406-1P.png",
    "sameAs": [
      "https://www.instagram.com/lali_bellul/",
      "https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras"
    ],
    "serviceType": [
      "Naturopathie",
      "Massage bien-être",
      "Bilan de vitalité",
      "Rééquilibrage alimentaire"
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Vaucluse, Provence-Alpes-Côte d'Azur, France"
    }
  };
};