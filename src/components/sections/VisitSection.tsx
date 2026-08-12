import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';
import { siteContent } from '@/data/siteContent';

export default function VisitSection() {
  return (
    <section className="paper-bg py-20 lg:py-28">
      <div className="container-bell">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow">Find us</p>
            <h2 className="mt-3 section-heading">Visit Bell Cliff</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal/70">
              You will find us in the centre of Lyme Regis, a short walk from the seafront and the Cobb.
            </p>

            <address className="mt-8 space-y-4 not-italic">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <div className="text-charcoal/80">
                  <p className="font-medium">The Bell Cliff Restaurant</p>
                  <p>{siteContent.address.line1}</p>
                  <p>{siteContent.address.line2}, {siteContent.address.line3}</p>
                  <p>{siteContent.address.postcode}</p>
                  <p>{siteContent.address.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <a href={siteContent.phoneHref} className="text-charcoal/80 transition-colors hover:text-navy">
                  {siteContent.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <p className="text-sm text-charcoal/70">{siteContent.hoursNotice}</p>
              </div>
            </address>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={siteContent.phoneHref} className="btn-gold">
                <Phone className="h-4 w-4" strokeWidth={1.8} />
                Call to Reserve
              </a>
              <a
                href={siteContent.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <MapPin className="h-4 w-4" strokeWidth={1.8} />
                Get Directions
              </a>
            </div>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-3xl shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <iframe
              title="Map showing The Bell Cliff Restaurant, Lyme Regis"
              src={siteContent.mapsEmbedUrl}
              className="h-[400px] w-full border-0 lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
