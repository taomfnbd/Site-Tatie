// Utilitaires SEO pour optimiser le référencement
export const SITE_URL = 'https://alais-tavernier-naturopathe.fr';
export const SITE_NAME = 'Alaïs Tavernier - Naturopathe';
export const DEFAULT_IMAGE = 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1761924359406-1P.png';

export const seoConfig = {
  '/': {
    title: 'Alaïs Tavernier | Naturopathe à Vacqueyras',
    description: 'Naturopathe à Vacqueyras, Alaïs Tavernier accompagne votre vitalité avec bilan personnalisé, conseils naturels, gestion du stress et massage assis.',
    keywords: 'naturopathe Vacqueyras, naturopathie Vaucluse, bilan de vitalité, gestion du stress, massage assis Vacqueyras',
    canonicalUrl: `${SITE_URL}/`
  },
  '/about': {
    title: 'À propos | Alaïs Tavernier Naturopathe',
    description: 'Découvrez le parcours d’Alaïs Tavernier, naturopathe et praticienne en massage bien-être à Vacqueyras.',
    keywords: 'Alaïs Tavernier, naturopathe Vacqueyras, parcours naturopathe, bien-être Vaucluse',
    canonicalUrl: `${SITE_URL}/about`
  },
  '/prestations': {
    title: 'Prestations naturopathie & massage assis | Vacqueyras',
    description: 'Découvrez les prestations d’Alaïs Tavernier : bilan de vitalité, suivi naturopathique personnalisé et massage assis de 30 minutes à Vacqueyras.',
    keywords: 'prestations naturopathe, tarifs naturopathie, massage assis, consultation naturopathe Vaucluse',
    canonicalUrl: `${SITE_URL}/prestations`
  },
  '/naturopathie': {
    title: 'Naturopathie à Vacqueyras | Bilan de vitalité',
    description: 'Consultation de naturopathie à Vacqueyras : bilan de vitalité, conseils alimentaires, hygiène de vie, stress, sommeil et accompagnement personnalisé.',
    keywords: 'naturopathie Vacqueyras, bilan de vitalité, troubles digestifs, gestion stress, rééquilibrage alimentaire',
    canonicalUrl: `${SITE_URL}/naturopathie`
  },
  '/massage-assis': {
    title: 'Massage assis à Vacqueyras | Séance détente 30 min',
    description: 'Massage assis habillé à Vacqueyras : séance de 30 minutes pour relâcher dos, nuque, épaules, bras et mains. Tarif : 30 euros.',
    keywords: 'massage assis Vacqueyras, massage habillé, détente, tensions dos nuque, relaxation Vaucluse',
    canonicalUrl: `${SITE_URL}/massage-assis`
  },
  '/contact': {
    title: 'Contact & rendez-vous | Alaïs Tavernier Vacqueyras',
    description: 'Contactez Alaïs Tavernier, naturopathe à Vacqueyras. Téléphone : 07 81 66 09 29. Rendez-vous en ligne via Resalib.',
    keywords: 'contact naturopathe Vacqueyras, rendez-vous naturopathe, horaires consultation, téléphone naturopathe',
    canonicalUrl: `${SITE_URL}/contact`
  },
  '/mentions-legales': {
    title: 'Mentions légales | Alaïs Tavernier Naturopathe',
    description: 'Mentions légales du site Alaïs Tavernier Naturopathe : éditeur, hébergeur, activité, responsabilité et données personnelles.',
    keywords: 'mentions légales, naturopathe Vacqueyras',
    canonicalUrl: `${SITE_URL}/mentions-legales`
  },
  '/cgu': {
    title: 'Conditions générales d’utilisation | Alaïs Tavernier',
    description: 'Conditions générales d’utilisation du site Alaïs Tavernier Naturopathe : accès, contenu, responsabilité, propriété intellectuelle et contact.',
    keywords: 'CGU, conditions générales, naturopathe Vacqueyras',
    canonicalUrl: `${SITE_URL}/cgu`
  }
};

