import { resolveFAQItems } from "./faq.js";
import { initialSiteContent } from "../data/siteContent.js";
import { routePageKeys, breadcrumbItems } from "./business.js";
// Utilitaires SEO pour optimiser le référencement
export const SITE_URL = "https://alais-tavernier-naturopathe.fr";
export const SITE_NAME = "Alaïs Tavernier - Naturopathe";
export const DEFAULT_IMAGE = `${SITE_URL}/images/photo-1-1200.webp`;

export const seoConfig = {
  "/": {
    title: "Naturopathe à Vacqueyras | Alaïs Tavernier",
    description:
      "Naturopathe à Vacqueyras, Alaïs Tavernier propose naturopathie, réflexologie et massage assis. Consultez les tarifs et réservez votre séance au cabinet.",
    keywords:
      "naturopathe Vacqueyras, naturopathie Vaucluse, bilan de vitalité, gestion du stress, massage assis Vacqueyras",
    canonicalUrl: `${SITE_URL}/`,
  },
  "/about": {
    title: "À propos | Alaïs Tavernier Naturopathe",
    description:
      "Découvrez le parcours d’Alaïs Tavernier, naturopathe et praticienne en massage bien-être à Vacqueyras.",
    keywords:
      "Alaïs Tavernier, naturopathe Vacqueyras, parcours naturopathe, bien-être Vaucluse",
    canonicalUrl: `${SITE_URL}/about`,
  },
  "/prestations": {
    title: "Naturopathie, réflexologie & massage | Vacqueyras",
    description:
      "Naturopathie, réflexologie et massage assis à Vacqueyras : découvrez le déroulement, la durée et les tarifs des séances avec Alaïs Tavernier.",
    keywords:
      "prestations naturopathe, tarifs naturopathie, massage assis, consultation naturopathe Vaucluse",
    canonicalUrl: `${SITE_URL}/prestations`,
  },
  "/naturopathie": {
    title: "Naturopathie à Vacqueyras | Bilan de vitalité",
    description:
      "Consultation de naturopathie à Vacqueyras : bilan de vitalité, conseils alimentaires, hygiène de vie, stress, sommeil et accompagnement personnalisé.",
    keywords:
      "naturopathie Vacqueyras, bilan de vitalité, troubles digestifs, gestion stress, rééquilibrage alimentaire",
    canonicalUrl: `${SITE_URL}/naturopathie`,
  },
  "/reflexologie": {
    title: "Réflexologie à Vacqueyras | Séance de détente naturelle",
    description:
      "Réflexologie à Vacqueyras avec Alaïs Tavernier : déroulement, séance de 1h à 60 €, suivi de 45 min à 50 €. Réservez un temps de détente au cabinet.",
    keywords:
      "réflexologie Vacqueyras, réflexologie plantaire, détente naturelle, gestion stress, troubles du sommeil, bien-être Vaucluse",
    canonicalUrl: `${SITE_URL}/reflexologie`,
  },
  "/massage-assis": {
    title: "Massage assis à Vacqueyras | Séance détente 30 min",
    description:
      "Massage assis habillé à Vacqueyras : séance de 30 minutes pour relâcher dos, nuque, épaules, bras et mains. Tarif : 30 euros.",
    keywords:
      "massage assis Vacqueyras, massage habillé, détente, tensions dos nuque, relaxation Vaucluse",
    canonicalUrl: `${SITE_URL}/massage-assis`,
  },
  "/contact": {
    title: "Contact & rendez-vous | Alaïs Tavernier Vacqueyras",
    description:
      "Contactez Alaïs Tavernier, naturopathe à Vacqueyras. Téléphone : 07 81 66 09 29. Rendez-vous en ligne via Resalib.",
    keywords:
      "contact naturopathe Vacqueyras, rendez-vous naturopathe, horaires consultation, téléphone naturopathe",
    canonicalUrl: `${SITE_URL}/contact`,
  },
  "/mentions-legales": {
    title: "Mentions légales | Alaïs Tavernier Naturopathe",
    description:
      "Mentions légales du site Alaïs Tavernier Naturopathe : éditeur, hébergeur, activité, responsabilité et données personnelles.",
    keywords: "mentions légales, naturopathe Vacqueyras",
    canonicalUrl: `${SITE_URL}/mentions-legales`,
  },
  "/cgu": {
    title: "Conditions générales d’utilisation | Alaïs Tavernier",
    description:
      "Conditions générales d’utilisation du site Alaïs Tavernier Naturopathe : accès, contenu, responsabilité, propriété intellectuelle et contact.",
    keywords: "CGU, conditions générales, naturopathe Vacqueyras",
    canonicalUrl: `${SITE_URL}/cgu`,
  },
};

