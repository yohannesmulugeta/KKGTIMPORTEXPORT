import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InquiryBand, Seo } from '../components/UI';
import { assetUrl } from '../data/assetUrl';

const images = [
  { src: assetUrl('/media/coffee-cherries.webp'), title: 'Coffee at origin', label: 'Illustrative coffee imagery', to: '/coffee' },
  { src: assetUrl('/media/green-coffee.webp'), title: 'Green coffee', label: 'Illustrative coffee imagery', to: '/coffee' },
  { src: assetUrl('/media/ethiopian-highlands.webp'), title: 'Ethiopian landscape', label: 'Illustrative landscape imagery', to: '/about' },
  { src: assetUrl('/media/commodities-illustrative.png'), title: 'Agricultural commodities', label: 'Illustrative product imagery', to: '/commodities' },
  { src: assetUrl('/media/catalogue-field.webp'), title: 'Crop protection catalogue', label: 'KKGT supplied catalogue artwork', to: '/agrochemicals' },
];

export function Gallery() {
  return (
    <>
      <Seo title="Visual Gallery | KKGT Import Export" description="Explore illustrative coffee and commodity imagery alongside artwork from KKGT’s supplied agrochemical catalogue." />
      <header className="gallery-intro"><div className="container"><span className="eyebrow">VISUAL GALLERY</span><h1>Explore the <em>world of KKGT.</em></h1><p>A visual guide to the business areas. Illustrative images show product categories and landscape themes; they do not document a specific KKGT farm, facility or shipment.</p></div></header>
      <section className="gallery-section section"><div className="container gallery-grid">{images.map((item, index) => <Link to={item.to} className={`gallery-item gallery-item--${index + 1}`} key={item.title}><img src={item.src} alt={item.title} loading={index < 2 ? 'eager' : 'lazy'} /><div><small>{item.label}</small><h2>{item.title}</h2><span>Explore <ArrowUpRight size={16} /></span></div></Link>)}</div></section>
      <InquiryBand title="Want product information behind the imagery?" />
    </>
  );
}
