import { Phone, Menu as MenuIcon, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteContent } from '@/data/siteContent';

export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="navy-bg-texture border-t border-cream/10 shadow-[0_-8px_24px_-8px_rgba(16,44,60,0.3)]">
        <div className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
          <a
            href={siteContent.phoneHref}
            className="touch-target flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-cream/90 transition-colors active:bg-cream/10"
            aria-label="Call Bell Cliff"
          >
            <Phone className="h-5 w-5 text-gold" strokeWidth={1.6} />
            <span className="text-[0.7rem] font-medium">Call</span>
          </a>
          <Link
            to="/menu"
            className="touch-target flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-cream/90 transition-colors active:bg-cream/10"
            aria-label="View menu"
          >
            <MenuIcon className="h-5 w-5 text-gold" strokeWidth={1.6} />
            <span className="text-[0.7rem] font-medium">Menu</span>
          </Link>
          <a
            href={siteContent.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-cream/90 transition-colors active:bg-cream/10"
            aria-label="Get directions"
          >
            <MapPin className="h-5 w-5 text-gold" strokeWidth={1.6} />
            <span className="text-[0.7rem] font-medium">Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
