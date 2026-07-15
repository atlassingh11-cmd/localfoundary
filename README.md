# Local Foundary website

Production-ready static site for Local Foundary, built with shared data and reusable page templates. Cloudflare Pages serves the generated site and a Pages Function handles enquiries through the Resend HTTP API.

## Local development

```bash
npm install
npm run build
npm run check
python3 -m http.server 4173 -d dist
```

Open `http://127.0.0.1:4173/` after starting the local server.

## Project structure

- `src/data.mjs` — services, projects, industries, process and pricing data.
- `src/templates.mjs` — reusable page, navigation, footer, project, pricing and form components.
- `src/styles.css` — design tokens, responsive layouts and motion system.
- `src/site.js` — navigation, focus handling, scroll storytelling, reveals, validation and conversion-event hooks.
- `functions/api/contact.js` — Cloudflare Pages Function for validated enquiry delivery.
- `scripts/build.mjs` — generates production routes, sitemap, robots, manifest, redirects and security headers.
- `scripts/check.mjs` — validates metadata, canonicals, structured data, headings, links, assets and launch configuration.
- `dist/` — generated Cloudflare Pages output.

## Cloudflare Pages deployment

- Build command: `npm run build`
- Build output directory: `dist`
- Functions directory: `functions` (detected automatically by Cloudflare Pages)
- Node version: current supported LTS

Configure these Cloudflare environment variables before testing the form:

Use [`.env.example`](./.env.example) as the variable checklist; never commit the populated values.

- `RESEND_API_KEY` — required.
- `CONTACT_FROM` — optional; defaults to `Local Foundary Website <noreply@localfoundary.co.uk>` and must use a sender verified in Resend.
- `CONTACT_TO` — optional; defaults to `info@localfoundary.co.uk`.

The build writes Cloudflare-compatible `dist/_redirects` and `dist/_headers`. In the Cloudflare dashboard, also enable Always Use HTTPS and set `www.localfoundary.co.uk` as the primary production domain.

## Measurement

`src/site.js` creates a provider-agnostic `dataLayer` and emits CTA, enquiry-submit, success, email and WhatsApp events. No analytics provider or non-essential tracking cookies are enabled yet. Add a real analytics property only after the measurement and consent approach is confirmed, then update the CSP and privacy controls if required.

## Content handoff

The build does not invent testimonials, review counts, rankings, team identities or project results. Before publishing additional proof, confirm client permission and supply approved testimonials, names, logos, project dates, technology details and measurable outcomes.

## Final checks

```bash
npm run build
npm run check
```

After deployment, submit one controlled enquiry and confirm the internal notification, customer acknowledgement, `/thanks/` redirect and error state. Also verify a deliberately invalid URL returns the branded `404.html` with HTTP status 404.
