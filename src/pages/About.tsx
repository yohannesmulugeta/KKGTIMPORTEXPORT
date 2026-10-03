import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InquiryBand, PageHero, Reveal, SectionHeading, Seo } from '../components/UI';
import { businessAreas, company } from '../data/company';
import { companyStory, coreValues, trustFramework } from '../data/companyStory';

export function About() {
  return (
    <>
      <Seo title="About KKGT | KKGT Import Export" description="Learn about KKGT Import Export, an Ethiopian company operating across coffee and agricultural exports, agrochemicals, agricultural inputs and diversified trading." />
      <PageHero eyebrow="ABOUT KKGT" title="Built around agriculture." accent="Connected to markets." copy="KKGT brings export, import and agricultural distribution together under one Ethiopian trading company." image="/media/kkgt-supplied/office-portrait.webp" imageAlt="Qalbeessaa Baanjee seated in his office" className="about-page-hero" />

      <section className="section section--paper">
        <div className="container editorial-grid">
          <Reveal><span className="eyebrow">OUR COMPANY</span></Reveal>
          <Reveal delay={.08}>
            <p className="overline">{company.motto}</p>
            <h2>{company.name} connects <em>origin, products and markets.</em></h2>
            <div className="two-copy">
              <p>Founded in {company.founded}, KKGT’s business portfolio includes Ethiopian Arabica coffee, agricultural commodities, crop-protection products, agricultural inputs, stationery and construction materials.</p>
              <p>The company works across sourcing, commercial coordination, quality handling, distribution and export preparation, with a focus on building durable relationships around real market needs.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <Reveal><SectionHeading eyebrow="MISSION & VISION" title="Growth should be practical," accent="responsible and shared." /></Reveal>
          <div className="statement-grid">
            <Reveal className="statement-card"><span>01 / MISSION</span><h3>Understand the customer’s requirement.</h3><p>Offer flexible sourcing and dependable service, with a focus on quality, competitive pricing and timely delivery.</p></Reveal>
            <Reveal className="statement-card" delay={.08}><span>02 / VISION</span><h3>Be a preferred Ethiopian trading partner.</h3><p>Grow as a leading agricultural trading company in Africa and a preferred partner for Ethiopian-origin products.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <Reveal><SectionHeading eyebrow="OUR CORE VALUES" title="Principles for" accent="lasting relationships." /></Reveal>
          <div className="statement-grid three-col">
            {coreValues.map((value, index) => (
              <Reveal className="statement-card" key={value} delay={index * .04}>
                <span>0{index + 1} / VALUE</span>
                <h3>{value}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="company-story-section">
        <div className="container">
          <Reveal><SectionHeading dark eyebrow="OUR STORY" title="One company story." accent="Four connected chapters." copy="Explore how KKGT brings its export, import and agricultural supply activities together." /></Reveal>
          <div className="company-story-timeline">
            {companyStory.map((chapter, index) => (
              <Reveal className="company-story-chapter" key={chapter.number} delay={index * .05}>
                <div><span>{chapter.number}</span><i /></div>
                <small>{chapter.label}</small>
                <h3>{chapter.title}</h3>
                <p>{chapter.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark about-business">
        <div className="container">
          <Reveal><SectionHeading dark eyebrow="BUSINESS MODEL" title="Different markets." accent="One operating platform." copy="KKGT’s structure is clearer when each business line has its own customer journey, while the company story remains connected." /></Reveal>
          <div className="dark-business-list">
            {businessAreas.map((area, index) => (
              <Reveal key={area.to} delay={index * .04}>
                <Link to={area.to} className="dark-business-row"><span>0{index + 1}</span><strong>{area.title}</strong><p>{area.description}</p><ArrowUpRight size={19} /></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="container trust-section__layout">
          <Reveal className="trust-section__intro">
            <span className="eyebrow">TRUST & CAPABILITY</span>
            <h2>Trust should be <em>clear, current and verifiable.</em></h2>
            <p>Talk directly with KKGT about the product and market requirements that matter to you. Ask for current documents and specifications relevant to your transaction.</p>
            <Link to="/quality" className="button button--green">Explore quality & operations <ArrowUpRight size={17} /></Link>
          </Reveal>
          <div className="trust-principles">
            {trustFramework.map((item, index) => (
              <Reveal className="trust-principle" key={item.number} delay={index * .045}>
                <span>{item.number}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InquiryBand title="Looking for a reliable Ethiopian trading partner?" />
    </>
  );
}
