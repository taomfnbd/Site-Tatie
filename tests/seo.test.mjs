import { test } from "node:test";
import assert from "node:assert/strict";
import { publicRoutes } from "../src/utils/business.js";
import { getStructuredData, seoConfig } from "../src/utils/seo.js";
import { initialSiteContent } from "../src/data/siteContent.js";
test("each public page has a unique title, clean canonical and valid graph", () => {
  const titles = new Set();
  for (const path of publicRoutes) {
    const seo = seoConfig[path];
    assert.ok(seo);
    assert.ok(!seo.canonicalUrl.includes("/#/"));
    assert.ok(!titles.has(seo.title));
    titles.add(seo.title);
    assert.ok(getStructuredData(path)["@graph"].length);
  }
});
test("structured prices and FAQs use the live editable data", () => {
  const data = structuredClone(initialSiteContent);
  data.pages.services.find(
    (s) => s.type === "service_card",
  ).content.prices[0].price = "75€";
  const graph = getStructuredData("/naturopathie", data)["@graph"];
  assert.equal(
    graph.find((n) => n["@type"] === "Service").offers[0].price,
    "75",
  );
  const section = data.pages.naturopathy.find((s) => s.type === "faq");
  const items = section.content.items || section.content.questions;
  items[0].answer = "Une réponse modifiée.";
  const updated = getStructuredData("/naturopathie", data)["@graph"];
  assert.equal(
    updated.find((n) => n["@type"] === "FAQPage").mainEntity[0].acceptedAnswer
      .text,
    "Une réponse modifiée.",
  );
});
import { syncServicePrices } from "../src/utils/servicePrices.js";
test("catalogue and detail prices stay aligned in both editing directions", () => {
  const pages = structuredClone(initialSiteContent.pages);
  pages.services.find(
    (s) => s.content.linkUrl === "/naturopathie",
  ).content.prices[0].price = "80€";
  let synced = syncServicePrices(pages);
  assert.equal(
    synced.naturopathy.find((s) => s.type === "service_process").content
      .steps[0].price,
    "80€",
  );
  assert.equal(
    synced.naturopathy.find((s) => s.type === "service_cta").content.price,
    "80€",
  );
  const previous = structuredClone(synced.naturopathy);
  synced.naturopathy.find(
    (s) => s.type === "service_process",
  ).content.steps[0].price = "85€";
  synced = syncServicePrices(synced, "naturopathy", previous);
  assert.equal(
    synced.services.find((s) => s.content.linkUrl === "/naturopathie").content
      .prices[0].price,
    "85€",
  );
});
import { getPageSEO } from "../src/utils/seo.js";
import { resolveFAQItems } from "../src/utils/faq.js";
test("price changes propagate to metadata and visible/schema FAQ answers", () => {
  const content = structuredClone(initialSiteContent);
  content.pages.services.find(
    (s) => s.content.linkUrl === "/massage-assis",
  ).content.prices[0].price = "35€";
  const faq = content.pages.massage.find((s) => s.type === "faq").content;
  assert.match(
    resolveFAQItems(faq, content).find((q) => q.priceRef).answer,
    /35 €/,
  );
  assert.match(getPageSEO("/massage-assis", content).description, /35 €/);
  const schema = getStructuredData("/massage-assis", content)["@graph"].find(
    (n) => n["@type"] === "FAQPage",
  );
  assert.ok(
    schema.mainEntity.some((q) => q.acceptedAnswer.text.includes("35 €")),
  );
});
test("service breadcrumb includes its catalogue parent and linked practitioner identity", () => {
  const graph = getStructuredData("/reflexologie")["@graph"];
  assert.deepEqual(
    graph
      .find((n) => n["@type"] === "BreadcrumbList")
      .itemListElement.map((item) => item.name),
    ["Accueil", "Prestations", "Réflexologie"],
  );
  assert.ok(
    graph
      .find((n) => n["@type"] === "Person")
      .alumniOf.url.startsWith("https://aesculape.eu"),
  );
  assert.equal(
    graph.find((n) => Array.isArray(n["@type"])).telephone,
    "+33781660929",
  );
});
