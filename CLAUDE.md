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

Before publishing:

1. `git pull --ff-only origin main`
2. Resolve any conflicts locally.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Review `git status --short`.
6. Commit intentionally.
7. Push.

Important: `public/favicon.png` was already deleted locally before the optimization work started, while `index.html` still references `/favicon.png`. Do not stage or publish that deletion unless the favicon strategy is intentionally changed.

## Current Caveat

There may be a safety stash named `codex-local-speed-seo-faq-before-cms-pull` from the pull/reapply workflow. Confirm it is no longer needed before dropping it.
