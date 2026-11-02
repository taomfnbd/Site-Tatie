import {
  createSession,
  json,
  passwordValid,
  sameOrigin,
  sessionCookie,
} from "../lib/auth.mjs";
export default async function handler(request) {
  if (request.method !== "POST")
    return json({ error: "Méthode non autorisée." }, 405, { Allow: "POST" });
  if (!sameOrigin(request))
    return json({ error: "Origine non autorisée." }, 403);
  try {
    if (!process.env.ADMIN_PASSWORD_HASH || !process.env.ADMIN_SESSION_SECRET)
      return json({ error: "Connexion temporairement indisponible." }, 503);
    if (Number(request.headers.get("content-length") || 0) > 2048)
      return json({ error: "Requête trop volumineuse." }, 413);
    const { password } = await request.json();
    if (!passwordValid(password))
      return json({ error: "Mot de passe incorrect." }, 401);
    return json({ authenticated: true }, 200, {
      "Set-Cookie": sessionCookie(createSession()),
    });
  } catch {
    return json({ error: "Requête invalide." }, 400);
  }
}
export const config = {
  path: "/api/admin/login",
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
