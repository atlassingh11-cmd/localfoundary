import {
  capabilities,
  homeFaqs,
  industryPageData,
  industries,
  pricing,
  processSteps,
  projects,
  servicePages,
  site,
} from './data.mjs';

const arrow = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5"/></svg>';
const check = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9"/></svg>';
const whatsappIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.23-6.16-3.48-8.41"/></svg>';

const cleanPath = (path = '/') => (path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`);
const canonical = (path) => `${site.url}${cleanPath(path)}`;
const getProject = (slug) => projects.find((project) => project.slug === slug);
const webpPath = (imagePath) => imagePath.replace(/\.(?:jpe?g|png)$/i, '.webp');
const compactWebpPath = (imagePath) => imagePath.replace(/\.(?:jpe?g|png)$/i, '-800.webp');

const caseStudyHeadings = {
  'iffy-khan': {
    overview: 'Property expertise, made personal.',
    delivery: 'Credibility, property guidance and a direct route to enquire.',
    responsive: 'A premium property experience across every screen.',
  },
  'ste-hamilton-fitness': {
    overview: 'A coaching offer with energy and structure.',
    delivery: 'Services, transformation proof and stronger enquiry journeys.',
    responsive: 'Coaching momentum that carries from desktop to mobile.',
  },
  'pat-barrett': {
    overview: 'A boxing legacy shaped for the next chapter.',
    delivery: 'Career, media, appearances and events in one experience.',
    responsive: 'A bold editorial story composed for every screen.',
  },
};

const serviceCtaCopy = {
  'digital-strategy': 'Share the decisions competing for attention and the evidence already available. We’ll identify the most valuable place to begin.',
  'website-design': 'Tell us what the current website no longer communicates or supports. We’ll outline the right design and delivery scope.',
  ecommerce: 'Describe the catalogue, buying journey and operational constraints. We’ll respond with the most sensible commerce starting point.',
  branding: 'Share what feels inconsistent or hard to recognise today. We’ll explain where positioning, messaging or identity can create the greatest change.',
  'local-seo': 'Tell us what you need from SEO & search visibility, the locations or markets that matter and what a valuable search visit should lead to.',
  'google-business-profile': 'Tell us what you need from Google Business Profile optimisation and whether you already control the listing. We’ll explain the next practical step.',
  'landing-pages-lead-generation': 'Share the campaign, audience and action you need. We’ll recommend a focused page and qualification approach.',
  'copy-content': 'Show us where customers lose the thread or where expertise is difficult to express. We’ll suggest a focused content scope.',
  'hosting-support': 'Tell us how the website is hosted, what needs maintaining and where responsibilities are unclear. We’ll set out an appropriate support route.',
  'digital-growth': 'Share the growth priorities and the activity already under way. We’ll identify where a connected plan can remove the most friction.',
};

const serviceGuidance = {
  'digital-strategy': {
    for: 'Useful when digital activity feels disconnected, priorities compete or the business needs a defensible plan before committing to design, content or technology.',
    assess: 'The current online presence, customer journey, available analytics, market evidence, operational constraints and the people responsible for key decisions.',
    success: 'A prioritised roadmap, named decision owners and practical measures that make the next investment easier to explain, sequence and review.',
    scope: 'The proposal confirms research inputs, workshop participants, prioritisation method, review points and the format of the final roadmap.',
  },
  'website-design': {
    for: 'Useful when the offer is difficult to understand, the current site no longer reflects the business or important mobile tasks create avoidable friction.',
    assess: 'Content, navigation, customer tasks, device behaviour, platform constraints, integrations, accessibility needs and the evidence required to build trust.',
    success: 'Clearer task completion, useful enquiries, usability, accessibility, technical performance and an easier handover for the people maintaining the site.',
    scope: 'The proposal confirms the platform, page and template count, content responsibilities, browser support, accessibility target, ownership and handover.',
  },
  ecommerce: {
    for: 'Useful when customers struggle to find, compare or buy products, or when the store structure no longer supports the catalogue and fulfilment process.',
    assess: 'Catalogue size, product data, variants, payments, tax, shipping, returns, stock systems, email flows, analytics and staff responsibilities.',
    success: 'Product findability, checkout completion, useful conversion events, device performance and fewer operational gaps between the store and fulfilment.',
    scope: 'The proposal confirms the commerce platform, integrations, training, data responsibilities and all paid software or transaction costs.',
  },
  branding: {
    for: 'Useful when the business is hard to recognise, its message changes between channels or the existing identity no longer supports its position.',
    assess: 'Audience, category expectations, competitors, existing recognition, naming constraints, applications and the materials the team must use consistently.',
    success: 'A clearer position, more consistent application and a visual and verbal system the business can use confidently across agreed touchpoints.',
    scope: 'The proposal states whether naming, a final logo, editable files, usage rights, trademark searches, printed collateral and production support are included.',
  },
  'local-seo': {
    for: 'Useful when relevant pages are difficult to discover, local and national intent are mixed together or technical and content foundations need a clear plan.',
    assess: 'Indexation, site structure, search demand, competitors, page quality, internal links, local signals, structured data and available measurement access.',
    success: 'Improved technical coverage, appropriate visibility, useful search visits and conversion events agreed before work begins — without guaranteeing rankings.',
    scope: 'The proposal separates technical work, content work, local activity and any ongoing optimisation, and confirms reporting access and responsibilities.',
  },
  'google-business-profile': {
    for: 'Useful for an eligible business that needs accurate, complete information across Google Search and Maps and a clearer route from discovery to contact.',
    assess: 'Profile ownership, verification status, eligibility, categories, services, locations, imagery, reviews, website alignment and any policy restrictions.',
    success: 'Accurate information, stronger profile completeness and trackable customer actions. Google controls verification, visibility and reinstatement decisions.',
    scope: 'The client retains ownership of the profile. The proposal confirms access, verification responsibilities, content inputs and the limits of suspension support.',
  },
  'landing-pages-lead-generation': {
    for: 'Useful when a campaign needs one focused offer, clearer qualification or a better connection between traffic, the page and the follow-up process.',
    assess: 'Traffic source, audience intent, offer, proof, form questions, CRM or booking requirements, tracking, follow-up ownership and operational capacity.',
    success: 'Completion rate, qualified actions, lead quality, drop-off points and reliable hand-off into the agreed follow-up system.',
    scope: 'The proposal confirms who supplies the offer and evidence, which integrations are included and how tracking and qualification will be tested.',
  },
  'copy-content': {
    for: 'Useful when pages feel generic, subject knowledge is trapped inside the business or customers cannot quickly understand the offer and next step.',
    assess: 'Existing pages, customer questions, source material, interviews, proof, search intent, tone, compliance needs and the people approving factual claims.',
    success: 'Clearer comprehension, consistent terminology, useful task completion and content that can be maintained without relying on unsupported claims.',
    scope: 'The proposal confirms page count, interview and research time, SEO input, revision rounds, factual approvals and final ownership of the supplied copy.',
  },
  'hosting-support': {
    for: 'Useful when the business needs clear responsibilities for hosting, updates, routine checks, support requests and an orderly route away from the service if needed.',
    assess: 'Platform, access, dependencies, domain control, backup needs, update risk, paid software, support expectations and current ownership arrangements.',
    success: 'Agreed checks completed, responsibilities recorded, issues routed clearly and the website kept within the maintenance scope confirmed in writing.',
    scope: 'The agreement names the hosting arrangement, backup cadence, support hours, response expectations, exclusions, renewal terms and exit or migration process.',
  },
  'digital-growth': {
    for: 'Useful when website, search, content and conversion priorities depend on one another and the business needs an agreed rhythm for deciding what happens next.',
    assess: 'Current activity, measurement access, customer evidence, market conditions, operational dependencies, available content and delivery capacity.',
    success: 'Progress against agreed indicators such as qualified actions, visibility, usability, performance and completed priorities rather than a guaranteed revenue outcome.',
    scope: 'The proposal confirms the minimum term, activity included, review frequency, reporting access, dependencies and how priorities can change.',
  },
};

const servicePresentation = {
  'digital-strategy': {
    deliverableTitle: 'What a digital strategy engagement includes.',
    scopeTitle: 'Who digital strategy is for —<br>and what we assess.',
    principles: [
      ['Priorities before activity', 'We define what matters first so budget and attention follow commercial impact rather than noise.'],
      ['Sequence over wishlist', 'The roadmap orders work by dependency and value, not by what is easiest to sell.'],
      ['Evidence over assumption', 'Recommendations are tied to customer behaviour, available data and the constraints of the business.'],
    ],
    cta: ['A clearer first step', 'Ready for a clearer digital direction?'],
  },
  'website-design': {
    deliverableTitle: 'Bespoke website design, from structure to launch.',
    scopeTitle: 'What your website needs to<br>communicate and achieve.',
    principles: [
      ['Clear before clever', 'The offer, evidence and next step stay understandable even when the visual direction is ambitious.'],
      ['Responsive by intent', 'Desktop and mobile journeys are composed around real customer context, not simply resized.'],
      ['Built for ownership', 'Content, integrations and handover are planned so the website can be maintained after launch.'],
    ],
    cta: ['Build with purpose', 'Ready for a website built around your business?'],
  },
  ecommerce: {
    deliverableTitle: 'E-commerce design from discovery to checkout.',
    scopeTitle: 'What your customers need<br>to compare and buy.',
    principles: [
      ['Product clarity first', 'Navigation, filters and product information help customers understand the choice before asking them to buy.'],
      ['Friction with a purpose', 'We remove avoidable steps while keeping the delivery, returns and payment information customers need.'],
      ['Operations considered', 'Catalogue, fulfilment, stock and email requirements shape the solution from the beginning.'],
    ],
    cta: ['Make buying easier', 'Ready to build a shop customers can use confidently?'],
  },
  branding: {
    deliverableTitle: 'Positioning and identity that make you recognisable.',
    scopeTitle: 'What the brand needs to mean —<br>and where it must work.',
    principles: [
      ['Position before decoration', 'The identity begins with audience, category and value rather than a colour palette in isolation.'],
      ['Distinctive, not unfamiliar', 'We create recognition without making the brand harder for customers to understand.'],
      ['Designed for real use', 'The system is tested across the website, social content and practical business materials.'],
    ],
    cta: ['Create recognition', 'Ready to make your brand unmistakable?'],
  },
  'local-seo': {
    deliverableTitle: 'SEO foundations for useful, relevant visibility.',
    scopeTitle: 'Where search demand exists —<br>and what your site can earn.',
    principles: [
      ['Intent before keywords', 'Pages are shaped around what a useful visitor is trying to find, compare or do.'],
      ['Technical foundations', 'Crawlability, structure, internal links and page quality support discovery without shortcuts.'],
      ['Measurement without promises', 'We track relevant visibility and actions while being honest about competition and external factors.'],
    ],
    cta: ['Build useful visibility', 'Ready to improve how customers find you?'],
  },
  'google-business-profile': {
    deliverableTitle: 'A more complete and useful Google presence.',
    scopeTitle: 'What customers need from<br>your profile and Maps result.',
    principles: [
      ['Accuracy earns trust', 'Categories, services, hours and contact details must match the real business and website.'],
      ['Evidence over embellishment', 'Imagery and review journeys should help customers decide without manufactured proof.'],
      ['Policy-aware delivery', 'Google controls verification and visibility, so recommendations stay within its published rules.'],
    ],
    cta: ['Improve the first impression', 'Ready to make your Google profile work harder?'],
  },
  'landing-pages-lead-generation': {
    deliverableTitle: 'Landing pages built around qualified action.',
    scopeTitle: 'What the campaign must explain —<br>and what happens next.',
    principles: [
      ['One focused promise', 'Each page aligns the audience, offer and evidence around one appropriate next step.'],
      ['Qualification without friction', 'Forms gather what your team needs without asking visitors for unnecessary information.'],
      ['Follow-up designed in', 'Tracking and hand-off are planned so a submitted enquiry reaches the right next action.'],
    ],
    cta: ['Turn visits into action', 'Ready for more qualified campaign enquiries?'],
  },
  'copy-content': {
    deliverableTitle: 'Website copy that turns expertise into clear value.',
    scopeTitle: 'What customers need to know —<br>and what only you can say.',
    principles: [
      ['Specific beats impressive', 'Concrete services, evidence and expectations build more trust than generic claims.'],
      ['Structure supports scanning', 'Headings, summaries and calls to action help readers find the detail they need.'],
      ['Your voice, made consistent', 'The language should sound recognisably yours across every important page and touchpoint.'],
    ],
    cta: ['Make the value clear', 'Ready to say what makes your business worth choosing?'],
  },
  'hosting-support': {
    deliverableTitle: 'Hosting and maintenance with responsibilities in writing.',
    scopeTitle: 'What needs maintaining —<br>and how support will work.',
    principles: [
      ['Responsibilities defined', 'Hosting, updates, backups and support boundaries are recorded before the service begins.'],
      ['Changes stay controlled', 'Routine updates are separated from new design, pages and development so costs remain clear.'],
      ['An orderly exit', 'Domain control, handover files and migration responsibilities are agreed rather than assumed.'],
    ],
    cta: ['Plan beyond launch', 'Need a clearer hosting and support plan?'],
  },
  'digital-growth': {
    deliverableTitle: 'One ongoing plan across the whole digital journey.',
    scopeTitle: 'Where progress is blocked —<br>and what should move next.',
    principles: [
      ['One shared priority list', 'Website, search, content and conversion work are sequenced against the same commercial goals.'],
      ['Review, learn, adjust', 'Agreed measures and customer behaviour shape the next cycle of work.'],
      ['No disconnected activity', 'Every task must support a clear customer decision or an agreed operational need.'],
    ],
    cta: ['Connect the whole picture', 'Ready for a joined-up digital growth plan?'],
  },
};

const serviceScopeSection = (service) => {
  const guidance = serviceGuidance[service.slug];
  const presentation = servicePresentation[service.slug];
  if (!guidance) return '';
  return `<section class="section service-scope"><div class="shell">${sectionHeading({ eyebrow: 'Scope and evidence', title: presentation?.scopeTitle || 'Useful work starts with<br>the right questions.' })}<div class="principle-grid"><article><span>01</span><h3>Who this is for</h3><p>${guidance.for}</p></article><article><span>02</span><h3>What we assess</h3><p>${guidance.assess}</p></article><article><span>03</span><h3>How success is assessed</h3><p>${guidance.success}</p></article></div><aside class="pricing-note"><b>How scope is agreed</b><p>${guidance.scope}</p></aside></div></section>`;
};

const servicePrinciples = (service) => {
  const items = servicePresentation[service.slug]?.principles || [];
  return `<section class="section service-principles"><div class="shell"><div class="principle-grid">${items.map(([title, copy], index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></div></section>`;
};

const tradeServiceLinks = () => `
  <section class="section trade-service-links">
    <div class="shell">
      ${sectionHeading({ eyebrow: 'Focused industry pages', title: 'Website design for<br>service-led businesses.', copy: 'Explore how the same design discipline adapts to the services, proof and enquiry journey of each market.' })}
      <div class="trade-link-grid">
        <a href="/websites-for-plumbers/"><span>01</span><b>Websites for plumbers</b>${arrow}</a>
        <a href="/websites-for-electricians/"><span>02</span><b>Websites for electricians</b>${arrow}</a>
        <a href="/websites-for-builders/"><span>03</span><b>Websites for builders</b>${arrow}</a>
        <a href="/websites-for-service-businesses/"><span>04</span><b>Service business websites</b>${arrow}</a>
      </div>
    </div>
  </section>`;

const hostingPriceSummary = () => `
  <section class="section hosting-price-summary">
    <div class="shell pricing-preview-grid">
      <div>${sectionHeading({ eyebrow: 'Care after launch', title: 'Choose the level of<br>ongoing support you need.', copy: 'Every website package includes two years of standard hosting. After that, choose a simple annual renewal or a monthly care plan with minor content updates.' })}<a class="text-link" href="/pricing/">See full pricing and terms ${arrow}</a></div>
      <div class="support-price-options"><article><span>Annual renewal</span><b>£59 / year</b><p>Standard hosting, SSL and renewal of one eligible domain registration.</p></article><article><span>Care plan</span><b>£29/month</b><p>Hosting, renewal and up to two minor content updates each month. Full cancellation and handover terms are agreed in writing.</p></article></div>
    </div>
  </section>`;

const tradeCampaigns = (currentSlug) => {
  const campaigns = Object.entries(industryPageData).filter(([slug]) => slug !== currentSlug);
  return `<section class="section trade-campaigns"><div class="shell">${sectionHeading({ eyebrow: 'Also for', title: 'More service-led<br>website expertise.' })}<div class="trade-link-grid">${campaigns.map(([slug, item], index) => `<a href="/${slug}/"><span>${String(index + 1).padStart(2, '0')}</span><b>${item.eyebrow}</b>${arrow}</a>`).join('')}<a href="/industries/"><span>04</span><b>All industries</b>${arrow}</a></div></div></section>`;
};

const stripHtml = (value = '') => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&');
const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(([question, answer]) => ({
    '@type': 'Question',
    name: stripHtml(question),
    acceptedAnswer: { '@type': 'Answer', text: stripHtml(answer) },
  })),
});

const logo = () => `
  <a class="brand" href="/" aria-label="Local Foundary home">
    <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    <span class="brand-name"><b>Local</b> Foundary</span>
  </a>`;

const pageLoader = () => `
  <div class="page-loader" data-page-loader aria-hidden="true">
    <div class="loader-panels"><i></i><i></i><i></i><i></i></div>
    <div class="loader-content">
      <div class="loader-brand">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <span>Local Foundary</span>
      </div>
      <p>Building the full picture</p>
      <div class="loader-status">
        <span class="loader-number" data-loader-number>00</span><small>%</small>
        <div class="loader-track"><i data-loader-progress></i></div>
      </div>
    </div>
  </div>
  <div class="scroll-meter" data-scroll-meter aria-hidden="true">
    <span>Page</span>
    <i><b data-scroll-progress></b></i>
    <em data-scroll-number>00</em>
  </div>`;

const whatsappButton = () => `
  <a class="whatsapp-button" data-whatsapp href="${site.whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Local Foundary on WhatsApp (opens in a new tab)">
    <span class="whatsapp-icon">${whatsappIcon}</span>
  </a>`;

const whatsappAction = (className = '') => `
  <a class="whatsapp-action${className ? ` ${className}` : ''}" data-whatsapp href="${site.whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Local Foundary on WhatsApp (opens in a new tab)">
    <span class="whatsapp-icon">${whatsappIcon}</span>
  </a>`;

const header = (active = '') => `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-header>
    <div class="shell header-inner">
      ${logo()}
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" data-menu-toggle>
        <span class="sr-only">Open navigation</span><i></i><i></i>
      </button>
      <nav class="primary-nav" id="primary-navigation" aria-label="Primary" data-navigation>
        <a ${active === 'work' ? 'aria-current="page"' : ''} href="/work/">Projects</a>
        <a ${active === 'services' ? 'aria-current="page"' : ''} href="/services/">Services</a>
        <a ${active === 'industries' ? 'aria-current="page"' : ''} href="/industries/">Industries</a>
        <a ${active === 'process' ? 'aria-current="page"' : ''} href="/how-it-works/">How it works</a>
        <a ${active === 'pricing' ? 'aria-current="page"' : ''} href="/pricing/">Pricing</a>
        <a ${active === 'about' ? 'aria-current="page"' : ''} href="/about/">About</a>
        <a class="nav-cta" ${active === 'contact' ? 'aria-current="page"' : ''} href="/contact/">Contact us ${arrow}</a>
      </nav>
    </div>
  </header>`;

const footer = () => `
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div class="footer-brand">
        ${logo()}
        <p>A UK-based digital agency combining strategy, design, development and search to help ambitious businesses grow locally and internationally.</p>
        <a href="mailto:${site.email}">${site.email}</a>
        ${whatsappAction('footer-whatsapp')}
      </div>
      <nav aria-label="Footer explore">
        <p class="footer-label">Explore</p>
        <a href="/work/">Projects</a><a href="/services/">Services</a><a href="/industries/">Industries</a><a href="/how-it-works/">How it works</a><a href="/pricing/">Pricing</a><a href="/about/">About</a><a href="/contact/">Contact</a>
      </nav>
      <nav aria-label="Footer capabilities">
        <p class="footer-label">Capabilities</p>
        <a href="/services/digital-strategy/">Digital strategy</a><a href="/services/website-design/">Website design</a><a href="/services/ecommerce/">E-commerce</a><a href="/services/local-seo/">SEO & search</a><a href="/services/landing-pages-lead-generation/">Lead generation</a><a href="/services/hosting-support/">Ongoing support</a>
      </nav>
      <nav aria-label="Footer industries">
        <p class="footer-label">Industries</p>
        <a href="/websites-for-plumbers/">Websites for plumbers</a><a href="/websites-for-electricians/">Websites for electricians</a><a href="/websites-for-builders/">Websites for builders</a><a href="/websites-for-service-businesses/">Service business websites</a><a href="/industries/">View all industries</a>
      </nav>
    </div>
    <div class="shell footer-base">
      <span>© 2026 Local Foundary</span>
      <span>UK-based · working internationally</span>
      <span><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></span>
    </div>
  </footer>`;

const organisationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  email: site.email,
  logo: `${site.url}/android-chrome-512x512.png`,
  image: `${site.url}/assets/og-image.jpg`,
  description: 'A UK-based independent digital agency for website strategy, design, development and search, serving UK and international clients.',
  areaServed: ['United Kingdom', 'International'],
  priceRange: '££–£££',
  contactPoint: [{
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: site.email,
    url: `${site.url}/contact/`,
    availableLanguage: ['English'],
    areaServed: ['United Kingdom', 'International'],
  }],
});

const breadcrumbSchema = (items = []) => items.length < 2 ? null : ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem', position: index + 1, name: item.name, item: canonical(item.path),
  })),
});

const formatHeadingHtml = (value = '') => value.replace(/<br\s*\/?>\s*/gi, '<br> ');
const normaliseHeadingWhitespace = (html = '') => html.replace(
  /<h([1-6])(\b[^>]*)>([\s\S]*?)<\/h\1>/gi,
  (match, level, attributes, inner) => `<h${level}${attributes}>${formatHeadingHtml(inner)}</h${level}>`,
);

export const layout = ({
  title,
  description,
  path = '/',
  active = '',
  content,
  robots = 'index,follow',
  schema = [],
  breadcrumbs = [],
  bodyClass = '',
  includeCanonical = true,
  pageType = 'WebPage',
  ogType = 'website',
  preloadAssets = [],
}) => {
  const pageSchema = includeCanonical ? {
    '@context': 'https://schema.org',
    '@type': pageType,
    '@id': `${canonical(path)}#webpage`,
    url: canonical(path),
    name: title,
    description,
    isPartOf: { '@type': 'WebSite', '@id': `${site.url}/#website`, name: site.name, url: site.url },
    about: { '@id': `${site.url}/#organization` },
  } : null;
  const schemas = [organisationSchema(), pageSchema, breadcrumbSchema(breadcrumbs), ...schema].filter(Boolean);
  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="${robots}">
  ${includeCanonical ? `<link rel="canonical" href="${canonical(path)}">` : ''}
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="Local Foundary">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical(path)}">
  <meta property="og:image" content="${site.url}/assets/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${site.url}/assets/og-image.jpg">
  <meta name="theme-color" content="#05060a">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
  ${preloadAssets.map((asset) => `<link rel="preload" href="${asset.href}" as="image"${asset.type ? ` type="${asset.type}"` : ''}${asset.media ? ` media="${asset.media}"` : ''}>`).join('\n  ')}
  <link rel="stylesheet" href="/assets/styles.css?v=20260717b">
  ${schemas.map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join('\n  ')}
  <script src="/assets/site.js?v=20260717b" defer></script>
</head>
<body class="intro-pending ${bodyClass}">
  ${pageLoader()}
  ${header(active)}
  <main id="main">${normaliseHeadingWhitespace(content)}</main>
  ${footer()}
  ${whatsappButton()}
</body>
</html>`;
};

const sectionHeading = ({ eyebrow, title, copy = '', align = '' }) => `
  <div class="section-heading ${align}">
    <p class="eyebrow">${eyebrow}</p>
    <h2>${formatHeadingHtml(title)}</h2>
    ${copy ? `<p class="lede">${copy}</p>` : ''}
  </div>`;

const buttonRow = (primaryHref = '/contact/', secondaryHref = '/work/', primary = 'Contact us', secondary = 'Explore our work') => {
  const secondaryExternal = /^https?:\/\//.test(secondaryHref);
  return `
  <div class="button-row">
    <a class="button button-accent" href="${primaryHref}">${primary} ${arrow}</a>
    <a class="text-link" href="${secondaryHref}" ${secondaryExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>${secondary} ${secondaryExternal ? '<span aria-hidden="true">↗</span>' : arrow}</a>
  </div>`;
};

const heroSystem = () => `
  <div class="hero-system-track">
  <div class="hero-system" data-parallax data-scroll-stage="1" role="img" aria-label="Scroll-linked illustration showing brand, website, search visibility, reviews and an enquiry working together">
    <div class="system-label">
      <span>How it fits together</span>
      <b><i data-hero-stage-number>01</i><em data-hero-stage-label>Identity</em></b>
      <span class="hero-stage-track" aria-hidden="true"><i></i></span>
    </div>
    <div class="orbit orbit-one" aria-hidden="true"></div>
    <div class="orbit orbit-two" aria-hidden="true"></div>
    <div class="hero-browser" data-hero-card="2">
      <div class="browser-bar"><i></i><i></i><i></i><span>search.local/query</span></div>
      <div class="browser-page search-results-page">
        <div class="search-platform-mark" aria-hidden="true"><i></i><span>Search</span></div>
        <div class="search-query-field">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>
          <span>website strategy and design</span>
          <b aria-hidden="true"></b>
        </div>
        <div class="search-suggestions" aria-hidden="true">
          <div><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg><span><b>website design</b> for growing businesses</span></div>
          <div><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg><span><b>brand strategy</b> and positioning</span></div>
          <div><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg><span><b>technical SEO</b> and local visibility</span></div>
        </div>
        <div class="search-filter-row" aria-hidden="true"><span>Strategy</span><span>Websites</span><span>Search</span></div>
      </div>
    </div>
    <div class="system-card card-identity" data-hero-card="1"><span>Identity</span><b>Aa</b><i></i><i></i><i></i></div>
    <div class="system-card card-search" data-hero-card="3"><span>Search</span><b>Visible by intent</b><small>Local · national · content</small></div>
    <div class="system-card card-trust" data-hero-card="4"><span>Trust</span><b>Reviews connected</b><small>Proof where decisions happen</small></div>
    <div class="system-card card-lead" data-hero-card="5"><i></i><span>New enquiry</span><b>Ready to respond</b></div>
    <svg class="system-lines" viewBox="0 0 720 620" aria-hidden="true"><path d="M140 142C245 108 266 168 360 160S507 87 600 135"/><path d="M115 445c106 41 165-26 248 5s148 94 246 20"/><path d="M357 151v300"/></svg>
  </div>
  </div>`;

const projectVisual = (project, extraClass = '') => {
  if (project.visual === 'screenshot') {
    const priority = extraClass.split(/\s+/).includes('case-visual');
    return `<div class="project-visual project-screenshot ${extraClass}">
      <div class="desktop-device"><div class="device-bar"><i></i><i></i><i></i></div><picture><source type="image/webp" srcset="${compactWebpPath(project.desktopImage)} 800w, ${webpPath(project.desktopImage)} ${project.desktopWidth}w" sizes="(max-width: 800px) 92vw, 960px"><img src="${project.desktopImage}" alt="${project.name} website desktop homepage" width="${project.desktopWidth}" height="${project.desktopHeight}" loading="${priority ? 'eager' : 'lazy'}" ${priority ? 'fetchpriority="high"' : ''}></picture></div>
      <div class="mobile-device"><picture><source type="image/webp" srcset="${webpPath(project.mobileImage)}"><img src="${project.mobileImage}" alt="${project.name} website mobile homepage" width="${project.mobileWidth}" height="${project.mobileHeight}" loading="${priority ? 'eager' : 'lazy'}"></picture></div>
    </div>`;
  }
  const isFitness = project.visual === 'editorial-fitness';
  return `<div class="project-visual project-editorial ${isFitness ? 'fitness' : 'property'} ${extraClass}" role="img" aria-label="Editorial project artwork for ${project.name}">
    <div class="project-monogram">${isFitness ? 'SH' : 'IK'}</div>
    <div class="project-interface">
      <span>${project.industry}</span>
      <h3>${isFitness ? 'Built for the next rep.' : 'Property, personally.'}</h3>
      <p>${isFitness ? 'Coaching · transformation · enquiry' : 'Dubai · Abu Dhabi · investment'}</p>
      <i></i><i></i><i></i>
    </div>
    <div class="project-phone"><span>${project.name}</span><b>${isFitness ? 'Start coaching' : 'Start a conversation'}</b></div>
    <div class="project-index">${isFitness ? '02' : '01'} / 03</div>
  </div>`;
};

const capabilityCards = () => capabilities.map((item) => `
  <article class="capability-card reveal" data-reveal>
    <div class="capability-top"><span>${item.number}</span><b>${item.label}</b></div>
    <div class="capability-art capability-${item.key}" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
    <h3>${item.title}</h3>
    <p>${item.copy}</p>
    <ul>${item.deliverables.map((deliverable) => `<li>${deliverable}</li>`).join('')}</ul>
    <a class="text-link" href="${item.href}">Explore ${item.label.toLowerCase()} ${arrow}</a>
  </article>`).join('');

const selectedWork = () => `
  <section class="section selected-work" id="selected-work">
    <div class="shell">
      ${sectionHeading({ eyebrow: 'Selected case studies', title: 'A snapshot of<br>what we build.', copy: 'Three live projects across property, fitness and entertainment. Open any project to explore the thinking, delivery and finished experience.' })}
      <div class="portfolio-grid">
        ${projects.filter((project) => project.published).map((project, index) => `
          <article class="portfolio-card reveal" data-reveal>
            <a class="portfolio-card-link" href="/work/${project.slug}/">
              <div class="portfolio-card-media">
                <picture><source type="image/webp" srcset="${compactWebpPath(project.desktopImage)} 800w, ${webpPath(project.desktopImage)} ${project.desktopWidth}w" sizes="(max-width: 800px) 92vw, 720px"><img class="portfolio-card-desktop" src="${project.desktopImage}" alt="${project.name} website homepage" width="${project.desktopWidth}" height="${project.desktopHeight}" loading="lazy"></picture>
                <span class="portfolio-card-index">0${index + 1}</span>
                <span class="portfolio-card-action">View full story ${arrow}</span>
                <span class="portfolio-card-phone" aria-hidden="true"><picture><source type="image/webp" srcset="${webpPath(project.mobileImage)}"><img src="${project.mobileImage}" alt="" width="${project.mobileWidth}" height="${project.mobileHeight}" loading="lazy"></picture></span>
              </div>
              <div class="portfolio-card-copy">
                <p>${project.industry}</p>
                <h3>${project.name}</h3>
                <span>${project.summary}</span>
                <ul>${project.services.slice(0, 2).map((service) => `<li>${service}</li>`).join('')}</ul>
              </div>
            </a>
          </article>`).join('')}
      </div>
      <div class="portfolio-footer"><p>A selection of recent work — we are happy to walk you through more.</p><a class="button button-dark" href="/work/">Explore all case studies ${arrow}</a></div>
    </div>
  </section>`;

const presenceStages = [
  ['Brand', 'Position, message and identity create the first clear signal of why the business is worth choosing.'],
  ['Website', 'The offer becomes a focused digital experience that makes value, trust and the next step obvious.'],
  ['Search', 'Technical foundations and useful content connect customer intent to the right services, products and pages.'],
  ['Trust', 'Real proof, people and clear information reduce doubt at the moments where decisions are made.'],
  ['Enquiries', 'Forms, booking, checkout and contact journeys make the next action feel simple and appropriate.'],
  ['Growth', 'Measurement, care and ongoing improvements turn the launch into a system that keeps learning.'],
];

const presenceSystem = () => `
  <section class="presence-section" data-presence-story data-active="1">
    <div class="shell presence-intro">
      <div>
        <p class="eyebrow eyebrow-light">One connected system</p>
        <h2>Bring the key parts of your online presence into one clear system.</h2>
      </div>
      <div>
        <p class="lede">Positioning, website, search visibility, proof and enquiry journeys work better when they support the same customer decision.</p>
        <a class="text-link text-link-light" href="/services/digital-growth/">Explore the complete online presence ${arrow}</a>
      </div>
    </div>
    <div class="shell presence-story-grid">
      <div class="presence-stage" data-presence-stage aria-hidden="true">
        <div class="presence-ghost" data-presence-ghost>Brand</div>
        <div class="presence-scene-copy">
          <span data-presence-scene-number>01</span>
          <div><h3 data-presence-scene-title>${presenceStages[0][0]}</h3><p data-presence-scene-copy>${presenceStages[0][1]}</p></div>
        </div>
        <div class="presence-map">
          <div class="presence-core"><i></i><span>Local</span><b>Foundary</b></div>
          ${presenceStages.map(([name], index) => `<div class="presence-node node-${['brand', 'web', 'google', 'reviews', 'leads', 'growth'][index]}" data-presence-node="${index + 1}"><span>0${index + 1}</span><b>${name}</b></div>`).join('')}
          <svg viewBox="0 0 640 560"><path pathLength="1" data-presence-path="1" d="M320 280 125 95"/><path pathLength="1" data-presence-path="2" d="M320 280 515 95"/><path pathLength="1" data-presence-path="3" d="M320 280 570 285"/><path pathLength="1" data-presence-path="4" d="M320 280 500 475"/><path pathLength="1" data-presence-path="5" d="M320 280 135 470"/><path pathLength="1" data-presence-path="6" d="M320 280 70 280"/></svg>
        </div>
        <div class="presence-status"><span>System build</span><b><i data-presence-number>01</i> / 06</b><em data-presence-label>Brand</em></div>
      </div>
      <ol class="presence-steps">
        ${presenceStages.map(([name, copy], index) => `<li data-presence-step="${index + 1}"><span>0${index + 1}</span><div><h3>${name}</h3><p>${copy}</p></div></li>`).join('')}
      </ol>
    </div>
  </section>`;

const transformation = () => `
  <section class="transformation" data-transformation>
    <div class="shell transformation-intro">
      <p class="eyebrow eyebrow-light">The shift</p>
      <h2>Your business may already be excellent.<br>Your online presence should prove it.</h2>
      <p>Customers form an opinion before they call, visit or request a quote. We bring the critical parts together so every signal points in the same direction.</p>
    </div>
    <div class="shell transformation-grid">
      <div class="transformation-stage" aria-hidden="true">
        <div class="fragment fragment-logo"><i></i><b>BUSINESS</b></div>
        <div class="fragment fragment-site"><span></span><i></i><i></i><i></i></div>
        <div class="fragment fragment-google"><b>G</b><span>Business profile</span></div>
        <div class="fragment fragment-review"><span>Trust</span><b>Reviews</b></div>
        <div class="fragment fragment-lead"><i></i><span>Enquiry captured</span></div>
        <div class="stage-status"><span data-stage-number>01</span><b data-stage-label>Unclear identity</b></div>
      </div>
      <ol class="transformation-steps">
        ${['Unclear identity', 'Professional branding', 'Premium website', 'Google visibility', 'Trust and reviews', 'Enquiries and growth'].map((step, index) => `<li data-stage="${index + 1}"><span>0${index + 1}</span><div><h3>${step}</h3><p>${[
          'Good work, but no clear signal of what makes the business worth choosing.',
          'A recognisable position, message and visual language begin to align.',
          'The offer becomes easy to understand and the next action becomes obvious.',
          'Website and Google presence reinforce relevance in the places customers search.',
          'Real proof is placed where it can reduce doubt without making unsupported claims.',
          'Enquiries are easier to capture, respond to and learn from over time.',
        ][index]}</p></div></li>`).join('')}
      </ol>
    </div>
  </section>`;

const industriesSelector = () => `
  <section class="section industries-home">
    <div class="shell">
      ${sectionHeading({ eyebrow: 'Who we help', title: 'Digital experiences<br>tailored to your industry.', copy: 'Every sector has different customers, expectations and trust signals. We adapt the strategy, structure and design around how your market actually buys.' })}
      <div class="industry-editorial">
        ${industries.slice(0, 8).map((industry, index) => `<a class="industry-line reveal" data-reveal href="/industries/#${industry.slug}"><span>${String(index + 1).padStart(2, '0')}</span><b>${industry.name}</b><p>${industry.short}</p><i>${industry.code}</i>${arrow}</a>`).join('')}
      </div>
      <a class="button button-dark industries-more" href="/industries/">Explore all industries ${arrow}</a>
    </div>
  </section>`;

const processTimeline = (compact = false) => `
  <section class="section process-section ${compact ? 'process-compact' : ''}" data-process>
    <div class="shell">
      ${sectionHeading({ eyebrow: 'How it works', title: 'Clarity at every stage.', copy: 'A four-stage process that keeps strategy, decisions, feedback and delivery visible from the start.' })}
      <div class="process-line"><i data-process-line></i></div>
      <ol class="process-list">
        ${processSteps.map((step) => `<li class="reveal" data-reveal><span>${step.number}</span><div><h3>${step.name}</h3><p>${step.copy}</p><b>${step.deliverable}</b></div></li>`).join('')}
      </ol>
      ${compact ? '<a class="button button-dark" href="/how-it-works/">See the full process ' + arrow + '</a>' : ''}
    </div>
  </section>`;

const pricingPreview = () => `
  <section class="section pricing-preview">
    <div class="shell pricing-preview-grid">
      <div>${sectionHeading({ eyebrow: 'Clear pricing', title: 'A defined starting point.<br>No mystery invoice.', copy: 'Website packages start at £549. Your proposal confirms pages, features, content responsibilities, third-party costs and ongoing fees before work begins.' })}<ul class="pricing-proof-list" aria-label="What every website project includes"><li><i>01</i><span>Custom-designed around your business</span></li><li><i>02</i><span>Responsive build and SEO foundations</span></li><li><i>03</i><span>Two years of standard hosting and one eligible domain registration</span></li></ul>${buttonRow('/pricing/', '/contact/', 'Compare packages', 'Discuss your scope')}</div>
      <div class="price-poster"><span>Launch package from</span><b data-count="549" data-count-prefix="£">£549</b><i>Starting price for the defined package</i><p>Two years of standard hosting and one eligible domain registration included. Premium domains, paid software and specialist integrations are quoted separately.</p></div>
    </div>
  </section>`;

const faqs = (items = homeFaqs) => `
  <div class="faq-list">
    ${items.map(([question, answer], index) => `<details ${index === 0 ? 'open' : ''}><summary><span>0${index + 1}</span>${question}<i aria-hidden="true"></i></summary><p>${answer}</p></details>`).join('')}
  </div>`;

const finalCta = ({ eyebrow = 'A useful next step', title = 'Let’s build something<br>worth choosing.', copy = 'Tell us where your business stands today and where you want to get to. We’ll reply by email or WhatsApp with a clear, honest next step.' } = {}) => `
  <section class="section final-cta">
    <div class="shell final-cta-inner">
      <p class="eyebrow">${eyebrow}</p>
      <h2>${formatHeadingHtml(title)}</h2>
      <p class="lede">${copy}</p>
      <div class="button-row">
        <a class="button button-accent" href="/contact/">Contact us ${arrow}</a>
        ${whatsappAction('final-cta-whatsapp')}
      </div>
    </div>
  </section>`;

const problemSignals = [
  'The website no longer reflects the quality of the company.',
  'The brand feels inconsistent, dated or difficult to recognise.',
  'Customers struggle to understand the offer or why it is different.',
  'The business is difficult to discover through search.',
  'Visitors arrive but do not enquire, book or purchase.',
  'The mobile experience creates friction at the point of intent.',
];

const problemSection = () => `
  <section class="section problem-section">
    <div class="shell problem-grid">
      ${sectionHeading({ eyebrow: 'The hidden cost of standing still', title: 'Your online presence may be holding the business back.', copy: 'A weak digital experience rarely fails in one dramatic moment. It creates small doubts, missed opportunities and unnecessary friction throughout the customer journey.' })}
      <ol class="problem-list">${problemSignals.map((problem, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><p>${problem}</p></li>`).join('')}</ol>
    </div>
  </section>`;

const solutionAreas = [
  ['Strategy & positioning', 'Define the audience, value, priorities and digital journey before deciding how the work should look.'],
  ['Premium website design', 'Create a distinctive, responsive experience that communicates clearly and earns confidence.'],
  ['Search & visibility', 'Build the technical, content and profile foundations for local or national discovery.'],
  ['Conversion & lead generation', 'Shape landing pages, forms, booking and purchase journeys around qualified action.'],
  ['Ongoing improvement', 'Maintain, measure and improve the online presence as the business and market evolve.'],
];

const solutionSection = () => `
  <section class="section solution-section">
    <div class="shell solution-layout">
      <div class="solution-intro">
        <p class="eyebrow">The stronger foundation</p>
        <h2>A digital platform for the next stage of growth.</h2>
        <p class="lede">The goal is not simply to replace a website. It is to create a clearer, more credible and more useful digital foundation around the way the business wants to grow.</p>
      </div>
      <ol class="solution-list">${solutionAreas.map(([name, copy], index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><div><h3>${name}</h3><p>${copy}</p></div></li>`).join('')}</ol>
    </div>
  </section>`;

const whyFoundary = () => `
  <section class="section why-foundary">
    <div class="shell">
      ${sectionHeading({ eyebrow: 'Why Local Foundary', title: 'Built around your business.<br>Not around a template.', copy: 'Our approach can be adapted to different sectors, but every proposal begins with the company, its customers, the evidence available and the decisions the website needs to support.' })}
      <div class="advantage-grid">${[
        ['Strategy before design', 'The commercial job is defined before the visual direction.'],
        ['Bespoke approach', 'Structure, copy and interface are shaped around the actual customer journey.'],
        ['Commercial focus', 'Creative decisions are connected to clarity, trust, conversion or growth.'],
        ['Direct communication', 'You work directly with the person responsible for the strategy and delivery.'],
        ['Clear pricing', 'Scope, inclusions and optional costs are agreed before delivery begins.'],
        ['Accountable delivery', 'Review points, responsibilities and decisions remain visible throughout the work.'],
        ['Search visibility', 'Technical SEO and useful content are considered as part of the build.'],
        ['Support after launch', 'Hosting, maintenance and improvements can continue as the business evolves.'],
      ].map(([title, copy], index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div>
    </div>
  </section>`;

const industryDirectory = () => `
  <section class="section industry-directory">
    <div class="shell industry-directory-grid">
      ${industries.map((industry, index) => `<article id="${industry.slug}" class="industry-sector reveal" data-reveal>
        <div class="industry-sector-head"><span>${String(index + 1).padStart(2, '0')}</span><i>${industry.code}</i><h2>${industry.name}</h2><p>${industry.short}</p></div>
        <dl>
          <div><dt>What the sector needs</dt><dd>${industry.need}</dd></div>
          <div><dt>What builds trust</dt><dd>${industry.trust}</dd></div>
          <div><dt>Primary action</dt><dd>${industry.action}</dd></div>
          <div><dt>Useful systems</dt><dd>${industry.systems}</dd></div>
        </dl>
        <div class="industry-sector-links"><b>Explore relevant work</b>${industry.links.map((link) => `<a href="${link.href}">${link.name} ${arrow}</a>`).join('')}</div>
      </article>`).join('')}
    </div>
  </section>`;

export const homePage = () => layout({
  title: 'Local Foundary — Web Design & Digital Agency',
  description: 'Local Foundary is a UK-based digital agency creating premium websites, e-commerce, branding and search experiences for ambitious businesses.',
  path: '/',
  content: `
    <section class="hero">
      <div class="hero-pin">
        <div class="hero-noise" aria-hidden="true"></div>
        <div class="shell hero-grid">
          <div class="hero-copy">
            <p class="eyebrow eyebrow-light hero-eyebrow">UK-based independent digital agency</p>
            <h1><span>Build an online presence</span> <span>people understand, trust and choose.</span></h1>
            <p class="hero-lede">We create premium websites and digital experiences, bringing strategy, copy, design, development and search together from first idea to launch.</p>
            ${buttonRow('/contact/', '/work/', 'Contact us', 'Explore our work')}
            <p class="micro-proof"><i></i> Live client work across property, fitness, entertainment and events.</p>
          </div>
          ${heroSystem()}
        </div>
        <div class="shell trust-strip" role="group" aria-label="Local Foundary approach"><span>Strategy-led</span><span>Conversion-focused</span><span>Built to perform</span><span>Bespoke design</span><span>Long-term support</span></div>
      </div>
    </section>
    ${selectedWork()}
    <section class="section capabilities-section">
      <div class="shell">
        ${sectionHeading({ eyebrow: 'Core services', title: 'Everything required<br>to create, improve and grow.', copy: 'Choose a focused service or bring the full system together around one commercial objective.' })}
        <div class="capability-grid">${capabilityCards()}</div>
        <a class="button button-dark section-follow-link" href="/services/">View all digital services ${arrow}</a>
      </div>
    </section>
    ${presenceSystem()}
    ${processTimeline(true)}
    ${pricingPreview()}
    <section class="section faq-section"><div class="shell faq-grid">${sectionHeading({ eyebrow: 'Questions, answered', title: 'Clear before we begin.' })}${faqs()}</div></section>
    ${finalCta()}`,
  schema: [{
    '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${site.url}/#website`, name: site.name, url: site.url,
  }, faqSchema(homeFaqs)],
});

const pageHero = ({ eyebrow, title, copy, detail = '', actions = true }) => `
  <section class="page-hero">
    <div class="shell page-hero-grid">
      <div><p class="eyebrow eyebrow-light">${eyebrow}</p><h1>${formatHeadingHtml(title)}</h1></div>
      <div><p class="page-hero-copy">${copy}</p>${detail ? `<p class="page-hero-detail">${detail}</p>` : ''}${actions ? buttonRow() : ''}</div>
    </div>
  </section>`;

export const workPage = () => layout({
  title: 'Web Design Case Studies & Portfolio | Local Foundary',
  description: 'Explore real web design case studies created by Local Foundary across property, fitness, boxing, entertainment and events.',
  path: '/work/', active: 'work',
  pageType: 'CollectionPage',
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Work', path: '/work/' }],
  content: `${pageHero({ eyebrow: 'Web design case studies', title: 'Real businesses.<br>Purpose-built websites.', copy: 'Three different businesses, each given a website shaped around its audience, offer and personality.', detail: 'Every case study shows the client, brief, Local Foundary role and finished delivery. We publish performance results only when the client has approved the data and wording.' })}
    <section class="section work-index"><div class="shell">${projects.map((project, index) => `<article class="work-entry"><div class="work-entry-head"><span>0${index + 1}</span><p>${project.industry}</p><h2>${project.name}</h2></div>${projectVisual(project)}<div class="work-entry-copy"><h3>${project.headline}</h3><p>${project.summary}</p><ul class="tag-list">${project.services.map((service) => `<li>${service}</li>`).join('')}</ul><a class="button button-dark" href="/work/${project.slug}/">Read case study ${arrow}</a></div></article>`).join('')}</div></section>${finalCta()}`,
});

export const caseStudyPage = (project) => {
  const related = projects[(projects.indexOf(project) + 1) % projects.length];
  const headings = caseStudyHeadings[project.slug];
  const schema = {
    '@context': 'https://schema.org', '@type': 'CreativeWork', name: `${project.name} website project`, creator: { '@id': `${site.url}/#organization` }, about: project.industry, url: canonical(`/work/${project.slug}/`),
  };
  return layout({
    title: project.seoTitle,
    description: project.seoDescription,
    path: `/work/${project.slug}/`, active: 'work', schema: [schema], ogType: 'article',
    preloadAssets: [{ href: compactWebpPath(project.desktopImage), type: 'image/webp', media: '(max-width: 800px)' }, { href: webpPath(project.desktopImage), type: 'image/webp', media: '(min-width: 801px)' }],
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Work', path: '/work/' }, { name: project.name, path: `/work/${project.slug}/` }],
    content: `
      <section class="case-hero"><div class="shell"><div class="case-kicker"><span>Case study</span><span>${project.industry}</span><span>${project.type}</span></div><h1>${project.headline}</h1>${projectVisual(project, 'case-visual image-visible')}</div></section>
      <section class="section case-overview"><div class="shell case-overview-grid"><div>${sectionHeading({ eyebrow: 'Project overview', title: headings.overview })}</div><div><p class="lede">${project.summary}</p><dl><div><dt>Client</dt><dd>${project.name}</dd></div><div><dt>Industry</dt><dd>${project.industry}</dd></div><div><dt>Local Foundary role</dt><dd>${project.services.join(' · ')}</dd></div></dl>${project.assetStatus ? `<aside class="evidence-note"><b>Asset note</b><p>${project.assetStatus}</p></aside>` : ''}${project.liveUrl ? `<a class="button button-dark" target="_blank" rel="noopener noreferrer" href="${project.liveUrl}">Visit live website <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>` : ''}</div></div></section>
      <section class="section case-story"><div class="shell case-story-grid"><article><span>01</span><h2>The challenge</h2><p>${project.challenge}</p></article><article><span>02</span><h2>Strategy & creative direction</h2><p>${project.strategy}</p></article></div></section>
      <section class="section case-delivery"><div class="shell"><div class="case-delivery-grid"><div>${sectionHeading({ eyebrow: 'What we delivered', title: headings.delivery })}<p>The work shown here covers the agreed strategy, design and delivery scope. Measured outcomes will be added when client-approved data is available.</p></div><ul>${project.features.map((feature, index) => `<li><span>0${index + 1}</span><b>${feature}</b></li>`).join('')}</ul></div></div></section>
      <section class="section case-devices"><div class="shell">${sectionHeading({ eyebrow: 'Responsive presentation', title: headings.responsive })}${projectVisual(project, 'case-visual-secondary')}</div></section>
      <section class="section related-project"><div class="shell related-inner"><div><p class="eyebrow">Next project</p><h2>${related.name}</h2><p>${related.summary}</p><a class="text-link" href="/work/${related.slug}/">View case study ${arrow}</a></div>${projectVisual(related)}</div></section>
      ${finalCta()}`,
  });
};

export const servicesPage = () => layout({
  title: 'Web Design, E-commerce & SEO Services | Local Foundary',
  description: 'Explore digital strategy, bespoke web design, e-commerce, branding, SEO, copywriting and ongoing support from one accountable digital agency.',
  path: '/services/', active: 'services',
  pageType: 'CollectionPage',
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }],
  schema: [{
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Local Foundary digital services',
    itemListElement: servicePages.map((service, index) => ({ '@type': 'ListItem', position: index + 1, name: service.name, url: canonical(`/services/${service.slug}/`) })),
  }],
  content: `${pageHero({ eyebrow: 'Digital agency services', title: 'Digital services to create,<br>improve and grow your business.', copy: 'Choose one focused service or connect strategy, website, search, content and conversion. We start with what your customers need to understand — and the action you need them to take.' })}
    <section class="section service-strategy"><div class="shell statement-grid"><p class="eyebrow">Built around business goals</p><h2>Your objective leads.<br>The design, build and SEO follow.</h2><p>We turn the commercial goal into a focused plan, then assemble only the strategy, creative and technical expertise the job needs.</p></div></section>
    <section class="section service-directory"><div class="shell">${sectionHeading({ eyebrow: 'Explore services', title: 'Every service, from<br>strategy to support.', copy: 'Start with the problem you need to solve. Each service page explains fit, deliverables, scope and how success is assessed.' })}<div class="directory-grid">${servicePages.map((page, index) => `<a class="reveal" data-reveal href="/services/${page.slug}/"><span>${String(index + 1).padStart(2, '0')}</span><h3>${page.name}</h3><p>${page.title}</p>${arrow}</a>`).join('')}</div></div></section>
    <section class="section service-proof"><div class="shell statement-grid"><p class="eyebrow">Real work, visible</p><h2>One approach.<br>Three very different businesses.</h2><p>See how the same strategic and creative discipline was adapted for property, fitness and boxing projects.</p><a class="text-link" href="/work/">View our web design case studies ${arrow}</a></div></section>
    <section class="section service-pricing-bridge"><div class="shell pricing-preview-grid"><div>${sectionHeading({ eyebrow: 'Clear starting points', title: 'Website projects<br>from £549.', copy: 'Compare Launch and Growth packages, or ask for a tailored Scale proposal when the scope is more complex.' })}<a class="button button-dark" href="/pricing/">See website design pricing ${arrow}</a></div><div class="service-next-steps"><span>How projects move</span><h3>Discover. Define.<br>Design. Deliver.</h3><p>See the full process, responsibilities and review points before deciding whether the fit is right.</p><a class="text-link" href="/how-it-works/">Explore our web design process ${arrow}</a></div></div></section>
    ${finalCta({ eyebrow: 'Choose a useful first step', title: 'Which service would make<br>the biggest difference now?', copy: 'Tell us what is working, what is not and what you want customers to do. We’ll recommend a focused place to begin.' })}`,
});

export const serviceDetailPage = (service) => {
  const related = getProject(service.relatedProject);
  const presentation = servicePresentation[service.slug];
  return layout({
    title: service.seoTitle, description: service.seoDescription, path: `/services/${service.slug}/`, active: 'services',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: service.eyebrow, path: `/services/${service.slug}/` }],
    schema: [{ '@context': 'https://schema.org', '@type': 'Service', name: service.name, serviceType: service.name, url: canonical(`/services/${service.slug}/`), provider: { '@id': `${site.url}/#organization` }, areaServed: ['United Kingdom', 'International'], description: service.seoDescription }],
    content: `${pageHero({ eyebrow: service.eyebrow, title: service.title, copy: service.intro })}
      <section class="section deliverables"><div class="shell deliverables-grid"><div>${sectionHeading({ eyebrow: 'What is included', title: presentation.deliverableTitle })}<p>Every engagement is scoped to your goals. Core deliverables usually include:</p></div><ol>${service.deliverables.map((item, index) => `<li><span>0${index + 1}</span><b>${item}</b>${check}</li>`).join('')}</ol></div></section>
      ${serviceScopeSection(service)}
      ${servicePrinciples(service)}
      ${service.slug === 'website-design' ? tradeServiceLinks() : ''}
      ${service.slug === 'hosting-support' ? hostingPriceSummary() : ''}
      <section class="section related-work"><div class="shell related-work-grid"><div><p class="eyebrow">Related case study</p><h2>${related.name}</h2><p>${related.summary}</p><a class="text-link" href="/work/${related.slug}/">See how we approached the project ${arrow}</a></div>${projectVisual(related)}</div></section>${finalCta({ eyebrow: presentation.cta[0], title: presentation.cta[1], copy: serviceCtaCopy[service.slug] })}`,
  });
};

