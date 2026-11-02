export const preferenceKey = "tatie-audience-choice-v1";
const lifetime = 180 * 86400000;
export function readChoice(now = Date.now()) {
  try {
    const saved = JSON.parse(localStorage.getItem(preferenceKey));
    return saved &&
      ["accepted", "refused"].includes(saved.value) &&
      Number.isFinite(saved.at) &&
      now - saved.at < lifetime &&
      saved.at <= now
      ? { value: saved.value, expiresAt: saved.at + lifetime }
      : null;
  } catch {
    return null;
  }
}
export function getChoice() {
  return readChoice()?.value || null;
}
export function saveChoice(value) {
  const at = Date.now();
  try {
    localStorage.setItem(preferenceKey, JSON.stringify({ value, at }));
  } catch {
    /* No storage: preference lasts for this page only. */
  }
  return at + lifetime;
}
export function campaignSource(search) {
  const params = new URLSearchParams(search);
  return params.get("utm_source") === "google" &&
    params.get("utm_medium") === "organic" &&
    params.get("utm_campaign") === "fiche_etablissement"
    ? "google_business"
    : null;
}
export function sourceCategory(referrer) {
  const campaign = campaignSource(window.location.search);
  if (campaign) return campaign;
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host === window.location.hostname) return "direct";
    if (/(^|\.)google\.[a-z.]+$/.test(host)) return "google";
    if (/(^|\.)bing\.com$/.test(host)) return "bing";
    if (
      /(^|\.)(instagram\.com|facebook\.com|l\.facebook\.com|t\.co|linkedin\.com)$/.test(
        host,
      )
    )
      return "social";
    if (/(^|\.)resalib\.fr$/.test(host)) return "resalib";
  } catch {
    /* Malformed referrer is never retained. */
  }
  return "other";
}
export function linkEvent(href) {
  try {
    const url = new URL(href, window.location.origin);
    if (url.protocol === "tel:") return "phone";
    if (url.protocol === "mailto:") return "email";
    if (/(^|\.)resalib\.fr$/.test(url.hostname)) return "resalib";
    if (/(^|\.)instagram\.com$/.test(url.hostname)) return "instagram";
    if (
      (/(^|\.)google\.[a-z.]+$/.test(url.hostname) &&
        (url.pathname.startsWith("/maps") ||
          url.hostname.startsWith("maps.google."))) ||
      url.hostname === "maps.app.goo.gl"
    )
      return "maps";
  } catch {
    /* Unknown links are ignored. */
  }
  return null;
}
