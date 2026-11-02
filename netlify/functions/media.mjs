import { getStore } from "@netlify/blobs";
export default async function handler(request) {
  if (!["GET", "HEAD"].includes(request.method))
    return new Response(null, { status: 405 });
  const key = new URL(request.url).pathname.split("/").pop();
  if (!/^[a-f0-9-]{36}\.webp$/.test(key || ""))
    return new Response(null, { status: 404 });
  const image = await getStore("cms-media").get(key, { type: "arrayBuffer" });
  if (!image) return new Response(null, { status: 404 });
  return new Response(request.method === "HEAD" ? null : image, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
export const config = { path: "/media/*" };
