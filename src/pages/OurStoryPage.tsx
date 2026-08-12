import { motion } from 'framer-motion';
import { Coffee, UtensilsCrossed, Cake, Heart, MapPin } from 'lucide-react';
import { siteContent } from '@/data/siteContent';
import interior1 from '@/assets/interior/interior-1.jpg';
import interior4 from '@/assets/interior/interior-4.jpg';
import lymeCobb from '@/assets/gallery/lyme-regis-cobb.jpg';
import jurassicCoast from '@/assets/gallery/jurassic-coast.jpg';
import { useSEO } from '@/lib/useSEO';

export default function OurStoryPage() {
  useSEO({
    title: 'Our Story · The Bell Cliff Restaurant · Lyme Regis',
    description:
      'A traditional English restaurant, café and tea room in the heart of Lyme Regis. Friendly hospitality, comforting favourites and a relaxed family atmosphere.',
    path: '/our-story',
  });

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src={interior1} alt="The warm interior of Bell Cliff" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="container-bell absolute inset-0 flex flex-col items-center justify-center text-center text-cream">
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.25em] text-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Story
          </motion.p>
          <motion.h1
            className="mt-4 max-w-3xl font-serif text-display font-medium text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Traditional British dining on the Jurassic Coast
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="paper-bg py-20 lg:py-28">
        <div className="container-bell">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              className="font-serif text-2xl leading-relaxed text-navy sm:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Bell Cliff is a relaxed restaurant and tea room in the centre of Lyme Regis, bringing together familiar flavours, friendly service and the character of the Dorset coast.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="bg-cream-100 py-20 lg:py-28">
        <div className="container-bell">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { icon: Coffee, title: 'Breakfast to start the day', copy: 'Hearty full English breakfasts, lighter plates and freshly brewed coffee — the perfect start before a walk along the Cobb.' },
              { icon: UtensilsCrossed, title: 'Lunch & English favourites', copy: 'Fish and chips, homemade lasagne, breaded scampi and comforting classics, made to order and served with a smile.' },
              { icon: Cake, title: 'Afternoon treats', copy: 'Dorset cream teas, homemade scones and generous slices of cake in a relaxed, welcoming tea-room setting.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-cream">
                  <item.icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-serif text-xl font-medium text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lyme Regis setting */}
      <section className="paper-bg py-20 lg:py-28">
        <div className="container-bell">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow">Our setting</p>
              <h2 className="mt-3 section-heading">In the heart of Lyme Regis</h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal/70">
                Lyme Regis sits on the Jurassic Coast, a stretch of shoreline famous for its fossils, dramatic cliffs and the historic Cobb harbour. Bell Cliff is just a short walk from the seafront — a welcoming spot to rest, eat and enjoy the town.
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm text-charcoal/60">
                <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
                {siteContent.address.full}
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="overflow-hidden rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={lymeCobb} alt="The historic Cobb at Lyme Regis" className="h-full w-full object-cover" loading="lazy" />
              </motion.div>
              <motion.div
                className="mt-8 overflow-hidden rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <img src={jurassicCoast} alt="The Jurassic Coast cliffs" className="h-full w-full object-cover" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospitality */}
      <section className="navy-bg-texture py-20 text-cream lg:py-28">
        <div className="container-bell text-center">
          <Heart className="mx-auto h-10 w-10 text-gold" strokeWidth={1.5} />
          <h2 className="mt-6 max-w-2xl font-serif text-display font-medium text-balance">
            Friendly, relaxed hospitality
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/70">
            We welcome families, walkers, couples and visitors from near and far. Whether you are staying for a full meal or just a cup of tea and a slice of cake, you will find a warm welcome at Bell Cliff.
          </p>
        </div>
      </section>

      {/* Interior image */}
      <section className="paper-bg py-20 lg:py-28">
        <div className="container-bell">
          <motion.div
            className="overflow-hidden rounded-3xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src={interior4} alt="The relaxed dining room at Bell Cliff" className="h-[400px] w-full object-cover sm:h-[500px]" loading="lazy" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
