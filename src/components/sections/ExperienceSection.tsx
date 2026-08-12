import { motion } from 'framer-motion';
import { Coffee, UtensilsCrossed, Cake } from 'lucide-react';
import { siteContent } from '@/data/siteContent';
import interior3 from '@/assets/interior/interior-3.jpg';

export default function ExperienceSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="container-bell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img src={interior3} alt="The relaxed Bell Cliff dining room" className="h-[500px] w-full object-cover" loading="lazy" />
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow">All day, every day</p>
            <h2 className="mt-4 section-heading max-w-lg text-balance">
              {siteContent.experience.heading}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal/70">
              {siteContent.experience.copy}
            </p>

            <div className="mt-10 space-y-6">
              {siteContent.experience.points.map((point, i) => {
                const Icon = [Coffee, UtensilsCrossed, Cake][i];
                return (
                  <motion.div
                    key={point.title}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-cream">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-medium text-navy">{point.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal/65">{point.copy}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
