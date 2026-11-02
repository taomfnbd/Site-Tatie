import { getStore } from "@netlify/blobs";
import { authenticated, json, sameOrigin } from "../lib/auth.mjs";
import { increment, validateEvent } from "../lib/analytics.mjs";
export default async function handler(request, context) {
  if (request.method !== "POST")
    return json({ error: "Méthode non autorisée." }, 405);
  if (!sameOrigin(request))
    return json({ error: "Origine non autorisée." }, 403);
  if (
    context?.deploy?.context !== "production" ||
    authenticated(request) ||
    /bot|crawler|spider|headless|lighthouse/i.test(
      request.headers.get("user-agent") || "",
    )
  )
    return new Response(null, { status: 204 });
  try {
    const body = await request.text();
    if (body.length > 512)
      return json({ error: "Requête trop volumineuse." }, 413);
    const event = validateEvent(JSON.parse(body));
    if (!event) return json({ error: "Événement invalide." }, 400);
    await increment(
      getStore({ name: "audience-v1", consistency: "strong" }),
      event,
    );
    return new Response(null, {
      status: 204,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return json({ error: "Mesure indisponible." }, 503);
  }
}
export const config = {
  path: "/api/audience/event",
  rateLimit: { windowLimit: 60, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
