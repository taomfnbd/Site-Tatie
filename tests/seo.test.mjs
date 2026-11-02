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

import { getPageMeta } from "../src/utils/seo.js";
test("static and browser metadata share descriptions, social URLs, image details and indexation policy", () => {
  for (const route of publicRoutes) {
    const seo = getPageSEO(route);
    const tags = getPageMeta(seo);
    const find = (name) => tags.find((tag) => tag.name === name)?.content;
    assert.equal(find("description"), seo.description);
    assert.equal(find("og:description"), seo.description);
    assert.equal(find("twitter:description"), seo.description);
    assert.equal(find("og:url"), seo.canonicalUrl);
    assert.equal(find("og:title"), seo.title);
    assert.equal(find("twitter:image:alt"), find("og:image:alt"));
    assert.equal(find("og:image:width"), "1200");
    assert.equal(find("og:image:height"), "1600");
    assert.equal(
      new Set(tags.map((tag) => `${tag.attribute}:${tag.name}`)).size,
      tags.length,
    );
    assert.ok(!tags.some((tag) => tag.name === "keywords"));
    assert.match(find("robots"), /^index,/);
    assert.match(
      getPageMeta(seo, true).find((tag) => tag.name === "robots").content,
      /^noindex,/,
    );
  }
  assert.match(
    getPageMeta(getPageSEO("/404")).find((tag) => tag.name === "robots")
      .content,
    /^noindex,/,
  );
});
test("page entities and breadcrumb references resolve within each schema graph", () => {
  for (const route of publicRoutes) {
    const graph = getStructuredData(route)["@graph"];
    const page = graph.find((node) =>
      ["WebPage", "AboutPage", "ContactPage"].includes(node["@type"]),
    );
    assert.ok(graph.some((node) => node["@id"] === page.breadcrumb["@id"]));
    assert.ok(graph.some((node) => node["@id"] === page.mainEntity["@id"]));
    if (["/naturopathie", "/reflexologie", "/massage-assis"].includes(route))
      assert.equal(
        page.mainEntity["@id"],
        `https://alais-tavernier-naturopathe.fr${route}#service`,
      );
  }
});

import {
  getBusinessProfile,
  googlePlaceId,
  googleMapsUrl,
} from "../src/utils/business.js";
test("editable coordinates drive maps, structured address, telephone and profile links together", () => {
  const content = structuredClone(initialSiteContent);
  content.footer.contact.address =
    "731 route de Sarrians<br />84190 Vacqueyras";
  content.footer.contact.phone = "06 12 34 56 78";
  content.footer.social.instagram = "@cabinet_test";
  const profile = getBusinessProfile(content);
  assert.equal(
    profile.displayAddress,
    "731 route de Sarrians, 84190 Vacqueyras",
  );
  assert.equal(profile.address.streetAddress, "731 route de Sarrians");
  assert.equal(profile.address.postalCode, "84190");
  assert.equal(profile.telephone, "+33612345678");
  assert.equal(profile.instagramUrl, "https://www.instagram.com/cabinet_test/");
  assert.ok(
    new URL(profile.mapsUrl).searchParams
      .get("query")
      .includes(profile.displayAddress),
  );
  assert.ok(
    new URL(profile.directionsUrl).searchParams
      .get("destination")
      .includes(profile.displayAddress),
  );
  const business = getStructuredData("/contact", content)["@graph"].find(
    (node) => Array.isArray(node["@type"]),
  );
  assert.deepEqual(business.address, profile.address);
  assert.equal(business.hasMap, profile.mapsUrl);
  assert.equal(
    new URL(profile.mapsUrl).searchParams.get("query_place_id"),
    googlePlaceId,
  );
  assert.ok(business.sameAs.includes(googleMapsUrl));
  assert.equal(business.telephone, profile.telephone);
  assert.ok(business.sameAs.includes(profile.instagramUrl));
  content.footer.contact.address = "731 route de Sarrians, 84190 Vacqueyras";
  assert.equal(
    getBusinessProfile(content).address.streetAddress,
    "731 route de Sarrians",
  );
  content.footer.contact.address = "Adresse à confirmer";
  assert.equal(
    getBusinessProfile(content).address.streetAddress,
    "Adresse à confirmer",
  );
  assert.equal(getBusinessProfile(content).address.postalCode, undefined);
});
