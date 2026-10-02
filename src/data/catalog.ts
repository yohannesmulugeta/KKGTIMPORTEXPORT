import { assetUrl } from './assetUrl';

export type CoffeeOrigin = {
  slug: string;
  name: string;
  summary: string;
  image: string;
};

export const coffeeOrigins: CoffeeOrigin[] = [
  { slug: 'yirgacheffe', name: 'Yirgacheffe', summary: 'One of the Ethiopian origins represented in KKGT’s public coffee offering.', image: assetUrl('/media/coffee-cherries.webp') },
  { slug: 'sidama', name: 'Sidama', summary: 'An Ethiopian coffee origin included in KKGT’s export portfolio.', image: assetUrl('/media/ethiopian-highlands.webp') },
  { slug: 'limmu', name: 'Limmu', summary: 'A coffee origin represented in KKGT’s existing export materials.', image: assetUrl('/media/green-coffee.webp') },
  { slug: 'jimma', name: 'Jimma / Djimmah', summary: 'An origin referenced in KKGT’s current coffee export offering.', image: assetUrl('/media/coffee-cherries.webp') },
  { slug: 'lekempti', name: 'Lekempti', summary: 'An Ethiopian origin included in KKGT’s public coffee portfolio.', image: assetUrl('/media/ethiopian-highlands.webp') },
];

export type Commodity = {
  slug: string;
  name: string;
  family: string;
  summary: string;
  image: string;
};

export const commodities: Commodity[] = [
  { slug: 'sesame', name: 'Sesame', family: 'Oilseed', summary: 'Part of KKGT’s agricultural export offering.', image: assetUrl('/media/sesame-illustrative.webp') },
  { slug: 'soybeans', name: 'Soybeans', family: 'Oilseed / pulse', summary: 'Agricultural commodity represented in KKGT’s export portfolio.', image: assetUrl('/media/soybeans-illustrative.webp') },
  { slug: 'mung-beans', name: 'Green Mung Beans', family: 'Pulse', summary: 'One of the pulses referenced in KKGT’s public materials.', image: assetUrl('/media/mung-beans-illustrative.webp') },
  { slug: 'chickpeas', name: 'Chickpeas', family: 'Pulse', summary: 'A pulse commodity included in KKGT’s export activity.', image: assetUrl('/media/chickpeas-illustrative.webp') },
  { slug: 'white-beans', name: 'White Beans', family: 'Bean', summary: 'A bean commodity referenced in KKGT’s export materials.', image: assetUrl('/media/white-beans-illustrative.webp') },
  { slug: 'red-kidney-beans', name: 'Red Kidney Beans', family: 'Bean', summary: 'A bean commodity included in KKGT’s public export offering.', image: assetUrl('/media/red-kidney-beans-illustrative.webp') },
];

export type { AgroProduct, ProductCategory } from './productCatalog';
export { agroProducts } from './productCatalog';
