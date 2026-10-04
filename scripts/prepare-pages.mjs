import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outputRoot = resolve(projectRoot, 'dist');
const isGitHubPages = process.argv.includes('--github-pages');
const productionSite = 'https://kkgtimportexport.com';
const siteBase = isGitHubPages ? 'https://yohannesmulugeta.github.io/KKGTIMPORTEXPORT' : productionSite;


const sitemapPath = resolve(outputRoot, 'sitemap.xml');
let sitemap = readFileSync(sitemapPath, 'utf8');
const baseHtml = readFileSync(resolve(outputRoot, 'index.html'), 'utf8');

const staticMeta = {
  '/': ['KKGT Import Export | Ethiopia Coffee, Commodities & Agrochemicals', 'KKGT Import Export connects Ethiopian coffee, agricultural commodities, crop-protection products and trading opportunities with local and international markets.', '/media/social-preview.jpg'],
  '/about': ['About KKGT Import Export | Ethiopia', 'Learn about KKGT Import Export, an Ethiopian trading company working across coffee, agricultural commodities, agrochemicals and import and trading activities.', '/media/social-preview.jpg'],
  '/coffee': ['Ethiopian Coffee Export | KKGT Import Export', 'Explore KKGT’s Ethiopian coffee origins and start a direct conversation about current green coffee availability, specifications and export requirements.', '/media/social-preview.jpg'],
  '/commodities': ['Ethiopian Agricultural Commodities | KKGT Import Export', 'Explore KKGT’s agricultural commodity portfolio, including sesame, soybeans, pulses and beans for local and international trading opportunities.', '/media/social-preview.jpg'],
  '/agrochemicals': ['Agrochemicals & Crop Protection | KKGT Import Export', 'Browse KKGT crop-protection products by category and review published product information for herbicides, fungicides and insecticides.', '/media/social-preview.jpg'],
  '/agrochemicals/herbicides': ['Herbicides | KKGT Agrochemicals', 'Browse herbicide products in KKGT’s published crop-protection catalogue and review product-specific active ingredient and use information.', '/media/social-preview.jpg'],
  '/agrochemicals/fungicides': ['Fungicides | KKGT Agrochemicals', 'Browse fungicide products in KKGT’s published crop-protection catalogue and review product-specific active ingredient and use information.', '/media/social-preview.jpg'],
  '/agrochemicals/insecticides': ['Insecticides | KKGT Agrochemicals', 'Browse insecticide products in KKGT’s published crop-protection catalogue and review product-specific active ingredient and use information.', '/media/social-preview.jpg'],
  '/trading': ['Import & Trading | KKGT Import Export', 'Explore KKGT’s import and trading activities supported by Ethiopian market knowledge and commercial coordination.', '/media/social-preview.jpg'],
  '/quality': ['Quality & Operations | KKGT Import Export', 'Learn how KKGT presents quality handling, product integrity and operational coordination across its trading activities.', '/media/social-preview.jpg'],
  '/process': ['Our Process | KKGT Import Export', 'See KKGT’s business process from sourcing and preparation through quality, trade coordination and delivery.', '/media/social-preview.jpg'],
  '/gallery': ['Gallery | KKGT Import Export', 'Explore visual highlights from KKGT Import Export and its coffee, commodities, agrochemical and trading activities.', '/media/social-preview.jpg'],
  '/contact': ['Contact KKGT Import Export | Addis Ababa, Ethiopia', 'Contact KKGT Import Export in Addis Ababa for coffee, agricultural commodities, agrochemicals and trading inquiries.', '/media/social-preview.jpg'],
};

const catalogSource = readFileSync(resolve(projectRoot, 'src/data/catalog.ts'), 'utf8');
const coffeeSection = catalogSource.split('export const commodities')[0];
const commoditySection = catalogSource.split('export const commodities')[1] ?? '';
const entryPattern = /\{ slug: '([^']+)', name: '([^']+)', summary: '([^']+)', image: assetUrl\('([^']+)'\) \}/g;

const coffeeMeta = new Map(
  [...coffeeSection.matchAll(entryPattern)].map((match) => [
    `/coffee/${match[1]}`,
    [`${match[2]} Coffee | KKGT Import Export`, `${match[3]} Contact KKGT to discuss current lot details, availability and export requirements.`, '/media/social-preview.jpg'],
  ]),
);

const commodityMeta = new Map(
  [...commoditySection.matchAll(entryPattern)].map((match) => [
    `/commodities/${match[1]}`,
    [`${match[2]} Export | KKGT Import Export`, `${match[3]} Contact KKGT to discuss current availability, specifications and trading requirements.`, match[4]],
  ]),
);

const productSource = readFileSync(resolve(projectRoot, 'src/data/productCatalog.ts'), 'utf8');
const productPattern = /product\(\s*\d+,\s*'([^']+)',\s*'([^']+)',\s*'[^']+',\s*'[^']*',\s*'([^']*)'/g;
const productMeta = new Map(
  [...productSource.matchAll(productPattern)].map((match) => [
    `/agrochemicals/product/${match[1]}`,
    [`${match[2]} | KKGT Agrochemicals`, match[3], '/media/social-preview.jpg'],
  ]),
);

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function getMeta(route) {
  return staticMeta[route] ?? coffeeMeta.get(route) ?? commodityMeta.get(route) ?? productMeta.get(route) ?? [
    'KKGT Import Export',
    'Explore KKGT Import Export in Ethiopia.',
    '/media/social-preview.jpg',
  ];
}

function injectMeta(html, route, noindex = false) {
  const [title, description, imagePath] = getMeta(route);
  const canonical = route === '/' ? `${siteBase}/` : `${siteBase}${route}/`;
  const image = imagePath.startsWith('http') ? imagePath : `${siteBase}${imagePath}`;
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/i, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta name="robots" content="[^"]*" \/>/i, `<meta name="robots" content="${robots}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/i, `<link rel="canonical" href="${escapeHtml(canonical)}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/i, `<meta property="og:url" content="${escapeHtml(canonical)}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/i, `<meta property="og:image" content="${escapeHtml(image)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/i, `<meta name="twitter:image" content="${escapeHtml(image)}" />`);
}

writeFileSync(resolve(outputRoot, 'index.html'), injectMeta(baseHtml, '/'));
writeFileSync(resolve(outputRoot, '404.html'), injectMeta(baseHtml, '/404', true));

// Serve every sitemap URL as a real static route with route-specific SEO metadata.
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const routePath = new URL(match[1]).pathname;
  const route = routePath === '/' ? '/' : routePath.replace(/\/+$/, '');
  if (route === '/') continue;

  const routeDirectory = resolve(outputRoot, route.replace(/^\/+/, ''));
  mkdirSync(routeDirectory, { recursive: true });
  writeFileSync(resolve(routeDirectory, 'index.html'), injectMeta(baseHtml, route));
}

if (isGitHubPages) {
  sitemap = sitemap.replaceAll(productionSite, siteBase);
  writeFileSync(sitemapPath, sitemap);
  writeFileSync(
    resolve(outputRoot, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${siteBase}/sitemap.xml\n`,
  );
}
