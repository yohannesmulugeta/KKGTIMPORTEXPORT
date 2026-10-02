import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InquiryBand, PageHero, Seo } from '../components/UI';
import { processSteps } from '../data/company';

export function Process() {
  return (
    <>
      <Seo title="How KKGT Works | Sourcing to Delivery" description="A clear overview of KKGT’s sourcing, preparation, quality, trade and delivery coordination." />
      <PageHero eyebrow="OUR PROCESS" title="A clear route" accent="from need to market." copy="Each product and transaction has its own requirements. This is the working sequence KKGT uses to frame the conversation." image="/media/coffee-cherries.webp" />
      <section className="process-page section"><div className="container"><div className="portfolio-heading"><div><span className="eyebrow">FIVE CONNECTED STEPS</span><h2>Start with the <em>requirement.</em></h2></div><p>Current specifications, documentation and timing are confirmed for the product and buyer involved.</p></div><div className="process-page__list">{processSteps.map(([number, title, copy]) => <div key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
      <section className="proof-preview section"><div className="container proof-preview__grid"><div><span className="eyebrow">QUALITY THROUGH THE FLOW</span><h2>Details change.<br /><em>Verification matters.</em></h2></div><div><p>Product specifications, available volumes, export documents and handling records should match the actual transaction. Ask KKGT for current information when you make an inquiry.</p><Link className="button button--green" to="/quality">Quality & operations <ArrowUpRight size={17} /></Link></div></div></section>
      <InquiryBand title="Have a product or sourcing requirement?" />
    </>
  );
}