export const industriesPage = () => layout({
  title: 'Web Design by Industry | Local Foundary',
  description: 'Industry-specific web design for professional services, e-commerce, healthcare, property, hospitality, construction, fitness and more.',
  path: '/industries/', active: 'industries',
  pageType: 'CollectionPage',
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries/' }],
  content: `${pageHero({ eyebrow: 'Industry-specific web design', title: 'Websites and digital growth,<br>tailored to your industry.', copy: 'Different markets create different questions, expectations and trust signals. We adapt the strategy, structure and design around how your customers actually choose.' })}${industryDirectory()}${tradeServiceLinks()}<section class="section dark-panel"><div class="shell statement-grid"><p class="eyebrow eyebrow-light">Don’t see your industry?</p><h2>Start with how<br>your customers decide.</h2><p>Sector experience is useful, but thoughtful research and a clear commercial brief matter more than forcing your business into a pre-built category. Explore <a class="text-link text-link-light" href="/services/">all digital services</a> or tell us about your market.</p></div></section>${finalCta({ eyebrow: 'Built around your market', title: 'Need an industry-specific<br>website strategy?', copy: 'Tell us who you need to reach, what they must understand and what a useful next action looks like. We’ll shape the right starting point.' })}`,
});

export const industryDetailPage = (slug, industry) => layout({
  title: industry.seoTitle, description: industry.seoDescription, path: `/${slug}/`, active: 'industries',
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries/' }, { name: industry.eyebrow, path: `/${slug}/` }],
  schema: [{ '@context': 'https://schema.org', '@type': 'Service', name: industry.seoTitle.replace(' | Local Foundary', ''), url: canonical(`/${slug}/`), provider: { '@id': `${site.url}/#organization` }, areaServed: ['United Kingdom', 'International'] }],
  content: `${pageHero({ eyebrow: industry.eyebrow, title: industry.title, copy: industry.intro })}
    <section class="section industry-needs"><div class="shell industry-needs-grid"><div>${sectionHeading({ eyebrow: 'What matters', title: industry.matterTitle })}<p>${industry.matterCopy}</p></div><ol>${industry.needs.map((need, index) => `<li><span>0${index + 1}</span><b>${need}</b></li>`).join('')}</ol></div></section>
    <section class="section journey-section"><div class="shell"><div class="journey"><span>Search</span>${arrow}<span>Understand</span>${arrow}<span>Trust</span>${arrow}<span>Enquire</span>${arrow}<span>Respond</span></div></div></section>
    <section class="section campaign-context"><div class="shell statement-grid"><p class="eyebrow">A focused industry approach</p><h2>${industry.contextTitle}</h2><p>${industry.contextCopy}</p><div class="context-link-row"><a class="text-link" href="/services/website-design/">Explore bespoke website design ${arrow}</a><a class="text-link" href="/services/local-seo/">Explore search visibility ${arrow}</a><a class="text-link" href="/services/landing-pages-lead-generation/">Explore lead generation ${arrow}</a></div></div></section>
    ${tradeCampaigns(slug)}${pricingPreview()}${finalCta({ eyebrow: 'A useful next step', title: industry.ctaTitle, copy: 'Tell us about your services, customers and working area. We’ll reply with a clear view of the most useful scope and next step.' })}`,
});

