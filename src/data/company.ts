import { assetUrl } from './assetUrl';

export const company = {
  name: 'KKGT Import Export',
  legalName: 'Kelbesa Kekeba General Trading',
  motto: 'We Cultivate Ideas for Growth',
  tagline: 'Rooted in Ethiopia. Trading with the world.',
  founded: '1999 E.C. (2007 Gregorian)',
  email: 'infoexport@kkgtimportandexport.com',
  phones: ['+251 11 810 6453', '+251 91 103 6990', '+251 90 403 3559'],
  address: ['Addis Ababa, Lideta, Sengatera', 'Yobek Commercial Center, 7th Floor', 'Office 703A'],
  hours: ['Mon–Fri · 09:00–19:00', 'Saturday · Half day'],
};

export const businessAreas = [
  {
    title: 'Ethiopian Coffee',
    eyebrow: 'Export',
    description: 'Origin-led coffee sourcing, processing, quality handling and export coordination.',
    to: '/coffee',
    image: assetUrl('/media/coffee-cherries.webp'),
  },
  {
    title: 'Agricultural Commodities',
    eyebrow: 'Export',
    description: 'Sesame, soybeans, pulses and beans for local and international trading opportunities.',
    to: '/commodities',
    image: assetUrl('/media/chickpeas-illustrative.webp'),
  },
  {
    title: 'Agrochemicals',
    eyebrow: 'Import & Distribution',
    description: 'A clearer product-discovery experience for crop-protection categories and verified product information.',
    to: '/agrochemicals',
    image: assetUrl('/media/catalogue-field.webp'),
  },
  {
    title: 'Import & Trading',
    eyebrow: 'Trading',
    description: 'Agricultural inputs, stationery and construction materials supported by local market knowledge.',
    to: '/trading',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=86',
  },
];

export const processSteps = [
  ['01', 'Source', 'Build relationships with suppliers, producers and customers.'],
  ['02', 'Prepare', 'Coordinate processing, documentation and market requirements.'],
  ['03', 'Quality', 'Protect product integrity with controlled quality checks.'],
  ['04', 'Trade', 'Manage commercial requirements and buyer communication.'],
  ['05', 'Deliver', 'Coordinate movement to local or international customers.'],
] as const;
