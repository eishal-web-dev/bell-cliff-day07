import { motion } from 'framer-motion';
import { siteContent } from '@/data/siteContent';
import interior1 from '@/assets/interior/interior-1.jpg';
import interior2 from '@/assets/interior/interior-2.jpg';
import afternoonTea from '@/assets/gallery/afternoon-tea-1.jpg';

export default function WelcomeSection() {
  return (
    <section className="paper-bg py-20 lg:py-28">
      <div className="container-bell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow">{siteContent.tagline}</p>
            <h2 className="mt-4 section-heading max-w-lg text-balance">
              {siteContent.welcome.heading}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal/70">
              {siteContent.welcome.copy}
            </p>
            <div className="mt-8 h-px w-24 bg-gold" />
          </motion.div>

          <div className="relative h-[420px] sm:h-[480px]">
            <motion.div
              className="absolute right-0 top-0 h-64 w-48 overflow-hidden rounded-2xl shadow-xl sm:h-72 sm:w-60"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src={interior2} alt="A warm corner of the Bell Cliff dining room" className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div
              className="absolute bottom-0 right-20 h-48 w-40 overflow-hidden rounded-2xl border-4 border-cream shadow-xl sm:h-56 sm:w-48"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img src={afternoonTea} alt="Afternoon tea at Bell Cliff" className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div
              className="absolute bottom-8 left-0 h-72 w-72 overflow-hidden rounded-2xl shadow-2xl sm:h-80 sm:w-80"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <img src={interior1} alt="The Bell Cliff restaurant interior" className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
