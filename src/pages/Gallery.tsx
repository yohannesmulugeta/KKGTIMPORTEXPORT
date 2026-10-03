import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/UI';
import { suppliedMedia } from '../data/suppliedMedia';

const photos = [
  { src: suppliedMedia.fieldInspection, title: 'In the field', alt: 'Group standing in a green agricultural field under a cloudy sky', category: 'FIELD' },
  { src: suppliedMedia.fieldGroup, title: 'Together', alt: 'Group of people standing beside crops outdoors', category: 'FIELD' },
  { src: suppliedMedia.officePortrait, title: 'At the office', alt: 'Person seated at a desk in an office', category: 'OFFICE' },
  { src: suppliedMedia.fieldLandscape, title: 'The landscape', alt: 'Group gathered at the edge of a green agricultural field', category: 'FIELD' },
  { src: suppliedMedia.officeWide, title: 'Inside KKGT', alt: 'Person seated in a wide view of an office', category: 'OFFICE' },
] as const;

export function Gallery() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Seo title="Gallery | KKGT Import Export" description="Explore photographs from the field and office supplied by KKGT Import Export." />
      <header className="photo-gallery__intro">
        <div className="container photo-gallery__heading">
          <div><span className="eyebrow">KKGT GALLERY</span><h1>Moments from <em>our world.</em></h1></div>
          <Link to="/awards" className="inline-arrow">Awards & recognition <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </header>
      <section className="photo-gallery" aria-label="Field and office photographs">
        <div className="container photo-gallery__grid">
          {photos.map((photo, index) => (
            <motion.figure
              className={`photo-gallery__item photo-gallery__item--${index + 1}`}
              key={photo.title}
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .16 }}
              transition={reduceMotion ? { duration: 0 } : { duration: .65, delay: (index % 2) * .08, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${photo.title} photograph in a new tab`}>
                <img src={photo.src} alt={photo.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                <span className="photo-gallery__caption"><small>{photo.category}</small><strong>{photo.title}</strong><ArrowUpRight size={20} aria-hidden="true" /></span>
              </a>
            </motion.figure>
          ))}
        </div>
      </section>
    </>
  );
}
