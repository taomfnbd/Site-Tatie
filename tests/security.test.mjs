import { test } from "node:test";
import assert from "node:assert/strict";
import { scryptSync } from "node:crypto";
import {
  authenticated,
  createSession,
  cookieName,
  passwordValid,
  sameOrigin,
  sessionCookie,
} from "../netlify/lib/auth.mjs";
import saveContent from "../netlify/functions/save-content.mjs";
import login from "../netlify/functions/admin-login.mjs";
import { validateContent } from "../netlify/lib/content.mjs";
import { initialSiteContent } from "../src/data/siteContent.js";
import { cleanHTML } from "../src/utils/sanitize.js";
process.env.ADMIN_SESSION_SECRET = "test-only-".repeat(8);
const salt = "test-salt";
process.env.ADMIN_PASSWORD_HASH = `${salt}:${scryptSync("strong-test-password", salt, 64).toString("hex")}`;
const req = (token, origin = "https://example.com") =>
  new Request("https://example.com/api/cms/content", {
    method: "POST",
    headers: {
      origin,
      cookie: `${cookieName}=${token}`,
      "Content-Type": "application/json",
    },
    body: "{}",
  });
test("signed, unexpired sessions only; legacy bearer and forged cookies cannot publish", async () => {
  const token = createSession();
  assert.equal(authenticated(req(token)), true);
  assert.equal(authenticated(req(token + "x")), false);
  assert.equal(
    authenticated(req(createSession(Date.now() - 5 * 60 * 60 * 1000))),
    false,
  );
  assert.equal(authenticated(req("true")), false);
  assert.equal((await saveContent(req("true"))).status, 401);
  const request = new Request(
    "https://example.com/.netlify/functions/save-content",
    {
      method: "POST",
      headers: {
        origin: "https://example.com",
        authorization: "Bearer old-public-secret",
      },
      body: "{}",
    },
  );
  assert.equal((await saveContent(request)).status, 401);
  assert.match(sessionCookie(token), /HttpOnly; Secure; SameSite=Strict/);
});
test("mutations reject cross-origin and missing-origin requests", async () => {
  assert.equal(
    sameOrigin(req(createSession(), "https://attacker.test")),
    false,
  );
  assert.equal(
    (await saveContent(req(createSession(), "https://attacker.test"))).status,
    403,
  );
  assert.equal(
    (
      await saveContent(
        new Request("https://example.com/api/cms/content", {
          method: "POST",
          body: "{}",
        }),
      )
    ).status,
    403,
  );
});
test("login checks password on server and does not return a session token in JSON", async () => {
  assert.equal(passwordValid("strong-test-password"), true);
  assert.equal(passwordValid("bad"), false);
  const response = await login(
    new Request("https://example.com/api/admin/login", {
      method: "POST",
      headers: {
        origin: "https://example.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: "strong-test-password" }),
    }),
  );
  assert.equal(response.status, 200);
  assert.match(response.headers.get("set-cookie"), /HttpOnly/);
  assert.deepEqual(await response.json(), { authenticated: true });
});
test("HTML allows editorial formatting but removes active content and unsafe URLs", () => {
  const html = cleanHTML(
    '<h2 class="title">Titre</h2><script>alert(1)</script><img src=x onerror=alert(1)><a href="javascript:alert(1)" onclick="x()">Lien</a><strong>Texte</strong>',
  );
  assert.match(html, /<strong>Texte<\/strong>/);
  assert.doesNotMatch(html, /script|onerror|onclick|javascript:|<img/);
});
test("content schema accepts site, sanitizes HTML and rejects missing pages, oversized lists and foreign image hosts", () => {
  const data = structuredClone(initialSiteContent);
  assert.ok(validateContent(data));
  data.pages.home[0].content.description =
    "<strong>Oui</strong><script>non</script>";
  assert.equal(
    validateContent(data).pages.home[0].content.description,
    "<strong>Oui</strong>",
  );
  delete data.pages.contact;
  assert.throws(() => validateContent(data));
  const invalid = structuredClone(initialSiteContent);
  invalid.pages.home[0].content.imageUrl = "https://attacker.test/pixel.png";
  assert.throws(() => validateContent(invalid));
});
test("revision conflict returns 409 without ever writing to GitHub", async () => {
  const original = globalThis.fetch;
  const originalEnv = { ...process.env };
  let calls = 0;
  process.env.GITHUB_TOKEN = "test";
  process.env.REPO_OWNER = "owner";
  process.env.REPO_NAME = "site";
  globalThis.fetch = async () => {
    calls++;
    return new Response(JSON.stringify({ sha: "b".repeat(40) }));
  };
  try {
    const request = new Request("https://example.com/api/cms/content", {
      method: "POST",
      headers: {
        origin: "https://example.com",
        cookie: `${cookieName}=${createSession()}`,
      },
      body: JSON.stringify({
        content: initialSiteContent,
        revision: "a".repeat(40),
      }),
    });
    assert.equal((await saveContent(request)).status, 409);
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = original;
    process.env.GITHUB_TOKEN = originalEnv.GITHUB_TOKEN || "";
    process.env.REPO_OWNER = originalEnv.REPO_OWNER || "";
    process.env.REPO_NAME = originalEnv.REPO_NAME || "";
  }
});
