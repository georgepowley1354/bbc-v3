import type { Metadata } from 'next';
import Link from 'next/link';
import { Leaf, Flame, Heart, Moon, Users, Droplets } from 'lucide-react';
import { FadeUp } from '@/components/FadeUp';
import { ServiceCard } from '@/components/ServiceCard';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Swedish, Deep Tissue, Hot Stone, Prenatal, and Couples massage in Albany, Clifton Park, and Saratoga Springs NY. Jane Smith LMT, licensed since 2000. Book online.',
};

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: <Leaf size={20} className="text-haven-accent" aria-hidden="true" />,
    name: 'Swedish Massage',
    duration: '60 or 90 min',
    price: '$95 / $130',
    tagline: 'Releases surface tension. Resets the nervous system.',
    description:
      'Long, slow strokes that let your body remember what relaxed feels like. The right choice if you\'ve been carrying stress you haven\'t had time to put down.',
    benefits: [
      'Lowers cortisol and stress hormones',
      'Improves circulation throughout the body',
      'Relieves muscle tension without heavy pressure',
      'Better sleep, often that same night',
      'Calms an overactive nervous system',
    ],
    bestFor: 'Stress, general soreness, first-time clients',
  },
  {
    icon: <Flame size={20} className="text-haven-accent" aria-hidden="true" />,
    name: 'Deep Tissue',
    duration: '60 or 90 min',
    price: '$110 / $150',
    tagline: 'Gets into the layers underneath.',
    description:
      'Focused pressure on specific problem areas — the knots that have been there for months. Jane works slowly and checks in throughout. Not painful, but it goes somewhere.',
    benefits: [
      'Breaks up scar tissue and adhesions',
      'Reduces chronic muscle pain and stiffness',
      'Improves posture and range of motion',
      'Faster recovery from physical activity',
      'Relieves tension headaches that start in the neck',
    ],
    bestFor: 'Chronic pain, athletic recovery, persistent tension',
  },
  {
    icon: <Heart size={20} className="text-haven-accent" aria-hidden="true" />,
    name: 'Hot Stone',
    duration: '90 min',
    price: '$145',
    tagline: 'Warmth that reaches muscle, not just skin.',
    description:
      'Heated basalt stones placed along the spine and worked into tight areas. The heat does what would take hands twice as long — especially effective for people who carry tension deep in the back.',
    benefits: [
      'Penetrating warmth that loosens muscle faster',
      'Improved circulation throughout the body',
      'Relieves muscle spasms without heavy pressure',
      'Deep relaxation — good for people who run cold',
      'Especially effective for back tension in colder months',
    ],
    bestFor: 'Anyone who runs cold, chronic back tension, deep relaxation',
  },
  {
    icon: <Moon size={20} className="text-haven-accent" aria-hidden="true" />,
    name: 'Prenatal Massage',
    duration: '60 min',
    price: '$105',
    tagline: 'Safe, careful, and deeply effective.',
    description:
      'Adapted specifically for pregnancy. Side-lying positioning, gentle pressure, and attention to what your body needs week by week. Jane has worked with pregnant clients throughout her 25 years of practice.',
    benefits: [
      'Relieves lower back and hip pain',
      'Reduces leg cramps and swelling',
      'Better sleep during pregnancy',
      'Reduces anxiety in the third trimester',
      'Safe and appropriate throughout the second and third trimester',
    ],
    bestFor: 'Second and third trimester — first trimester with physician approval',
  },
  {
    icon: <Users size={20} className="text-haven-accent" aria-hidden="true" />,
    name: 'Couples Massage',
    duration: '60 or 90 min',
    price: '$190 / $260',
    tagline: 'Two tables, one room, same hour.',
    description:
      'Each person gets a full session with their own therapist at the same time, in the same space. A good anniversary gift. Good for any two people who want a shared afternoon off.',
    benefits: [
      'Full therapeutic session for each person',
      'Different services for each person — customizable',
      'Private room with two tables',
      'A meaningful gift that doesn\'t end up on a shelf',
      'Shared experience without compromise',
    ],
    bestFor: 'Partners, friends, family — any two people',
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <section className="bg-haven-surface pt-[96px] pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="font-body font-medium text-[12px] uppercase tracking-[0.14em] text-haven-accent mb-5">
              Therapeutic Massage · Albany NY
            </p>
          </FadeUp>
          <FadeUp delay={0.07}>
            <h1 className="font-display text-[2.5rem] md:text-[3.25rem] font-normal leading-[1.2] text-haven-text mb-6 text-balance">
              Find the right session.
            </h1>
          </FadeUp>
          <FadeUp delay={0.13}>
            <p className="font-body font-light text-[1.125rem] leading-[1.75] text-haven-text-muted max-w-lg mx-auto text-balance">
              Six services, one therapist. If you&rsquo;re not sure what fits,
              call Jane — she&rsquo;ll tell you in two minutes.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Services Grid ────────────────────────────────────────────── */}
      <section className="bg-haven-bg py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <FadeUp key={service.name} delay={i * 0.06}>
                <ServiceCard {...service} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CBD Add-On ───────────────────────────────────────────────── */}
      <section className="bg-haven-surface py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <div className="bg-haven-bg border border-haven-border rounded-xl p-7 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                {/* Icon + label */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(196, 137, 111, 0.12)' }}
                  >
                    <Droplets
                      size={22}
                      className="text-haven-secondary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-body font-medium text-[11px] uppercase tracking-[0.12em] text-haven-secondary mb-0.5">
                      Enhancement Add-On
                    </p>
                    <h2 className="font-display text-[1.375rem] font-semibold text-haven-text leading-tight">
                      CBD Oil Enhancement
                    </h2>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-haven-border self-stretch" aria-hidden="true" />

                {/* Details */}
                <div className="flex flex-col gap-3 flex-1">
                  <p className="font-body font-light text-[15px] leading-[1.75] text-haven-text-muted">
                    A targeted CBD-infused oil applied to areas of tension or inflammation.
                    The CBD works locally — reducing soreness and helping muscles release
                    more fully during the session. The effects carry on after you leave.
                  </p>
                  <p className="font-body font-light text-[14px] text-haven-text-muted">
                    Available with any service. Jane will ask which areas to focus on.
                  </p>
                </div>

                {/* Price */}
                <div className="flex-shrink-0 md:text-right">
                  <p className="font-display text-[1.75rem] font-normal text-haven-text">
                    +$25
                  </p>
                  <p className="font-body font-light text-[13px] text-haven-text-muted">
                    add to any service
                  </p>
                </div>
              </div>
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
          <strong className="font-semibold">Your first visit is 20% off</strong> any
          service.{' '}
          <Link
            href="/booking"
            className="underline underline-offset-2 hover:no-underline transition-all cursor-pointer"
          >
            Book now →
          </Link>
        </p>
      </div>

      {/* ── Booking CTA ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-haven-text">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-display text-[2rem] md:text-[2.75rem] font-normal text-haven-text-inverse mb-6 text-balance leading-[1.25]">
              Ready to book?
            </h2>
            <p className="font-body font-light text-[1.0625rem] leading-[1.75] mb-4 max-w-md mx-auto" style={{ color: 'rgba(250, 248, 245, 0.6)' }}>
              Takes about two minutes online. Jane answers her own phone if
              you&rsquo;d rather call.
            </p>
            <p className="font-body font-normal text-[15px] mb-10" style={{ color: 'rgba(250, 248, 245, 0.4)' }}>
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
                className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-[17px] tracking-wide rounded transition-all duration-200 cursor-pointer w-full sm:w-auto"
                style={{
                  border: '1px solid rgba(250, 248, 245, 0.25)',
                  color: 'rgba(250, 248, 245, 0.75)',
                }}
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
