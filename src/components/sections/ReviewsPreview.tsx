import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { siteContent } from '@/data/siteContent';

export default function ReviewsPreview() {
  return (
    <section className="navy-bg-texture relative overflow-hidden py-20 text-cream lg:py-28">
      <div className="container-bell text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">Guest reviews</p>
        <motion.div
          className="mt-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-8 w-8 fill-gold text-gold" strokeWidth={1.5} />
          ))}
          <Star className="h-8 w-8 fill-gold/60 text-gold/60" strokeWidth={1.5} />
        </motion.div>
        <p className="mt-6 font-serif text-4xl font-medium sm:text-5xl">
          {siteContent.rating.score} stars
        </p>
        <p className="mt-3 text-cream/70">from approximately {siteContent.rating.count} Google reviews</p>

        <a
          href={siteContent.mapsReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-medium text-cream transition-all hover:bg-cream hover:text-navy"
        >
          {siteContent.reviewsNotice}
          <ExternalLink className="h-4 w-4" strokeWidth={1.6} />
        </a>
      </div>
    </section>
  );
}
