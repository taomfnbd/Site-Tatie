import { authorizeMutation, json } from "../lib/auth.mjs";
import { validateContent } from "../lib/content.mjs";
export default async function handler(request) {
  if (request.method !== "POST")
    return json({ error: "Méthode non autorisée." }, 405, { Allow: "POST" });
  const denied = authorizeMutation(request);
  if (denied) return denied;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text) > 500000)
      return json({ error: "Contenu trop volumineux." }, 413);
    const { content, revision } = JSON.parse(text);
    if (!/^[a-f0-9]{40}$/.test(revision || ""))
      return json(
        { error: "Version de départ invalide. Rechargez le site." },
        400,
      );
    const cleaned = validateContent(content);
    const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME } = process.env;
    if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME)
      return json({ error: "Publication temporairement indisponible." }, 503);
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/src/data/siteContent.js`;
    const branch = process.env.BRANCH || "main";
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    const currentResponse = await fetch(
      `${url}?ref=${encodeURIComponent(branch)}`,
      { headers },
    );
    if (!currentResponse.ok)
      return json({ error: "Impossible de vérifier la version publiée." }, 502);
    const current = await currentResponse.json();
    if (current.sha !== revision)
      return json(
        {
          error:
            "Le site a changé depuis votre dernière ouverture. Exportez votre brouillon, puis rechargez la version publiée avant de reprendre.",
        },
        409,
      );
    const source = `export const initialSiteContent = ${JSON.stringify(cleaned, null, 2)};\n`;
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: "Mise à jour du contenu via CMS",
        content: Buffer.from(source).toString("base64"),
        sha: revision,
        branch,
      }),
    });
    if (!response.ok)
      return json(
        {
          error:
            response.status === 409
              ? "Une autre modification vient d’être publiée. Rechargez le site avant de recommencer."
              : "La publication a échoué. Votre brouillon est conservé.",
        },
        response.status === 409 ? 409 : 502,
      );
    const result = await response.json();
    return json({
      success: true,
      revision: result.content.sha,
      commit: result.commit.sha,
    });
  } catch (error) {
    if (error instanceof SyntaxError)
      return json({ error: "Format JSON invalide." }, 400);
    if (error instanceof TypeError)
      return json(
        { error: "Service de publication indisponible. Réessayez plus tard." },
        502,
      );
    return json({ error: error.message || "Contenu invalide." }, 400);
  }
}
export const config = {
  path: "/api/cms/content",
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
