import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, Seo } from '../components/UI';
import { suppliedMedia } from '../data/suppliedMedia';

const documents = [
  { src: suppliedMedia.gumbichuuCertificate, title: 'Appreciation document', alt: 'Framed appreciation document photographed in an office' },
  { src: suppliedMedia.oromiaCertificate, title: 'Recognition document', alt: 'Framed recognition document photographed on a desk' },
] as const;

export function Awards() {
  return (
    <>
      <Seo title="Awards & Recognition | KKGT Import Export" description="View recognition photographs supplied by KKGT Import Export." />
      <header className="awards-hero">
        <div className="container awards-hero__layout">
          <Reveal className="awards-hero__copy">
            <span className="eyebrow">AWARDS & RECOGNITION</span>
            <h1>Recognition, <em>up close.</em></h1>
            <p>Selected photographs from the KKGT collection.</p>
            <Link to="/gallery" className="inline-arrow">Explore the gallery <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </Reveal>
          <Reveal className="awards-hero__media" delay={.08}>
            <a href={suppliedMedia.recognitionTrophy} target="_blank" rel="noopener noreferrer" aria-label="Open recognition trophy photograph in a new tab">
              <img src={suppliedMedia.recognitionTrophy} alt="Glass recognition trophy on a desk" decoding="async" />
              <span>RECOGNITION TROPHY <ArrowUpRight size={18} aria-hidden="true" /></span>
            </a>
          </Reveal>
        </div>
      </header>
      <section className="awards-documents section" aria-label="Recognition documents">
        <div className="container awards-documents__grid">
          {documents.map((item, index) => (
            <Reveal className="awards-document" key={item.title} delay={index * .08}>
              <a href={item.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.title} photograph in a new tab`}>
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                <span>{item.title} <ArrowUpRight size={18} aria-hidden="true" /></span>
              </a>
            </Reveal>
          ))}
        </div>
        <p className="container awards-documents__note">For details about these recognitions, please contact KKGT.</p>
      </section>
    </>
  );
}
