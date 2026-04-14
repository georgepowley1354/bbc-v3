import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { FadeUp } from '@/components/FadeUp';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-haven-bg px-6">
      <div className="max-w-lg mx-auto text-center">
        <FadeUp>
          {/* Leaf icon accent */}
          <div className="flex items-center justify-center mb-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(125, 155, 118, 0.12)' }}
            >
              <Leaf size={28} className="text-haven-accent" aria-hidden="true" />
            </div>
          </div>

          {/* 404 label */}
          <p className="font-body font-medium text-[12px] uppercase tracking-[0.14em] text-haven-accent mb-5">
            404 — Page not found
          </p>

          {/* Heading */}
          <h1 className="font-display text-[2.25rem] md:text-[3rem] font-normal leading-[1.2] text-haven-text mb-6 text-balance">
            This page took the day off.
          </h1>

          {/* Body */}
          <p className="font-body font-light text-[1.0625rem] leading-[1.8] text-haven-text-muted mb-10 max-w-md mx-auto text-balance">
            Even Jane takes a break sometimes. The page you&rsquo;re looking for has moved,
            or maybe it never existed. Either way, you&rsquo;re in good hands.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-3.5 font-body font-semibold text-[16px] tracking-wide text-haven-text-inverse rounded bg-haven-accent-interactive hover:bg-haven-accent-hover transition-colors duration-200 cursor-pointer w-full sm:w-auto"
            >
              Book a session
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-body font-semibold text-[16px] text-haven-accent-interactive hover:text-haven-accent transition-colors duration-200 group cursor-pointer"
            >
              Back to home
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          {/* Subtle divider line */}
          <div className="mt-16 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-haven-border" />
            <p className="font-body font-light text-[13px] text-haven-text-muted italic">
              Haven Therapeutic Massage · Capital Region NY
            </p>
            <div className="w-12 h-px bg-haven-border" />
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
