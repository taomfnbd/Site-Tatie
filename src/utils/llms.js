import { initialSiteContent } from "../data/siteContent.js";
import { bookingUrl, getBusinessProfile } from "./business.js";
import { SITE_URL, remoteServices } from "./seo.js";

const plain = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, "")
    .trim();

const listFr = (items) =>
  items.length > 1
    ? `${items.slice(0, -1).join(", ")} et ${items.at(-1)}`
    : items.join("");

// Plain-text summary for AI assistants (llms.txt), built from the same
// editable content as the pages so prices and hours never drift.
export function buildLlmsTxt(content = initialSiteContent) {
  const profile = getBusinessProfile(content);
  const cards = content.pages.services.filter(
    (section) => section.type === "service_card",
  );
  const openDays = content.footer.schedule
    .filter((day) => !/ferm/i.test(day.hours))
    .map((day) => `${day.day} ${day.hours}`)
    .join(", ");
  const services = cards.map(({ content: card }) => {
    const prices = card.prices
      .map(
        (price) =>
          `${price.type} ${price.duration} : ${price.price.replace("€", " €")}`,
      )
      .join(" ; ");
    const place = remoteServices.includes(card.linkUrl)
      ? "au cabinet ou en visio"
      : "au cabinet";
    return `- [${card.title}](${SITE_URL}${card.linkUrl}) : ${plain(card.description)} Séance ${place}. Tarifs : ${prices}.`;
  });
  const lowerFirst = (title) => title.charAt(0).toLowerCase() + title.slice(1);
  const titles = cards.map(({ content: card }) => lowerFirst(card.title));
  const remoteTitles = cards
    .filter(({ content: card }) => remoteServices.includes(card.linkUrl))
    .map(({ content: card }) => `les ${lowerFirst(card.title)}`);
  return [
    `# ${profile.name} - Naturopathe à Vacqueyras (Vaucluse)`,
    "",
    `> ${profile.name} est naturopathe à Vacqueyras, dans le Vaucluse (84). Elle propose ${listFr(titles)}, au cabinet${remoteTitles.length ? ` et, pour ${listFr(remoteTitles)}, en visio` : ""}.`,
    "",
    "## Coordonnées",
    `- Adresse : ${profile.displayAddress}`,
    `- Téléphone : ${plain(content.footer.contact.phone)}`,
    `- Réservation en ligne : ${bookingUrl}`,
    `- Horaires : ${openDays}, sur rendez-vous`,
    "",
    "## Prestations",
    ...services,
    "",
    "## Pages utiles",
    `- [Prestations et tarifs](${SITE_URL}/prestations)`,
    `- [Parcours de la praticienne](${SITE_URL}/about)`,
    `- [Contact et itinéraire](${SITE_URL}/contact)`,
    "",
    "## Cadre",
    "- Prestations de bien-être : elles ne posent pas de diagnostic et ne remplacent pas un suivi médical.",
    "",
  ].join("\n");
}
