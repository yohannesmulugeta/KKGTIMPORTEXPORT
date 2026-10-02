import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Leaf, MapPinned, PackageCheck, Ship, Sparkles } from 'lucide-react';

const GROWERS = 'https://upload.wikimedia.org/wikipedia/commons/7/73/Kaffeodlare_i_Etiopien.jpg';
const CHERRIES = 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&w=2200&q=90';
const DRYING = 'https://commons.wikimedia.org/wiki/Special:FilePath/Coffee%20Beans%20Drying%20%2811586771164%29.jpg';
const SORTING = 'https://commons.wikimedia.org/wiki/Special:FilePath/Sorting%20coffee%20beans%20for%20size%2C%20Hawassa.jpg';
const EXPORT = 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=2200&q=88';

type Artifact = 'origin' | 'cherry' | 'drying' | 'quality' | 'export';

const chapters: Array<{
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
  note: string;
  image: string;
  artifact: Artifact;
}> = [
  {
    number: '01',
    eyebrow: 'ETHIOPIA · THE ORIGIN',
    title: 'Coffee begins here.',
    copy: 'Ethiopia is the natural home of Arabica coffee. Highland landscapes, producing communities and generations of knowledge give every coffee story its beginning.',
    note: 'KKGT presents coffee through Ethiopia first: its land, people and individual origins.',
    image: GROWERS,
    artifact: 'origin',
  },
  {
    number: '02',
    eyebrow: 'CHERRY · HARVEST',
    title: 'The journey starts ripe.',
    copy: 'Coffee quality starts before processing. The growing environment, harvest timing and handling of ripe cherries shape the green coffee that follows.',
    note: 'Current harvest and lot information is confirmed for each commercial offer.',
    image: CHERRIES,
    artifact: 'cherry',
  },
  {
    number: '03',
    eyebrow: 'PROCESS · DRY',
    title: 'Care changes the coffee.',
    copy: 'Processing and drying move coffee from fruit toward a stable export product. The method used remains part of the identity of each lot.',
    note: 'Washed, natural and other preparation details are published only when verified for the available lot.',
    image: DRYING,
    artifact: 'drying',
  },
  {
    number: '04',
    eyebrow: 'PREPARE · VERIFY',
    title: 'Quality becomes visible.',
    copy: 'Sorting, preparation and physical checks turn origin into buyer-ready green coffee information. This is where story must be supported by proof.',
    note: 'Grade, crop year, volume, packing and certification status are confirmed before a final offer.',
    image: SORTING,
    artifact: 'quality',
  },
  {
    number: '05',
    eyebrow: 'ETHIOPIA · WORLD',
    title: 'Origin meets its market.',
    copy: 'KKGT connects Ethiopian coffee origins with international buyer requirements through clear communication, documentation and export coordination.',
    note: 'The next step is a direct inquiry built around the origin and commercial requirement you need.',
    image: EXPORT,
    artifact: 'export',
  },
];

function JourneyArtifact({ artifact }: { artifact: Artifact }) {
  if (artifact === 'origin') {
    return <div className="coffee-scroll__origin-mark"><MapPinned size={62} aria-hidden="true" /><strong>ETHIOPIA</strong><span>THE ORIGIN</span></div>;
  }

  if (artifact === 'cherry') {
    return (
      <div className="coffee-scroll__cherry" aria-hidden="true">
        <Leaf className="coffee-scroll__cherry-leaf" size={62} />
        <i /><i /><i /><i /><i /><i />
      </div>
    );
  }

  if (artifact === 'drying') {
    return <div className="coffee-scroll__bean coffee-scroll__bean--parchment" aria-hidden="true"><i /><Sparkles size={34} /></div>;
  }

  if (artifact === 'quality') {
    return <div className="coffee-scroll__quality-mark"><CheckCircle2 size={66} aria-hidden="true" /><strong>PREPARED</strong><span>GREEN COFFEE</span></div>;
  }

  return (
    <div className="coffee-scroll__bag" aria-hidden="true">
      <i />
      <PackageCheck size={40} />
      <strong>KKGT</strong>
      <span>ETHIOPIAN<br />GREEN COFFEE</span>
      <Ship size={25} />
    </div>
  );
}

