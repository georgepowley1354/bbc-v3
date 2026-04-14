'use client';

import { useState, useEffect, useRef } from 'react';
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
      // localStorage may be unavailable (e.g. private browsing on some browsers)
      // Silently skip — no notice shown
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Ignore storage errors — just hide the notice
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
        // Sit above most content (z-30) but below the mobile sticky Book Now button (z-40)
        zIndex: 30,
      }}
      className="fixed bottom-0 left-0 right-0 bg-haven-surface border-t border-haven-border pointer-events-auto"
    >
      {/* Extra bottom padding on mobile to sit above the sticky button */}
      <div
        className="max-w-6xl mx-auto px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-4
                   flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6"
      >
        {/* Copy */}
        <p className="font-body font-light text-[13px] sm:text-[14px] leading-[1.65] text-haven-text-muted flex-1">
          We use cookies to make your visit better. Nothing sold, nothing tracked beyond what
          helps Haven run.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            href="/contact"
            className="font-body font-medium text-[13px] text-haven-text-muted underline underline-offset-2 hover:text-haven-text transition-colors duration-150 cursor-pointer"
          >
            About our privacy practices
          </Link>

          <button
            ref={dismissRef}
            type="button"
            onClick={dismiss}
            className="inline-flex items-center justify-center px-5 py-2 font-body font-semibold text-[13px] tracking-wide text-haven-text-inverse bg-haven-accent-interactive hover:bg-haven-accent-hover rounded transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-haven-accent focus-visible:ring-offset-2 focus-visible:ring-offset-haven-surface"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
