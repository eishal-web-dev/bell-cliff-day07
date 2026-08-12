import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone, MapPin, BookOpen, MousePointerClick, ArrowDown } from 'lucide-react';
import { dishCarousel, dishLabels } from '@/data/dishCarouselData';
import { siteContent } from '@/data/siteContent';
import { useReducedMotion } from '@/lib/useReducedMotion';

const AUTO_INTERVAL = 8000;
const TRANSITION_MS = 1400;

type Phase = 'idle' | 'rotating';

export default function DishHero({ onEnterMenu }: { onEnterMenu: () => void }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [direction, setDirection] = useState<1 | -1>(1);
  const [hovering, setHovering] = useState(false);
  const [tabVisible, setVisible] = useState(true);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [srAnnouncement, setSrAnnouncement] = useState('');
  const reduced = useReducedMotion();

  const lockRef = useRef(false);
  const autoRef = useRef<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const lastInteraction = useRef(Date.now());
  const dragStartX = useRef<number | null>(null);

  const current = dishCarousel[index];
  const nextDishData = dishCarousel[(index + 1) % dishCarousel.length];

  // Mobile detection
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Preload next dish image
  useEffect(() => {
    const img = new Image();
    img.src = nextDishData.image;
  }, [nextDishData.image]);

  const goTo = useCallback(
    (target: number, dir: 1 | -1) => {
      if (lockRef.current) return;
      const len = dishCarousel.length;
      const normalized = ((target % len) + len) % len;
      if (normalized === index) return;
      lockRef.current = true;
      setDirection(dir);
      setPhase('rotating');
      setIndex(normalized);
      lastInteraction.current = Date.now();
      window.setTimeout(() => {
        setPhase('idle');
        lockRef.current = false;
      }, TRANSITION_MS);
    },
    [index]
  );

  const nextDish = useCallback(() => goTo(index + 1, 1), [index, goTo]);
  const prevDish = useCallback(() => goTo(index - 1, -1), [index, goTo]);

  // Screen reader announcement when dish changes
  useEffect(() => {
    setSrAnnouncement(`Now showing ${current.name}, ${current.category}. ${current.description}`);
  }, [current]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextDish();
      else if (e.key === 'ArrowLeft') prevDish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nextDish, prevDish]);

  // Wheel / trackpad
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let accum = 0;
    let cooldown = false;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (cooldown || lockRef.current) return;
      accum += e.deltaY + e.deltaX;
      if (Math.abs(accum) > 40) {
        cooldown = true;
        if (accum > 0) nextDish();
        else prevDish();
        accum = 0;
        window.setTimeout(() => {
          cooldown = false;
        }, TRANSITION_MS + 200);
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [nextDish, prevDish]);

  // Tab visibility
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (reduced) return;
    const tick = () => {
      if (
        !lockRef.current &&
        !hovering &&
        tabVisible &&
        Date.now() - lastInteraction.current > AUTO_INTERVAL
      ) {
        nextDish();
      }
    };
    autoRef.current = window.setInterval(tick, 1000);
    return () => {
      if (autoRef.current) window.clearInterval(autoRef.current);
    };
  }, [hovering, tabVisible, reduced, nextDish]);

  // Pointer parallax (desktop only)
  useEffect(() => {
    if (reduced || isMobile) return;
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setPointerOffset({
        x: (e.clientX - cx) / rect.width,
        y: (e.clientY - cy) / rect.height,
      });
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, [reduced, isMobile]);

  // Drag / swipe
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) nextDish();
      else prevDish();
    }
    dragStartX.current = null;
  };

  // Label positions around circle
  const labelPositions = useMemo(() => {
    const radius = 46;
    return dishLabels.map((label, i) => {
      const angle = (i / dishLabels.length) * Math.PI * 2 - Math.PI / 2;
      return {
        label,
        x: 50 + radius * Math.cos(angle),
        y: 50 + radius * Math.sin(angle),
      };
    });
  }, []);

  const activeLabel = current.name;
  const plateParallax = reduced || isMobile
    ? { x: 0, y: 0 }
    : { x: pointerOffset.x * 18, y: pointerOffset.y * 12 };

  const exitRotation = isMobile ? 180 : 360;
  const plateSize = isMobile ? 'min(75vw,380px)' : 'min(78vw,620px)';

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full overflow-hidden paper-bg"
      aria-roledescription="carousel"
      aria-label="Featured dishes"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {srAnnouncement}
      </div>

      {/* Decorative guide rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-square w-[min(92vw,820px)]">
          <div className="absolute inset-0 rounded-full border border-navy/10" />
          <div className="absolute inset-[6%] rounded-full border border-gold/20" />
          <div className="absolute inset-[14%] rounded-full border border-navy/8" />
          <div className="absolute inset-[22%] rounded-full border border-seaglass/15" />
        </div>
      </div>

      {/* Circular labels (desktop only) */}
      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative aspect-square w-[min(92vw,820px)]">
            {labelPositions.map(({ label, x, y }) => {
              const isActive = label === activeLabel;
              return (
                <button
                  key={label}
                  onClick={() => {
                    const idx = dishCarousel.findIndex((d) => d.name === label);
                    if (idx >= 0) goTo(idx, idx > index ? 1 : -1);
                  }}
                  disabled={lockRef.current}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium tracking-wide transition-all duration-500 ${
                    isActive
                      ? 'text-gold scale-110'
                      : 'text-navy/40 hover:text-navy/70'
                  }`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    pointerEvents: 'auto',
                  }}
                  aria-label={`Show ${label}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Decorative ingredients orbit (desktop only, reduced particles on mobile) */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative aspect-square" style={{ width: plateSize, height: plateSize }}>
            {current.ingredients.map((ing, i) => {
              const angleRad = (ing.angle * Math.PI) / 180;
              const x = 50 + ing.radius * Math.cos(angleRad);
              const y = 50 + ing.radius * Math.sin(angleRad);
              return (
                <motion.span
                  key={`${current.id}-${ing.name}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 opacity-60"
                  style={{ left: `${x}%`, top: `${y}%`, fontSize: `${ing.size}px` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: phase === 'rotating' ? 0 : 0.6,
                    scale: 1,
                    x: phase === 'rotating' ? direction * 30 : 0,
                  }}
                  transition={{ duration: 0.8, delay: phase === 'rotating' ? 0 : i * 0.05 }}
                >
                  {ing.emoji}
                </motion.span>
              );
            })}
          </div>
        </div>
      )}

      {/* The plate */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.id}
            className="relative flex items-center justify-center"
            style={{ width: plateSize, height: plateSize, willChange: 'transform, opacity' }}
            initial={
              reduced
                ? { opacity: 0, x: direction * 800 }
                : { x: direction * 800, opacity: 0, scale: 0.88, rotate: direction * -25 }
            }
            animate={{
              x: plateParallax.x,
              y: plateParallax.y,
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            exit={
              reduced
                ? { opacity: 0, x: -direction * 800 }
                : { x: -direction * 800, opacity: 0, scale: 0.88, rotate: exitRotation }
            }
            transition={{
              x: { duration: TRANSITION_MS / 1000, ease: [0.22, 1, 0.36, 1] },
              y: { type: 'spring', stiffness: 60, damping: 18 },
              rotate: { duration: TRANSITION_MS / 1000, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.5 },
              scale: { duration: TRANSITION_MS / 1000, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            {/* Shadow */}
            <div
              className="absolute inset-[8%] rounded-full bg-navy/25 blur-2xl"
              style={{ transform: 'translateY(4%) scale(0.95)' }}
              aria-hidden
            />
            {/* Plate rim */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cream-200/80 to-cream-400/60 shadow-[inset_0_2px_8px_rgba(255,255,255,0.5),inset_0_-4px_12px_rgba(16,44,60,0.1)]" />
            <div className="absolute inset-[3%] rounded-full bg-cream-50 shadow-inner" />
            {/* Food image */}
            <img
              src={current.image}
              alt={`${current.name} — ${current.description}`}
              className="absolute inset-[6%] rounded-full object-cover shadow-2xl"
              loading="eager"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero text overlay */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-between px-5 pt-24 pb-32 text-center sm:px-8 lg:pb-20">
        {/* Top content */}
        <div className="flex flex-col items-center">
          <motion.p
            className="eyebrow mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {siteContent.hero.label}
          </motion.p>

          <motion.h1
            className="mt-5 max-w-4xl font-serif text-hero font-medium text-navy text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
          >
            {siteContent.hero.heading}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/70 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {siteContent.hero.copy}
          </motion.p>
        </div>

        {/* Bottom content */}
        <div className="flex flex-col items-center">
          {/* Active dish info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: phase === 'rotating' ? 0 : 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
                {current.category}
              </p>
              <p className="mt-1 font-serif text-2xl font-medium text-navy">{current.name}</p>
              <p className="mt-1 max-w-md text-sm text-charcoal/60">{current.description}</p>
              {current.dietary.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {current.dietary.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-seaglass/15 px-3 py-1 text-xs font-medium text-seaglass-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            <button onClick={onEnterMenu} className="btn-primary">
              <BookOpen className="h-4 w-4" strokeWidth={1.8} />
              {siteContent.hero.buttons.menu}
            </button>
            <a href={siteContent.phoneHref} className="btn-gold">
              <Phone className="h-4 w-4" strokeWidth={1.8} />
              {siteContent.hero.buttons.call}
            </a>
            <a
              href={siteContent.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.8} />
              {siteContent.hero.buttons.directions}
            </a>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            className="mt-6 flex items-center gap-2 text-sm text-charcoal/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="text-gold">{'\u2605'}</span>
            <span>{siteContent.hero.trust}</span>
          </motion.div>

          {/* Pagination indicators (mobile) */}
          {isMobile && (
            <div className="mt-6 flex gap-2" role="tablist" aria-label="Dish pagination">
              {dishCarousel.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  disabled={lockRef.current}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-gold' : 'w-2 bg-navy/20'
                  }`}
                  aria-label={`Go to ${d.name}`}
                  aria-selected={i === index}
                  role="tab"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Arrow controls (desktop) */}
      {!isMobile && (
        <>
          <button
            onClick={prevDish}
            disabled={lockRef.current}
            className="touch-target absolute left-3 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-navy/20 bg-cream/60 text-navy backdrop-blur-sm transition-all hover:bg-cream hover:shadow-lg disabled:opacity-40 sm:left-6"
            aria-label="Previous dish"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={nextDish}
            disabled={lockRef.current}
            className="touch-target absolute right-3 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-navy/20 bg-cream/60 text-navy backdrop-blur-sm transition-all hover:bg-cream hover:shadow-lg disabled:opacity-40 sm:right-6"
            aria-label="Next dish"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </>
      )}

      {/* Scroll hint */}
      <button
        onClick={onEnterMenu}
        className="absolute bottom-28 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-navy/50 transition-colors hover:text-navy lg:bottom-8"
        aria-label="Scroll to explore the menu"
      >
        <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em]">
          <MousePointerClick className="h-3.5 w-3.5" strokeWidth={1.5} />
          Scroll to explore
        </span>
        <motion.span
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </button>
    </section>
  );
}
