'use client';

import Image, { type ImageLoader } from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  Component,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import styles from './ScrollGalleryHero.module.css';

export type ScrollGalleryHeroImage = {
  alt: string;
  src: string;
  objectPosition?: string;
};

export type ScrollGalleryHeroProps = {
  images?: ScrollGalleryHeroImage[];
  className?: string;
};

type ScrollGalleryHeroBoundaryProps = {
  children: ReactNode;
  images: ScrollGalleryHeroImage[];
};

type ScrollGalleryHeroBoundaryState = {
  hasError: boolean;
};

const defaultImages: ScrollGalleryHeroImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200',
    alt: 'Haven therapist performing therapeutic massage treatment',
    objectPosition: '42% center',
  },
  {
    src: 'https://images.unsplash.com/photo-1737352777897-e22953991a32?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200',
    alt: 'Serene spa treatment room with warm lighting',
  },
  {
    src: 'https://images.unsplash.com/photo-1700522924565-9fad1c05469e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200',
    alt: 'Hot stone massage therapy session',
  },
  {
    src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&fm=jpg&q=80&w=1200',
    alt: 'Essential oil being applied by hand',
  },
  {
    src: 'https://images.unsplash.com/photo-1770573319864-b3513c899089?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200',
    alt: 'Peaceful spa environment at Haven',
  },
];

const passThroughLoader: ImageLoader = ({ src }) => src;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const GAP = 12;

class ScrollGalleryHeroBoundary extends Component<
  ScrollGalleryHeroBoundaryProps,
  ScrollGalleryHeroBoundaryState
> {
  public constructor(props: ScrollGalleryHeroBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): ScrollGalleryHeroBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: unknown) {
    console.error('ScrollGalleryHero failed, falling back to static grid.', error);
  }

  public render() {
    if (this.state.hasError) {
      return <StaticGrid images={this.props.images} />;
    }

    return this.props.children;
  }
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const onChange = () => setMatches(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener('change', onChange);

    return () => mediaQuery.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

function useViewportWidth(): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);

    updateWidth();
    window.addEventListener('resize', updateWidth, { passive: true });

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return width;
}

function useMobileReveal(itemCount: number, enabled: boolean) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() =>
    Array.from({ length: itemCount }, () => false),
  );
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    setVisibleItems(Array.from({ length: itemCount }, () => false));
  }, [itemCount]);

  useEffect(() => {
    if (!enabled) {
      setVisibleItems(Array.from({ length: itemCount }, () => true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.getAttribute('data-index'));
          if (Number.isNaN(index)) return;

          setVisibleItems((current) => {
            if (current[index]) return current;

            const next = [...current];
            next[index] = true;
            return next;
          });

          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.18 },
    );

    refs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [enabled, itemCount]);

  return {
    register: (index: number) => (node: HTMLDivElement | null) => {
      refs.current[index] = node;
    },
    visibleItems,
  };
}

function IntroCopy() {
  return (
    <div className={styles.topCopy}>
      <div className={styles.brandBar}>
        <span className={styles.eyebrow}>Haven Therapeutic Massage</span>
        <span className={styles.brandNote}>Therapeutic care by Jane</span>
      </div>
      <h2 className={styles.headline}>A private ritual for release, repair, and stillness.</h2>
      <p className={styles.subcopy}>
        Haven is meant to feel quiet before a single hand is laid on the body:
        warm light, grounded materials, slower pacing, and care that feels
        restorative instead of transactional.
      </p>
      <div className={styles.detailList} aria-label="Haven therapy highlights">
        <span>Therapeutic massage</span>
        <span>Nervous system reset</span>
        <span>Private warm studio</span>
      </div>
    </div>
  );
}

