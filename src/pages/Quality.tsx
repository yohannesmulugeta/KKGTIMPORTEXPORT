import { CheckCircle2 } from 'lucide-react';
import { InquiryBand, PageHero, Reveal, SectionHeading, Seo } from '../components/UI';
import { proofCategories } from '../data/companyStory';

export function Quality() {
  return (
    <>
      <Seo title="Quality & Operations | KKGT" description="See how KKGT presents sourcing, preparation, quality control, trade coordination and delivery as one connected operating flow." />
      <PageHero eyebrow="QUALITY & OPERATIONS" title="Confidence comes" accent="from current evidence." copy="Explore the steps from a defined buyer requirement to sourcing, preparation, checks and delivery coordination." image="/media/green-coffee.webp" />
      <section className="section section--paper">
        <div className="container">
          <Reveal><SectionHeading eyebrow="OPERATING PRINCIPLE" title="Source. Prepare. Verify." accent="Trade. Deliver." /></Reveal>
          <div className="quality-flow">
            {[
              ['01', 'Source', 'Work with suppliers, producers and customers around a defined requirement.'],
              ['02', 'Prepare', 'Coordinate product preparation, handling and documentation needs.'],
              ['03', 'Verify', 'Confirm the information and quality controls relevant to the transaction.'],
              ['04', 'Trade', 'Manage commercial communication and market requirements.'],
              ['05', 'Deliver', 'Coordinate the final movement of products to the customer.'],
            ].map(([no, title, copy]) => <Reveal className="quality-step" key={no}><span>{no}</span><div><strong>{title}</strong><p>{copy}</p></div><CheckCircle2 size={22} /></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section section--dark">
        <div className="container values-layout">
          <Reveal><span className="eyebrow eyebrow--light">TRUST & PROOF</span><h2>Credibility is stronger when <em>every claim can be verified.</em></h2></Reveal>
          <Reveal className="values-copy" delay={.08}><p>Ask KKGT for the documents that apply to your product, lot and destination. Current specifications and supporting records should be reviewed as part of each commercial offer.</p><p>Registration and safety information for agrochemicals must come from the current approved product label.</p></Reveal>
        </div>
      </section>
      <section className="proof-room">
        <div className="container proof-room__layout">
          <Reveal className="proof-room__heading"><span className="eyebrow">THE PROOF BEHIND THE PROMISE</span><h2>Show what applies.<br /><em>Verify what changes.</em></h2><p>Commercial proof is most useful when it matches the exact product, lot and transaction. Confirm the current evidence with KKGT before making a purchase decision.</p></Reveal>
          <div className="proof-room__grid">
            {proofCategories.map(([number, title, copy], index) => <Reveal className="proof-card" key={number} delay={index * .05}><span>{number}</span><h3>{title}</h3><p>{copy}</p><CheckCircle2 size={20} aria-hidden="true" /></Reveal>)}
          </div>
        </div>
      </section>
      <InquiryBand title="Need operational or quality information for a transaction?" />
    </>
  );
}