export const processPage = () => layout({
  title: 'Our Web Design Process, Step by Step | Local Foundary',
  description: 'How we work: a clear four-stage process covering discovery, strategy, design and build, launch and growth, with defined review points.',
  path: '/how-it-works/', active: 'process',
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Process', path: '/how-it-works/' }],
  content: `${pageHero({ eyebrow: 'How it works', title: 'Our web design process,<br>from first idea to launch.', copy: 'Good work needs structure, but you should never feel lost in it. You will know what is happening, why it matters, what we need and where your input belongs.' })}${processTimeline()}<section class="section process-details"><div class="shell">${sectionHeading({ eyebrow: 'Inside each stage', title: 'Defined responsibilities.<br>Useful review points.' })}<div class="process-detail-grid">${processSteps.map((step) => `<article><span>${step.number}</span><h3>${step.name}</h3><dl><div><dt>What we need</dt><dd>${step.required}</dd></div><div><dt>What you receive</dt><dd>${step.deliverable}</dd></div><div><dt>Your review point</dt><dd>${step.feedback}</dd></div></dl></article>`).join('')}</div></div></section><section class="section expectations"><div class="shell"><div>${sectionHeading({ eyebrow: 'Timelines & revisions', title: 'A plan you can<br>actually follow.' })}</div><div class="expectation-grid"><article><h3>A realistic delivery plan</h3><p>Timing depends on the pages, content, integrations and complexity involved. After discovery, you receive defined stages, responsibilities and target review dates.</p></article><article><h3>Structured revision rounds</h3><p>Your comments are consolidated at agreed design and working-site checkpoints. The proposal confirms included rounds and how out-of-scope changes are handled. <a href="/pricing/">See pricing and scope terms.</a></p></article><article><h3>After launch</h3><p>Every project includes an agreed support period. Hosting, maintenance and improvements can continue through a <a href="/services/hosting-support/">website support option</a> that fits your needs.</p></article></div></div></section><section class="section process-proof"><div class="shell">${sectionHeading({ eyebrow: 'The process in practice', title: 'See it applied to<br>three different businesses.' })}<div class="trade-link-grid">${projects.map((project, index) => `<a href="/work/${project.slug}/"><span>0${index + 1}</span><b>${project.name}</b>${arrow}</a>`).join('')}<a href="/work/"><span>04</span><b>Projects</b>${arrow}</a></div></div></section>${finalCta({ eyebrow: 'Start with clarity', title: 'Ready to begin your<br>website project?', copy: 'Tell us what you are planning and what needs to change. We’ll explain the most useful first stage and what we need from you.' })}`,
});

