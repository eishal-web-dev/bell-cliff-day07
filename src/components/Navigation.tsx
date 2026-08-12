import { Anchor } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { siteContent } from '@/data/siteContent';
import { Menu, X, Phone } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isHome = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-navy/95 backdrop-blur-md shadow-lg shadow-navy/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-bell flex h-16 items-center justify-between md:h-20" aria-label="Primary">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Bell Cliff home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors group-hover:border-gold">
              <Anchor className="h-4.5 w-4.5" strokeWidth={1.5} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-lg font-semibold tracking-wide text-cream">
                Bell Cliff
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/60">
                Lyme Regis
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {siteContent.nav.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? 'text-gold'
                        : 'text-cream/80 hover:text-cream'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={siteContent.phoneHref}
              className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-navy transition-all hover:bg-gold-500 hover:shadow-lg hover:shadow-gold/30 sm:inline-flex"
            >
              <Phone className="mr-1.5 h-4 w-4" strokeWidth={1.8} />
              Call to Reserve
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="touch-target flex items-center justify-center rounded-full text-cream lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile slide-out panel */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col navy-bg-texture shadow-2xl transition-transform duration-500 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-serif text-xl font-semibold text-cream">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="touch-target flex items-center justify-center rounded-full text-cream/80 hover:text-cream"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
          <ul className="flex flex-1 flex-col gap-1 px-4">
            {siteContent.nav.map((item, i) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  style={{ transitionDelay: `${mobileOpen ? i * 60 : 0}ms` }}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3.5 font-serif text-2xl transition-all duration-500 ${
                      mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                    } ${isActive ? 'bg-gold/15 text-gold' : 'text-cream hover:bg-cream/10'}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="p-6">
            <a
              href={siteContent.phoneHref}
              className="btn-gold w-full"
            >
              <Phone className="h-4 w-4" strokeWidth={1.8} />
              {siteContent.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
