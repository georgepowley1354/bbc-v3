'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'haven-cookie-dismissed';

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const dismissRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage may be unavailable in some browsing contexts.
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Ignore storage issues and just hide the notice.
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      aria-live="polite"
      aria-hidden={!visible}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 30,
      }}
      className="pointer-events-none fixed inset-x-0 bottom-3 md:bottom-4 md:right-5 md:left-auto"
    >
      <div className="pointer-events-auto mx-3 flex flex-col items-start gap-3 rounded-[20px] border border-[rgba(228,221,212,0.8)] bg-[rgba(250,248,245,0.9)] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_16px_36px_rgba(71,57,47,0.08)] backdrop-blur md:mx-0 md:w-[min(28rem,calc(100vw-2.5rem))] md:flex-row md:items-center md:px-4 md:py-3">
        <p className="max-w-[22rem] flex-1 font-body text-[11px] font-light leading-[1.5] text-haven-text-muted md:text-[11.5px]">
          Cookies keep booking and site basics working smoothly. Nothing sold, nothing invasive.
        </p>

        <div className="flex flex-shrink-0 items-center gap-3">
          <Link
            href="/contact"
            className="cursor-pointer font-body text-[11.5px] font-medium text-haven-text-muted underline underline-offset-2 transition-colors duration-150 hover:text-haven-text md:text-[12px]"
          >
            Privacy
          </Link>

          <button
            ref={dismissRef}
            type="button"
            onClick={dismiss}
            className="inline-flex items-center justify-center rounded-full bg-haven-accent-interactive px-3.5 py-2 font-body text-[11.5px] font-semibold tracking-wide text-haven-text-inverse transition-colors duration-150 hover:bg-haven-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-accent focus-visible:ring-offset-2 focus-visible:ring-offset-haven-surface"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
