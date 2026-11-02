export const googlePlaceId = "ChIJG-MmWnE9HY0RX9u_WlAr-KU";
export const googleMapsUrl = `https://www.google.com/maps/search/?${new URLSearchParams({ api: "1", query: "Alaïs Tavernier", query_place_id: googlePlaceId })}`;
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

const plainText = (value) =>
  String(value || "")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .trim();
export function instagramProfileUrl(handle) {
  const username = plainText(handle).replace(/^@/, "").trim();
  return username
    ? `https://www.instagram.com/${encodeURIComponent(username)}/`
    : instagramUrl;
}
// Public coordinates are derived once from the editable cabinet details.
export function getBusinessProfile(content) {
  const footer = content.footer;
  const name = plainText(content.header?.brand?.name || footer.brand.name);
  const rawAddress = plainText(footer.contact.address)
    .replace(/\s*\n\s*/g, ", ")
    .replace(/\s+/g, " ");
  const parts = rawAddress.match(/^(.*?)\s*,?\s*(\d{5})\s+(.+)$/);
  const streetAddress = parts
    ? parts[1].replace(/,\s*$/, "").trim()
    : rawAddress;
  const postalCode = parts?.[2];
  const addressLocality = parts?.[3]?.trim();
  const displayAddress = parts
    ? `${streetAddress}, ${postalCode} ${addressLocality}`
    : rawAddress;
  const address = {
    "@type": "PostalAddress",
    streetAddress,
    addressCountry: "FR",
    ...(postalCode ? { postalCode, addressLocality } : {}),
  };
  const telephone = String(footer.contact.phone)
    .replace(/[^+\d]/g, "")
    .replace(/^0(?=\d{9}$)/, "+33");
  const query = `${name}, ${displayAddress}`;
  return {
    name,
    address,
    displayAddress,
    telephone,
    mapsUrl: `https://www.google.com/maps/search/?${new URLSearchParams({ api: "1", query, query_place_id: googlePlaceId })}`,
    directionsUrl: `https://www.google.com/maps/dir/?${new URLSearchParams({ api: "1", destination: query })}`,
    instagramUrl: instagramProfileUrl(footer.social?.instagram),
  };
}