export const updatePageSEO = (pageData) => {
  const { title, description, keywords, canonicalUrl } = pageData;

  if (title) {
    document.title = title;
  }

  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);
  updateMetaTag('robots', 'index,follow,max-image-preview:large');
  updateMetaTag('author', 'Alaïs Tavernier');
  updateMetaTag('geo.region', 'FR-84');
  updateMetaTag('geo.placename', 'Vacqueyras');

  updateMetaTag('og:title', title, 'property');
  updateMetaTag('og:description', description, 'property');
  updateMetaTag('og:url', canonicalUrl || window.location.href, 'property');
  updateMetaTag('og:type', 'website', 'property');
  updateMetaTag('og:image', DEFAULT_IMAGE, 'property');
  updateMetaTag('og:image:alt', 'Alaïs Tavernier, naturopathe et praticienne en massage bien-être à Vacqueyras', 'property');
  updateMetaTag('og:locale', 'fr_FR', 'property');
  updateMetaTag('og:site_name', SITE_NAME, 'property');

  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', title, 'name');
  updateMetaTag('twitter:description', description, 'name');
  updateMetaTag('twitter:image', DEFAULT_IMAGE, 'name');
  updateMetaTag('twitter:image:alt', 'Alaïs Tavernier, naturopathe et praticienne en massage bien-être à Vacqueyras', 'name');

  updateCanonicalUrl(canonicalUrl);
  updateAlternateUrl(canonicalUrl);
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

const updateAlternateUrl = (url) => {
  if (!url) return;

  let alternate = document.querySelector('link[rel="alternate"][hreflang="fr-FR"]');

  if (!alternate) {
    alternate = document.createElement('link');
    alternate.setAttribute('rel', 'alternate');
    alternate.setAttribute('hreflang', 'fr-FR');
    document.head.appendChild(alternate);
  }

  alternate.setAttribute('href', url);
};

const practitioner = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Alaïs Tavernier',
  jobTitle: 'Naturopathe et praticienne en massage bien-être',
  url: SITE_URL,
  sameAs: [
    'https://www.instagram.com/lali_bellul/',
    'https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras'
  ]
};

const localBusiness = {
  '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'Alaïs Tavernier - Naturopathe',
  description: 'Naturopathe et praticienne en massage bien-être à Vacqueyras. Accompagnement personnalisé en naturopathie, bilan de vitalité et massage assis.',
  url: SITE_URL,
  telephone: '+33781660929',
  email: 'alais.tavernier@gmail.com',
  image: DEFAULT_IMAGE,
  logo: DEFAULT_IMAGE,
  priceRange: '30€-70€',
  founder: { '@id': `${SITE_URL}/#person` },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '729 route de Sarrians',
    addressLocality: 'Vacqueyras',
    postalCode: '84190',
    addressCountry: 'FR'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '44.1397',
    longitude: '4.9764'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Thursday'],
      opens: '09:00',
      closes: '17:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '12:00'
    }
  ],
  sameAs: [
    'https://www.instagram.com/lali_bellul/',
    'https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras'
  ],
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: 'Vaucluse'
    },
    {
      '@type': 'City',
      name: 'Vacqueyras'
    }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Prestations de bien-être',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Première consultation de naturopathie',
        price: '70',
        priceCurrency: 'EUR',
        itemOffered: { '@id': `${SITE_URL}/naturopathie#service` }
      },
      {
        '@type': 'Offer',
        name: 'Consultation de suivi en naturopathie',
        price: '50',
        priceCurrency: 'EUR',
        itemOffered: { '@id': `${SITE_URL}/naturopathie#service` }
      },
      {
        '@type': 'Offer',
        name: 'Massage assis',
        price: '30',
        priceCurrency: 'EUR',
        itemOffered: { '@id': `${SITE_URL}/massage-assis#service` }
      }
    ]
  }
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'fr-FR',
  publisher: { '@id': `${SITE_URL}/#localbusiness` }
};

