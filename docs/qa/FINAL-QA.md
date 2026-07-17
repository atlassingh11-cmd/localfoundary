# Local Foundary — Mobile Scroll Story Final QA

**Release date:** 17 July 2026  
**Asset version:** `20260717a`  
**Source:** `/Users/rayy/Documents/website builds`

## Result

The mobile and tablet homepage hero now use a dedicated sticky runway. The visual remains fully visible while the five states advance through scroll, and the final Enquiry state is held before release. Desktop retains its existing timing and layout.

The release also fixes heading whitespace in copied/accessibility text, 44px footer legal-link targets, 320px classic-scrollbar overflow, short-landscape reveal overflow and legacy Safari media-query refresh compatibility.

## Modified files

- `src/templates.mjs`
- `src/styles.css`
- `src/site.js`
- `scripts/check.mjs`
- `README.md`
- `GITHUB-UPLOAD-CHECKLIST.md`

Generated production output was rebuilt in `dist/`.

## Mobile hero verification — 390 × 844

- Hero height: 3,214px.
- Sticky runway: 2,198px.
- Visual height: 440px.
- Visual position while active: `sticky`, 167px from the viewport top.
- Document horizontal overflow: 0px.

| Scroll position | State | Visual top |
|---:|---|---:|
| 720px | Identity | 167px |
| 1,040px | Website | 167px |
| 1,360px | Visibility | 167px |
| 1,680px | Trust | 167px |
| 2,000px | Enquiry | 167px |
| 2,320px | Enquiry held | 167px |

Current production before this release:

![Current production mobile hero](qa/mobile-audit-2026-07-17/mobile-hero-before-production-20260716b.png)

Corrected `20260717a` build:

![Corrected mobile hero](qa/mobile-audit-2026-07-17/mobile-hero-after-20260717a.png)

## Desktop regression verification — 1440 × 900

The desktop wrapper remains `display: contents`, so it does not alter the desktop grid. The visual remains inside the existing pinned hero and the state timing remains:

- Identity: 0px.
- Website: approximately 400px.
- Visibility: approximately 720px.
- Trust: approximately 1,040px.
- Enquiry: approximately 1,360px.

No desktop horizontal overflow or layout regression was found.

## Complete responsive QA

All 29 public/generated routes were tested at:

- 1440 × 900 desktop;
- 768 × 1024 tablet;
- 390 × 844 mobile;
- 320 × 700 narrow mobile.

This produced 116 route-width renders, plus dedicated 844 × 390 short-landscape and homepage scroll-stage tests.

Passed checks:

- no horizontal overflow at the tested widths;
- no broken images;
- no clipped heading, paragraph, control or list text;
- one H1 on every page;
- consistent Space Grotesk H1/H2 typography;
- no heading `<br>` whitespace seams;
- Privacy and Terms links measure at least 44px high;
- mobile navigation opens, closes and makes background content inert;
- Escape restores the closed state and trigger focus;
- contact-form empty submission focuses the first invalid field and exposes five useful errors;
- no browser console warnings or errors were recorded during the final pass;
- short-landscape devices use the non-sticky linear hero and no longer create reveal overflow;
- reduced-motion CSS and JavaScript fallbacks remain present;
- production build contains unique titles, valid JSON-LD, canonicals, working internal links and required assets.

## Build and deployment checks

- `npm run build`: passed — 30 HTML pages generated.
- `npm run check`: passed — 30 pages, 30 unique titles, links and assets verified.
- `node --check src/site.js`: passed.
- `npx wrangler deploy --dry-run`: passed — 105 static assets and the Worker bundle validated.
- Final generated output: approximately 1.8MB.

## Production state before upload

The production domain is now serving the redesigned Cloudflare site, but its HTML still references `styles.css?v=20260716b` and `site.js?v=20260716b`. It therefore does not yet contain this mobile sticky-runway release.

Upload the new GitHub-ready folder and allow Cloudflare to build/deploy it. Then confirm production references `20260717a`.

## Remaining owner verification

Responsive emulation is complete, but a real-device pass cannot be performed from this desktop environment. After deployment, verify on one current iPhone in Safari and one modern Android phone in Chrome, including portrait/landscape rotation, browser-bar collapse/expansion and restored scroll position.

