import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InquiryBand, PageHero, Reveal, SectionHeading, Seo } from '../components/UI';

export function Trading() {
  return (
    <>
      <Seo title="Import & Trading | KKGT" description="KKGT’s import and trading activities include agricultural inputs, stationery and construction materials for the Ethiopian market." />
      <PageHero eyebrow="IMPORT & TRADING" title="The right product." accent="The right market." copy="KKGT’s diversified trading business supports selected imported products and commercial requirements in Ethiopia." image="/media/catalogue-field.webp" />
      <section className="section section--paper">
        <div className="container">
          <Reveal><SectionHeading eyebrow="TRADING AREAS" title="Selected products" accent="for the Ethiopian market." /></Reveal>
          <div className="statement-grid three-col">
            {[
              ['01', 'Agricultural Inputs', 'Products that support agricultural activity and distribution channels.'],
              ['02', 'Stationery', 'Selected stationery imports and commercial supply activity.'],
              ['03', 'Construction Materials', 'Selected construction-related trading activity for the local market.'],
            ].map(([no, title, copy]) => <Reveal key={no} className="statement-card"><span>{no}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
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