export function getPageSEO(path, content = initialSiteContent) {
  const config = seoConfig[path] || seoConfig["/404"];
  const card = content.pages?.services?.find(
    (section) =>
      section.type === "service_card" && section.content.linkUrl === path,
  )?.content;
  if (!card?.prices?.length) return config;
  const prices = card.prices
    .map(
      (price) =>
        `${price.type.toLowerCase()} ${price.duration} à ${price.price.replace("€", " €")}`,
    )
    .join(", ");
  return {
    ...config,
    description: `${card.title} à Vacqueyras avec Alaïs Tavernier : ${prices}. Découvrez la séance et réservez au cabinet.`,
  };
}

export const updatePageSEO = (pageData) => {
  const { title, description, keywords, canonicalUrl, noindex } = pageData;

  if (title) {
    document.title = title;
  }

  updateMetaTag("description", description);
  updateMetaTag("keywords", keywords);
  updateMetaTag(
    "robots",
    noindex || (typeof __IS_PREVIEW__ !== "undefined" && __IS_PREVIEW__)
      ? "noindex,follow"
      : "index,follow,max-image-preview:large",
  );
  updateMetaTag("author", "Alaïs Tavernier");
  updateMetaTag("geo.region", "FR-84");
  updateMetaTag("geo.placename", "Vacqueyras");

  updateMetaTag("og:title", title, "property");
  updateMetaTag("og:description", description, "property");
  updateMetaTag("og:url", canonicalUrl || window.location.href, "property");
  updateMetaTag("og:type", "website", "property");
  updateMetaTag("og:image", DEFAULT_IMAGE, "property");
  updateMetaTag(
    "og:image:alt",
    "Alaïs Tavernier, naturopathe et praticienne en massage bien-être à Vacqueyras",
    "property",
  );
  updateMetaTag("og:locale", "fr_FR", "property");
  updateMetaTag("og:site_name", SITE_NAME, "property");

  updateMetaTag("twitter:card", "summary_large_image", "name");
  updateMetaTag("twitter:title", title, "name");
  updateMetaTag("twitter:description", description, "name");
  updateMetaTag("twitter:image", DEFAULT_IMAGE, "name");
  updateMetaTag(
    "twitter:image:alt",
    "Alaïs Tavernier, naturopathe et praticienne en massage bien-être à Vacqueyras",
    "name",
  );

  updateCanonicalUrl(canonicalUrl);
  updateAlternateUrl(canonicalUrl);
};

const updateMetaTag = (name, content, attribute = "name") => {
  if (!content) return;

  let meta = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
};

const updateCanonicalUrl = (url) => {
  if (!url) return;

  let canonical = document.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
};

const updateAlternateUrl = (url) => {
  if (!url) return;

  let alternate = document.querySelector(
    'link[rel="alternate"][hreflang="fr-FR"]',
  );

  if (!alternate) {
    alternate = document.createElement("link");
    alternate.setAttribute("rel", "alternate");
    alternate.setAttribute("hreflang", "fr-FR");
    document.head.appendChild(alternate);
  }

  alternate.setAttribute("href", url);
};

seoConfig["/confidentialite"] = {
  title: "Confidentialité | Alaïs Tavernier",
  description:
    "Comment sont utilisées vos données lors de la consultation du site et de vos échanges avec Alaïs Tavernier, naturopathe à Vacqueyras.",
  canonicalUrl: `${SITE_URL}/confidentialite`,
};
seoConfig["/404"] = {
  title: "Page introuvable | Alaïs Tavernier",
  description:
    "Cette page est introuvable. Retrouvez les prestations et les coordonnées du cabinet.",
  canonicalUrl: `${SITE_URL}/404`,
  noindex: true,
};
const plain = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, "")
    .trim();
