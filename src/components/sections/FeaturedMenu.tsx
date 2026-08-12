import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { menu } from '@/data/menuData';
import type { MenuDish } from '@/data/menuData';
import { siteContent } from '@/data/siteContent';

function MenuCard({ dish, index }: { dish: MenuDish; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="card-hover group relative overflow-hidden rounded-3xl bg-cream-50 shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="image-lift h-full w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-navy/80 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm">
          {dish.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-medium text-navy">{dish.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{dish.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-gold">{dish.priceNote}</span>
          <span className="ml-auto flex translate-x-2 items-center gap-1 text-xs font-semibold text-navy/55 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Details <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
          {dish.dietary.length > 0 && (
            <div className="flex gap-1.5">
              {dish.dietary.map((tag) => (
                <span key={tag} className="rounded-full bg-seaglass/15 px-2.5 py-0.5 text-[0.7rem] font-medium text-seaglass-600">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturedMenu() {
  const featured = menu.filter((d) => d.featured).slice(0, 6);
  return (
    <section className="relative overflow-hidden bg-cream-100 py-20 lg:py-28">
      <div className="container-bell">
        <div className="mb-12 text-center">
          <p className="eyebrow">From our kitchen</p>
          <h2 className="mt-3 section-heading">Featured favourites</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-charcoal/70">
            {siteContent.featuredIntro}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((dish, i) => (
            <MenuCard key={dish.id} dish={dish} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/menu" className="btn-primary">
            View the full menu
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </section>
  );
}
