import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { industryPageData, projects, servicePages, site } from '../src/data.mjs';
import {
  aboutPage,
  caseStudyPage,
  contactPage,
  homePage,
  industriesPage,
  insightsPage,
  industryDetailPage,
  notFoundPage,
  pricingPage,
  privacyPage,
  processPage,
  serviceDetailPage,
  servicesPage,
  termsPage,
  thanksPage,
  workPage,
} from '../src/templates.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'assets'), { recursive: true });

const routes = [
  ['/', homePage()],
  ['/work/', workPage()],
  ...projects.filter((project) => project.published).map((project) => [`/work/${project.slug}/`, caseStudyPage(project)]),
  ['/services/', servicesPage()],
  ...servicePages.map((service) => [`/services/${service.slug}/`, serviceDetailPage(service)]),
  ['/industries/', industriesPage()],
  ...Object.entries(industryPageData).map(([slug, industry]) => [`/${slug}/`, industryDetailPage(slug, industry)]),
  ['/how-it-works/', processPage()],
  ['/pricing/', pricingPage()],
  ['/about/', aboutPage()],
  ['/insights/', insightsPage()],
  ['/contact/', contactPage()],
  ['/privacy/', privacyPage()],
  ['/terms/', termsPage()],
  ['/thanks/', thanksPage()],
];

const writeRoute = async (route, contents) => {
  if (route === '/') {
    await writeFile(path.join(dist, 'index.html'), contents);
    return;
  }
  const directory = path.join(dist, route.replace(/^\/+|\/+$/g, ''));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), contents);
};

await Promise.all(routes.map(([route, contents]) => writeRoute(route, contents)));
await writeFile(path.join(dist, '404.html'), notFoundPage());
await cp(path.join(root, 'src', 'styles.css'), path.join(dist, 'assets', 'styles.css'));
await cp(path.join(root, 'src', 'site.js'), path.join(dist, 'assets', 'site.js'));
await cp(path.join(root, 'assets'), path.join(dist, 'assets'), {
  recursive: true,
  filter: (source) => !source.endsWith('site-desktop.png'),
});

const staticFiles = [
  'favicon.ico', 'favicon.svg', 'favicon-16x16.png', 'favicon-32x32.png',
  'apple-touch-icon.png', 'android-chrome-192x192.png', 'android-chrome-512x512.png',
  'googleb84eb9b02a940801.html',
];
await Promise.all(staticFiles.map(async (file) => {
  try { await cp(path.join(root, file), path.join(dist, file)); } catch { /* optional legacy asset */ }
}));

const sitemapRoutes = routes
  .map(([route]) => route)
  .filter((route) => !['/thanks/', '/insights/'].includes(route))
  .map((route) => `  <url><loc>${site.url}${route === '/' ? '/' : route}</loc><lastmod>2026-07-14</lastmod></url>`)
  .join('\n');
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes}
</urlset>\n`);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
await writeFile(path.join(dist, '_redirects'), `/services.html /services/ 301
/index.html / 301
/industries.html /industries/ 301
/pricing.html /pricing/ 301
/how-it-works.html /how-it-works/ 301
/about.html /about/ 301
/contact.html /contact/ 301
/privacy.html /privacy/ 301
/websites-for-plumbers.html /websites-for-plumbers/ 301
/websites-for-electricians.html /websites-for-electricians/ 301
/websites-for-builders.html /websites-for-builders/ 301
/websites-for-service-businesses.html /websites-for-service-businesses/ 301
/thanks.html /thanks/ 301
`);
await writeFile(path.join(dist, '_headers'), `/*
  Cache-Control: public, max-age=0, must-revalidate
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'self'; frame-ancestors 'self'

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`);
await writeFile(path.join(dist, 'site.webmanifest'), JSON.stringify({
  name: 'Local Foundary', short_name: 'Local Foundary', start_url: '/', display: 'standalone',
  background_color: '#05060a', theme_color: '#05060a',
  icons: [
    { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
  ],
}, null, 2));

const htmlFiles = routes.length + 1;
console.log(`Built ${htmlFiles} HTML pages into ${dist}`);
