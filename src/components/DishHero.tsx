import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDown,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Star,
} from 'lucide-react';
import { dishCarousel } from '@/data/dishCarouselData';
import { siteContent } from '@/data/siteContent';
import { useReducedMotion } from '@/lib/useReducedMotion';

const SPIN_MS = 950;
const SETTLE_MS = 650;
const AUTO_INTERVAL = 8000;

type Direction = 1 | -1;
type Phase = 'idle' | 'spinning' | 'settling';

export default function DishHero({ onEnterMenu }: { onEnterMenu: () => void }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [phase, setPhase] = useState<Phase>('idle');
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const reduced = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const lockedRef = useRef(false);
  const dragStartRef = useRef<number | null>(null);
  const lastInteractionRef = useRef(Date.now());
  const timersRef = useRef<number[]>([]);

  const current = dishCarousel[index];

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    const nextImage = new Image();
    nextImage.src = dishCarousel[(index + 1) % dishCarousel.length].image;
  }, [index]);

  const goTo = useCallback(
    (target: number, requestedDirection: Direction) => {
      if (lockedRef.current) return;

      const normalized = ((target % dishCarousel.length) + dishCarousel.length) % dishCarousel.length;
      if (normalized === index) return;

      lockedRef.current = true;
      lastInteractionRef.current = Date.now();
      setDirection(requestedDirection);

      if (reduced) {
        setIndex(normalized);
        setAnnouncement(`Now showing ${dishCarousel[normalized].name}`);
        const unlock = window.setTimeout(() => {
          lockedRef.current = false;
        }, 120);
        timersRef.current.push(unlock);
        return;
      }

      // Stage one: the complete plate performs a clearly visible revolution in place.
      setPhase('spinning');
      setRotation((value) => value + requestedDirection * (isMobile ? 180 : 360));

      // Stage two: only after the revolution finishes does the next dish replace it.
      const swap = window.setTimeout(() => {
        setDirection(requestedDirection);
        setIndex(normalized);
        setPhase('settling');
        setAnnouncement(`Now showing ${dishCarousel[normalized].name}`);

        const unlock = window.setTimeout(() => {
          setPhase('idle');
          lockedRef.current = false;
        }, SETTLE_MS);
        timersRef.current.push(unlock);
      }, SPIN_MS);

      timersRef.current.push(swap);
    },
    [index, isMobile, reduced]
  );

  const nextDish = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const previousDish = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') nextDish();
      if (event.key === 'ArrowLeft') previousDish();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextDish, previousDish]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let wheelTotal = 0;
    const onWheel = (event: WheelEvent) => {
      const rect = hero.getBoundingClientRect();
      const heroIsActive = rect.top <= 20 && rect.bottom > window.innerHeight * 0.6;
      if (!heroIsActive || lockedRef.current) return;

      wheelTotal += event.deltaY + event.deltaX;
      if (Math.abs(wheelTotal) < 70) return;

      // Let the visitor leave the hero after reaching either end.
      const leavingForward = wheelTotal > 0 && index === dishCarousel.length - 1;
      const leavingBackward = wheelTotal < 0 && index === 0;
      if (leavingForward || leavingBackward) {
        wheelTotal = 0;
        return;
      }

      event.preventDefault();
      wheelTotal > 0 ? nextDish() : previousDish();
      wheelTotal = 0;
    };

    hero.addEventListener('wheel', onWheel, { passive: false });
    return () => hero.removeEventListener('wheel', onWheel);
  }, [index, nextDish, previousDish]);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      if (
        !lockedRef.current &&
        !hovering &&
        tabVisible &&
        Date.now() - lastInteractionRef.current >= AUTO_INTERVAL
      ) {
        nextDish();
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [hovering, nextDish, reduced, tabVisible]);

  const onPointerDown = (event: React.PointerEvent) => {
    dragStartRef.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (dragStartRef.current === null) return;
    const distance = event.clientX - dragStartRef.current;
    dragStartRef.current = null;
    if (Math.abs(distance) < 55) return;
    distance < 0 ? nextDish() : previousDish();
  };

  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-[100svh] overflow-hidden paper-bg"
      aria-roledescription="carousel"
      aria-label="Bell Cliff featured dishes"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div
        className="pointer-events-none absolute -left-36 top-24 h-80 w-80 rounded-full border border-gold/15 md:-left-20 md:h-[34rem] md:w-[34rem]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-[-12rem] h-[34rem] w-[34rem] rounded-full border border-navy/10"
        aria-hidden
      />

      <div className="container-bell grid min-h-[100svh] items-center gap-10 pb-24 pt-28 md:grid-cols-[0.88fr_1.12fr] md:gap-8 md:pb-12 md:pt-24 lg:gap-14">
        {/* Copy has its own column; it never sits on top of the food photography. */}
        <div className="relative z-20 mx-auto max-w-xl text-center md:mx-0 md:text-left">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {siteContent.hero.label}
          </motion.p>

          <motion.h1
            className="mt-5 max-w-[12ch] font-serif text-[clamp(3rem,6.1vw,6.8rem)] font-medium leading-[0.9] tracking-[-0.045em] text-navy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Traditional flavours
            <span className="mt-2 block text-burgundy">by the coast.</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-lg text-base leading-7 text-charcoal/70 md:mx-0 md:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
          >
            {siteContent.hero.copy}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
          >
            <button onClick={onEnterMenu} className="btn-primary">
              <BookOpen className="h-4 w-4" />
              Explore our menu
            </button>
            <a href={siteContent.phoneHref} className="btn-gold">
              <Phone className="h-4 w-4" />
              Call to reserve
            </a>
            <a
              href={siteContent.mapsDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              <MapPin className="h-4 w-4" />
              Directions
            </a>
          </motion.div>

          <div className="mt-7 flex items-center justify-center gap-3 text-sm text-charcoal/65 md:justify-start">
            <span className="flex gap-0.5 text-gold" aria-hidden>
              {[0, 1, 2, 3, 4].map((star) => (
                <Star key={star} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span>{siteContent.hero.trust}</span>
          </div>
        </div>

        {/* Turntable */}
        <div className="relative z-10 mx-auto flex w-full max-w-[720px] flex-col items-center">
          <div className="relative aspect-square w-[min(88vw,680px)]">
            <div className="pointer-events-none absolute inset-[1%] rounded-full border border-navy/10" />
            <div className="pointer-events-none absolute inset-[7%] rounded-full border border-gold/25" />
            <div className="pointer-events-none absolute inset-[14%] rounded-full border border-navy/10" />

            {dishCarousel.map((dish, dishIndex) => {
              const angle = (dishIndex / dishCarousel.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + 47 * Math.cos(angle);
              const y = 50 + 47 * Math.sin(angle);
              return (
                <button
                  key={dish.id}
                  type="button"
                  onClick={() => goTo(dishIndex, dishIndex > index ? 1 : -1)}
                  className={`absolute z-30 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition md:block ${
                    dishIndex === index
                      ? 'bg-gold text-navy shadow-md'
                      : 'bg-cream/85 text-navy/55 hover:text-navy'
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  aria-current={dishIndex === index ? 'true' : undefined}
                >
                  {dish.name}
                </button>
              );
            })}

            <motion.div
              className="absolute inset-[10%] cursor-grab rounded-full active:cursor-grabbing"
              animate={{
                rotate: rotation,
                scale: phase === 'spinning' ? 0.96 : 1,
              }}
              transition={{
                rotate: { duration: reduced ? 0 : SPIN_MS / 1000, ease: [0.45, 0, 0.2, 1] },
                scale: { duration: 0.35, ease: 'easeOut' },
              }}
              style={{ transformOrigin: '50% 50%', willChange: 'transform' }}
            >
              <div className="absolute inset-[4%] translate-y-[5%] rounded-full bg-navy/25 blur-2xl" />
              <div className="absolute inset-0 rounded-full bg-[#fffdf8] shadow-[0_30px_70px_rgba(16,44,60,0.22),inset_0_0_0_2px_rgba(199,154,85,0.3)]" />
              <div className="absolute inset-[4%] rounded-full border border-gold/35 bg-[#f8f1e7]" />

              {/* An asymmetric crest turns with the plate, making every 360° revolution unmistakable. */}
              <div className="absolute left-1/2 top-[2.3%] z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-burgundy shadow-[0_0_0_5px_rgba(110,44,50,0.12)]" />
              <div className="absolute bottom-[4%] left-1/2 z-20 -translate-x-1/2 rounded-full bg-navy px-3 py-1 text-[9px] font-bold uppercase tracking-[0.24em] text-cream">
                Bell Cliff
              </div>

              <div className="absolute inset-[7%] overflow-hidden rounded-full bg-cream">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={current.id}
                    src={current.image}
                    alt={`${current.name}: ${current.description}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, x: direction * 90, scale: 1.08 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: direction * -90, scale: 0.96 }}
                    transition={{ duration: reduced ? 0 : SETTLE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
                    draggable={false}
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-navy/10" />
              </div>
            </motion.div>

            <button
              type="button"
              onClick={previousDish}
              disabled={lockedRef.current}
              className="touch-target absolute left-0 top-1/2 z-40 flex -translate-x-1/4 -translate-y-1/2 items-center justify-center rounded-full border border-navy/15 bg-cream text-navy shadow-lg transition hover:bg-navy hover:text-cream disabled:opacity-40"
              aria-label="Previous dish"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextDish}
              disabled={lockedRef.current}
              className="touch-target absolute right-0 top-1/2 z-40 flex translate-x-1/4 -translate-y-1/2 items-center justify-center rounded-full border border-navy/15 bg-cream text-navy shadow-lg transition hover:bg-navy hover:text-cream disabled:opacity-40"
              aria-label="Next dish"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="relative z-30 -mt-3 w-[min(88vw,500px)] rounded-[1.75rem] border border-navy/10 bg-cream/95 px-6 py-5 text-center shadow-[0_20px_45px_rgba(16,44,60,0.12)] backdrop-blur md:-mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: phase === 'spinning' ? 0.35 : 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                {current.category}
              </p>
              <h2 className="mt-1 font-serif text-3xl leading-tight text-navy">{current.name}</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-charcoal/65">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center gap-2 md:hidden" role="tablist" aria-label="Featured dishes">
            {dishCarousel.map((dish, dishIndex) => (
              <button
                key={dish.id}
                type="button"
                onClick={() => goTo(dishIndex, dishIndex > index ? 1 : -1)}
                className={`h-2 rounded-full transition-all ${
                  dishIndex === index ? 'w-7 bg-gold' : 'w-2 bg-navy/20'
                }`}
                aria-label={`Show ${dish.name}`}
                aria-selected={dishIndex === index}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onEnterMenu}
        className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-navy/55 transition hover:text-navy md:flex"
      >
        Scroll to explore
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.7, repeat: Infinity }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </button>
    </section>
  );
}
