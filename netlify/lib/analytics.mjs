import { randomInt } from "node:crypto";
export const paths = [
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
export const events = [
  "pageview",
  "resalib",
  "phone",
  "email",
  "maps",
  "instagram",
];
export const sources = [
  "direct",
  "google",
  "bing",
  "social",
  "resalib",
  "other",
];
export const devices = ["mobile", "desktop"];
export function validateEvent(data) {
  if (
    !data ||
    data.consent !== true ||
    Object.keys(data).some(
      (k) => !["consent", "event", "path", "source", "device"].includes(k),
    )
  )
    return null;
  if (
    !events.includes(data.event) ||
    !paths.includes(data.path) ||
    !sources.includes(data.source) ||
    !devices.includes(data.device)
  )
    return null;
  return {
    event: data.event,
    path: data.path,
    source: data.source,
    device: data.device,
  };
}
export function dayUTC(now = new Date()) {
  return now.toISOString().slice(0, 10);
}
export async function increment(
  store,
  event,
  now = new Date(),
  shard = randomInt(4),
) {
  const key = `${dayUTC(now)}/${shard}`;
  const dimension = [event.event, event.path, event.source, event.device].join(
    "|",
  );
  for (let retry = 0; retry < 6; retry++) {
    const previous = await store.getWithMetadata(key, { type: "json" });
    const counts = previous?.data || {};
    counts[dimension] = (counts[dimension] || 0) + 1;
    const result = await store.setJSON(
      key,
      counts,
      previous ? { onlyIfMatch: previous.etag } : { onlyIfNew: true },
    );
    if (result.modified && result.etag) return;
    if (result.modified && !result.etag) throw new Error("Storage unavailable");
  }
  throw new Error("Concurrent updates");
}
export function summarize(records, days, now = new Date()) {
  const daily = {};
  for (let i = days - 1; i >= 0; i--)
    daily[dayUTC(new Date(now.getTime() - i * 86400000))] = Object.fromEntries(
      events.map((e) => [e, 0]),
    );
  const totals = Object.fromEntries(events.map((e) => [e, 0]));
  const pages = {},
    origins = {},
    screens = {};
  for (const { day, counts } of records) {
    if (!daily[day]) continue;
    for (const [key, count] of Object.entries(counts || {})) {
      const [event, path, source, device] = key.split("|");
      if (
        !validateEvent({ consent: true, event, path, source, device }) ||
        !Number.isSafeInteger(count) ||
        count < 0
      )
        continue;
      totals[event] += count;
      daily[day][event] += count;
      if (event === "pageview") {
        pages[path] = (pages[path] || 0) + count;
        origins[source] = (origins[source] || 0) + count;
        screens[device] = (screens[device] || 0) + count;
      }
    }
  }
  return {
    totals,
    pages,
    sources: origins,
    devices: screens,
    daily: Object.entries(daily).map(([day, counts]) => ({ day, ...counts })),
  };
}
