import { motion } from 'framer-motion';
import { Phone, MapPin, BookOpen } from 'lucide-react';
import { siteContent } from '@/data/siteContent';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-burgundy py-20 text-cream lg:py-28">
      <div className="container-bell text-center">
        <motion.h2
          className="font-serif text-display font-medium text-balance"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Come and sit by the coast
        </motion.h2>
        <motion.p
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Whether for breakfast, lunch or a proper Dorset cream tea, we would love to welcome you to Bell Cliff.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a href={siteContent.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-burgundy transition-all hover:bg-cream-200 active:scale-[0.98]">
            <Phone className="h-4 w-4" strokeWidth={1.8} />
            {siteContent.phone}
          </a>
          <Link to="/menu" className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 text-sm font-medium text-cream transition-all hover:bg-cream hover:text-burgundy active:scale-[0.98]">
            <BookOpen className="h-4 w-4" strokeWidth={1.8} />
            Explore Our Menu
          </Link>
          <a
            href={siteContent.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 text-sm font-medium text-cream transition-all hover:bg-cream hover:text-burgundy active:scale-[0.98]"
          >
            <MapPin className="h-4 w-4" strokeWidth={1.8} />
            Get Directions
          </a>
        </motion.div>
      </div>
    </section>
  );
}