const services = {
  '/naturopathie': {
    '@type': 'Service',
    '@id': `${SITE_URL}/naturopathie#service`,
    name: 'Consultation de naturopathie',
    serviceType: "Naturopathie, bilan de vitalité et conseils d'hygiène de vie",
    description: "Accompagnement personnalisé pour soutenir la vitalité par l'alimentation, l'hygiène de vie, la gestion du stress et l'équilibre naturel.",
    provider: { '@id': `${SITE_URL}/#localbusiness` },
    areaServed: { '@type': 'City', name: 'Vacqueyras' },
    offers: [
      {
        '@type': 'Offer',
        name: 'Première consultation',
        price: '70',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/naturopathie`
      },
      {
        '@type': 'Offer',
        name: 'Séance de suivi',
        price: '50',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/naturopathie`
      }
    ]
  },
  '/massage-assis': {
    '@type': 'Service',
    '@id': `${SITE_URL}/massage-assis#service`,
    name: 'Massage assis',
    serviceType: 'Massage assis habillé sans huile',
    description: 'Séance de massage assis de 30 minutes ciblant dos, nuque, épaules, bras et mains pour relâcher les tensions.',
    provider: { '@id': `${SITE_URL}/#localbusiness` },
    areaServed: { '@type': 'City', name: 'Vacqueyras' },
    offers: {
      '@type': 'Offer',
      name: 'Séance complète de massage assis',
      price: '30',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/massage-assis`
    }
  }
};

const faqByPath = {
  '/naturopathie': [
    {
      question: 'À quoi sert un bilan de vitalité ?',
      answer: "Le bilan de vitalité permet d'identifier vos habitudes, votre rythme de vie, votre alimentation, votre niveau de stress et vos besoins prioritaires afin de proposer des conseils naturels personnalisés."
    },
    {
      question: 'La naturopathie remplace-t-elle un médecin ?',
      answer: 'Non. La naturopathie est une approche complémentaire de bien-être. Elle ne pose pas de diagnostic, ne prescrit pas de traitement et ne remplace jamais une consultation médicale.'
    },
    {
      question: 'Combien de temps dure une première consultation ?',
      answer: 'La première consultation dure environ 1h30. Elle comprend un échange approfondi et un bilan de vitalité pour construire un accompagnement adapté.'
    },
    {
      question: 'Quels sujets peut-on aborder en consultation ?',
      answer: "Les consultations peuvent aborder la digestion, l'alimentation, la fatigue, le stress, le sommeil, la peau, les cycles féminins et les changements de rythme de vie."
    }
  ],
  '/massage-assis': [
    {
      question: 'Faut-il se déshabiller pour un massage assis ?',
      answer: 'Non. Le massage assis se pratique habillé, sans huile, sur une chaise de massage adaptée.'
    },
    {
      question: 'Combien de temps dure la séance ?',
      answer: 'La séance de massage assis dure environ 30 minutes. Elle cible les zones de tension les plus fréquentes : dos, nuque, épaules, bras et mains.'
    },
    {
      question: "À qui s'adresse le massage assis ?",
      answer: "Le massage assis s'adresse aux personnes qui souhaitent une pause détente rapide, notamment en cas de stress, de tensions musculaires ou de besoin de récupération."
    },
    {
      question: "Quel est le tarif d'un massage assis ?",
      answer: "Le tarif d'une séance complète de massage assis est de 30 euros."
    }
  ]
};

const pageNames = {
  '/': 'Accueil',
  '/about': 'À propos',
  '/prestations': 'Prestations',
  '/naturopathie': 'Naturopathie',
  '/massage-assis': 'Massage assis',
  '/contact': 'Contact',
  '/mentions-legales': 'Mentions légales',
  '/cgu': 'Conditions générales d’utilisation'
};

const getWebPage = (path, pageData) => ({
  '@type': 'WebPage',
  '@id': `${pageData.canonicalUrl}#webpage`,
  url: pageData.canonicalUrl,
  name: pageData.title,
  description: pageData.description,
  inLanguage: 'fr-FR',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: path === '/' ? { '@id': `${SITE_URL}/#localbusiness` } : undefined,
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: DEFAULT_IMAGE
  }
});

const getBreadcrumb = (path) => {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: `${SITE_URL}/`
    }
  ];

  if (path !== '/') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: pageNames[path] || 'Page',
      item: `${SITE_URL}${path}`
    });
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${path === '/' ? '' : path}#breadcrumb`,
    itemListElement: items
  };
};

const getFAQPage = (path) => {
  const questions = faqByPath[path];
  if (!questions) return null;

  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${path}#faq`,
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
};

export const getStructuredData = (path = '/') => {
  const pageData = seoConfig[path] || seoConfig['/'];
  const graph = [
    practitioner,
    localBusiness,
    website,
    getWebPage(path, pageData),
    getBreadcrumb(path)
  ];

  if (path === '/prestations') {
    graph.push(services['/naturopathie'], services['/massage-assis']);
    graph.push({
      '@type': 'ItemList',
      '@id': `${SITE_URL}/prestations#services`,
      name: 'Prestations proposées',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: { '@id': `${SITE_URL}/naturopathie#service` }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: { '@id': `${SITE_URL}/massage-assis#service` }
        }
      ]
    });
  }

  if (services[path]) {
    graph.push(services[path]);
  }

  const faq = getFAQPage(path);
  if (faq) {
    graph.push(faq);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph.filter(Boolean).map((node) => {
      const cleanNode = { ...node };
      Object.keys(cleanNode).forEach((key) => cleanNode[key] === undefined && delete cleanNode[key]);
      return cleanNode;
    })
  };
};
