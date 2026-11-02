import { readFile, writeFile, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { publicRoutes } from "../src/utils/business.js";
import {
  getPageSEO,
  getStructuredData,
  SITE_URL,
  getPageMeta,
} from "../src/utils/seo.js";
const { render } = await import(
  pathToFileURL(resolve(".prerender/entry-server.js")).href
);
const isPreview = !!process.env.CONTEXT && process.env.CONTEXT !== "production";
const template = await readFile("dist/index.html", "utf8");
const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const route of [...publicRoutes, "/404"]) {
  const seo = getPageSEO(route);
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${render(route)}</div>`,
  );
  html = html.replace(
    "<title>Site Alaïs Tavernier</title>",
    `<title>${escape(seo.title)}</title>`,
  );
  const metadata = getPageMeta(seo, isPreview)
    .map(
      ({ name, content, attribute }) =>
        `<meta ${attribute}="${escape(name)}" content="${escape(content)}">`,
    )
    .join("");
  const head = `${metadata}<link rel="canonical" href="${escape(seo.canonicalUrl)}"><script type="application/ld+json" id="structured-data">${JSON.stringify(getStructuredData(route)).replaceAll("<", "\\u003c")}</script>`;
  html = html.replace("</head>", head + "</head>");
  const directory = "dist";
  await mkdir(directory, { recursive: true });
  await writeFile(
    route === "/404"
      ? "dist/404.html"
      : route === "/"
        ? "dist/index.html"
        : `dist${route}.html`,
    html,
  );
}
const revision = execFileSync(
  "git",
  ["hash-object", "src/data/siteContent.js"],
  { encoding: "utf8" },
).trim();
await writeFile("dist/version.json", JSON.stringify({ revision }));
const date = execFileSync(
  "git",
  ["log", "-1", "--format=%cs", "--", "src/data/siteContent.js"],
  { encoding: "utf8" },
).trim();
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes.map((route) => `<url><loc>${SITE_URL}${route}</loc><lastmod>${date}</lastmod></url>`).join("")}</urlset>\n`,
);
console.log(`Pré-rendu : ${publicRoutes.length} pages + page 404.`);

if (isPreview)
  await writeFile("dist/_headers", "/*\n  X-Robots-Tag: noindex, nofollow\n");
