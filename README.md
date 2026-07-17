# Local Foundary website

Production-ready static site for Local Foundary, built with shared data and reusable page templates. GitHub is the source of truth and Cloudflare Workers Static Assets serves the generated site.

For the repository upload and Cloudflare dashboard settings, see [`GITHUB-UPLOAD-CHECKLIST.md`](./GITHUB-UPLOAD-CHECKLIST.md).

## Local development

```bash
npm install
npm run build
npm run check
python3 -m http.server 4173 -d dist
```

Open `http://127.0.0.1:4173/` after starting the local server.

For a full-fidelity local preview that also runs the `/api/contact` Worker route, use:

```bash
npx wrangler dev
```

## Project structure

- `src/data.mjs` — services, projects, industries, process and pricing data.
- `src/templates.mjs` — reusable page, navigation, footer, project, pricing and form components.
- `src/styles.css` — design tokens, responsive layouts and motion system.
- `src/site.js` — navigation, focus handling, scroll storytelling, reveals, validation and conversion-event hooks.
- `worker/index.js` — Cloudflare Worker for static delivery, the enquiry API, permanent redirects, cache policy and preview no-index protection.
- `scripts/build.mjs` — generates production routes, sitemap, robots, manifest, redirects and security headers.
- `scripts/check.mjs` — validates metadata, canonicals, structured data, headings, links, assets and launch configuration.
- `dist/` — generated Cloudflare static output.

## Cloudflare Workers deployment

- Build command: `npm run build`
- Static asset directory: `dist`
- Worker configuration: `wrangler.jsonc`
- Worker entry point: `worker/index.js`
- Production branch: connect the clean GitHub production branch in Cloudflare Builds
- Node version: `24.18.0`
- Wrangler version: `4.111.0` (pinned in `package.json`)

The Worker serves a branded 404 response, converts Cloudflare’s automatic trailing-slash redirect to a permanent 301, applies exact HTML/asset cache policies and adds `X-Robots-Tag: noindex, nofollow` only on `*.workers.dev` preview hosts. Canonical, Open Graph and sitemap URLs target the production site at `https://www.localfoundary.co.uk`.

The contact handler is included in the Worker. Email delivery remains inactive until these Cloudflare secrets are configured and tested:

Use [`.env.example`](./.env.example) as the variable checklist; never commit the populated values.

- `RESEND_API_KEY` — required.
- `CONTACT_FROM` — optional; defaults to `Local Foundary Website <noreply@localfoundary.co.uk>` and must use a sender verified in Resend.
- `CONTACT_TO` — optional; defaults to `info@localfoundary.co.uk`.

The build also writes Cloudflare-compatible `dist/_redirects` and `dist/_headers`. Keep Always Use HTTPS enabled and `www.localfoundary.co.uk` configured as the primary production domain.

Validate the Worker bundle without publishing:

```bash
npm run deploy:dry-run
```

When the connected Cloudflare project and account are confirmed, deploy with:

```bash
npm run deploy
```

## Measurement

`src/site.js` creates a provider-agnostic `dataLayer` and emits CTA, enquiry-submit, success, email and WhatsApp events. The generated CSP permits Cloudflare Web Analytics to load its privacy-first beacon and submit performance data; Web Analytics must still be enabled and verified in the Cloudflare dashboard. No non-essential tracking cookies are enabled.

## Content handoff

The build does not invent testimonials, review counts, rankings, team identities or project results. Before publishing additional proof, confirm client permission and supply approved testimonials, names, logos, project dates, technology details and measurable outcomes.

## Final checks

```bash
npm run build
npm run check
```

After deployment, submit one controlled enquiry and confirm the internal notification, customer acknowledgement, `/thanks/` redirect and error state. Also verify a deliberately invalid URL returns the branded `404.html` with HTTP status 404.