const pricingCards = () => pricing.map((plan) => {
  const price = plan.price
    ? `<div class="plan-price"><span>From</span><b data-count="${plan.price.replace(/[^0-9]/g, '')}" data-count-prefix="£">${plan.price}</b><span>starting package price</span></div>`
    : `<div class="plan-price plan-price-tailored"><span>Pricing</span><b>${plan.priceLabel}</b><span>${plan.priceNote}</span></div>`;
  return `<article class="pricing-card ${plan.featured ? 'featured' : ''}"><span class="pricing-badge ${plan.featured ? '' : 'pricing-badge-placeholder'}"${plan.featured ? '' : ' aria-hidden="true"'}>${plan.featured ? 'Recommended starting point' : ''}</span><p>${plan.kicker}</p><h2>${plan.name}</h2>${price}<p>${plan.description}</p><ul>${plan.features.map((feature) => `<li>${check}${feature}</li>`).join('')}</ul><a class="button ${plan.featured ? 'button-accent' : 'button-dark'}" href="/contact/">Discuss this package ${arrow}</a></article>`;
}).join('');

const pricingFaqItems = [
  ['Are these prices fixed?', 'These are our current package starting prices. Scale is a tailored, negotiable proposal. Your final proposal will confirm the agreed scope, responsibilities, timetable and total fee.'],
  ['What is included for two years?', 'The current packages include two years of standard hosting and one eligible domain registration. Premium domains, paid software and specialist integrations are quoted separately. Annual renewal begins from year three unless the monthly care plan is chosen.'],
  ['Does the Scale package include unlimited pages?', 'No package includes unlimited future pages. Scale includes an expanded page scope agreed in the proposal. Additional pages or substantial new sections after that scope are quoted separately.'],
  ['What is required after two years?', 'If the website remains hosted through Local Foundary, choose either the £59 annual renewal or the £29 monthly care plan from year three. The care plan already includes hosting and renewal.'],
  ['What happens if I cancel the care plan?', 'The written agreement confirms the required notice period, final hosting date, domain control, included handover files and whether third-party migration work carries a separate fee.'],
  ['Can I add e-commerce, branding or SEO?', 'Yes. Packages can include brand, search, copy or ongoing growth work. E-commerce and specialist integrations are scoped separately because catalogue, payment and operational requirements vary.'],
  ['Do you offer monthly website finance?', 'We do not currently offer monthly finance or instalment plans. The only recurring cost is the optional £29/month care plan after launch.'],
];

