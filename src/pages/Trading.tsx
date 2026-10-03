import { InquiryBand, PageHero, Reveal, SectionHeading, Seo } from '../components/UI';
import { assetUrl } from '../data/assetUrl';

const tradingAreas = [
  { number: '01', title: 'Agricultural Inputs', copy: 'Products that support agricultural activity and distribution channels.', image: '/media/trading/agricultural-inputs.webp', imageAlt: 'Illustrative arrangement of seeds and seed trays' },
  { number: '02', title: 'Stationery', copy: 'Selected stationery imports and commercial supply activity.', image: '/media/trading/stationery.webp', imageAlt: 'Illustrative arrangement of notebooks, paper and pens' },
  { number: '03', title: 'Construction Materials', copy: 'Selected construction-related trading activity for the local market.', image: '/media/trading/construction-materials.webp', imageAlt: 'Illustrative arrangement of tiles, bricks and metal profiles' },
];

export function Trading() {
  return (
    <>
      <Seo title="Import & Trading | KKGT" description="KKGT’s import and trading activities include agricultural inputs, stationery and construction materials for the Ethiopian market." />
      <PageHero eyebrow="IMPORT & TRADING" title="The right product." accent="The right market." copy="KKGT’s diversified trading business supports selected imported products and commercial requirements in Ethiopia." image="/media/trading/trading-hero.webp" imageAlt="Illustrative arrangement of agricultural, stationery and construction materials" imageLabel="Illustrative imagery" />
      <section className="section section--paper">
        <div className="container">
          <Reveal><SectionHeading eyebrow="TRADING AREAS" title="Selected products" accent="for the Ethiopian market." /></Reveal>
          <div className="statement-grid three-col">
            {tradingAreas.map((area) => <Reveal key={area.number} className="statement-card trading-card">
              <img src={assetUrl(area.image)} alt={area.imageAlt} loading="lazy" decoding="async" />
              <div className="trading-card__copy"><span>{area.number} / ILLUSTRATIVE IMAGERY</span><h3>{area.title}</h3><p>{area.copy}</p></div>
            </Reveal>)}
          </div>
        </div>
      </section>
      <section className="section section--cream">
        <div className="container buyer-checklist">
          <Reveal><span className="eyebrow">COMMERCIAL INQUIRY</span><h2>Start with the <em>actual requirement.</em></h2></Reveal>
          <Reveal className="buyer-checklist__items" delay={.08}>
            {['Product / category', 'Required quantity', 'Target specification', 'Delivery location', 'Required timing', 'Commercial notes'].map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong></div>)}
          </Reveal>
        </div>
      </section>
      <InquiryBand title="Have an import or trading requirement?" copy="Send KKGT the product, quantity, specification and delivery requirement so the opportunity can be reviewed properly." />
    </>
  );
}
