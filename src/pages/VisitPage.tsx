import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Accessibility } from 'lucide-react';
import { siteContent } from '@/data/siteContent';
import { useSEO } from '@/lib/useSEO';

export default function VisitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', date: '', party: '', message: '', accessibility: false });
  useSEO({
    title: 'Visit · The Bell Cliff Restaurant · Lyme Regis',
    description:
      'Visit The Bell Cliff Restaurant at 5 Broad Street, Lyme Regis, Dorset, DT7 3QD. Call +44 1297 442459, get directions, or send a table enquiry.',
    path: '/visit',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-16 md:pt-20">
      <section className="paper-bg py-16 lg:py-24">
        <div className="container-bell">
          <div className="max-w-3xl">
            <p className="eyebrow">Find us</p>
            <h1 className="mt-4 font-serif text-hero font-medium text-navy">Visit Bell Cliff</h1>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
              You will find us in the centre of Lyme Regis, a short walk from the seafront and the historic Cobb.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <address className="space-y-5 not-italic">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <div className="text-charcoal/80">
                    <p className="font-medium text-navy">The Bell Cliff Restaurant</p>
                    <p>{siteContent.address.line1}</p>
                    <p>{siteContent.address.line2}, {siteContent.address.line3}</p>
                    <p>{siteContent.address.postcode}</p>
                    <p>{siteContent.address.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <a href={siteContent.phoneHref} className="text-lg text-navy transition-colors hover:text-gold">
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

              <div className="mt-8 overflow-hidden rounded-3xl shadow-xl">
                <iframe
                  title="Map showing The Bell Cliff Restaurant, Lyme Regis"
                  src={siteContent.mapsEmbedUrl}
                  className="h-[320px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Table enquiry form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="rounded-3xl bg-cream-50 p-6 shadow-lg sm:p-8">
                <h2 className="font-serif text-2xl font-medium text-navy">Table enquiry</h2>
                <p className="mt-2 text-sm text-charcoal/60">
                  Send us your details and we will be in touch. This form does not confirm a booking.
                </p>

                {submitted ? (
                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-seaglass/40 bg-seaglass/10 p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-seaglass-600" strokeWidth={1.5} />
                    <div>
                      <p className="font-medium text-navy">Thank you for your enquiry.</p>
                      <p className="mt-1 text-sm text-charcoal/70">
                        {siteContent.reservationNotice}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl border border-navy/15 bg-cream px-4 py-2.5 text-sm text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full rounded-xl border border-navy/15 bg-cream px-4 py-2.5 text-sm text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="party" className="mb-1.5 block text-sm font-medium text-navy">
                          Party size
                        </label>
                        <input
                          id="party"
                          type="number"
                          min={1}
                          required
                          value={form.party}
                          onChange={(e) => setForm({ ...form, party: e.target.value })}
                          className="w-full rounded-xl border border-navy/15 bg-cream px-4 py-2.5 text-sm text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-navy">
                        Preferred date
                      </label>
                      <input
                        id="date"
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full rounded-xl border border-navy/15 bg-cream px-4 py-2.5 text-sm text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
                        Message (optional)
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-xl border border-navy/15 bg-cream px-4 py-2.5 text-sm text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <label className="flex items-start gap-3 rounded-xl border border-navy/10 bg-cream p-3">
                      <input
                        id="accessibility"
                        type="checkbox"
                        checked={form.accessibility}
                        onChange={(e) => setForm({ ...form, accessibility: e.target.checked })}
                        className="mt-0.5 h-4 w-4 rounded border-navy/30 text-gold focus:ring-gold"
                      />
                      <span className="flex items-center gap-1.5 text-sm text-charcoal/70">
                        <Accessibility className="h-4 w-4 text-gold" strokeWidth={1.5} />
                        I would like to discuss accessibility or dietary requirements.
                      </span>
                    </label>

                    <button type="submit" className="btn-primary w-full">
                      <Send className="h-4 w-4" strokeWidth={1.8} />
                      Send enquiry
                    </button>
                  </form>
                )}

                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-4">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                  <p className="text-xs leading-relaxed text-charcoal/70">
                    {siteContent.reservationNotice}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