export const pricingPage = () => layout({
  title: 'Website Design Pricing & Packages | Local Foundary',
  description: 'Transparent web design pricing from £549. Compare Launch, Growth and tailored Scale packages, plus hosting, renewal and monthly care-plan costs.',
  path: '/pricing/', active: 'pricing',
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing/' }],
  schema: [{
    '@context': 'https://schema.org', '@type': 'Service', name: 'Website design packages', provider: { '@id': `${site.url}/#organization` }, areaServed: ['United Kingdom', 'International'],
    offers: { '@type': 'AggregateOffer', priceCurrency: 'GBP', lowPrice: '549', offerCount: '3', description: 'Launch and Growth show starting prices; Scale is quoted to the agreed scope.' },
  }, faqSchema(pricingFaqItems)],
  content: `${pageHero({ eyebrow: 'Transparent pricing', title: 'Website design pricing,<br>built around your goals.', copy: 'Compare two clear starting packages and one tailored Scale proposal. Your final scope, delivery dates, responsibilities, third-party fees and optional ongoing services are confirmed before work begins.', detail: 'Launch and Growth display starting prices. Scale is negotiable to the agreed scope. Your proposal confirms the final fee and whether VAT applies.' })}
    <section class="section pricing-page"><div class="shell pricing-grid">${pricingCards()}</div></section>
    <section class="section ongoing-costs"><div class="shell">${sectionHeading({ eyebrow: 'Ongoing costs', title: 'Know what happens after launch.' })}<div class="cost-grid"><article><span>Annual renewal</span><b>£59 / year</b><p>From year three: standard hosting, SSL and renewal of one eligible domain registration.</p></article><article><span>Website updates</span><b>From £50</b><p>Minor changes to supplied text, images and contact details on an existing page. New pages, redesigns, integrations and development are quoted separately.</p></article><article><span>Care plan</span><b>£29/month</b><p>Hosting, renewal and up to two minor content updates each month. Unused updates do not roll over. Cancellation and handover terms are confirmed before the plan starts.</p></article></div><aside class="pricing-note"><b>Important</b><p>The £29/month care plan includes hosting and renewal, so it is an alternative to the £59 annual renewal — not an additional mandatory charge. Premium domains, paid software and specialist integrations are separate.</p></aside></div></section>
    <section class="section pricing-links"><div class="shell statement-grid"><p class="eyebrow">Before you choose</p><h2>Understand the service<br>and how it is delivered.</h2><p>Compare the full range of <a href="/services/">digital services</a>, then see the <a href="/how-it-works/">web design process</a> from discovery to launch.</p></div></section>
    <section class="section faq-section"><div class="shell faq-grid">${sectionHeading({ eyebrow: 'Pricing questions', title: 'Scope without surprises.' })}${faqs(pricingFaqItems)}</div></section>${finalCta({ eyebrow: 'Find the right scope', title: 'Not sure which package<br>fits your project?', copy: 'Tell us what you need the website to achieve. We’ll reply by email or WhatsApp with a recommended package and clear next steps.' })}`,
});

