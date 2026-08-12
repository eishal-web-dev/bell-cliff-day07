import { Link } from 'react-router-dom';
import { Anchor, Phone, MapPin, Star } from 'lucide-react';
import { siteContent } from '@/data/siteContent';

export default function Footer() {
  return (
    <footer className="navy-bg-texture relative overflow-hidden text-cream">
      <div className="container-bell py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 text-gold">
                <Anchor className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-serif text-xl font-semibold">The Bell Cliff</p>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/60">Restaurant & Tea Room</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              Traditional English dining in the heart of Lyme Regis, by the Jurassic Coast.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteContent.nav.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-cream/70 transition-colors hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Visit</h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-cream/70">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                <span>
                  {siteContent.address.line1}
                  <br />
                  {siteContent.address.line2}, {siteContent.address.line3}
                  <br />
                  {siteContent.address.postcode}
                  <br />
                  {siteContent.address.country}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                <a href={siteContent.phoneHref} className="transition-colors hover:text-cream">
                  {siteContent.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Star className="h-4 w-4 shrink-0 fill-gold text-gold" strokeWidth={1.5} />
                <span>{siteContent.rating.label}</span>
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Today</h3>
            <p className="mt-4 text-sm text-cream/70">{siteContent.hoursNotice}</p>
            <a href={siteContent.phoneHref} className="btn-gold mt-5 w-full">
              <Phone className="h-4 w-4" strokeWidth={1.8} />
              Call to Reserve
            </a>
            <a
              href={siteContent.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-3 w-full border-cream/30 text-cream hover:bg-cream hover:text-navy"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/15 pt-8">
          <p className="text-xs leading-relaxed text-cream/50">
            {siteContent.imageUseNote}
          </p>
          <p className="mt-4 text-xs text-cream/50">
            &copy; {new Date().getFullYear()} The Bell Cliff Restaurant. A concept website. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
