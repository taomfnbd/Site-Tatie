export const bookingUrl =
  "https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras";
export const instagramUrl = "https://www.instagram.com/lali_bellul/";
export const phoneHref = (phone) =>
  `tel:${String(phone).replace(/[^+\d]/g, "")}`;
export const publicRoutes = [
  "/",
  "/about",
  "/prestations",
  "/naturopathie",
  "/reflexologie",
  "/massage-assis",
  "/contact",
  "/mentions-legales",
  "/cgu",
  "/confidentialite",
];
export const routePageKeys = {
  "/": "home",
  "/about": "about",
  "/prestations": "services",
  "/naturopathie": "naturopathy",
  "/reflexologie": "reflexologie",
  "/massage-assis": "massage",
  "/contact": "contact",
  "/mentions-legales": "legal-notice",
  "/cgu": "terms-of-service",
};

export function breadcrumbItems(path) {
  const labels = {
    "/about": "À propos",
    "/prestations": "Prestations",
    "/naturopathie": "Naturopathie",
    "/reflexologie": "Réflexologie",
    "/massage-assis": "Massage assis",
    "/contact": "Contact",
    "/mentions-legales": "Mentions légales",
    "/cgu": "CGU",
    "/confidentialite": "Confidentialité",
  };
  if (!labels[path]) return [{ name: "Accueil", path: "/" }];
  return [
    { name: "Accueil", path: "/" },
    ...(["/naturopathie", "/reflexologie", "/massage-assis"].includes(path)
      ? [{ name: "Prestations", path: "/prestations" }]
      : []),
    { name: labels[path], path },
  ];
}