export const aboutPage = () => layout({
  title: 'About Local Foundary — Independent Digital Agency',
  description: 'Meet Local Foundary, an independent digital agency giving ambitious businesses direct access to senior strategy, design, development and search expertise.',
  path: '/about/', active: 'about',
  pageType: 'AboutPage',
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }],
  content: `${pageHero({ eyebrow: 'About Local Foundary', title: 'Local Foundary — digital work<br>built with purpose.', copy: 'We are an independent digital agency combining clear thinking, strong creative direction and careful delivery for businesses working in the UK and internationally.' })}
    <section class="section about-manifesto"><div class="shell manifesto-grid"><p class="eyebrow">Why we exist</p><h2>Every serious business deserves a digital experience that reflects its ambition.</h2><div><p>Customers judge the signals they can see. An unclear position, dated website or disconnected journey can make an excellent company feel harder to trust.</p><p>We create a coherent route from first impression to enquiry or purchase. Explore our <a href="/services/">digital services</a> to see how strategy, design and delivery fit together.</p></div></div></section>
    <section class="section studio-model"><div class="shell solution-layout"><div class="solution-intro"><p class="eyebrow">A focused structure</p><h2>Small enough to stay accountable.<br>Structured enough to deliver clearly.</h2><p class="lede">A focused model means direct communication, visible decisions, defined responsibilities and personal accountability for the quality of the work.</p></div><ol class="solution-list"><li><span>01</span><div><h3>Direct senior access</h3><p>You work with the people responsible for strategy and delivery, without layers of account management or unnecessary hand-offs.</p></div></li><li><span>02</span><div><h3>Consistent quality</h3><p>The same standard and point of view carries through <a href="/how-it-works/">discovery, design, build and launch</a>.</p></div></li><li><span>03</span><div><h3>Commercial awareness</h3><p>Decisions are tested against the customer journey and business objective, not design fashion alone.</p></div></li><li><span>04</span><div><h3>Long-term thinking</h3><p>The relationship can continue through agreed <a href="/services/hosting-support/">hosting, care and improvement options</a> rather than ending at launch.</p></div></li></ol></div></section>
    <section class="section principles"><div class="shell">${sectionHeading({ eyebrow: 'Principles', title: 'How we make decisions.' })}<div class="principle-grid"><article><span>01</span><h3>Make it understandable</h3><p>Plain English, clear hierarchy and no unnecessary agency language.</p></article><article><span>02</span><h3>Make it distinctive</h3><p>A recognisable point of view, shaped around the business rather than a trend.</p></article><article><span>03</span><h3>Make it useful</h3><p>Design, motion and content must improve understanding or action.</p></article><article><span>04</span><h3>Make it honest</h3><p>No fabricated proof, guaranteed rankings or performance claims without measurement.</p></article></div></div></section>
    <section class="section about-work"><div class="shell">${sectionHeading({ eyebrow: 'The work reflects the thinking', title: 'Three recent projects.<br>Three distinct directions.', copy: 'Property, fitness and boxing demanded different decisions, visual voices and customer journeys.' })}<div class="trade-link-grid">${projects.map((project, index) => `<a href="/work/${project.slug}/"><span>0${index + 1}</span><b>${project.name}</b>${arrow}</a>`).join('')}<a href="/work/"><span>04</span><b>Projects</b>${arrow}</a></div></div></section>${finalCta({ eyebrow: 'Work with Local Foundary', title: 'Ready for a direct,<br>accountable partnership?', copy: 'Tell us what you need to improve and where you want the business to go. We’ll reply personally with a clear next step.' })}`,
});

