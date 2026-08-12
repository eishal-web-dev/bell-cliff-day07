import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight, AlertCircle } from 'lucide-react';
import { menu, menuCategories, dietaryFilters, type MenuCategory, type MenuDish } from '@/data/menuData';
import { siteContent } from '@/data/siteContent';
import { useSEO } from '@/lib/useSEO';

function MenuCard({ dish }: { dish: MenuDish }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="card-hover group overflow-hidden rounded-3xl bg-cream-50 shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-navy/80 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm">
          {dish.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-medium text-navy">{dish.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{dish.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-gold">{dish.priceNote}</span>
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

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');
  const [query, setQuery] = useState('');
  const [activeDietary, setActiveDietary] = useState<string[]>([]);

  useSEO({
    title: 'Menu · The Bell Cliff Restaurant · Lyme Regis',
    description:
      'Explore the Bell Cliff menu — breakfast, English favourites, seafood, cream tea, desserts, children\u2019s options, vegan dishes and hot & cold drinks.',
    path: '/menu',
  });

  const filtered = useMemo(() => {
    return menu.filter((dish) => {
      if (activeCategory !== 'All' && dish.category !== activeCategory) return false;
      if (query && !dish.name.toLowerCase().includes(query.toLowerCase()) && !dish.description.toLowerCase().includes(query.toLowerCase()))
        return false;
      if (activeDietary.length > 0 && !activeDietary.every((d) => dish.dietary.includes(d))) return false;
      return true;
    });
  }, [activeCategory, query, activeDietary]);

  const toggleDietary = (tag: string) => {
    setActiveDietary((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  return (
    <div className="pt-16 md:pt-20">
      <section className="paper-bg py-16 lg:py-24">
        <div className="container-bell">
          <div className="max-w-3xl">
            <p className="eyebrow">Restaurant & Tea Room</p>
            <h1 className="mt-4 font-serif text-hero font-medium text-navy">Our Menu</h1>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
              Familiar British favourites, fresh seafood, homemade cakes and a proper Dorset cream tea — served through the day in the heart of Lyme Regis.
            </p>
            <p className="mt-4 text-sm text-charcoal/60">{siteContent.featuredIntro}</p>
          </div>

          {/* Search */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" strokeWidth={1.5} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes..."
                aria-label="Search dishes"
                className="w-full rounded-full border border-navy/15 bg-cream-50 py-3 pl-11 pr-4 text-sm text-navy placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {dietaryFilters.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleDietary(tag)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                    activeDietary.includes(tag)
                      ? 'border-seaglass bg-seaglass/15 text-seaglass-600'
                      : 'border-navy/15 text-charcoal/60 hover:border-navy/30'
                  }`}
                  aria-pressed={activeDietary.includes(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Category filters */}
          <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === 'All' ? 'bg-navy text-cream' : 'bg-cream-50 text-navy/70 hover:bg-cream-100'
              }`}
            >
              All
            </button>
            {menuCategories.map((cat) => (
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
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((dish) => (
                  <MenuCard key={dish.id} dish={dish} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center text-charcoal/60"
              >
                <p>No dishes match your search. Try a different filter.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Allergen notice */}
          <div className="mt-16 flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-6">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
            <div>
              <h3 className="font-serif text-lg font-medium text-navy">Allergen notice</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{siteContent.allergenNotice}</p>
              <p className="mt-2 text-sm text-charcoal/60">
                We do not mark any dish as gluten-free unless confirmed directly by Bell Cliff.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
