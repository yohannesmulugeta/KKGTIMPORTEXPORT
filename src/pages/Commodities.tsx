import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { InquiryBand, PageHero, Reveal, SectionHeading, Seo } from '../components/UI';
import { commodities } from '../data/catalog';

export function Commodities() {
  return (
    <>
      <Seo title="Agricultural Commodities | KKGT" description="Explore KKGT’s agricultural commodity export offering including sesame, soybeans, mung beans, chickpeas, white beans and red kidney beans." />
      <PageHero eyebrow="AGRICULTURAL COMMODITIES" title="Crops with market potential." accent="Clear buyer conversations." copy="Explore KKGT’s commodity portfolio and ask for the current specifications, volume and packing that fit your requirement. Product imagery is illustrative." image="/media/commodities-illustrative.png" />

      <section className="section section--paper">
        <div className="container">
          <Reveal><SectionHeading eyebrow="EXPORT PORTFOLIO" title="Clear products." accent="Clear inquiry paths." copy="Choose a commodity to discuss current quality, packing, volume and shipment requirements with KKGT." /></Reveal>
          <div className="commodity-card-grid">
            {commodities.map((commodity, index) => (
              <Reveal key={commodity.slug} delay={index * .04}>
                <Link className="commodity-card" to={`/commodities/${commodity.slug}`}>
                  <div className="commodity-card__media" style={{ backgroundImage: `url(${commodity.image})` }} role="img" aria-label={`Illustrative ${commodity.name}`} />
                  <div className="commodity-card__body"><span>0{index + 1} / {commodity.family.toUpperCase()}</span><h3>{commodity.name}</h3><p>{commodity.summary}</p><div>View commodity <ArrowUpRight size={17} /></div></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container buyer-checklist">
          <Reveal><span className="eyebrow">BUYER-FIRST INFORMATION</span><h2>The next useful detail is the one the <em>buyer actually needs.</em></h2></Reveal>
          <Reveal delay={.08} className="buyer-checklist__items">
            {['Product & crop year', 'Required grade / quality standard', 'Target volume', 'Packing requirement', 'Destination / incoterm', 'Required certificates'].map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong></div>)}
          </Reveal>
        </div>
      </section>

      <InquiryBand title="Send KKGT your commodity requirement." copy="Include the product, target specification, volume, packing and destination so KKGT can review the opportunity." />
    </>
  );
}

export function CommodityDetail() {
  const { slug } = useParams();
  const commodity = commodities.find((item) => item.slug === slug);
  if (!commodity) return <div className="section container"><h1>Commodity not found.</h1><Link to="/commodities">Back to commodities</Link></div>;

  return (
    <>
      <Seo title={`${commodity.name} Export | KKGT`} description={`${commodity.name} is part of KKGT’s agricultural commodity export offering from Ethiopia.`} />
      <PageHero eyebrow={commodity.family.toUpperCase()} title={commodity.name} accent="Export" copy={`${commodity.summary} Product imagery is illustrative; ask for current lot information.`} image={commodity.image} />
      <section className="section section--paper">
        <div className="container detail-layout">
          <Reveal className="detail-sidebar"><Link to="/commodities" className="back-link"><ArrowLeft size={16} /> All commodities</Link><span className="eyebrow">COMMERCIAL DATA</span></Reveal>
          <Reveal className="detail-copy" delay={.08}>
            <h2>Ask for current <em>commercial specifications.</em></h2>
            <p>Grade, purity, moisture, crop year, packing and available volume can vary by offer. Confirm the details with KKGT before ordering.</p>
            <div className="spec-placeholder-grid">
              {['Grade / standard', 'Purity', 'Moisture', 'Crop year', 'Packing', 'Available volume'].map((label) => <div key={label}><span>{label}</span><strong>Confirm with KKGT</strong></div>)}
            </div>
            <Link to={`/contact?interest=commodity&product=${encodeURIComponent(commodity.name)}`} className="button button--green">Request a quotation <ArrowUpRight size={17} /></Link>
          </Reveal>
        </div>
      </section>
      <InquiryBand title={`Ask KKGT about ${commodity.name}.`} />
    </>
  );
}
