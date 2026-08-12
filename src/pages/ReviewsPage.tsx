import { motion } from 'framer-motion';
import { Star, ExternalLink, Quote } from 'lucide-react';
import { siteContent } from '@/data/siteContent';
import { useSEO } from '@/lib/useSEO';

export default function ReviewsPage() {
  useSEO({
    title: 'Reviews · The Bell Cliff Restaurant · Lyme Regis',
    description:
      'The Bell Cliff Restaurant holds a 4.4-star rating from approximately 592 Google reviews. Read what guests say on Google.',
    path: '/reviews',
  });

  return (
    <div className="pt-16 md:pt-20">
      <section className="navy-bg-texture py-20 text-cream lg:py-28">
        <div className="container-bell text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">Guest reviews</p>
          <motion.div
            className="mt-6 flex items-center justify-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-10 w-10 fill-gold text-gold" strokeWidth={1.5} />
            ))}
            <Star className="h-10 w-10 fill-gold/60 text-gold/60" strokeWidth={1.5} />
          </motion.div>
          <motion.h1
            className="mt-6 font-serif text-hero font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {siteContent.rating.score} stars
          </motion.h1>
          <p className="mt-3 text-lg text-cream/70">
            from approximately {siteContent.rating.count} Google reviews
          </p>
          <a
            href={siteContent.mapsReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-navy transition-all hover:bg-gold-500"
          >
            {siteContent.reviewsNotice}
            <ExternalLink className="h-4 w-4" strokeWidth={1.6} />
          </a>
        </div>
      </section>

      <section className="paper-bg py-20 lg:py-28">
        <div className="container-bell">
          <div className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-10 w-10 text-gold" strokeWidth={1.5} />
            <p className="mt-6 font-serif text-2xl leading-relaxed text-navy sm:text-3xl">
              We are grateful to everyone who has taken the time to share their experience at Bell Cliff.
            </p>
            <p className="mt-6 text-base leading-relaxed text-charcoal/70">
              To read genuine guest reviews — including ratings, comments and recent visits — please visit our Google reviews page. We have not reproduced individual reviews here to ensure only verified, authentic feedback is shown.
            </p>
            <a
              href={siteContent.mapsReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-navy/30 px-6 py-3 text-sm font-medium text-navy transition-all hover:bg-navy hover:text-cream"
            >
              {siteContent.reviewsNotice}
              <ExternalLink className="h-4 w-4" strokeWidth={1.6} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
