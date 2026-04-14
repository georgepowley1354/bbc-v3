import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeUp } from '@/components/FadeUp';

export const metadata: Metadata = {
  title: 'About Jane',
  description:
    'Jane Smith LMT — licensed massage therapist in the Capital Region NY since 2000. One therapist, one client at a time. Learn about Jane\'s approach, certifications, and what to expect on your first visit.',
};

// ─── Data ────────────────────────────────────────────────────────────────────

const firstVisitSteps = [
  {
    number: '01',
    heading: 'A brief intake form',
    body: 'When you arrive, you\'ll fill out a short health history — about five minutes. It helps Jane understand what you\'re dealing with and what to avoid.',
  },
  {
    number: '02',
    heading: 'A short conversation',
    body: 'Before the session starts, Jane will take a few minutes to talk through what you need. She asks specific questions. She listens to the answers.',
  },
  {
    number: '03',
    heading: 'Your full session',
    body: 'Sixty or ninety minutes, depending on what you booked. You\'ll have privacy to get settled before Jane begins, and time at the end before she comes back in.',
  },
  {
    number: '04',
    heading: 'No rushing at the end',
    body: 'After the session, Jane will give you a minute. When she checks in, she\'ll ask how you felt — and if it\'s useful, she\'ll make a suggestion for next time.',
  },
];

const credentials = [
  'New York State Licensed Massage Therapist (LMT)',
  'Licensed since 2000 — 25 years in practice',
  'Certified in Prenatal Massage Therapy',
  'Certified in Hot Stone Massage Therapy',
  'Member, American Massage Therapy Association (AMTA)',
  'Annual continuing education — updated each year',
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <section className="bg-haven-surface pt-[96px] pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="font-body font-medium text-[12px] uppercase tracking-[0.14em] text-haven-accent mb-5">
              Jane Smith, LMT
            </p>
          </FadeUp>
          <FadeUp delay={0.07}>
            <h1 className="font-display text-[2.5rem] md:text-[3.25rem] font-normal leading-[1.2] text-haven-text text-balance">
              You&rsquo;re booking a person,<br className="hidden md:inline" /> not a service.
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* ── Jane's Story ─────────────────────────────────────────────── */}
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
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-20">
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

            {/* Story text */}
            <FadeUp delay={0.1}>
              <div className="flex flex-col gap-6">
                <p className="font-body font-light text-[1.0625rem] leading-[1.85] text-haven-text-muted">
                  Jane got her license in 2000 and has been practicing in the Capital Region
                  ever since. She works out of a quiet studio in Albany — one therapist, one
                  client at a time, no front desk between you and a conversation.
                </p>
                <p className="font-body font-light text-[1.0625rem] leading-[1.85] text-haven-text-muted">
                  In 25 years she&rsquo;s worked with people through injuries, pregnancies,
                  stressful seasons, and ordinary weeks that just needed a reset. She
                  remembers what worked for you last time. She&rsquo;ll ask what&rsquo;s
                  changed since then.
                </p>
                <p className="font-body font-light text-[1.0625rem] leading-[1.85] text-haven-text-muted">
                  When you book with Haven, you talk to Jane. When you arrive, Jane is
                  there. That&rsquo;s the whole thing.
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-haven-border-subtle">
                  <div className="w-10 h-px bg-haven-accent flex-shrink-0" />
                  <p className="font-body font-light text-[14px] text-haven-text-muted italic">
                    Licensed Massage Therapist since 2000 · Capital Region NY
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Philosophy ───────────────────────────────────────────────── */}
      <section className="bg-haven-surface py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="font-body font-medium text-[12px] uppercase tracking-[0.14em] text-haven-accent mb-8">
              Jane&rsquo;s Approach
            </p>
            <blockquote className="font-display text-[1.375rem] md:text-[1.625rem] font-normal italic text-haven-text leading-[1.55] text-balance mb-8">
              &ldquo;Massage done well isn&rsquo;t a luxury — it&rsquo;s maintenance.
              The same way you&rsquo;d see a dentist, you come in when something needs
              attention. I take that seriously whether you&rsquo;re in real pain or just
              haven&rsquo;t slept well in two weeks.&rdquo;
            </blockquote>
            <p className="font-body font-medium text-[14px] text-haven-text-muted">
              — Jane Smith, LMT
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── What to Expect ───────────────────────────────────────────── */}
      <section className="bg-haven-bg py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <div className="mb-14">
              <p className="font-body font-medium text-[12px] uppercase tracking-[0.14em] text-haven-accent mb-4">
                Your first visit
              </p>
              <h2 className="font-display text-[2rem] md:text-[2.5rem] font-normal text-haven-text text-balance">
                Here&rsquo;s what happens.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {firstVisitSteps.map((step, i) => (
              <FadeUp key={step.number} delay={i * 0.07}>
                <div className="flex gap-6 items-start">
                  <span
                    className="font-display text-[2rem] font-normal leading-none flex-shrink-0 mt-0.5"
                    style={{ color: 'rgba(125, 155, 118, 0.35)' }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.125rem] font-semibold text-haven-text mb-2">
                      {step.heading}
                    </h3>
                    <p className="font-body font-light text-[15px] leading-[1.75] text-haven-text-muted">
                      {step.body}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials ──────────────────────────────────────────────── */}
      <section className="bg-haven-surface py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <FadeUp>
              <div>
                <p className="font-body font-medium text-[12px] uppercase tracking-[0.14em] text-haven-accent mb-4">
                  Training &amp; Credentials
                </p>
                <h2 className="font-display text-[2rem] font-normal text-haven-text text-balance leading-[1.3]">
                  The background behind the work.
                </h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <ul className="flex flex-col gap-4" aria-label="Jane Smith credentials">
                {credentials.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-haven-accent flex-shrink-0 mt-[7px]"
                      aria-hidden="true"
                    />
                    <span className="font-body font-light text-[15px] leading-[1.65] text-haven-text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Service Areas ────────────────────────────────────────────── */}
      <div className="bg-haven-bg py-5 border-y border-haven-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-haven-accent flex-shrink-0" />
            <p className="font-body font-light text-[14px] text-haven-text-muted">
              Serving clients in{' '}
              <span className="text-haven-text font-normal">Albany</span>,{' '}
              <span className="text-haven-text font-normal">Clifton Park</span>, and{' '}
              <span className="text-haven-text font-normal">Saratoga Springs</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Booking CTA ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-haven-text">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-display text-[2rem] md:text-[2.75rem] font-normal text-haven-text-inverse mb-6 text-balance leading-[1.25]">
              Ready to come in?
            </h2>
            <p className="font-body font-light text-[1.0625rem] leading-[1.75] mb-4 max-w-md mx-auto" style={{ color: 'rgba(250, 248, 245, 0.6)' }}>
              Book online in two minutes, or call Jane directly. First visit is
              20% off any service.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
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
