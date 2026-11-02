import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateEvent,
  increment,
  summarize,
} from "../netlify/lib/analytics.mjs";
import track from "../netlify/functions/track-event.mjs";
import report from "../netlify/functions/audience-report.mjs";
import { createSession, cookieName } from "../netlify/lib/auth.mjs";
const event = {
  consent: true,
  event: "resalib",
  path: "/contact",
  source: "google",
  device: "mobile",
};
const request = (data = event, origin = "https://example.com", cookie = "") =>
  new Request("https://example.com/api/audience/event", {
    method: "POST",
    headers: { origin, cookie, "content-type": "application/json" },
    body: JSON.stringify(data),
  });
test("analytics accepts only finite categories, no URLs, identities or arbitrary payloads", () => {
  assert.equal(validateEvent(event).event, "resalib");
  for (const extra of [
    { consent: false },
    { path: "/contact?email=private@example.com" },
    { source: "https://private.example/path" },
    { email: "secret@example.com" },
    { event: "booking" },
    { device: "fingerprint" },
  ])
    assert.equal(validateEvent({ ...event, ...extra }), null);
  assert.equal(validateEvent(null), null);
});
test("concurrent aggregate updates retry conflicts without losing counts", async () => {
  let value = null,
    version = 0;
  const store = {
    async getWithMetadata() {
      return value
        ? { data: structuredClone(value), etag: String(version) }
        : null;
    },
    async setJSON(key, data, options) {
      assert.equal(key, "2026-11-02/0");
      if (
        (options.onlyIfNew && value) ||
        (options.onlyIfMatch && options.onlyIfMatch !== String(version))
      )
        return { modified: false };
      value = structuredClone(data);
      version++;
      return { modified: true, etag: String(version) };
    },
  };
  await Promise.all(
    Array.from({ length: 5 }, () =>
      increment(store, event, new Date("2026-11-02"), 0),
    ),
  );
  assert.equal(value["resalib|/contact|google|mobile"], 5);
});
test("failed storage cannot be silently treated as a successful update", async () => {
  await assert.rejects(
    increment(
      {
        getWithMetadata: async () => null,
        setJSON: async () => ({ modified: true, etag: "" }),
      },
      event,
    ),
    /Storage unavailable/,
  );
});
test("report totals, daily zeros and privacy categories exclude invalid or out-of-range records", () => {
  const result = summarize(
    [
      {
        day: "2026-11-02",
        counts: {
          "pageview|/|google|mobile": 4,
          "resalib|/contact|direct|desktop": 2,
          "booking|/|direct|mobile": 99,
          "email|/|other|mobile": -1,
        },
      },
      { day: "2020-01-01", counts: { "pageview|/|google|mobile": 1000 } },
    ],
    7,
    new Date("2026-11-02"),
  );
  assert.equal(result.daily.length, 7);
  assert.equal(result.totals.pageview, 4);
  assert.equal(result.totals.resalib, 2);
  assert.deepEqual(result.sources, { google: 4 });
  assert.equal(result.daily[0].pageview, 0);
  assert.equal("booking" in result.totals, false);
});
test("tracking rejects cross-site requests, invalid consent and admin traffic; previews never count", async () => {
  const context = { deploy: { context: "production" } };
  assert.equal(
    (await track(request(event, "https://attacker.test"), context)).status,
    403,
  );
  assert.equal(
    (await track(request({ ...event, consent: false }), context)).status,
    400,
  );
  assert.equal(
    (await track(request(), { deploy: { context: "deploy-preview" } })).status,
    204,
  );
  process.env.ADMIN_SESSION_SECRET = "test-analytics-secret-".repeat(4);
  assert.equal(
    (
      await track(
        request(
          event,
          "https://example.com",
          `${cookieName}=${createSession()}`,
        ),
        context,
      )
    ).status,
    204,
  );
});
test("statistics are private and unsupported date ranges are rejected before storage", async () => {
  assert.equal(
    (await report(new Request("https://example.com/api/admin/audience")))
      .status,
    401,
  );
  process.env.ADMIN_SESSION_SECRET = "test-analytics-secret-".repeat(4);
  const response = await report(
    new Request("https://example.com/api/admin/audience?days=9999", {
      headers: { cookie: `${cookieName}=${createSession()}` },
    }),
  );
  assert.equal(response.status, 400);
});

import { campaignSource } from "../src/analytics/events.js";
test("only the predefined business-profile campaign maps to a finite source category", () => {
  assert.equal(
    campaignSource(
      "?utm_source=google&utm_medium=organic&utm_campaign=fiche_etablissement&email=private@example.com",
    ),
    "google_business",
  );
  assert.equal(
    campaignSource("?utm_source=google&utm_campaign=private-information"),
    null,
  );
  assert.equal(
    campaignSource(
      "?utm_source=private@example.com&utm_medium=organic&utm_campaign=fiche_etablissement",
    ),
    null,
  );
  assert.ok(validateEvent({ ...event, source: "google_business" }));
  const stats = summarize(
    [{ day: "2026-11-02", counts: { "pageview|/|google_business|mobile": 2 } }],
    7,
    new Date("2026-11-02"),
  );
  assert.deepEqual(stats.sources, { google_business: 2 });
});

import { readChoice } from "../src/analytics/events.js";
test("consent preferences expire at six months and reject malformed or future timestamps", (t) => {
  const descriptor = Object.getOwnPropertyDescriptor(
    globalThis,
    "localStorage",
  );
  let raw;
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: { getItem: () => raw },
  });
  t.after(() => {
    if (descriptor)
      Object.defineProperty(globalThis, "localStorage", descriptor);
    else delete globalThis.localStorage;
  });
  const now = Date.UTC(2026, 10, 2),
    lifetime = 180 * 86400000;
  raw = JSON.stringify({ value: "accepted", at: now - lifetime + 1 });
  assert.equal(readChoice(now).value, "accepted");
  assert.equal(readChoice(now + 1), null);
  raw = JSON.stringify({ value: "refused", at: now });
  assert.equal(readChoice(now).value, "refused");
  raw = JSON.stringify({ value: "accepted", at: now + 1 });
  assert.equal(readChoice(now), null);
  raw = "broken-json";
  assert.equal(readChoice(now), null);
});
