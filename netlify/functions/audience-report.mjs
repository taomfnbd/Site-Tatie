import { getStore } from "@netlify/blobs";
import { authenticated, json } from "../lib/auth.mjs";
import { dayUTC, summarize } from "../lib/analytics.mjs";
export default async function handler(request) {
  if (request.method !== "GET")
    return json({ error: "Méthode non autorisée." }, 405);
  if (!authenticated(request))
    return json({ error: "Reconnectez-vous à l’administration." }, 401);
  const days = Number(new URL(request.url).searchParams.get("days") || 30);
  if (![7, 30, 90].includes(days))
    return json({ error: "Période invalide." }, 400);
  try {
    const store = getStore({ name: "audience-v1", consistency: "strong" });
    const records = [];
    // Limit concurrent reads and keep the report bounded to 360 aggregate records.
    for (let offset = 0; offset < days; offset += 7) {
      const jobs = [];
      for (let i = offset; i < Math.min(offset + 7, days); i++) {
        const day = dayUTC(new Date(Date.now() - i * 86400000));
        for (let shard = 0; shard < 4; shard++)
          jobs.push(
            store
              .get(`${day}/${shard}`, { type: "json" })
              .then((counts) => ({ day, counts })),
          );
      }
      records.push(...(await Promise.all(jobs)));
    }
    return json({
      ...summarize(records, days),
      generatedAt: new Date().toISOString(),
      retentionDays: 90,
      bookings: null,
    });
  } catch {
    return json({ error: "Statistiques indisponibles. Réessayez." }, 503);
  }
}
export const config = { path: "/api/admin/audience" };
