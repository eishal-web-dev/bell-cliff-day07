import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gallery, galleryCategories, type GalleryCategory } from '@/data/galleryData';
import { useSEO } from '@/lib/useSEO';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'All'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  useSEO({
    title: 'Gallery · The Bell Cliff Restaurant · Lyme Regis',
    description:
      'A gallery of food, interior, Lyme Regis, afternoon tea and guest moments from The Bell Cliff Restaurant.',
    path: '/gallery',
  });

  const filtered = activeCategory === 'All' ? gallery : gallery.filter((g) => g.category === activeCategory);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? prev : (prev + 1) % filtered.length));
  }, [filtered.length]);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? prev : (prev - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <div className="pt-16 md:pt-20">
      <section className="paper-bg py-16 lg:py-24">
        <div className="container-bell">
          <div className="max-w-3xl">
            <p className="eyebrow">A glimpse inside</p>
            <h1 className="mt-4 font-serif text-hero font-medium text-navy">Gallery</h1>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
              Food, our dining room, Lyme Regis and moments from the tea room.
            </p>
          </div>

          {/* Filters */}
          <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === 'All' ? 'bg-navy text-cream' : 'bg-cream-50 text-navy/70 hover:bg-cream-100'
              }`}
            >
              All
            </button>
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat ? 'bg-navy text-cream' : 'bg-cream-50 text-navy/70 hover:bg-cream-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-100 pb-20 lg:pb-28">
        <div className="container-bell">
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
            {filtered.map((img, i) => (
              <motion.button
                key={img.id}
                onClick={() => setLightboxIndex(i)}
                className="group relative block w-full overflow-hidden rounded-2xl shadow-md"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute bottom-2 left-2 rounded-full bg-navy/70 px-2.5 py-0.5 text-[0.65rem] font-medium text-cream opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  {img.category}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 touch-target flex items-center justify-center rounded-full text-cream/80 hover:text-cream"
              aria-label="Close lightbox"
            >
              <X className="h-7 w-7" strokeWidth={1.5} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 touch-target flex items-center justify-center rounded-full text-cream/80 hover:text-cream"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" strokeWidth={1.5} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 touch-target flex items-center justify-center rounded-full text-cream/80 hover:text-cream"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" strokeWidth={1.5} />
            </button>
            <motion.img
              key={filtered[lightboxIndex].id}
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-md text-center text-sm text-cream/70 px-4">
              {filtered[lightboxIndex].alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
