import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const errors = [];

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)));
  return files.flat();
};

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html') && !path.basename(file).startsWith('google'));
const titles = new Map();
const generalBrandPages = new Set([
  'index.html', 'services/index.html', 'about/index.html', 'contact/index.html',
  'how-it-works/index.html', 'pricing/index.html', 'work/index.html', 'insights/index.html',
]);

const routeTarget = (href) => {
  const pathname = href.split(/[?#]/)[0];
  if (!pathname || pathname === '/') return path.join(dist, 'index.html');
  const clean = pathname.replace(/^\//, '');
  if (path.extname(clean)) return path.join(dist, clean);
  return path.join(dist, clean, 'index.html');
};

for (const file of htmlFiles) {
  const relative = path.relative(dist, file);
  const html = await readFile(file, 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
  const primaryNav = html.match(/<nav class="primary-nav"[\s\S]*?<\/nav>/)?.[0] || '';

  if (!title) errors.push(`${relative}: missing title`);
  if (!description || description.length < 50) errors.push(`${relative}: missing or weak meta description`);
  if (relative === '404.html' && canonical) errors.push(`${relative}: noindex 404 page should not declare a canonical URL`);
  if (relative !== '404.html' && !canonical) errors.push(`${relative}: missing canonical URL`);
  if (h1Count !== 1) errors.push(`${relative}: expected one h1, found ${h1Count}`);
  if (html.includes('class="page-hero"') && !html.match(/class="page-hero"[\s\S]*?<h1>[^<]/)) errors.push(`${relative}: page hero is missing visible h1 text`);
  if (title) {
    if (titles.has(title)) errors.push(`${relative}: duplicate title also used by ${titles.get(title)}`);
    titles.set(title, relative);
  }
  if (/Local Foundry/.test(html)) errors.push(`${relative}: inconsistent Local Foundry spelling`);
  if (/Manchester|Greater Manchester/.test(html)) errors.push(`${relative}: outdated location-limited positioning remains`);
  if (/247 reviews|testimonial-stars|first page for searches/i.test(html)) errors.push(`${relative}: unverified legacy proof remains`);
  if (generalBrandPages.has(relative) && /plumber|electrician|builder|tradespeople|built for the trades/i.test(`${title || ''} ${description || ''}`)) {
    errors.push(`${relative}: general metadata is still trade-led`);
  }
  if (!html.includes('data-whatsapp') || !html.includes('phone=447518853582')) errors.push(`${relative}: missing site-wide WhatsApp action`);
  if (relative === 'index.html' && (html.match(/data-presence-step=/g) || []).length !== 6) errors.push(`${relative}: connected-system story must contain six stages`);
  if (relative === 'index.html' && (html.match(/class="capability-card/g) || []).length !== 6) errors.push(`${relative}: homepage must contain six core service cards`);
  if (relative === 'index.html' && (html.match(/class="portfolio-card reveal/g) || []).length !== 3) errors.push(`${relative}: homepage must contain three selected case-study cards`);
  if (relative === 'index.html' && !html.includes('href="/work/">Projects</a>')) errors.push(`${relative}: primary navigation must expose the projects page clearly`);
  if (relative === 'index.html' && !html.includes('class="hero-pin"')) errors.push(`${relative}: homepage hero must retain its pinned scroll stage`);
  if (relative === 'index.html' && !html.includes('class="browser-page search-results-page"')) errors.push(`${relative}: homepage hero must include the generic search-style browser interface`);
  if (relative === 'index.html' && ['problem-section', 'industries-home', 'why-foundary', 'proof-section'].some((className) => html.includes(`class="section ${className}`))) errors.push(`${relative}: repeated positioning sections should not lengthen the homepage`);
  if (relative === 'index.html' && html.indexOf('class="selected-work"') > html.indexOf('class="capabilities-section"')) errors.push(`${relative}: selected work should appear before core services`);
  if (!primaryNav.includes('href="/contact/">Contact us')) errors.push(`${relative}: primary navigation must use the accurate Contact us action`);
  if (primaryNav.includes('href="/insights/"')) errors.push(`${relative}: unpublished insights must not appear in primary navigation`);
  if (relative === 'industries/index.html' && html.includes('class="portfolio-card reveal')) errors.push(`${relative}: selected projects should not interrupt the industry directory`);
  if (/Book (?:a|your|my) (?:free )?(?:digital )?strategy (?:call|review)/i.test(html)) errors.push(`${relative}: unsupported booking CTA remains`);
  if (/Book a call/i.test(html)) errors.push(`${relative}: unsupported call-booking language remains`);
  if (/search foundations/i.test(html)) errors.push(`${relative}: unexplained search-foundations jargon remains`);
  if (relative === 'index.html' && !/UK-based/i.test(html)) errors.push(`${relative}: homepage must state the UK base explicitly`);
  if (relative.startsWith('work/') && relative !== 'work/index.html') {
    if (!html.includes('<meta property="og:type" content="article">')) errors.push(`${relative}: case study should use article Open Graph type`);
    if (!html.includes(`"creator":{"@id":"https://www.localfoundary.co.uk/#organization"}`)) errors.push(`${relative}: CreativeWork creator should reference the Organization node`);
    if (!description || description.length < 120 || description.length > 160) errors.push(`${relative}: case-study description should be 120–160 characters`);
  }
  if (relative.startsWith('services/') && relative !== 'services/index.html' && !html.includes('class="section service-scope"')) errors.push(`${relative}: service-specific scope guidance is missing`);
  if (relative === 'insights/index.html') {
    if (!html.includes('<meta name="robots" content="noindex,follow">')) errors.push(`${relative}: unpublished insights must remain noindex`);
    const insightIndex = html.match(/<section class="section insight-index">[\s\S]*?<\/section>/)?.[0] || '';
    if (insightIndex.includes('href="/contact/"')) errors.push(`${relative}: interim summaries must not masquerade as article links`);
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch (error) { errors.push(`${relative}: invalid JSON-LD (${error.message})`); }
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) errors.push(`${relative}: duplicate ids ${[...new Set(duplicates)].join(', ')}`);

  const localLinks = [...html.matchAll(/href="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((href) => href.startsWith('/') && !href.startsWith('/api/'));
  for (const href of localLinks) {
    try { await access(routeTarget(href)); } catch { errors.push(`${relative}: broken local link ${href}`); }
  }

  const localAssets = [
    ...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g),
    ...html.matchAll(/srcset="([^"]+)"/g),
  ].flatMap((match) => match[1].split(',').map((candidate) => candidate.trim().split(/\s+/)[0])).filter((asset) => asset.startsWith('/assets/'));
  for (const asset of localAssets) {
    const assetPath = asset.split(/[?#]/)[0];
    try { await access(path.join(dist, assetPath.replace(/^\//, ''))); } catch { errors.push(`${relative}: missing asset ${asset}`); }
  }
}

for (const campaign of ['websites-for-plumbers', 'websites-for-electricians', 'websites-for-builders', 'websites-for-service-businesses']) {
  try { await access(path.join(dist, campaign, 'index.html')); } catch { errors.push(`${campaign}: retained SEO campaign route is missing`); }
}

const contactHtml = await readFile(path.join(dist, 'contact', 'index.html'), 'utf8');
for (const field of ['name', 'business', 'email', 'phone', 'website', 'industry', 'service', 'budget', 'contactMethod', 'objective', 'consent']) {
  if (!contactHtml.includes(`name="${field}"`)) errors.push(`contact/index.html: missing strategy-review field ${field}`);
}
const requiredContactFields = (contactHtml.match(/\srequired(?:\s|>)/g) || []).length;
if (!contactHtml.includes('Send my enquiry')) errors.push('contact/index.html: form must describe the action it actually performs');
const contactMethod = contactHtml.match(/<select id="contact-method"[\s\S]*?<\/select>/)?.[0] || '';
if (/Telephone|Video call/.test(contactMethod)) errors.push('contact/index.html: unsupported call reply option remains');
if (requiredContactFields >= 10) errors.push('contact/index.html: too many fields are mandatory');

const pricingHtml = await readFile(path.join(dist, 'pricing', 'index.html'), 'utf8');
for (const reference of ['Launch', 'Growth', 'Scale', '£549', '£949', 'Tailored quote', 'Tailored to the agreed scope', '£59 / year', '£29/month', 'From £50']) {
  if (!pricingHtml.includes(reference)) errors.push(`pricing/index.html: missing pricing reference ${reference}`);
}
if (pricingHtml.includes('£1,499')) errors.push('pricing/index.html: Scale must not display the retired fixed price');
if (/carried over from the supplied site|advertised in the supplied pricing/i.test(pricingHtml)) errors.push('pricing/index.html: internal audit wording remains visible');
if (!pricingHtml.includes('"@type":"FAQPage"')) errors.push('pricing/index.html: visible pricing questions need FAQPage schema');

const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
if (sitemap.includes('/insights/')) errors.push('sitemap.xml: unpublished insights must be omitted');

const sourceStyles = await readFile(path.join(root, 'src', 'styles.css'), 'utf8');
const sourceScript = await readFile(path.join(root, 'src', 'site.js'), 'utf8');
const sourceData = await readFile(path.join(root, 'src', 'data.mjs'), 'utf8');
const sourceTemplates = await readFile(path.join(root, 'src', 'templates.mjs'), 'utf8');
if (!/dd\s*\{\s*margin:\s*0;?\s*\}/.test(sourceStyles)) errors.push('src/styles.css: definition-list descriptions must reset the browser default margin');
if (!sourceScript.includes("sessionStorage.setItem('lf-intro-seen', 'true')")) errors.push('src/site.js: page intro must be recorded for the session');
if (!sourceScript.includes('window.dataLayer = window.dataLayer || []')) errors.push('src/site.js: analytics event queue must be initialised');
for (const event of ['lf_cta_click', 'lf_form_submit', 'lf_form_success', 'lf_contact_click']) {
  if (!sourceScript.includes(event)) errors.push(`src/site.js: missing conversion event ${event}`);
}
if (/\.industry-line:hover\s*\{[^}]*padding/.test(sourceStyles)) errors.push('src/styles.css: industry-row hover must not shift content with padding');
if (/search foundations/i.test(`${sourceData}\n${sourceTemplates}`)) errors.push('source: replace search-foundations jargon with plain language');
for (const file of htmlFiles) {
  const relative = path.relative(dist, file);
  const html = await readFile(file, 'utf8');
  const repeatedCta = (html.match(/Ready to strengthen(?:<br>)?your online presence\?/g) || []).length;
  if (repeatedCta > 1) errors.push(`${relative}: repeated end-of-page CTA`);
}

const redirects = await readFile(path.join(dist, '_redirects'), 'utf8');
for (const legacy of ['/services.html', '/industries.html', '/pricing.html', '/how-it-works.html', '/about.html', '/contact.html', '/privacy.html', '/websites-for-plumbers.html', '/websites-for-electricians.html', '/websites-for-builders.html', '/websites-for-service-businesses.html']) {
  if (!redirects.includes(`${legacy} `)) errors.push(`dist/_redirects: missing legacy redirect ${legacy}`);
}
const headers = await readFile(path.join(dist, '_headers'), 'utf8');
for (const header of ['Content-Security-Policy', 'X-Frame-Options', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy', 'Strict-Transport-Security']) {
  if (!headers.includes(header)) errors.push(`dist/_headers: missing ${header}`);
}
if (!contactHtml.includes('action="/api/contact"')) errors.push('contact/index.html: form must post to the Cloudflare Worker contact endpoint');
try {
  const envExample = await readFile(path.join(root, '.env.example'), 'utf8');
  for (const variable of ['RESEND_API_KEY=', 'CONTACT_FROM=', 'CONTACT_TO=']) {
    if (!envExample.includes(variable)) errors.push(`.env.example: missing ${variable.replace('=', '')}`);
  }
} catch { errors.push('.env.example: missing Cloudflare/Resend environment contract'); }
const projectSources = await Promise.all([
  readFile(path.join(root, 'src', 'templates.mjs'), 'utf8'),
  readFile(path.join(root, 'package.json'), 'utf8'),
  readFile(path.join(root, 'package-lock.json'), 'utf8'),
]);
if (/\.netlify\/functions|hosted through Netlify|Gmail SMTP|nodemailer|["']googleapis["']/i.test(projectSources.join('\n'))) errors.push('source: retired Netlify or SMTP implementation remains');

const websiteDesignHtml = await readFile(path.join(dist, 'services', 'website-design', 'index.html'), 'utf8');
for (const campaign of ['websites-for-plumbers', 'websites-for-electricians', 'websites-for-builders', 'websites-for-service-businesses']) {
  if (!websiteDesignHtml.includes(`href="/${campaign}/"`)) errors.push(`services/website-design: missing contextual link to ${campaign}`);
}
const industriesHtml = await readFile(path.join(dist, 'industries', 'index.html'), 'utf8');
if ((industriesHtml.match(/class="industry-sector-links"/g) || []).length !== 12) errors.push('industries/index.html: every industry card must expose relevant links');

const css = await readFile(path.join(dist, 'assets', 'styles.css'), 'utf8');
const js = await readFile(path.join(dist, 'assets', 'site.js'), 'utf8');
if (!css.includes('prefers-reduced-motion')) errors.push('styles.css: missing reduced-motion support');
if (!css.includes('@media print') || !css.includes('.js .project-screenshot .desktop-device')) errors.push('styles.css: missing print fallback for reveal images');
if (!css.includes('.footer-label') || /footer-grid h3/.test(css)) errors.push('styles.css: footer labels must remain UI text rather than inconsistent H3 headings');
if (!css.includes('.principle-grid') || !css.includes('.statement-grid')) errors.push('styles.css: missing shared card and split-section alignment system');
if ((industriesHtml.match(/class="industry-campaign-links"/g) || []).length) errors.push('industries/index.html: targeted campaign links should live outside unequal industry cards');
const processHtml = await readFile(path.join(dist, 'how-it-works', 'index.html'), 'utf8');
if (!processHtml.includes('<b>Projects</b>')) errors.push('how-it-works/index.html: process proof row must contain the projects card');
if (!js.includes("event.key === 'Escape'")) errors.push('site.js: missing escape-key menu support');
if (!js.includes('aria-invalid')) errors.push('site.js: missing accessible form validation');
if (/script-src 'self' 'unsafe-inline'/.test(headers)) errors.push('dist/_headers: script CSP should not allow unsafe-inline');
if (/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(headers) || /fonts\.googleapis\.com|fonts\.gstatic\.com/.test(sourceTemplates)) errors.push('source: Google Fonts dependency should be removed');
if (/100vw/.test(sourceStyles.match(/--shell:[^;]+/)?.[0] || '')) errors.push('src/styles.css: shell width must not use 100vw');
if (contactHtml.includes(' novalidate') || contactHtml.includes('autocomplete="organization-title"')) errors.push('contact/index.html: progressive-enhancement validation attributes are incorrect');
if (pricingHtml.includes('pricing-badge-placeholder">Recommended starting point')) errors.push('pricing/index.html: hidden recommendation badge must be empty');
const homeHtml = await readFile(path.join(dist, 'index.html'), 'utf8');
if (/system-label[^>]*aria-live/.test(homeHtml)) errors.push('index.html: scroll-linked hero label must not be a live region');
for (const asset of ['fonts/manrope-latin.woff2', 'fonts/space-grotesk-latin.woff2', 'work/iffy-khan/site-desktop-800.webp', 'work/ste-hamilton-fitness/site-desktop-800.webp', 'work/pat-barrett/site-desktop-800.webp']) {
  try { await access(path.join(dist, 'assets', asset)); } catch { errors.push(`dist/assets/${asset}: required optimised asset is missing`); }
}
try {
  const wrangler = await readFile(path.join(root, 'wrangler.jsonc'), 'utf8');
  const worker = await readFile(path.join(root, 'worker', 'index.js'), 'utf8');
  if (!wrangler.includes('"not_found_handling": "404-page"')) errors.push('wrangler.jsonc: branded 404 handling is missing');
  if (!worker.includes("endsWith('.workers.dev')") || !worker.includes('X-Robots-Tag')) errors.push('worker/index.js: preview no-index protection is missing');
  if (!worker.includes('status: 301')) errors.push('worker/index.js: permanent trailing-slash redirect upgrade is missing');
  if (!worker.includes('max-age=31536000, immutable') || !worker.includes('max-age=0, must-revalidate')) errors.push('worker/index.js: exact cache policies are missing');
  if (!worker.includes("url.pathname === '/api/contact'") || !worker.includes('RESEND_API_KEY')) errors.push('worker/index.js: contact endpoint is missing');
  if (!worker.includes("Allow: 'POST'") || !worker.includes("status: 405")) errors.push('worker/index.js: contact endpoint method guard is missing');
} catch { errors.push('Cloudflare Worker deployment configuration is missing'); }

if (errors.length) {
  console.error(`QA failed with ${errors.length} issue${errors.length === 1 ? '' : 's'}:`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`QA passed: ${htmlFiles.length} pages, ${titles.size} unique titles, local links and assets verified.`);
