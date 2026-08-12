import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gallery } from '@/data/galleryData';

export default function GalleryPreview() {
  const images = gallery.slice(0, 6);
  return (
    <section className="paper-bg py-20 lg:py-28">
      <div className="container-bell">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">A glimpse inside</p>
            <h2 className="mt-3 section-heading">Gallery</h2>
          </div>
          <Link to="/gallery" className="btn-outline">
            View all
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              className={`relative overflow-hidden rounded-2xl shadow-md ${
                i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
