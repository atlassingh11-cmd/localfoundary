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

The Workers preview must remain on its `*.workers.dev` address until the domain cutover is approved. Canonical, Open Graph and sitemap URLs intentionally remain `https://www.localfoundary.co.uk`.

## Before the eventual domain cutover

1. Confirm the Cloudflare preview deploy passes and every route loads.
2. Configure Resend before treating the form as live:

   ```bash
   npx wrangler secret put RESEND_API_KEY --name localfoundary
   ```

   `CONTACT_FROM` and `CONTACT_TO` are optional Worker variables; the code defaults to `Local Foundary Website <noreply@localfoundary.co.uk>` and `info@localfoundary.co.uk`.
3. Add `www.localfoundary.co.uk` as the primary custom domain only on the agreed cutover day.
4. Redirect the apex domain to `www`, enable Always Use HTTPS and test the branded 404 response.
5. Submit a controlled enquiry only after the contact endpoint is activated.

## Local verification

```bash
npm install
npm run build
npm run check
npm run deploy:dry-run
```
