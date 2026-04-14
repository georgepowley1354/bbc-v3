import Link from 'next/link';
import { Star, Leaf, Heart, Flame } from 'lucide-react';
import { ScrollGalleryHero } from '~/my-project/haven-components';
import { FadeUp } from '@/components/FadeUp';

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Leaf,
    name: 'Swedish Massage',
    duration: '60 or 90 min',
    price: 'From $95',
    description:
      'Releases surface tension and resets your nervous system. Long, slow strokes that let your body remember what relaxed feels like.',
    bestFor: 'Stress, general soreness, first-time clients',
  },
  {
    icon: Flame,
    name: 'Deep Tissue',
    duration: '60 or 90 min',
    price: 'From $110',
    description:
      'Gets into the layers underneath. If you have knots that have been there for months, this is where they go.',
    bestFor: 'Chronic pain, athletic recovery, persistent tension',
  },
  {
    icon: Heart,
    name: 'Hot Stone',
    duration: '90 min',
    price: '$145',
    description:
      'Warmth that reaches muscle, not just skin. The stones do the work that takes hands twice as long.',
    bestFor: 'Anyone who runs cold or carries stress in their back',
  },
];

const testimonials = [
  {
    quote:
      'My neck had been locked up for two weeks. One session with Jane and I could actually turn my head.',
    name: 'Sarah M.',
    service: 'Deep Tissue Massage',
  },
  {
    quote:
      'Three years in and she still remembers exactly what bothers me before I say a word.',
    name: 'David K.',
    service: 'Swedish Massage',
  },
  {
    quote:
      'Careful, safe, and I actually slept through the night for the first time in months.',
    name: 'Rachel T.',
    service: 'Prenatal Massage',
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function Stars() {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className="fill-haven-secondary text-haven-secondary"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── Hero Gallery ─────────────────────────────────────────────── */}
      <ScrollGalleryHero />

      {/* ── Tagline ──────────────────────────────────────────────────── */}
      <section className="bg-haven-bg py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="font-body font-medium text-[12px] uppercase tracking-[0.14em] text-haven-accent mb-5">
              Therapeutic Massage · Capital Region NY
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-[2.5rem] md:text-[3.25rem] font-normal leading-[1.2] text-haven-text mb-7 text-balance">
              Your peace starts here.
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p className="font-body font-light text-[1.125rem] leading-[1.75] text-haven-text-muted mb-10 max-w-xl mx-auto text-balance">
              Jane Smith has practiced massage therapy in the Capital Region for 25 years.
              She works with one client at a time, takes no shortcuts, and remembers what
              worked for you last time.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-8 py-3.5 font-body font-semibold text-[16px] tracking-wide text-haven-text-inverse rounded bg-haven-accent-interactive hover:bg-haven-accent-hover transition-colors duration-200 cursor-pointer"
              >
                Book your first session
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 font-body font-semibold text-[16px] text-haven-accent-interactive hover:text-haven-accent transition-colors duration-200 group cursor-pointer"
              >
                See all services
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Services Preview ─────────────────────────────────────────── */}
      <section className="bg-haven-surface py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="font-body font-medium text-[12px] uppercase tracking-[0.14em] text-haven-accent mb-4">
                Services
              </p>
              <h2 className="font-display text-[2rem] md:text-[2.5rem] font-normal text-haven-text text-balance">
                Find the right fit.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <FadeUp key={service.name} delay={i * 0.08}>
                  <div className="bg-haven-bg border border-haven-border rounded-xl p-7 flex flex-col gap-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-250 h-full">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(125, 155, 118, 0.12)' }}
                    >
                      <Icon size={20} className="text-haven-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-[1.25rem] font-semibold text-haven-text mb-1">
                        {service.name}
                      </h3>
                      <p className="font-body font-medium text-[13px] text-haven-text-muted tracking-wide">
                        {service.duration} · {service.price}
                      </p>
                    </div>
                    <p className="font-body font-light text-[15px] leading-[1.7] text-haven-text-muted flex-1">
                      {service.description}
                    </p>
                    <p className="font-body font-medium text-[13px] text-haven-accent-interactive">
                      Best for:{' '}
                      <span className="font-light text-haven-text-muted">{service.bestFor}</span>
                    </p>
                    <Link
                      href="/booking"
                      className="mt-1 inline-flex items-center justify-center w-full py-3 font-body font-semibold text-[14px] tracking-wide border border-haven-accent text-haven-accent-interactive rounded transition-all duration-200 hover:bg-haven-surface hover:border-haven-accent-interactive cursor-pointer"
                    >
                      Book Now
                    </Link>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.24}>
            <div className="text-center mt-10">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 font-body font-semibold text-[15px] text-haven-accent-interactive hover:text-haven-accent transition-colors duration-200 group cursor-pointer"
              >
                See all 6 services including Prenatal and Couples
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── New Client Offer Banner ───────────────────────────────────── */}
      <div
        className="py-4 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #7D9B76 0%, #4E6B48 100%)' }}
      >
        <p className="font-body text-[15px] text-haven-text-inverse">
          New to Haven?{' '}
          <strong className="font-semibold">Your first visit is 20% off</strong> any service.{' '}
          <Link
            href="/booking"
            className="underline underline-offset-2 hover:no-underline transition-all cursor-pointer"
          >
            Book now →
          </Link>
        </p>
      </div>

      {/* ── Jane Intro ───────────────────────────────────────────────── */}
      <section className="bg-haven-bg py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Photo placeholder */}
            <FadeUp>
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto md:mx-0"
                style={{ backgroundColor: '#EDE6DB' }}
                aria-label="Jane Smith LMT — professional headshot placeholder"
                role="img"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-25">
                  <div className="w-20 h-20 rounded-full bg-haven-accent" />
                  <div className="w-32 h-2 rounded bg-haven-accent" />
                  <div className="w-24 h-2 rounded bg-haven-accent" />
                </div>
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(196, 137, 111, 0.04)' }}
                />
              </div>
            </FadeUp>

            {/* Text */}
            <FadeUp delay={0.1}>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="font-body font-medium text-[12px] uppercase tracking-[0.14em] text-haven-accent mb-4">
                    About Jane
                  </p>
                  <h2 className="font-display text-[2rem] md:text-[2.5rem] font-normal text-haven-text leading-[1.25] text-balance mb-6">
                    You're booking a person, not a service.
                  </h2>
                </div>
                <p className="font-body font-light text-[1.0625rem] leading-[1.8] text-haven-text-muted">
                  Jane Smith got her license in 2000. She&rsquo;s been in the Capital Region
                  ever since — working with clients through injuries, pregnancies, stressful
                  seasons, and ordinary weeks that needed a reset.
                </p>
                <p className="font-body font-light text-[1.0625rem] leading-[1.8] text-haven-text-muted">
                  She answers her own phone. She&rsquo;ll remember your name. When you book
                  with Haven, you&rsquo;re booking Jane.
                </p>
                <div className="flex items-center gap-3 py-4 border-t border-haven-border-subtle">
                  <div className="w-10 h-px bg-haven-accent" />
                  <p className="font-body font-light text-[14px] text-haven-text-muted italic">
                    Licensed Massage Therapist since 2000
                  </p>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 font-body font-semibold text-[15px] text-haven-accent-interactive hover:text-haven-accent transition-colors duration-200 group cursor-pointer w-fit"
                >
                  Learn more about Jane
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="bg-haven-surface py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="font-body font-medium text-[12px] uppercase tracking-[0.14em] text-haven-accent mb-4">
                What clients say
              </p>
              <h2 className="font-display text-[2rem] md:text-[2.5rem] font-normal text-haven-text text-balance">
                Real results, real people.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.08}>
                <div className="bg-haven-bg border border-haven-border-subtle rounded-xl p-8 flex flex-col gap-5 h-full">
                  <Stars />
                  <blockquote className="font-display font-normal italic text-[1.0625rem] leading-[1.65] text-haven-text flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="border-t border-haven-border-subtle pt-4">
                    <p className="font-body font-semibold text-[13px] uppercase tracking-[0.06em] text-haven-text">
                      {t.name}
                    </p>
                    <p className="font-body font-light text-[13px] text-haven-text-muted mt-0.5">
                      {t.service}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Availability Notice ───────────────────────────────────────── */}
      <div className="bg-haven-bg py-5 border-y border-haven-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-haven-accent flex-shrink-0" />
            <p className="font-body font-light text-[14px] text-haven-text-muted">
              Now accepting new clients in{' '}
              <span className="text-haven-text font-normal">Albany</span>,{' '}
              <span className="text-haven-text font-normal">Clifton Park</span>, and{' '}
              <span className="text-haven-text font-normal">Saratoga Springs</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Gift Certificate CTA ─────────────────────────────────────── */}
      <section className="bg-haven-bg py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="font-body font-medium text-[12px] uppercase tracking-[0.14em] text-haven-accent mb-5">
              Gift Certificates
            </p>
            <h2 className="font-display text-[2rem] md:text-[2.5rem] font-normal text-haven-text mb-6 text-balance">
              Give the gift of peace.
            </h2>
            <p className="font-body font-light text-[1.0625rem] leading-[1.75] text-haven-text-muted mb-10 max-w-lg mx-auto text-balance">
              An hour away from the phone, the to-do list, and the noise.
              Available for any service, any amount.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 font-body font-semibold text-[16px] tracking-wide border border-haven-accent text-haven-accent-interactive rounded cursor-pointer transition-all duration-200 hover:bg-haven-surface hover:border-haven-accent-interactive"
            >
              Get a gift certificate
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── Booking CTA ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-haven-text">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-display text-[2rem] md:text-[2.75rem] font-normal text-haven-text-inverse mb-6 text-balance leading-[1.25]">
              Ready to feel better?
            </h2>
            <p className="font-body font-light text-[1.0625rem] leading-[1.75] text-haven-text-inverse/60 mb-4 max-w-md mx-auto">
              Takes about two minutes to book. Jane answers her own phone if you&rsquo;d
              rather call.
            </p>
            <p className="font-body font-normal text-[15px] text-haven-text-inverse/40 mb-10">
              First visit is 20% off.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-10 py-4 font-body font-semibold text-[17px] tracking-wide text-haven-text-inverse rounded bg-haven-accent-interactive hover:bg-haven-accent-hover transition-colors duration-200 cursor-pointer w-full sm:w-auto"
              >
                Book your session
              </Link>
              <a
                href="tel:+15185550174"
                className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-[17px] tracking-wide rounded border border-white/25 text-haven-text-inverse/75 hover:border-white/50 hover:text-haven-text-inverse transition-all duration-200 cursor-pointer w-full sm:w-auto"
              >
                (518) 555-0174
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Bottom padding for mobile sticky button */}
      <div className="h-14 md:hidden" aria-hidden="true" />
    </>
  );
}
