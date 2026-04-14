import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeUp } from '@/components/FadeUp';

export const metadata: Metadata = {
  title: 'Message Sent',
  description: 'Your message has been received. Jane will be in touch shortly.',
  robots: { index: false, follow: false },
};

export default function ContactSuccessPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-haven-bg px-6 py-24">
      <FadeUp>
        <div className="max-w-md text-center">
          <p className="font-body text-[13px] uppercase tracking-[0.14em] text-haven-accent font-semibold mb-4">
            Message received
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-haven-text mb-6">
            Thank you.
          </h1>
          <p className="font-body font-light text-[16px] leading-relaxed text-haven-text-muted mb-10">
            Jane personally reads every message and will get back to you within one business day.
            If you need to reach her sooner, call or text at{' '}
            <a
              href="tel:+15185550174"
              className="text-haven-text hover:text-haven-accent transition-colors underline underline-offset-2"
            >
              (518) 555-0174
            </a>
            .
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-haven-accent-interactive hover:bg-haven-accent-hover text-haven-text-inverse font-body font-medium text-[15px] tracking-wide rounded transition-colors duration-200"
          >
            Book a session
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
