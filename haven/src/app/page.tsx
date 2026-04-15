import Link from 'next/link';
import { Star } from 'lucide-react';
import { ScrollGalleryHero } from '@/components/ScrollGalleryHero';
import { HavenStudioStory } from '@/components/HavenStudioStory';
import { HavenSignatureServices } from '@/components/HavenSignatureServices';
import { HavenClosingInvite } from '@/components/HavenClosingInvite';
import { FadeUp } from '@/components/FadeUp';

// ─── Data ────────────────────────────────────────────────────────────────────

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
      {/* ── Hero Gallery (owns the viewport, carries IntroCopy) ───── */}
      <ScrollGalleryHero />

      {/* ── New Client Offer Banner ───────────────────────────────── */}
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

      {/* ── Studio Story ─────────────────────────────────────────── */}
      <HavenStudioStory />

      {/* ── Signature Services ───────────────────────────────────── */}
      <HavenSignatureServices />

      {/* ── Testimonials ─────────────────────────────────────────── */}
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

      {/* ── Availability Notice ───────────────────────────────────── */}
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

      {/* ── Closing Invite ────────────────────────────────────────── */}
      <HavenClosingInvite />

      {/* Bottom padding for mobile sticky button */}
      <div className="h-14 md:hidden" aria-hidden="true" />
    </>
  );
}
