# Cloudflare Web Analytics CSP fix

Date: 17 July 2026

## Change completed

The generated Content Security Policy now permits Cloudflare Web Analytics to:

- load `https://static.cloudflareinsights.com/beacon.min.js` through `script-src`;
- submit beacon data to `https://cloudflareinsights.com` through `connect-src`.

The local JavaScript and CSS release version is `20260717b`, ensuring the updated deployment can be distinguished from the previous mobile release.

Automated build checks now fail if either Cloudflare Analytics CSP permission is removed in a future build.

## Verification completed

- Clean `npm ci`: passed.
- Production build: 30 HTML pages generated.
- `npm run check`: passed for 30 pages, 30 unique titles, local links and assets.
- Cloudflare Worker dry run: passed with 105 static assets.
- Worker bundle: 5.48 KiB, 1.90 KiB compressed.

## Dashboard step still required

After deploying the repository, enable Web Analytics for `www.localfoundary.co.uk` in Cloudflare. Then load the production website, confirm there is no CSP console error for `cloudflareinsights`, and confirm page-view data appears in the Cloudflare Web Analytics dashboard.
