import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Search, ShieldAlert } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getAgroProductImageStyle, InquiryBand, PageHero, ProductCard, Reveal, SectionHeading, Seo } from '../components/UI';
import { agroProducts, type ProductCategory } from '../data/productCatalog';

const filters: Array<'All' | ProductCategory> = ['All', 'Herbicide', 'Fungicide', 'Insecticide'];

const previousProductSlugs: Record<string, string> = {
  harmony: 'harmony-36-wdg',
  horozeb: 'horozeb-80-wp',
  metazin: 'metazin-66-sc',
  'ok-bright': 'ok-bright-24d-72-sl',
  'k-zole': 'k-zole-25-ec',
  'kk-top': 'kk-top-40-sc',
  'linko-up': 'linko-up-757-sg',
  range: 'range-5-ec',
  agroban: 'agroban-50-ec',
  'dedu-star': 'dedu-star-35-sc',
  'klodin-gold-20-ac': 'clodina-gold-20-ec',
  'zhora-24d-72': 'zhora-24d-72-sl',
  'fast-10': 'fast-10-ec',
};

export function Agrochemicals({ initialCategory = 'All' }: { initialCategory?: 'All' | ProductCategory }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>(initialCategory);

  const products = useMemo(() => agroProducts.filter((product) => {
    const searchText = `${product.name} ${product.activeIngredient} ${product.description}`.toLowerCase();
    const matchesText = searchText.includes(query.toLowerCase());
    const matchesCategory = filter === 'All' || product.category === filter;
    return matchesText && matchesCategory;
  }), [query, filter]);

  const pageTitle = initialCategory === 'All' ? 'Crop protection' : `${initialCategory}s`;
  const pageAccent = initialCategory === 'All' ? 'from the 2026 catalogue.' : 'in the 2026 catalogue.';

  return (
    <>
      <Seo title={`${initialCategory === 'All' ? 'Agrochemicals & Crop Protection' : `${initialCategory}s`} | KKGT`} description="Browse sourced crop-protection entries from KKGT’s supplied catalogue." />
      <PageHero eyebrow="AGROCHEMICALS" title={pageTitle} accent={pageAccent} copy="Explore KKGT’s sourced catalogue entries. Confirm product use and safety details against the current approved label." image="/media/kkgt-supplied/field-group.webp" imageAlt="Group together during a field visit" className="agro-page-hero" />

      <section className="section section--paper">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="2026 PRODUCT CATALOGUE"
              title={`${agroProducts.length} catalogue products.`}
              accent="Search by your requirement."
              copy="Search by product name, active ingredient or description. Entries without a usable packaging image have a clearly labelled fallback."
            />
          </Reveal>
          <Reveal className="catalog-tools">
            <label className="catalog-search"><Search size={18} aria-hidden="true" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, active ingredient or use" aria-label="Search agrochemical products" /></label>
            <div className="filter-tabs" role="group" aria-label="Product category filters">
              {filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}
            </div>
          </Reveal>
          <div className="product-grid">
            {products.map((product, index) => <Reveal key={product.slug} delay={(index % 4) * .03}><ProductCard product={product} /></Reveal>)}
          </div>
          {products.length === 0 ? <div className="empty-state"><strong>No matching catalogue product.</strong><p>Try another product name, active ingredient or category.</p></div> : null}
        </div>
      </section>

      <section className="section section--cream">
        <div className="container solution-grid">
          <Reveal><span className="eyebrow">FIND BY FARMING NEED</span><h2>Start with the <em>product category.</em></h2><p>Use the catalogue descriptions as a discovery guide. Application instructions, rates and safety requirements must still be checked against the current approved label.</p></Reveal>
          <Reveal className="solution-list" delay={.08}>
            <Link to="/agrochemicals/herbicides"><span>01</span><strong>Weed control</strong><p>Herbicides</p><ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link to="/agrochemicals/fungicides"><span>02</span><strong>Disease control</strong><p>Fungicides</p><ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link to="/agrochemicals/insecticides"><span>03</span><strong>Insect control</strong><p>Insecticides</p><ArrowUpRight size={18} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <InquiryBand title="Need current information about a KKGT product?" copy="Choose a product and send your inquiry. Application rates, registration details and safety instructions should always be confirmed from the current approved label." />
    </>
  );
}