export const insightsPage = () => layout({
  title: 'Digital Strategy & Website Insights | Local Foundary',
  description: 'Short, practical summaries on website strategy, digital credibility, search visibility and conversion while detailed Local Foundary guides are prepared.',
  path: '/insights/',
  robots: 'noindex,follow',
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Insights', path: '/insights/' }],
  content: `${pageHero({ eyebrow: 'Guides in preparation', title: 'Practical answers to common<br>website and digital questions.', copy: 'We are preparing detailed guides on planning, credibility, search visibility, conversion and ongoing improvement. For now, these short summaries outline the decisions we most often help clients make.', detail: 'Clear guidance focused on the decisions that affect scope, trust, visibility and conversion.' })}
    <section class="section insight-index"><div class="shell insight-grid">${[
      ['Website strategy', 'When a redesign is the wrong first move', 'Before changing colours or layouts, establish whether the real issue is positioning, content, technology, customer journey or all four.'],
      ['Online credibility', 'The trust signals a premium website cannot fake', 'Customers notice consistency, specificity, real people, useful proof and clear expectations. Empty badges and generic claims rarely survive scrutiny.'],
      ['Search & conversion', 'Why visibility and conversion need one plan', 'Traffic has limited value when the page does not explain the offer or make the next step feel safe. Search intent should shape structure, content and action together.'],
      ['E-commerce', 'Reducing friction without removing useful detail', 'The strongest shops help customers compare and decide. Simplicity means organising complexity, not hiding the information needed to buy confidently.'],
      ['Project planning', 'What to prepare before starting a new website', 'Clear ownership, accurate service or product information, access to assets and consolidated feedback prevent avoidable delays later in the project.'],
      ['Ongoing growth', 'Launch is a milestone, not the finish line', 'Real customer behaviour reveals what the initial brief could not. Measurement and maintenance turn a finished website into an improving business asset.'],
    ].map(([category, title, copy], index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><p>${category}</p><h2>${title}</h2><div><p>${copy}</p></div></article>`).join('')}</div></section>${finalCta()}`,
});

export const contactForm = () => `
  <form class="project-form" id="project-form" method="post" action="/api/contact" data-project-form>
    <div class="form-status" role="status" aria-live="polite" data-form-status></div>
    <div class="honeypot" aria-hidden="true"><label>Leave this field empty <input type="text" name="bot-field" tabindex="-1" autocomplete="off"></label></div>
    <div class="form-grid">
      <div class="field"><label for="name">Your name</label><input id="name" name="name" type="text" autocomplete="name" required><span class="field-error" id="name-error"></span></div>
      <div class="field"><label for="business">Company <span>Optional</span></label><input id="business" name="business" type="text" autocomplete="organization"></div>
      <div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email" required><span class="field-error" id="email-error"></span></div>
      <div class="field"><label for="phone">Telephone <span>Optional</span></label><input id="phone" name="phone" type="tel" autocomplete="tel"></div>
      <div class="field"><label for="website">Current website <span>Optional</span></label><input id="website" name="website" type="url" inputmode="url" autocomplete="url" placeholder="https://"><span class="field-error" id="website-error"></span></div>
      <div class="field"><label for="industry">Industry <span>Optional</span></label><input id="industry" name="industry" type="text" placeholder="e.g. Healthcare, property, e-commerce"></div>
      <div class="field field-wide"><label for="service">What support is required?</label><select id="service" name="service" required><option value="">Choose an option</option><option>Digital strategy</option><option>New website</option><option>Website redesign</option><option>E-commerce</option><option>Branding and positioning</option><option>SEO and search visibility</option><option>Landing pages and lead generation</option><option>Copy and content</option><option>Hosting and ongoing support</option><option>Digital growth</option></select><span class="field-error" id="service-error"></span></div>
      <div class="field"><label for="budget">Approximate budget <span>Optional</span></label><select id="budget" name="budget"><option value="">Choose a range</option><option>Up to £2,500</option><option>£2,500–£5,000</option><option>£5,000–£10,000</option><option>£10,000+</option><option>Not decided</option></select></div>
      <div class="field"><label for="contact-method">Preferred reply <span>Optional</span></label><select id="contact-method" name="contactMethod"><option value="">No preference</option><option>Email</option><option>WhatsApp</option></select></div>
      <div class="field field-wide"><label for="objective">Main business objective</label><textarea id="objective" name="objective" rows="6" placeholder="What needs to improve, and what would a successful result look like?" required></textarea><span class="field-error" id="objective-error"></span></div>
      <label class="consent field-wide"><input id="consent" type="checkbox" name="consent" value="yes" required><span>I’m happy for Local Foundary to use these details to respond to this enquiry. See the <a href="/privacy/">privacy policy</a>.</span></label><span class="field-error field-wide" id="consent-error"></span>
      <div class="field-wide form-submit"><button class="button button-accent" type="submit">Send my enquiry ${arrow}</button><p>We aim to reply personally by email or WhatsApp within two working days.</p></div>
    </div>
  </form>`;

export const contactPage = () => layout({
  title: 'Contact Local Foundary | Website & Digital Enquiries',
  description: 'Contact Local Foundary by enquiry form, email or WhatsApp to discuss website strategy, design, search visibility and digital support.',
  path: '/contact/', active: 'contact',
  pageType: 'ContactPage',
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }],
  content: `${pageHero({ eyebrow: 'Contact Local Foundary', title: 'Tell us what needs to change<br>and where you want to go.', copy: 'Share your current position, main objective and the support you are considering. We’ll review it and reply by email or WhatsApp with a useful next step.', detail: 'You’ll get a clear view of your options, likely scope and recommended next step — with no obligation.', actions: false })}<section class="section contact-section"><div class="shell contact-grid"><aside><p class="eyebrow">Prefer a direct route?</p><h2>Email us or send a WhatsApp message.</h2><a class="contact-email" href="mailto:${site.email}">${site.email}</a>${whatsappAction('contact-whatsapp')}<div><b>Real work</b><p><a href="/work/">See projects across property, fitness and boxing.</a></p></div><div><b>Website packages</b><p><a href="/pricing/">Starting from £549.</a></p></div><div><b>Typical reply</b><p>Within two working days.</p></div></aside>${contactForm()}</div></section>`,
});

export const privacyPage = () => layout({
  title: 'Privacy Policy | Local Foundary', description: 'Learn how Local Foundary collects, uses, stores and protects personal information submitted through this website and its enquiry form.', path: '/privacy/', robots: 'index,follow',
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Privacy', path: '/privacy/' }],
  content: `${pageHero({ eyebrow: 'Legal', title: 'Privacy policy', copy: 'A plain-English overview of what we collect and why.', actions: false })}<section class="section legal"><div class="shell legal-grid"><aside><p>Last updated</p><b>14 July 2026</b><a href="mailto:${site.email}">${site.email}</a></aside><article><h2>Who controls your information</h2><p>Local Foundary is responsible for personal information submitted through this website. Contact ${site.email} with any privacy question.</p><h2>What we collect</h2><p>When you submit the enquiry form, we collect your name and email address, plus any optional company, telephone, website, industry, budget and reply-preference details you choose to provide. We also collect the selected support type and the business objective you describe.</p><h2>How we use it</h2><p>We use this information to assess and respond to your enquiry, manage a potential project and meet legal or security obligations. We do not sell your information.</p><h2>Legal basis</h2><p>We process enquiry information because you have asked us to take steps before entering into a contract and because responding securely to genuine enquiries is a legitimate business interest.</p><h2>Service providers</h2><p>Hosting and email-delivery providers may process limited information on our behalf so the website and enquiry service can operate. They handle that information under their own data-protection terms and our service arrangements.</p><h2>Cookies and analytics</h2><p>The website currently uses only essential browser storage for the opening animation and does not set non-essential analytics or advertising cookies. If analytics that require consent are introduced, this policy and the consent controls will be updated before they are enabled.</p><h2>How long we keep it</h2><p>Enquiries are kept only as long as needed to respond, manage a potential or active project, maintain appropriate business records and meet legal requirements.</p><h2>Your rights</h2><p>Depending on applicable law, you may ask to access, correct, delete or restrict use of your personal information, or object to certain processing. You may also complain to the UK Information Commissioner’s Office.</p><h2>Security</h2><p>We use reasonable validation and access controls to protect the enquiry route. No website can guarantee absolute security, and access should be limited to the people and providers needed to respond.</p><h2>Changes</h2><p>We may update this policy when the website, providers or legal requirements change. The current version will remain available on this page.</p></article></div></section>`,
});

export const termsPage = () => layout({
  title: 'Website Terms | Local Foundary', description: 'Read the practical terms for using the Local Foundary website, including information, project pricing, external links and intellectual-property notices.', path: '/terms/',
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Terms', path: '/terms/' }],
  content: `${pageHero({ eyebrow: 'Legal', title: 'Website terms', copy: 'The practical terms that apply when using this website.', actions: false })}<section class="section legal"><div class="shell legal-grid"><aside><p>Last updated</p><b>14 July 2026</b><a href="mailto:${site.email}">${site.email}</a></aside><article><h2>Using this website</h2><p>You may use this website for lawful information and enquiry purposes. Do not attempt to disrupt the site, access restricted systems or misuse its forms.</p><h2>Information and pricing</h2><p>We aim to keep information accurate. Package prices are current starting points and do not form a binding quotation. Final scope, fees, timing, ownership and support are confirmed in a separate proposal or agreement.</p><h2>No guaranteed outcomes</h2><p>Website, branding and search work can improve the quality of a digital experience, but rankings, traffic, enquiries and revenue are affected by factors outside our control and are not guaranteed.</p><h2>Project work</h2><p>These website terms do not replace the specific agreement for a client project. If there is a conflict, the signed project terms take priority.</p><h2>Intellectual property</h2><p>Unless stated otherwise, the Local Foundary name, website design, copy and original site materials are protected by intellectual-property law. Client project imagery and brands remain owned by their respective rights holders.</p><h2>External links</h2><p>Links to client websites and third-party services are provided for convenience. We are not responsible for their availability, content or privacy practices.</p><h2>Liability</h2><p>Nothing here excludes liability that cannot lawfully be excluded. To the extent permitted by law, we are not liable for indirect loss arising only from use of this informational website.</p><h2>Contact</h2><p>Questions about these terms can be sent to ${site.email}.</p></article></div></section>`,
});

export const thanksPage = () => layout({
  title: 'Thank You | Local Foundary', description: 'Your project enquiry has been received by Local Foundary.', path: '/thanks/', robots: 'noindex,follow',
  content: `<section class="success-page"><div class="shell"><span class="success-mark">${check}</span><p class="eyebrow eyebrow-light">Enquiry received</p><h1>Thanks. We’ll take a proper look.</h1><p>Your details are with Local Foundary. We aim to reply personally within two working days.</p><div class="button-row"><a class="button button-accent" href="/">Return home ${arrow}</a><a class="text-link text-link-light" href="/work/">Explore our work ${arrow}</a></div></div></section>`,
});

export const notFoundPage = () => layout({
  title: 'Page Not Found | Local Foundary', description: 'The Local Foundary page you requested could not be found. Return home or start a project enquiry.', path: '/404/', robots: 'noindex,follow', includeCanonical: false,
  content: `<section class="success-page not-found"><div class="shell"><span class="error-code">404</span><p class="eyebrow eyebrow-light">Wrong turn</p><h1>This page has moved or never existed.</h1><p>Use the links below to get back to useful ground.</p><div class="button-row"><a class="button button-accent" href="/">Return home ${arrow}</a><a class="text-link text-link-light" href="/contact/">Start a project ${arrow}</a></div></div></section>`,
});
