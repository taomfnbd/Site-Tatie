# Site Tatie - Notes Agent

## Project

React 18 + Vite site for Alaïs Tavernier, naturopathe and massage bien-être practitioner in Vacqueyras.

Repository: `https://github.com/taomfnbd/Site-Tatie.git`
Default branch: `main`

## Commands

- Install: `npm install`
- Local dev: `npm run dev -- --host 127.0.0.1`
- Build: `npm run build`
- Lint: `npm run lint`
- Preview build: `npm run preview`

Always run `npm run lint` and `npm run build` before publishing.

## Routing

The app uses `HashRouter` from `react-router-dom`.

Current public routes:

- `/`
- `/about`
- `/prestations`
- `/naturopathie`
- `/reflexologie`
- `/massage-assis`
- `/contact`
- `/mentions-legales`
- `/cgu`

Keep `/about` intact. It was added through the CMS workflow and pulled from `origin/main`.

## CMS

The inline CMS uses:

- `src/contexts/EditModeContext.tsx`
- `src/contexts/ContentContext.tsx`
- `src/components/admin/*`
- `src/data/siteContent.js`

Admin mode is controlled by `?admin` before the hash URL. Avoid breaking `HashRouter` behavior when changing admin detection.

Do not remove the CMS UX components pulled from remote:

- `ConfirmModal.tsx`
- `ToastContainer.tsx`
- updated `AdminToolbar.tsx`
- updated `EditableSection.tsx`

## Hero & Images

The home hero (`src/components/sections/HeroSection.jsx`) shows a photo of Alaïs:

- Desktop: two-column layout (text left, photo right).
- Mobile: photo stacked above the text.
- The photo is CMS-editable via `EditableImage`; default `imageUrl` is also set in
  `src/data/siteContent.js` (`hero-1` content) so the source matches the render.

Images are hosted on an external GitHub repo, **not** in this project:
`https://raw.githubusercontent.com/taomfnbd/image2/main/<n>.svg`
(e.g. `1.svg` = portrait of Alaïs, `3.svg` = prestations header). To change a photo,
update the URL (or push a new file to that `image2` repo).

The "Mon parcours de vie" home section (`AboutSection.jsx`) is text-only (its photo was
removed to avoid duplicating the hero portrait).

The dragonfly motif (`StaticDragonfly`, PNGs on an S3 bucket) is decorative only.

## Animations

Scroll-reveal is standardized across the site: section blocks fade in + slide up on
enter, played once.

- Pattern: `initial={{ opacity: 0, y: 48 }}` / `whileInView={{ opacity: 1, y: 0 }}` /
  `viewport={{ once: true }}` / `transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}`.
- Section headers/cards use `y: 48`; small inner list items keep a smaller `y` (8–16)
  for a finer cascade — do not bump those to 48.
- Heroes use `animate` (on load), not `whileInView` (they are above the fold).
- Always keep `viewport={{ once: true }}` on `whileInView` blocks, otherwise the
  animation replays on every scroll (flicker).
- `prefers-reduced-motion` is handled globally in `src/index.css`.

## Performance

The public bundle has been optimized with:

- lazy-loaded pages
- lazy-loaded admin tooling
- lazy-loaded section components in `SectionManager`
- deferred cookie banner
- manual vendor chunks in `vite.config.js`

Keep admin-only UI out of the initial public path where possible.

## SEO and GEO

SEO metadata and structured data live in:

- `src/components/SEOHead.jsx`
- `src/utils/seo.js`
- `index.html`
- `public/sitemap.xml`

`src/utils/seo.js` owns per-route metadata and JSON-LD graph generation. It currently emits LocalBusiness, Person, WebSite, WebPage, BreadcrumbList, Service, ItemList, and FAQPage where relevant.

FAQ content must stay aligned between:

- visible sections in `src/data/siteContent.js`
- schema data in `src/utils/seo.js`

## FAQ Section

FAQ rendering lives in `src/components/sections/FAQSection.jsx`.

It is an accessible dropdown/accordion:

- first question open by default
- `aria-expanded`
- `aria-controls`
- `role="region"`
- all answers visible in edit mode for CMS editing

## Publication Safety

**Direct push to `main` is BLOCKED by a hook.** Mandatory workflow:

1. `git pull --ff-only origin main`
2. Create a branch: `git checkout -b feat/...` or `fix/...`
3. Resolve any conflicts locally.
4. Run `npm run lint`.
5. Run `npm run build`.
6. Review `git status --short` (do not commit `HANDOFF.md`).
7. Commit intentionally, then `git push -u origin <branch>`.
8. `gh pr create` → wait for Netlify preview checks → `gh pr merge <N> --merge --delete-branch`.
9. The merge to `main` triggers the production deploy automatically.

### Deploy verification

- Production: `https://alais-tavernier-naturopathe.fr` (deploys ~30–60s after merge).
- **GitHub commit status may stay stuck on `pending` (phantom check) — ignore it.**
  Source of truth = Netlify: `netlify api listSiteDeploys --data '{"site_id":"e9872838-c910-4bf1-9797-eb046ce90f69","per_page":4}'`
  → look for `state: ready`, `context: production`, matching `commit_ref`.
- Netlify site ID: `e9872838-c910-4bf1-9797-eb046ce90f69` (`lucent-cucurucho-5d32b0`).
  A stale ID `5cdd40b1...` returns `Not Found` — do not use it.
- CDN cache: after deploy, `curl` may show the old JS hash for a moment. Verify the
  real **content** via agent-browser with a `?v=<timestamp>` cache-bust, not the hash.

Important: `public/favicon.png` was already deleted locally before the optimization work started, while `index.html` still references `/favicon.png`. Do not stage or publish that deletion unless the favicon strategy is intentionally changed.

## Current Caveat

There may be a safety stash named `codex-local-speed-seo-faq-before-cms-pull` from the pull/reapply workflow. Confirm it is no longer needed before dropping it.