export function getStructuredData(path = "/", content = initialSiteContent) {
  if (!seoConfig[path])
    return { "@context": "https://schema.org", "@graph": [] };
  const seo = getPageSEO(path, content);
  if (seo.noindex) return { "@context": "https://schema.org", "@graph": [] };
  const footer = content.footer || initialSiteContent.footer;
  const pages = content.pages || initialSiteContent.pages;
  const cards = pages.services.filter((s) => s.type === "service_card");
  const services = cards.map((card) => {
    const data = card.content;
    return {
      "@type": "Service",
      "@id": `${SITE_URL}${data.linkUrl}#service`,
      name: data.title,
      description: plain(data.description),
      provider: { "@id": `${SITE_URL}/#localbusiness` },
      areaServed: { "@type": "City", name: "Vacqueyras" },
      offers: (data.prices || []).map((price) => ({
        "@type": "Offer",
        name: price.type,
        price: String(price.price)
          .replace(/[^\d.,]/g, "")
          .replace(",", "."),
        priceCurrency: "EUR",
        url: `${SITE_URL}${data.linkUrl}`,
      })),
    };
  });
  const prices = services
    .flatMap((service) => service.offers.map((offer) => Number(offer.price)))
    .filter(Number.isFinite);
  const business = {
    "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: `${content.header?.brand?.name || "Alaïs Tavernier"} - Naturopathe`,
    description: "Naturopathie, réflexologie et massage assis à Vacqueyras.",
    url: SITE_URL,
    telephone: String(footer.contact.phone)
      .replace(/[^+\d]/g, "")
      .replace(/^0/, "+33"),
    image: DEFAULT_IMAGE,
    logo: `${SITE_URL}/images/libellule-3.png`,
    priceRange: `${Math.min(...prices)}€–${Math.max(...prices)}€`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "729 route de Sarrians",
      addressLocality: "Vacqueyras",
      postalCode: "84190",
      addressCountry: "FR",
    },
    founder: { "@id": `${SITE_URL}/#person` },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plain(footer.contact.address.replace(/<br\s*\/?>/gi, ", ")))}`,
    sameAs: [
      `https://www.instagram.com/${footer.social.instagram}/`,
      "https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations de bien-être",
      itemListElement: services.flatMap((service) =>
        service.offers.map((offer) => ({
          ...offer,
          itemOffered: { "@id": service["@id"] },
        })),
      ),
    },
  };
  const address = footer.contact.address.split(/<br\s*\/?>(?:\s*)/i).map(plain);
  const city = address[1]?.match(/(\d{5})\s+(.+)/);
  if (city)
    business.address = {
      ...business.address,
      streetAddress: address[0],
      postalCode: city[1],
      addressLocality: city[2],
    };
  const days = {
    Lundi: "Monday",
    Mardi: "Tuesday",
    Mercredi: "Wednesday",
    Jeudi: "Thursday",
    Vendredi: "Friday",
    Samedi: "Saturday",
    Dimanche: "Sunday",
  };
  business.openingHoursSpecification = (footer.schedule || []).flatMap(
    (day) => {
      const hours = day.hours.match(
        /(\d{1,2})h(\d{2})?\s*[–-]\s*(\d{1,2})h(\d{2})?/,
      );
      return hours && days[day.day]
        ? [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: days[day.day],
              opens: `${hours[1].padStart(2, "0")}:${hours[2] || "00"}`,
              closes: `${hours[3].padStart(2, "0")}:${hours[4] || "00"}`,
            },
          ]
        : [];
    },
  );
  const graph = [
    business,
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: content.header?.brand?.name || "Alaïs Tavernier",
      jobTitle:
        "Naturopathe et praticienne en réflexologie et massage bien-être",
      url: `${SITE_URL}/about`,
      image: DEFAULT_IMAGE,
      worksFor: { "@id": `${SITE_URL}/#localbusiness` },
      sameAs: business.sameAs,
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Æsculape, école libre de naturopathie",
        url: "https://aesculape.eu/",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#localbusiness` },
    },
    {
      "@type":
        path === "/about"
          ? "AboutPage"
          : path === "/contact"
            ? "ContactPage"
            : "WebPage",
      "@id": `${seo.canonicalUrl}#webpage`,
      url: seo.canonicalUrl,
      name: seo.title,
      description: seo.description,
      inLanguage: "fr-FR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#localbusiness` },
      about: {
        "@id":
          path === "/about"
            ? `${SITE_URL}/#person`
            : `${SITE_URL}/#localbusiness`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${seo.canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbItems(path).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    },
  ];
  if (path === "/prestations" || path === "/") graph.push(...services);
  else {
    const service = services.find(
      (item) => item.offers[0]?.url === `${SITE_URL}${path}`,
    );
    if (service) graph.push(service);
  }
  const faq = pages[routePageKeys[path]]?.find(
    (section) => section.type === "faq",
  )?.content;
  const questions = faq ? resolveFAQItems(faq, { ...content, pages }) : [];
  if (questions.length)
    graph.push({
      "@type": "FAQPage",
      "@id": `${seo.canonicalUrl}#faq`,
      mainEntity: questions.map((item) => ({
        "@type": "Question",
        name: plain(item.question),
        acceptedAnswer: { "@type": "Answer", text: plain(item.answer) },
      })),
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
