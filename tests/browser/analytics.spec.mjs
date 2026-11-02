import { test, expect } from "@playwright/test";
test("tracking waits for consent, records actions without their content, and stops after refusal", async ({
  page,
}) => {
  const events = [];
  await page.route("**/api/audience/event", async (route) => {
    events.push(route.request().postDataJSON());
    await route.fulfill({ status: 204 });
  });
  await page.goto("/contact?email=private@example.com");
  await expect(
    page.getByRole("button", { name: "Accepter", exact: true }),
  ).toBeVisible();
  expect(events).toEqual([]);
  await page.getByRole("button", { name: "Accepter", exact: true }).click();
  await expect.poll(() => events.length).toBe(1);
  expect(events[0]).toEqual({
    consent: true,
    event: "pageview",
    path: "/contact",
    source: "direct",
    device: "mobile",
  });
  await page.evaluate(() => {
    const a = document.querySelector('a[href^="tel:"]');
    a.addEventListener("click", (event) => event.preventDefault());
    a.click();
  });
  await expect.poll(() => events.length).toBe(2);
  expect(events[1].event).toBe("phone");
  await page.evaluate(() => {
    const a = document.querySelector('a[href*="resalib.fr"]');
    a.addEventListener("click", (event) => event.preventDefault());
    a.click();
  });
  await expect.poll(() => events.length).toBe(3);
  expect(events[2].event).toBe("resalib");
  await page
    .getByRole("button", { name: "Préférences de mesure d’audience" })
    .click();
  await page.getByRole("button", { name: "Refuser", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Accepter", exact: true }),
  ).toHaveCount(0);
  expect(events.length).toBe(3);
});
test("refusal persists and admin sessions do not count or display a consent banner", async ({
  page,
}) => {
  const events = [];
  await page.route("**/api/audience/event", async (route) => {
    events.push(route.request().postDataJSON());
    await route.fulfill({ status: 204 });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Refuser", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Accepter", exact: true }),
  ).toHaveCount(0);
  expect(events).toEqual([]);
  await page.goto("/?admin");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Préférences de mesure d’audience" }),
  ).toHaveCount(0);
  expect(events).toEqual([]);
});
test("authenticated dashboard renders real counts, exports CSV and distinguishes unconnected bookings", async ({
  page,
}) => {
  await page.route("**/api/admin/session", (route) =>
    route.fulfill({ json: { authenticated: true } }),
  );
  await page.route("**/api/admin/audience?days=*", (route) =>
    route.fulfill({
      json: {
        totals: {
          pageview: 4,
          resalib: 2,
          phone: 1,
          email: 0,
          maps: 0,
          instagram: 0,
        },
        pages: { "/": 4 },
        sources: { google: 4 },
        devices: { mobile: 4 },
        daily: [
          {
            day: "2026-11-02",
            pageview: 4,
            resalib: 2,
            phone: 1,
            email: 0,
            maps: 0,
            instagram: 0,
          },
        ],
        generatedAt: "2026-11-02T12:00:00Z",
        bookings: null,
      },
    }),
  );
  await page.goto("/?admin");
  await page.getByRole("button", { name: "Statistiques", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Statistiques du site" });
  await expect(
    dialog.getByText("Rendez-vous confirmés : non connectés"),
  ).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Pages consultées" }),
  ).toBeVisible();
  const download = page.waitForEvent("download");
  await dialog.getByRole("button", { name: "Exporter CSV" }).click();
  expect((await download).suggestedFilename()).toBe(
    "statistiques-site-30j.csv",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("the business-profile link counts a category after consent without recording its query", async ({
  page,
}) => {
  const events = [];
  await page.route("**/api/audience/event", async (route) => {
    events.push(route.request().postDataJSON());
    await route.fulfill({ status: 204 });
  });
  await page.goto(
    "/?utm_source=google&utm_medium=organic&utm_campaign=fiche_etablissement&email=private@example.com",
  );
  await page.getByRole("button", { name: "Accepter", exact: true }).click();
  await expect.poll(() => events.length).toBe(1);
  expect(events[0]).toEqual({
    consent: true,
    event: "pageview",
    path: "/",
    source: "google_business",
    device: "mobile",
  });
});

test("right clicks do not count as contact actions and middle clicks do", async ({
  page,
}) => {
  const events = [];
  await page.route("**/api/audience/event", async (route) => {
    events.push(route.request().postDataJSON());
    await route.fulfill({ status: 204 });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Accepter", exact: true }).click();
  await expect.poll(() => events.length).toBe(1);
  await page.evaluate(() => {
    const link = document.querySelector('a[href*="resalib.fr"]');
    link.addEventListener("auxclick", (event) => event.preventDefault());
    link.dispatchEvent(
      new MouseEvent("auxclick", { bubbles: true, button: 2 }),
    );
    link.dispatchEvent(
      new MouseEvent("auxclick", { bubbles: true, button: 1 }),
    );
  });
  await expect.poll(() => events.length).toBe(2);
  expect(events[1].event).toBe("resalib");
});
test("clearing storage in another tab withdraws tracking without a reload", async ({
  page,
}) => {
  const events = [];
  await page.route("**/api/audience/event", async (route) => {
    events.push(route.request().postDataJSON());
    await route.fulfill({ status: 204 });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Accepter", exact: true }).click();
  await expect.poll(() => events.length).toBe(1);
  const peer = await page.context().newPage();
  await peer.route("**/api/audience/event", (route) =>
    route.fulfill({ status: 204 }),
  );
  await peer.goto("/");
  await peer.evaluate(() => localStorage.clear());
  await expect(
    page.getByRole("button", { name: "Accepter", exact: true }),
  ).toBeVisible();
  await page.evaluate(() => {
    const link = document.querySelector('a[href*="resalib.fr"]');
    link.addEventListener("click", (e) => e.preventDefault());
    link.click();
  });
  expect(events.length).toBe(1);
  await peer.close();
});
test("a long-lived page asks again when the six-month choice expires", async ({
  page,
}) => {
  const events = [];
  await page.route("**/api/audience/event", async (route) => {
    events.push(route.request().postDataJSON());
    await route.fulfill({ status: 204 });
  });
  await page.goto("/");
  await page.clock.install();
  await page.getByRole("button", { name: "Accepter", exact: true }).click();
  await expect.poll(() => events.length).toBe(1);
  await page.clock.setSystemTime(
    await page.evaluate(() => Date.now() + 181 * 86400000),
  );
  await page.clock.fastForward(86400001);
  await expect(
    page.getByRole("button", { name: "Accepter", exact: true }),
  ).toBeVisible();
  await page.evaluate(() => {
    const link = document.querySelector('a[href*="resalib.fr"]');
    link.addEventListener("click", (e) => e.preventDefault());
    link.click();
  });
  expect(events.length).toBe(1);
});
