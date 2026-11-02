import { syncServicePrices } from "../../src/utils/servicePrices.js";
import { cleanHTML } from "../../src/utils/sanitize.js";
const sectionTypes = new Set([
  "hero",
  "about",
  "cta",
  "home_services",
  "services_list",
  "services_header",
  "service_card",
  "service_hero",
  "service_content",
  "service_process",
  "service_process_cards",
  "service_benefits",
  "service_cta",
  "contact_hero",
  "contact_details",
  "legal_content",
  "faq",
]);
const pageKeys = [
  "home",
  "about",
  "services",
  "naturopathy",
  "reflexologie",
  "massage",
  "contact",
  "legal-notice",
  "terms-of-service",
];
export function validateContent(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Contenu invalide.");
  if (
    Object.keys(value).some((k) => !["header", "footer", "pages"].includes(k))
  )
    throw new Error("Champ inconnu.");
  if (
    !value.header?.brand?.name ||
    !Array.isArray(value.header.links) ||
    !value.footer?.contact?.phone ||
    !value.pages
  )
    throw new Error("Informations essentielles manquantes.");
  if (Object.keys(value.pages).some((k) => !pageKeys.includes(k)))
    throw new Error("Page inconnue.");
  for (const key of pageKeys) {
    const sections = value.pages[key];
    if (!Array.isArray(sections) || sections.length < 1 || sections.length > 30)
      throw new Error(`Sections invalides : ${key}`);
    const headings = sections.filter(
      (section) =>
        [
          "hero",
          "services_header",
          "services_list",
          "service_hero",
          "contact_hero",
          "legal_content",
        ].includes(section.type) ||
        (section.type === "about" && section.content?.isPage),
    );
    if (headings.length !== 1)
      throw new Error(
        `Chaque page doit conserver un titre principal unique : ${key}`,
      );
    const ids = new Set();
    for (const section of sections) {
      if (
        !sectionTypes.has(section.type) ||
        typeof section.id !== "string" ||
        ids.has(section.id) ||
        !section.content ||
        typeof section.content !== "object" ||
        Array.isArray(section.content)
      )
        throw new Error(`Section invalide : ${key}`);
      ids.add(section.id);
    }
  }
  const walk = (node, depth = 0, key = "") => {
    if (depth > 15) throw new Error("Contenu trop imbriqué.");
    if (typeof node === "string") {
      if (node.length > 50000) throw new Error("Texte trop long.");
      if (/(url|src|href)$/i.test(key)) {
        if (
          !/^(\/(?!\/)|https:\/\/|mailto:|tel:)/i.test(node) ||
          /[\\]/.test(node) ||
          [...node].some((char) => char.charCodeAt(0) < 32)
        )
          throw new Error("Adresse non autorisée.");
        if (
          /(imageUrl|src)$/i.test(key) &&
          !/^\/(images\/|media\/)/.test(node) &&
          !/^https:\/\/(raw\.githubusercontent\.com|quest-media-storage-bucket\.s3\.us-east-2\.amazonaws\.com)\//.test(
            node,
          )
        )
          throw new Error("Importez cette image dans la médiathèque.");
        return node;
      }
      return node.includes("<") ? cleanHTML(node) : node;
    }
    if (Array.isArray(node)) {
      if (node.length > 100) throw new Error("Liste trop longue.");
      return node.map((v) => walk(v, depth + 1, key));
    }
    if (node && typeof node === "object")
      return Object.fromEntries(
        Object.entries(node).map(([k, v]) => {
          if (["__proto__", "prototype", "constructor"].includes(k))
            throw new Error("Clé interdite.");
          return [k, walk(v, depth + 1, k)];
        }),
      );
    if (node === null || typeof node === "number" || typeof node === "boolean")
      return node;
    throw new Error("Valeur invalide.");
  };
  const result = walk(value);
  result.pages = syncServicePrices(result.pages);
  return result;
}