export function ProductDetail() {
  const { slug } = useParams();
  const product = agroProducts.find((item) => item.slug === slug);
  const currentSlug = slug ? previousProductSlugs[slug] : undefined;
  if (currentSlug) return <Navigate to={`/agrochemicals/product/${currentSlug}`} replace />;
  if (!product) return <div className="section container"><Seo title="Product not in the current catalogue | KKGT" description="Ask KKGT for current agrochemical product information." /><h1>Product not in the current catalogue.</h1><p>Ask KKGT for current availability and approved product information.</p><Link to="/agrochemicals">Browse current products</Link></div>;

  return (
    <>
      <Seo title={`${product.name} | KKGT Agrochemicals`} description={product.description} />
      <section className="product-hero product-hero--catalogue">
        <div className="container product-hero__grid">
          <Reveal className="product-hero__visual product-hero__visual--catalogue">
            <div className={`product-hero__catalog-image ${product.image ? '' : 'product-card__visual--fallback'}`} style={getAgroProductImageStyle(product)} role="img" aria-label={product.image ? `${product.name} packaging image from KKGT catalogue` : `No verified packaging image for ${product.name}`}>{product.image ? null : <span>CATALOGUE IMAGE<br />PENDING</span>}</div>
            <span>KKGT 2026 PRODUCT CATALOGUE · #{String(product.catalogNumber).padStart(2, '0')}</span>
          </Reveal>
          <Reveal className="product-hero__copy" delay={.08}>
            <Link to="/agrochemicals" className="back-link back-link--light"><ArrowLeft size={16} aria-hidden="true" /> All agrochemicals</Link>
            <div className="product-hero__chips">
              <span className="category-chip verified">{product.category}</span>
              {product.subcategory ? <span className="category-chip product-subcategory">{product.subcategory}</span> : null}
            </div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="product-hero__ingredient"><span>Active ingredient</span><strong>{product.activeIngredient}</strong></div>
            {product.provisional ? <div className="product-provisional-note">The supplied catalogue marks part of this active-ingredient statement as provisional. Confirm it against the current approved label.</div> : null}
            <Link to={`/contact?interest=agrochemical&product=${encodeURIComponent(product.name)}`} className="button button--orange">Ask about this product <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container detail-layout">
          <Reveal className="detail-sidebar"><span className="eyebrow">CATALOGUE INFORMATION</span></Reveal>
          <Reveal className="detail-copy" delay={.08}>
            <h2>Published from the supplied <em>2026 catalogue.</em></h2>
            <p>The category, active ingredient and description come from KKGT’s supplied catalogue. Product packaging is shown where a usable source image is available. Confirm all application and registration details from the current approved label.</p>
            <div className="spec-placeholder-grid product-spec-grid">
              <div><span>Catalogue number</span><strong>#{String(product.catalogNumber).padStart(2, '0')}</strong></div>
              <div><span>Category</span><strong>{product.subcategory ?? product.category}</strong></div>
              <div className="product-spec-grid__wide"><span>Active ingredient</span><strong>{product.activeIngredient}</strong></div>
              <div><span>Application rate</span><strong>Confirm approved label</strong></div>
              <div><span>Registration details</span><strong>Confirm approved label</strong></div>
              <div><span>PPE / safety</span><strong>Confirm approved label</strong></div>
              <div><span>PHI / REI</span><strong>Confirm approved label</strong></div>
            </div>
            <div className="safety-note"><ShieldAlert size={22} aria-hidden="true" /><div><strong>Product safety rule</strong><p>Do not use this page as a complete application instruction. Rates, crops, targets, PPE, PHI/REI and other safety requirements must be confirmed from the current approved product label and applicable Ethiopian requirements.</p></div></div>
          </Reveal>
        </div>
      </section>
      <InquiryBand title={`Request current information for ${product.name}.`} />
    </>
  );
}
