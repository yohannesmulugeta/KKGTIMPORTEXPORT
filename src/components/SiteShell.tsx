import { Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { assetUrl } from '../data/assetUrl';
import { company } from '../data/company';

const logoUrl = assetUrl('/media/kkgt-logo.svg');

const primaryLinks = [
  ['About', '/about'],
  ['Coffee', '/coffee'],
  ['Commodities', '/commodities'],
  ['Agrochemicals', '/agrochemicals'],
  ['Trading', '/trading'],
  ['Quality', '/quality'],
  ['Process', '/process'],
  ['Gallery', '/gallery'],
  ['Contact', '/contact'],
] as const;

const mobileLinks = [
  ['01', 'Home', '/'],
  ['02', 'About KKGT', '/about'],
  ['03', 'Ethiopia Coffee', '/coffee'],
  ['04', 'Agricultural Commodities', '/commodities'],
  ['05', 'Agrochemicals', '/agrochemicals'],
  ['06', 'Import & Trading', '/trading'],
  ['07', 'Quality & Operations', '/quality'],
  ['08', 'Our Process', '/process'],
  ['09', 'Gallery', '/gallery'],
] as const;

function Logo({ inverted = false }: { inverted?: boolean }) {
  return <span className={`logo-lockup ${inverted ? 'logo-lockup--inverted' : ''}`}><img src={logoUrl} alt="KKGT Import Export" width="320" height="108" decoding="async" /></span>;
}

function RouteFallback() {
  return <div className="route-loading" role="status" aria-live="polite"><span className="route-loading__mark" aria-hidden="true" /><span>Loading KKGT</span></div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const menu = menuRef.current;
    const links = Array.from(menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    links[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
      if (event.key !== 'Tab' || !links.length) return;
      const first = links[0];
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-menu-open' : ''}`}>
      <div className="container nav-bar">
        <Link to="/" aria-label="KKGT home" className="brand-link"><Logo /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryLinks.map(([label, to]) => <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{label}</NavLink>)}
        </nav>
        <Link to="/contact" className="nav-cta desktop-only">Start an inquiry <ArrowUpRight size={15} aria-hidden="true" /></Link>
        <button ref={menuButtonRef} className="menu-button" type="button" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation" tabIndex={open ? -1 : 0} onClick={() => setOpen(true)}><Menu aria-hidden="true" /></button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div ref={menuRef} id="mobile-navigation" className="mobile-menu mobile-menu--premium" role="dialog" aria-modal="true" aria-label="Site navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <div className="mobile-menu__backdrop" aria-hidden="true" />
            <button className="mobile-menu__close" type="button" aria-label="Close navigation" onClick={() => { setOpen(false); window.requestAnimationFrame(() => menuButtonRef.current?.focus()); }}><X aria-hidden="true" /></button>
            <nav className="container mobile-menu__inner" aria-label="Mobile navigation">
              <motion.div className="mobile-menu__intro" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .32, delay: .04 }}>
                <span>KKGT IMPORT EXPORT</span>
                <strong>Rooted in Ethiopia.<br /><em>Trading with the world.</em></strong>
                <p>Explore KKGT’s coffee, agricultural commodities, crop-protection and trading businesses.</p>
              </motion.div>

              <motion.div className="mobile-menu__links" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .34, delay: .09 }}>
                {mobileLinks.map(([no, label, to]) => (
                  <Link to={to} key={to}>
                    <span>{no}</span>
                    <strong>{label}</strong>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                ))}
                <Link to="/contact" className="mobile-menu__cta">
                  <span>10</span>
                  <strong>Start an inquiry</strong>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Logo inverted /><p>{company.tagline}</p></div>
        <div><span className="footer-label">BUSINESSES</span><Link to="/coffee">Coffee Export</Link><Link to="/commodities">Agricultural Commodities</Link><Link to="/agrochemicals">Agrochemicals</Link><Link to="/trading">Import & Trading</Link></div>
        <div><span className="footer-label">COMPANY</span><Link to="/about">About KKGT</Link><Link to="/process">Our Process</Link><Link to="/quality">Quality & Operations</Link><Link to="/gallery">Gallery</Link><Link to="/contact">Contact</Link></div>
        <div><span className="footer-label">CONTACT</span><a href={`mailto:${company.email}`}>{company.email}</a><a href="tel:+251991828202">{company.phones[0]}</a><p>{company.address[0]}<br />{company.address[1]}</p></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} KKGT Import Export</span><span>Quality · Integrity · Innovation</span></div>
    </footer>
  );
}

export function SiteShell() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" tabIndex={-1}><Suspense fallback={<RouteFallback />}><Outlet /></Suspense></main><Footer /></>;
}