export function CoffeeScrollJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [compactView, setCompactView] = useState(() => window.matchMedia('(max-width: 820px)').matches);
  const [activeIndex, setActiveIndex] = useState(0);
  const staticJourney = Boolean(reduceMotion) || compactView;

  useEffect(() => {
    const media = window.matchMedia('(max-width: 820px)');
    const update = () => setCompactView(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (staticJourney) return;

    let frame = 0;
    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const viewport = Math.max(window.innerHeight, 1);
      const travel = Math.max(track.offsetHeight - viewport, 1);
      const nextProgress = Math.min(Math.max(-rect.top / travel, 0), 1);
      const nextIndex = Math.min(chapters.length - 1, Math.floor(Math.min(nextProgress, .9999) * chapters.length));
      if (progressRef.current) progressRef.current.style.width = `${nextProgress * 100}%`;
      setActiveIndex((current) => current === nextIndex ? current : nextIndex);
    };
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [staticJourney]);

  if (staticJourney) {
    return (
      <section className="coffee-scroll coffee-scroll--static" id="coffee-story" aria-labelledby="coffee-scroll-title">
        <div className="container coffee-scroll__intro">
          <span>THE ETHIOPIAN COFFEE JOURNEY</span>
          <h2 id="coffee-scroll-title">From origin to export, <em>one connected story.</em></h2>
          <p>Five chapters explain the journey while keeping current commercial facts tied to verified lots.</p>
        </div>
        <div className="container coffee-scroll__static-grid">
          {chapters.map((chapter) => (
            <article className="coffee-scroll__static-card" key={chapter.number}>
              <img src={chapter.image} alt="" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.hidden = true; }} />
              <div>
                <span>{chapter.number} / {chapter.eyebrow}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.copy}</p>
                <small>{chapter.note}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="coffee-scroll" id="coffee-story" aria-labelledby="coffee-scroll-title">
      <div className="container coffee-scroll__intro">
        <span>THE ETHIOPIAN COFFEE JOURNEY</span>
        <h2 id="coffee-scroll-title">From origin to export, <em>one connected story.</em></h2>
        <p>Scroll through five chapters. The story changes with the coffee—from Ethiopia’s highlands to buyer-ready green coffee.</p>
      </div>

      <div className="coffee-scroll__track" ref={trackRef}>
        <div className="coffee-scroll__frame">
          <div className="coffee-scroll__media" aria-hidden="true">
            {chapters.map((chapter, index) => (
              <motion.img
                key={chapter.number}
                src={chapter.image}
                alt=""
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                animate={{ opacity: activeIndex === index ? 1 : 0, scale: activeIndex === index ? 1.02 : 1.09 }}
                transition={{ duration: .78, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
            <div className="coffee-scroll__veil" />
            <div className="coffee-scroll__texture" />
          </div>

          <div className="container coffee-scroll__layout">
            <div className="coffee-scroll__copy-stack" aria-live="polite">
              {chapters.map((chapter, index) => (
                <motion.article
                  className={`coffee-scroll__copy${activeIndex === index ? ' is-active' : ''}`}
                  key={chapter.number}
                  animate={{ opacity: activeIndex === index ? 1 : 0, y: activeIndex === index ? 0 : 30 }}
                  transition={{ duration: .48, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden={activeIndex !== index}
                >
                  <span>{chapter.number} / 05 · {chapter.eyebrow}</span>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.copy}</p>
                  <small>{chapter.note}</small>
                </motion.article>
              ))}
            </div>

            <div className="coffee-scroll__artifact-stage" aria-hidden="true">
              {chapters.map((chapter, index) => (
                <motion.div
                  className="coffee-scroll__artifact"
                  key={chapter.artifact}
                  animate={{ opacity: activeIndex === index ? 1 : 0, scale: activeIndex === index ? 1 : .7, rotate: activeIndex === index ? 0 : -8 }}
                  transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <JourneyArtifact artifact={chapter.artifact} />
                </motion.div>
              ))}
            </div>

            <div className="coffee-scroll__rail" aria-hidden="true">
              {chapters.map((chapter, index) => (
                <div key={chapter.number} className={activeIndex === index ? 'is-active' : ''}>
                  <span>{chapter.number}</span>
                  <strong>{chapter.eyebrow.split(' · ')[0]}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="coffee-scroll__progress" aria-hidden="true">
            <span>ETHIOPIA · GREEN COFFEE</span>
            <div><i ref={progressRef} /></div>
            <span>{String(activeIndex + 1).padStart(2, '0')} / 05</span>
          </div>
        </div>
      </div>
    </section>
  );
}
