import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { agroProducts, coffeeOrigins, commodities } from '../data/catalog';

const SITE_URL = 'https://kkgtimportexport.com';
const DEFAULT_IMAGE = `${SITE_URL}/media/social-preview.jpg`;

type SeoMeta = {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
};

const fixedMeta: Record<string, SeoMeta> = {
  '/': {
    title: 'KKGT Import Export | Ethiopia Coffee, Commodities & Agrochemicals',
    description: 'KKGT Import Export connects Ethiopian coffee, agricultural commodities, crop-protection products and trading opportunities with local and international markets.',
  },
  '/about': {
    title: 'About KKGT Import Export | Ethiopia',
    description: 'Learn about KKGT Import Export, an Ethiopian trading company working across coffee, agricultural commodities, agrochemicals and import and trading activities.',
    image: `${SITE_URL}/media/kkgt-supplied/office-portrait.webp`,
  },
  '/coffee': {
    title: 'Ethiopian Coffee Export | KKGT Import Export',
    description: 'Explore KKGT’s Ethiopian coffee origins and start a direct conversation about current green coffee availability, specifications and export requirements.',
    image: `${SITE_URL}/media/coffee-cherries.webp`,
  },
  '/commodities': {
    title: 'Ethiopian Agricultural Commodities | KKGT Import Export',
    description: 'Explore KKGT’s agricultural commodity portfolio, including sesame, soybeans, pulses and beans for local and international trading opportunities.',
    image: `${SITE_URL}/media/commodities-illustrative.png`,
  },
  '/agrochemicals': {
    title: 'Agrochemicals & Crop Protection | KKGT Import Export',
    description: 'Browse KKGT crop-protection products by category and review published product information for herbicides, fungicides and insecticides.',
    image: `${SITE_URL}/media/kkgt-supplied/field-group.webp`,
  },
  '/agrochemicals/herbicides': {
    title: 'Herbicides | KKGT Agrochemicals',
    description: 'Browse herbicide products in KKGT’s published crop-protection catalogue and review product-specific active ingredient and use information.',
    image: `${SITE_URL}/media/kkgt-supplied/field-group.webp`,
  },
  '/agrochemicals/fungicides': {
    title: 'Fungicides | KKGT Agrochemicals',
    description: 'Browse fungicide products in KKGT’s published crop-protection catalogue and review product-specific active ingredient and use information.',
    image: `${SITE_URL}/media/kkgt-supplied/field-group.webp`,
  },
  '/agrochemicals/insecticides': {
    title: 'Insecticides | KKGT Agrochemicals',
    description: 'Browse insecticide products in KKGT’s published crop-protection catalogue and review product-specific active ingredient and use information.',
    image: `${SITE_URL}/media/kkgt-supplied/field-group.webp`,
  },
  '/trading': {
    title: 'Import & Trading | KKGT Import Export',
    description: 'Explore KKGT’s import and trading activities supported by Ethiopian market knowledge and commercial coordination.',
    image: `${SITE_URL}/media/trading/trading-hero.webp`,
  },
  '/quality': {
    title: 'Quality & Operations | KKGT Import Export',
    description: 'Learn how KKGT presents quality handling, product integrity and operational coordination across its trading activities.',
  },
  '/process': {
    title: 'Our Process | KKGT Import Export',
    description: 'See KKGT’s business process from sourcing and preparation through quality, trade coordination and delivery.',
  },
  '/gallery': {
    title: 'Gallery | KKGT Import Export',
    description: 'Explore field and office photographs supplied by KKGT Import Export.',
    image: `${SITE_URL}/media/kkgt-supplied/field-inspection.webp`,
  },
  '/awards': {
    title: 'Awards & Recognition | KKGT Import Export',
    description: 'View recognition photographs supplied by KKGT Import Export.',
    image: `${SITE_URL}/media/kkgt-supplied/recognition-trophy.webp`,
  },
  '/contact': {
    title: 'Contact KKGT Import Export | Addis Ababa, Ethiopia',
    description: 'Contact KKGT Import Export in Addis Ababa for coffee, agricultural commodities, agrochemicals and trading inquiries.',
  },
};

function normalizePath(pathname: string) {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

function absoluteUrl(value?: string) {
  if (!value) return DEFAULT_IMAGE;
  try {
    return new URL(value, SITE_URL).href;
  } catch {
    return DEFAULT_IMAGE;
  }
}

function imageMime(url: string) {
  if (/\.webp(?:\?|$)/i.test(url)) return 'image/webp';
  if (/\.png(?:\?|$)/i.test(url)) return 'image/png';
  return 'image/jpeg';
}

function getMeta(pathname: string): SeoMeta {
  const path = normalizePath(pathname);
  if (fixedMeta[path]) return fixedMeta[path];

  const coffeeMatch = path.match(/^\/coffee\/([^/]+)$/);
  if (coffeeMatch) {
    const origin = coffeeOrigins.find((item) => item.slug === coffeeMatch[1]);
    if (origin) {
      return {
        title: `${origin.name} Coffee | KKGT Import Export`,
        description: `${origin.summary} Contact KKGT to discuss current lot details, availability and export requirements.`,
        image: absoluteUrl(origin.image),
      };
    }
  }

  const commodityMatch = path.match(/^\/commodities\/([^/]+)$/);
  if (commodityMatch) {
    const commodity = commodities.find((item) => item.slug === commodityMatch[1]);
    if (commodity) {
      return {
        title: `${commodity.name} Export | KKGT Import Export`,
        description: `${commodity.summary} Contact KKGT to discuss current availability, specifications and trading requirements.`,
        image: absoluteUrl(commodity.image),
      };
    }
  }

  const productMatch = path.match(/^\/agrochemicals\/product\/([^/]+)$/);
  if (productMatch) {
    const product = agroProducts.find((item) => item.slug === productMatch[1]);
    if (product) {
      return {
        title: `${product.name} | KKGT Agrochemicals`,
        description: product.description,
        image: absoluteUrl(product.image ?? '/media/catalogue-field.webp'),
      };
    }
  }

  return {
    title: 'Page Not Found | KKGT Import Export',
    description: 'The requested page could not be found on the KKGT Import Export website.',
    noindex: true,
  };
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

export function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = normalizePath(pathname);
    const meta = getMeta(path);
    const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
    const image = absoluteUrl(meta.image);

    document.title = meta.title;
    setCanonical(canonical);
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'KKGT Import Export');
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:type', imageMime(image));
    if (image !== DEFAULT_IMAGE) {
      document.head.querySelector('meta[property="og:image:width"]')?.remove();
      document.head.querySelector('meta[property="og:image:height"]')?.remove();
    } else {
      setMeta('property', 'og:image:width', '1200');
      setMeta('property', 'og:image:height', '630');
    }
    setMeta('property', 'og:image:alt', 'KKGT Import Export');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', image);

    let schema = document.getElementById('seo-webpage-schema') as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'seo-webpage-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: meta.title,
      description: meta.description,
      url: canonical,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
    });
  }, [pathname]);

  return null;
}
