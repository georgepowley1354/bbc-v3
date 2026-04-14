import type { Metadata } from 'next';
import FaqAccordion from '@/components/FaqAccordion';
import { FadeUp } from '@/components/FadeUp';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Common questions about booking a massage with Jane Smith LMT — what to expect, what to wear, cancellation policy, prenatal safety, and more.',
  openGraph: {
    title: 'FAQ | Haven Therapeutic Massage',
    description:
      'Common questions about booking with Jane Smith LMT — what to expect, pricing, cancellation, and more.',
  },
  twitter: { card: 'summary_large_image' },
};

export default function FaqPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-haven-surface pt-[96px] pb-16">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <p className="font-body text-[11px] uppercase tracking-[0.18em] text-haven-text-muted mb-4">
              FAQ
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-haven-text leading-tight mb-4">
              Questions Jane hears a lot.
            </h1>
            <p className="font-body font-light text-[16px] text-haven-text-muted leading-relaxed">
              If something's not covered here, just reach out — she's happy to answer before you book.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Accordion */}
      <section className="max-w-2xl mx-auto py-16 px-6 lg:px-8">
        <FadeUp delay={0.1}>
          <FaqAccordion />
        </FadeUp>
      </section>

      {/* Bottom CTA */}
      <section className="bg-haven-surface py-16">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="font-body font-medium text-[17px] text-haven-text mb-2">
              Still have a question?
            </p>
            <p className="font-body font-light text-[15px] text-haven-text-muted mb-8">
              Call or text Jane directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+15185550174"
                className="inline-flex items-center justify-center font-body font-medium text-[15px] text-haven-accent underline underline-offset-4 decoration-haven-accent/40 hover:text-haven-secondary hover:decoration-haven-secondary/40 transition-colors duration-200 min-h-[44px] px-2"
              >
                (518) 555-0174
              </a>
              <span className="hidden sm:block text-haven-border" aria-hidden="true">
                |
              </span>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-haven-accent hover:bg-haven-accent-interactive text-haven-text-inverse font-body font-medium text-[14px] tracking-wide px-8 py-3 transition-colors duration-200 min-h-[44px]"
              >
                Book Now
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