function StaticGrid({ images }: { images: ScrollGalleryHeroImage[] }) {
  return (
    <section className={styles.fallbackShell} aria-label="Haven gallery">
      <div className={styles.fallbackIntro}>
        <IntroCopy />
      </div>
      <div className={styles.fallbackGrid}>
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`${styles.imageFrame} ${index === 0 ? styles.centerFrame : ''}`}
          >
            <Image
              alt={image.alt}
              className={styles.image}
              fill
              loader={passThroughLoader}
              priority={index === 0}
              sizes="(max-width: 767px) calc(100vw - 32px), 20vw"
              src={image.src}
              style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileStack({ images }: { images: ScrollGalleryHeroImage[] }) {
  const reduceMotion = useReducedMotion();
  const { register, visibleItems } = useMobileReveal(images.length, !reduceMotion);

  return (
    <section className={styles.section} aria-label="Haven gallery">
      <div className={styles.stickyFrame}>
        <div className={styles.stage}>
          <div className={styles.ambientOrb} aria-hidden="true" />
          <div className={styles.galleryBackdrop} aria-hidden="true" />
          <IntroCopy />
          <div className={styles.mobileStack}>
            {images.map((image, index) => {
              const visible = reduceMotion || visibleItems[index];
              const className = [
                styles.mobileCard,
                visible ? styles.mobileCardVisible : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div
                  key={`${image.src}-${index}`}
                  ref={register(index)}
                  data-index={index}
                  className={className}
                  style={{ transitionDelay: `${index * 150}ms` } as CSSProperties}
                >
                  <div
                    className={`${styles.imageFrame} ${index === 0 ? styles.centerFrame : ''}`}
                  >
                    <Image
                      alt={image.alt}
                      className={styles.image}
                      fill
                      loader={passThroughLoader}
                      priority={index === 0}
                      sizes="calc(100vw - 32px)"
                      src={image.src}
                      style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                      unoptimized
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopGallery({
  images,
  isTablet,
}: {
  images: ScrollGalleryHeroImage[];
  isTablet: boolean;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportWidth = useViewportWidth();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.24,
  });
  const galleryProgress = useTransform(smoothedProgress, [0.45, 0.88], [0, 1]);

  const motionReady = useRef(false);
  const [fallbackMode, setFallbackMode] = useState(false);

  useEffect(() => {
    let fallbackTimer: number | undefined;

    const unsubscribe = smoothedProgress.on('change', () => {
      motionReady.current = true;
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
    });

    const onScroll = () => {
      if (fallbackTimer || motionReady.current) return;

      fallbackTimer = window.setTimeout(() => {
        if (!motionReady.current) {
          setFallbackMode(true);
        }
      }, 450);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener('scroll', onScroll);
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, [smoothedProgress]);

  const centerWidth = useMemo(() => {
    if (!viewportWidth) return 560;

    const desktopWidth = Math.min(viewportWidth * 0.34, 560);
    return isTablet ? desktopWidth * 0.6 : Math.max(desktopWidth, 300);
  }, [isTablet, viewportWidth]);

  const sideWidth = useMemo(() => {
    if (!viewportWidth) return 250;

    const desktopWidth = Math.min(viewportWidth * 0.16, 250);
    return isTablet ? desktopWidth * 0.6 : Math.max(desktopWidth, 170);
  }, [isTablet, viewportWidth]);

  const spreadPrimary = (centerWidth + sideWidth) / 2 + GAP;
  const spreadSecondary = spreadPrimary + sideWidth * 0.88 + GAP;
  const leftPrimarySpread = spreadPrimary;
  const rightPrimarySpread = spreadPrimary;
  const leftSecondarySpread = spreadSecondary;
  const rightSecondarySpread = spreadSecondary;

  const centerScale = useTransform(galleryProgress, [0, 0.18, 0.58, 1], [1, 1, 0.92, 0.85]);
  const centerEntrance = useTransform(galleryProgress, [0, 0.12], [0.97, 1]);
  const centerY = useTransform(galleryProgress, [0, 1], [0, -10]);
  const chevronOpacity = useTransform(galleryProgress, [0, 0.06], [1, 0]);
  const chevronY = useTransform(galleryProgress, [0, 0.06], [0, 14]);
  const centerCombinedScale = useTransform(
    [centerScale, centerEntrance],
    ([scaleValue, entranceValue]) => (scaleValue as number) * (entranceValue as number),
  );

  const leftOneX = useTransform(galleryProgress, [0, 0.18, 0.58], [0, 0, -leftPrimarySpread]);
  const rightOneX = useTransform(galleryProgress, [0, 0.18, 0.58], [0, 0, rightPrimarySpread]);
  const leftTwoX = useTransform(galleryProgress, [0, 0.56, 1], [0, 0, -leftSecondarySpread]);
  const rightTwoX = useTransform(galleryProgress, [0, 0.56, 1], [0, 0, rightSecondarySpread]);

  const leftOneY = useTransform(galleryProgress, [0, 0.18, 0.58], [16, 16, 18]);
  const rightOneY = useTransform(galleryProgress, [0, 0.18, 0.58], [10, 10, 0]);
  const leftTwoY = useTransform(galleryProgress, [0, 0.56, 1], [42, 42, 30]);
  const rightTwoY = useTransform(galleryProgress, [0, 0.56, 1], [32, 32, 18]);

  const leftOneRotate = useTransform(galleryProgress, [0.18, 0.58], [-7, -5]);
  const rightOneRotate = useTransform(galleryProgress, [0.18, 0.58], [7, 5]);
  const leftTwoRotate = useTransform(galleryProgress, [0.56, 1], [-11, -8]);
  const rightTwoRotate = useTransform(galleryProgress, [0.56, 1], [10, 7]);

  const leftOneOpacity = useTransform(galleryProgress, [0.17, 0.28, 0.58], [0, 0.72, 1]);
  const rightOneOpacity = useTransform(galleryProgress, [0.17, 0.28, 0.58], [0, 0.72, 1]);
  const leftTwoOpacity = useTransform(galleryProgress, [0.55, 0.68, 1], [0, 0.72, 1]);
  const rightTwoOpacity = useTransform(galleryProgress, [0.55, 0.68, 1], [0, 0.72, 1]);

  if (fallbackMode) {
    return <StaticGrid images={images} />;
  }

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Haven gallery reveal">
      <IntroCopy />
      <div className={styles.stickyFrame}>
        <div className={styles.stage}>
          <div className={styles.ambientOrb} aria-hidden="true" />
          <div className={styles.galleryBackdrop} aria-hidden="true" />

          <div className={styles.desktopShell}>
            <DesktopCard
              image={images[3]}
              className={styles.leftTwo}
              cardWidth={sideWidth}
              x={leftTwoX}
              y={leftTwoY}
              rotate={leftTwoRotate}
              opacity={leftTwoOpacity}
            />
            <DesktopCard
              image={images[1]}
              className={styles.leftOne}
              cardWidth={sideWidth}
              x={leftOneX}
              y={leftOneY}
              rotate={leftOneRotate}
              opacity={leftOneOpacity}
            />
            <DesktopCard
              image={images[0]}
              className={`${styles.card} ${styles.centerCard}`}
              cardWidth={centerWidth}
              y={centerY}
              scale={centerCombinedScale}
              priority
              center
            />
            <DesktopCard
              image={images[2]}
              className={styles.rightOne}
              cardWidth={sideWidth}
              x={rightOneX}
              y={rightOneY}
              rotate={rightOneRotate}
              opacity={rightOneOpacity}
            />
            <DesktopCard
              image={images[4]}
              className={styles.rightTwo}
              cardWidth={sideWidth}
              x={rightTwoX}
              y={rightTwoY}
              rotate={rightTwoRotate}
              opacity={rightTwoOpacity}
            />
          </div>

          <div className={styles.bottomBar}>
            <span className={styles.microNote}>Scroll to step into the space</span>
            <motion.div
              className={styles.chevron}
              aria-hidden="true"
              style={{ opacity: chevronOpacity, y: chevronY }}
            >
              <span>Scroll to explore</span>
              <span className={styles.chevronLine} />
              <span className={styles.chevronMark} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopCard({
  image,
  className,
  x,
  y,
  opacity,
  rotate,
  scale,
  cardWidth,
  priority = false,
  center = false,
}: {
  image: ScrollGalleryHeroImage;
  className?: string;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
  opacity?: MotionValue<number>;
  rotate?: MotionValue<number>;
  scale?: MotionValue<number>;
  cardWidth: number;
  priority?: boolean;
  center?: boolean;
}) {
  return (
    <div
      className={[styles.card, className].filter(Boolean).join(' ')}
      style={{ marginLeft: -cardWidth / 2 }}
    >
      <motion.div
        style={{ x, y, opacity, rotate, scale }}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <div className={`${styles.imageFrame} ${center ? styles.centerFrame : ''}`}>
          <Image
            alt={image.alt}
            className={styles.image}
            fill
            loader={passThroughLoader}
            priority={priority}
            sizes="(max-width: 1024px) 24vw, 32vw"
            src={image.src}
            style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
            unoptimized
          />
        </div>
      </motion.div>
    </div>
  );
}

export function ScrollGalleryHero({
  images = defaultImages,
  className,
}: ScrollGalleryHeroProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const reduceMotion = useReducedMotion();
  const safeImages = images.length === 5 ? images : defaultImages;

  const content = reduceMotion ? (
    <StaticGrid images={safeImages} />
  ) : isMobile ? (
    <MobileStack images={safeImages} />
  ) : (
    <DesktopGallery images={safeImages} isTablet={isTablet} />
  );

  return (
    <div className={className}>
      <ScrollGalleryHeroBoundary images={safeImages}>{content}</ScrollGalleryHeroBoundary>
    </div>
  );
}

export default ScrollGalleryHero;
