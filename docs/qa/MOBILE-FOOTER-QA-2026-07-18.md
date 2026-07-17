# Mobile footer update

Date: 18 July 2026
Release asset version: `20260718a`

## Change completed

- Explore and Capabilities are displayed side by side on mobile.
- Industry links use a balanced two-column row beneath them.
- The legal row is compacted without removing any information.
- Tablet layouts use the same balanced treatment rather than leaving the third navigation group on its own.
- Desktop footer behaviour is unchanged.

## Verification

- Current live mobile footer height: 1,712px.
- Updated mobile footer height: 1,196px.
- Reduction: 516px, approximately 30%.
- Tested at 320px, 390px and 768px viewport widths.
- Footer horizontal overflow: none.
- Minimum footer-link touch target: 44px.
- Browser console errors and warnings: none.
- Production build: 30 pages generated.
- Automated QA: 30 pages and 30 unique titles passed.
- Cloudflare Worker deployment dry run: passed with 105 static assets.
