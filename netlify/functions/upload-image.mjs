import sharp from "sharp";
import { randomUUID } from "node:crypto";
import { getStore } from "@netlify/blobs";
import { authorizeMutation, json } from "../lib/auth.mjs";
export default async function handler(request) {
  if (request.method !== "POST")
    return json({ error: "Méthode non autorisée." }, 405);
  const denied = authorizeMutation(request);
  if (denied) return denied;
  try {
    const input = Buffer.from(await request.arrayBuffer());
    if (input.length > 5 * 1024 * 1024)
      return json({ error: "Image trop volumineuse (5 Mo maximum)." }, 413);
    const image = sharp(input, { limitInputPixels: 25000000 });
    const metadata = await image.metadata();
    if (!["jpeg", "png", "webp", "avif"].includes(metadata.format))
      return json(
        { error: "Choisissez une photo JPG, PNG, WebP ou AVIF." },
        400,
      );
    const output = await image
      .rotate()
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82 })
      .toBuffer();
    const key = `${randomUUID()}.webp`;
    await getStore("cms-media").set(key, output, {
      metadata: { contentType: "image/webp" },
    });
    return json({ src: `/media/${key}` });
  } catch {
    return json(
      {
        error: "Cette image n’a pas pu être importée. Essayez une autre photo.",
      },
      400,
    );
  }
}
export const config = {
  path: "/api/cms/image",
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
