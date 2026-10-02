import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InquiryBand, Reveal, Seo } from '../components/UI';
import { businessAreas, company, processSteps } from '../data/company';
import { coffeeOrigins } from '../data/catalog';
import { assetUrl } from '../data/assetUrl';

const portfolio = businessAreas.map((area, index) => ({ ...area, number: `0${index + 1}` }));

export function Home() {
  return (
    <>
      <Seo title="KKGT Import Export | Ethiopian Coffee, Commodities & Trading" description="Explore KKGT’s Ethiopian coffee and commodity exports, crop-protection catalogue and import and trading activities." />
      <section className="editorial-hero">
        <div className="container editorial-hero__grid">
          <div className="editorial-hero__copy">
            <Reveal><span className="eyebrow">KKGT IMPORT EXPORT · ETHIOPIA</span><h1>From Ethiopian origin to <em>world markets.</em></h1><p>Explore coffee, agricultural commodities, crop protection and trading through one Ethiopian company.</p><div className="editorial-hero__actions"><Link className="button button--green" to="/contact">Start an inquiry <ArrowUpRight size={17} /></Link><Link className="inline-arrow" to="/about">Get to know KKGT <ArrowDownRight size={17} /></Link></div></Reveal>
          </div>
          <div className="editorial-hero__visual" aria-label="Illustrative Ethiopian coffee imagery"><img src={assetUrl('/media/coffee-cherries.webp')} alt="Coffee cherries on a branch" /><div className="editorial-hero__small"><img src={assetUrl('/media/green-coffee.webp')} alt="Green coffee beans" /></div><span>ETHIOPIAN COFFEE · ORIGIN TO MARKET</span></div>
        </div>
        <div className="container editorial-hero__index"><span>01 / A COMPANY WITH FOUR BUSINESS LINES</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="editorial-intro section">
        <div className="container editorial-intro__grid"><span className="eyebrow">WHO WE ARE</span><div><Reveal><h2>Built around agriculture.<br /><em>Connected by trade.</em></h2><p>{company.name} works across Ethiopian export, import and local distribution. Each business has a clear route to the products and information a buyer needs.</p><Link to="/about" className="inline-arrow">Our company <ArrowUpRight size={17} /></Link></Reveal></div></div>
      </section>

      <section className="portfolio-section section" aria-labelledby="portfolio-title"><div className="container"><div className="portfolio-heading"><div><span className="eyebrow">EXPLORE KKGT</span><h2 id="portfolio-title">The right place to <em>start.</em></h2></div><p>Choose a business area to see its portfolio and send a focused inquiry.</p></div><div className="portfolio-grid">{portfolio.map((area) => <Link className={`portfolio-card portfolio-card--${area.number}`} key={area.to} to={area.to}><div className="portfolio-card__image" style={{ backgroundImage: `url(${area.image})` }} /><div className="portfolio-card__body"><span>{area.number} / {area.eyebrow}</span><h3>{area.title}</h3><p>{area.description}</p><strong>Explore business <ArrowUpRight size={17} /></strong></div></Link>)}</div></div></section>

      <section className="coffee-editorial"><div className="coffee-editorial__visual"><img src={assetUrl('/media/ethiopian-highlands.webp')} alt="Illustrative Ethiopian highland landscape" loading="lazy" /></div><div className="coffee-editorial__copy"><span className="eyebrow eyebrow--light">A CLOSER LOOK · COFFEE</span><h2>Many origins.<br /><em>One clear way in.</em></h2><p>Explore Ethiopian origins in KKGT’s coffee portfolio, then ask for the current lot details that matter to your purchase.</p><div className="coffee-editorial__origins">{coffeeOrigins.map((origin) => <Link key={origin.slug} to={`/coffee/${origin.slug}`}>{origin.name}<ArrowUpRight size={16} /></Link>)}</div><Link to="/coffee" className="button button--light">Explore Ethiopian coffee <ArrowUpRight size={17} /></Link></div></section>

      <section className="process-preview section"><div className="container"><div className="portfolio-heading"><div><span className="eyebrow">HOW WE WORK</span><h2>From requirement <em>to delivery.</em></h2></div><p>A practical sequence for discussing products, quality and trade requirements.</p></div><div className="process-preview__grid">{processSteps.map(([number, title, copy]) => <div key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div><Link to="/process" className="inline-arrow">Explore the process <ArrowUpRight size={17} /></Link></div></section>

      <section className="proof-preview section"><div className="container proof-preview__grid"><div><span className="eyebrow">BUYER CONFIDENCE</span><h2>Ask for evidence that fits <em>your transaction.</em></h2></div><div><p>Specifications, availability, documents and handling requirements vary by product and lot. KKGT can review the details relevant to your inquiry.</p><Link to="/quality" className="button button--green">Quality & operations <ArrowUpRight size={17} /></Link></div></div></section>

      <section className="home-faq-section section"><div className="container home-faq"><div><span className="eyebrow">COMMON QUESTIONS</span><h2>Before you <em>get in touch.</em></h2></div><div className="home-faq__items"><details><summary>Which business area should I contact?</summary><p>Choose coffee, commodities, agrochemicals, or trading on the contact page. You can also select a general inquiry.</p></details><details><summary>Where can I find current specifications?</summary><p>Send the product, quantity, destination and specifications you need. Confirm current availability and transaction details in KKGT’s response.</p></details><details><summary>Are agrochemical application instructions on the site?</summary><p>Product pages are a catalogue guide. Check application rates, registration and safety instructions against the current approved label.</p></details></div></div></section>
      <InquiryBand title="What can KKGT help you source or supply?" copy="Tell us the product and requirement. We’ll route your inquiry to the right business area." />
    </>
  );
}
