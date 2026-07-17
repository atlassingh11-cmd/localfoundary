# GitHub and Cloudflare handoff

Upload the **contents** of the GitHub-ready folder to a new, empty GitHub repository. Do not upload the enclosing folder as an extra directory level, and never upload `.env` files, `node_modules`, `.wrangler` or old ZIP archives.

## Cloudflare Workers Builds

- Framework preset: none
- Root directory: `/`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Node version: `24.18.0`
- Static assets directory: `dist` (configured in `wrangler.jsonc`)
- Production branch: choose the clean GitHub production branch

The `*.workers.dev` preview remains protected by `X-Robots-Tag: noindex, nofollow`. Canonical, Open Graph and sitemap URLs target `https://www.localfoundary.co.uk`.

## Production verification

1. Confirm the Cloudflare preview deploy passes and every route loads.
2. Configure Resend before treating the form as live:

   ```bash
   npx wrangler secret put RESEND_API_KEY --name localfoundary
   ```

   `CONTACT_FROM` and `CONTACT_TO` are optional Worker variables; the code defaults to `Local Foundary Website <noreply@localfoundary.co.uk>` and `info@localfoundary.co.uk`.
3. Confirm `www.localfoundary.co.uk` remains the primary custom domain and the apex redirects to `www`.
4. Confirm Always Use HTTPS, the branded 404 response, security headers and production cache policies.
5. Submit a controlled enquiry after the contact endpoint and Resend secret are active.

## Local verification

```bash
npm install
npm run build
npm run check
npm run deploy:dry-run
```
