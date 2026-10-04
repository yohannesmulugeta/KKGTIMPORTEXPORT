import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { agroProducts, coffeeOrigins, commodities } from '../data/catalog';

const SITE_URL = 'https://kkgtimportexport.com';
const DEFAULT_IMAGE = `${SITE_URL}/media/social-preview.jpg`;

type SeoMeta = {
  title: string;
  description: string;
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
  },
  '/coffee': {
    title: 'Ethiopian Coffee Export | KKGT Import Export',
    description: 'Explore KKGT’s Ethiopian coffee origins and start a direct conversation about current green coffee availability, specifications and export requirements.',
  },
  '/commodities': {
    title: 'Ethiopian Agricultural Commodities | KKGT Import Export',
    description: 'Explore KKGT’s agricultural commodity portfolio, including sesame, soybeans, pulses and beans for local and international trading opportunities.',
  },
  '/agrochemicals': {
    title: 'Agrochemicals & Crop Protection | KKGT Import Export',
    description: 'Browse KKGT crop-protection products by category and review published product information for herbicides, fungicides and insecticides.',
  },
  '/agrochemicals/herbicides': {
    title: 'Herbicides | KKGT Agrochemicals',
    description: 'Browse herbicide products in KKGT’s published crop-protection catalogue and review product-specific active ingredient and use information.',
  },
  '/agrochemicals/fungicides': {
    title: 'Fungicides | KKGT Agrochemicals',
    description: 'Browse fungicide products in KKGT’s published crop-protection catalogue and review product-specific active ingredient and use information.',
  },
  '/agrochemicals/insecticides': {
    title: 'Insecticides | KKGT Agrochemicals',
    description: 'Browse insecticide products in KKGT’s published crop-protection catalogue and review product-specific active ingredient and use information.',
  },
  '/trading': {
    title: 'Import & Trading | KKGT Import Export',
    description: 'Explore KKGT’s import and trading activities supported by Ethiopian market knowledge and commercial coordination.',
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
    description: 'Explore visual highlights from KKGT Import Export and its coffee, commodities, agrochemical and trading activities.',
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
    const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
    document.title = meta.title;
    setCanonical(canonical);
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'KKGT Import Export');
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', DEFAULT_IMAGE);
    setMeta('property', 'og:image:type', 'image/jpeg');
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', 'KKGT Import Export');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', DEFAULT_IMAGE);
    setMeta('name', 'twitter:image:alt', 'KKGT Import Export');

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
