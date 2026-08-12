import { MapPin, Utensils, Sun, Leaf } from 'lucide-react';
import { siteContent } from '@/data/siteContent';

const iconMap = { MapPin, Utensils, Sun, Leaf };

export default function InfoStrip() {
  return (
    <section className="navy-bg-texture text-cream">
      <div className="container-bell py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm sm:justify-between">
          {siteContent.infoStrip.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <li key={i} className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <span className="text-cream/85">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
