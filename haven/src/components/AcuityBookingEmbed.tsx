'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';

import styles from './AcuityBookingEmbed.module.css';

export type AcuityBookingEmbedProps = {
  acuityUrl: string;
  className?: string;
};

const DEFAULT_HEIGHT = 600;
const LOAD_TIMEOUT_MS = 10000;

function getMessageHeight(data: unknown): number | null {
  if (typeof data === 'number' && data > 0) return data;

  if (!data || typeof data !== 'object') return null;

  const candidate = data as Record<string, unknown>;
  const possibleHeights = [
    candidate.height,
    candidate.frameHeight,
    candidate.acuityHeight,
    candidate.value,
  ];

  for (const value of possibleHeights) {
    if (typeof value === 'number' && value > 0) return value;
    if (typeof value === 'string') {
      const parsed = Number.parseInt(value, 10);
      if (!Number.isNaN(parsed) && parsed > 0) return parsed;
    }
  }

  return null;
}

export function AcuityBookingEmbed({
  acuityUrl,
  className,
}: AcuityBookingEmbedProps) {
  const iframeId = useId();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeHeight, setIframeHeight] = useState(DEFAULT_HEIGHT);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const normalizedUrl = useMemo(() => {
    try {
      const url = new URL(acuityUrl);
      url.searchParams.set('embed', 'true');
      return url.toString();
    } catch {
      return acuityUrl;
    }
  }, [acuityUrl]);

  useEffect(() => {
    setLoaded(false);
    setTimedOut(false);
    setIframeHeight(DEFAULT_HEIGHT);
  }, [normalizedUrl]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setTimedOut((currentTimedOut) => {
        if (!loaded && !currentTimedOut) {
          return true;
        }

        return currentTimedOut;
      });
    }, LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [loaded, normalizedUrl]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!event.origin.includes('acuityscheduling.com')) return;

      const nextHeight = getMessageHeight(event.data);
      if (!nextHeight) return;

      setIframeHeight(Math.max(DEFAULT_HEIGHT, nextHeight));
      setLoaded(true);
      setTimedOut(false);
    };

    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    iframeRef.current?.contentWindow?.postMessage(
      {
        source: 'haven-therapeutic-massage',
        type: 'HAVEN_ACUITY_THEME',
        theme: {
          background: '#FAF8F5',
          buttonBackground: '#7D9B76',
          buttonHoverBackground: '#6B8A65',
          buttonText: '#FFFFFF',
          buttonRadius: '8px',
          fontFamily: 'inherit',
          brandVisibility: 'minimal',
        },
      },
      '*',
    );
  }, [loaded]);

  const iframeClassName = [styles.iframe, loaded ? styles.iframeLoaded : '']
    .filter(Boolean)
    .join(' ');
  const skeletonClassName = [
    styles.skeleton,
    loaded ? styles.skeletonHidden : '',
    timedOut ? styles.skeletonHidden : '',
    !loaded && !timedOut ? styles.pulse : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.intro}>
        <div className={styles.topLine}>
          <span className={styles.eyebrow}>Schedule a session</span>
          <span className={styles.topNote}>Quiet booking, no back-and-forth required</span>
        </div>
        <div className={styles.headlineRow}>
          <div>
            <h2 className={styles.headline}>Choose a time that already feels like exhale.</h2>
            <p className={styles.copy}>
              The booking flow should feel like part of Haven itself: warm, quiet,
              legible, and easy to trust. The frame around it is meant to soften the
              technology and keep the mood intact.
            </p>
            <div className={styles.serviceTags} aria-label="Session focus areas">
              <span>Restorative bodywork</span>
              <span>Recovery-focused sessions</span>
              <span>Unhurried scheduling</span>
            </div>
          </div>
          <div className={styles.meta}>
            <span className={styles.metaLabel}>Need a hand instead?</span>
            <span className={styles.metaValue}>Call or text Jane at (518) 555-0174</span>
          </div>
        </div>
      </div>

      <div className={styles.iframeShell}>
        {timedOut ? (
          <div className={styles.error} role="status" aria-live="polite">
            <div className={styles.errorCard}>
              <h3 className={styles.errorTitle}>Booking Help</h3>
              <p className={styles.errorText}>
                Having trouble loading the booking form? Call or text Jane at (518)
                {' '}
                555-0174 to schedule directly.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className={skeletonClassName} aria-hidden="true">
              <div className={`${styles.skeletonRow} ${styles.skeletonHeader}`} />
              <div className={`${styles.skeletonRow} ${styles.skeletonCalendar}`} />
              <div className={styles.skeletonButtonRow}>
                <div className={`${styles.skeletonRow} ${styles.skeletonButton}`} />
                <div className={`${styles.skeletonRow} ${styles.skeletonButton}`} />
              </div>
            </div>

            <iframe
              ref={iframeRef}
              id={iframeId}
              className={iframeClassName}
              title="Book a Haven Therapeutic Massage appointment"
              src={normalizedUrl}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
              onLoad={() => setLoaded(true)}
              style={{ minHeight: `${DEFAULT_HEIGHT}px`, height: `${iframeHeight}px` }}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default AcuityBookingEmbed;
