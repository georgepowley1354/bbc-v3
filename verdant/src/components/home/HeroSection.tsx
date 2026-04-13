'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { ease } from '@/constants/animation'
import Button from '@/components/ui/Button'

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}
const heroFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.out } },
}
const heroImage = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.6, ease: ease.out } },
}

const heroScene = {
  src: 'https://images.unsplash.com/photo-1743167673050-62dddc5178d9?w=1800&q=82&auto=format&fit=crop',
  alt: 'Luxury pool courtyard with manicured stone paths and resort-style outdoor seating',
}

const detailFrames = [
  {
    src: 'https://images.unsplash.com/photo-1755816764913-bd1104a26d78?w=900&q=80&auto=format&fit=crop',
    label: 'Pergola dining garden',
  },
  {
    src: 'https://images.unsplash.com/photo-1643063231577-959abf98b59c?w=900&q=80&auto=format&fit=crop',
    label: 'Stone garden arrival',
  },
]

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const m = !prefersReducedMotion

  return (
    <section
      className="relative overflow-hidden bg-forest-deep pt-28"
      aria-label="Hero section"
      data-hero-root="true"
    >
      {/* Background image with slow scale-in */}
      <MotionDiv
        className="absolute inset-0"
        variants={m ? heroImage : undefined}
        initial={m ? 'hidden' : undefined}
        animate={m ? 'visible' : undefined}
      >
        <Image
          src={heroScene.src}
          alt={heroScene.alt}
          fill
          priority
          quality={76}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,18,16,0.68)_0%,rgba(15,18,16,0.42)_28%,rgba(15,18,16,0.10)_58%,rgba(15,18,16,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,18,16,0.20)_0%,rgba(15,18,16,0.06)_36%,rgba(15,18,16,0.34)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[44%] bg-[radial-gradient(circle_at_24%_24%,rgba(184,147,75,0.16),transparent_34%),linear-gradient(90deg,rgba(15,18,16,0.38),rgba(15,18,16,0))]" />
      </MotionDiv>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl gap-12 px-6 pb-14 pt-10 md:px-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:px-20 lg:pb-20">
        {/* Left content — staggered entrance */}
        <MotionDiv
          className="max-w-2xl"
          variants={m ? heroStagger : undefined}
          initial={m ? 'hidden' : undefined}
          animate={m ? 'visible' : undefined}
        >
          <MotionDiv variants={m ? heroFade : undefined}>
            <p className="font-sans text-[12px] uppercase tracking-[0.34em] text-gold/95">
              Verdant Landscape Design
            </p>
          </MotionDiv>

          <MotionDiv variants={m ? heroFade : undefined} className="mt-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white">
            <span className="rounded-full border border-white/55 bg-black/12 px-4 py-2 text-white">
              Saratoga Springs
            </span>
            <span className="rounded-full border border-white/55 bg-black/12 px-4 py-2 text-white">
              Lake George
            </span>
            <span className="rounded-full border border-white/55 bg-black/12 px-4 py-2 text-white">
              Capital Region
            </span>
          </MotionDiv>

          <MotionDiv variants={m ? heroFade : undefined} className="mt-12">
            <h1 className="max-w-[10ch] font-display text-[58px] font-light leading-[0.9] text-white sm:text-[86px] lg:text-[112px]">
              We build
              <br />
              <span className="italic text-gold">outdoor worlds.</span>
            </h1>
          </MotionDiv>

          <MotionDiv variants={m ? heroFade : undefined} className="mt-8 max-w-xl rounded-[28px] border border-white/18 bg-black/20 px-6 py-5 backdrop-blur-sm">
            <p className="font-sans text-lg leading-8 text-white/94">
              Verdant shapes terraces, gardens, poolscapes, and outdoor rooms for homeowners who
              want the property to feel composed, permanent, and exceptional in every season.
            </p>
          </MotionDiv>

          <MotionDiv variants={m ? heroFade : undefined} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" href="/contact" size="lg" className="rounded-full px-8">
              Request a Design Consultation
            </Button>
            <Button variant="ghost" href="/portfolio" size="lg" className="rounded-full px-8">
              Explore the Portfolio
            </Button>
          </MotionDiv>

          <MotionDiv variants={m ? heroFade : undefined} className="mt-14 grid max-w-4xl gap-5 rounded-[36px] border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))] p-6 backdrop-blur-md md:grid-cols-3">
            <div>
              <p className="font-display text-4xl text-white">$50k+</p>
              <p className="mt-2 font-sans text-sm uppercase tracking-[0.14em] text-white/88">
                Ideal project range
              </p>
            </div>
            <div>
              <p className="font-display text-4xl text-white">6 phases</p>
              <p className="mt-2 font-sans text-sm uppercase tracking-[0.14em] text-white/88">
                Discovery to aftercare
              </p>
            </div>
            <div>
              <p className="font-display text-4xl text-white">Spring 2026</p>
              <p className="mt-2 font-sans text-sm uppercase tracking-[0.14em] text-white/88">
                Booking now
              </p>
            </div>
          </MotionDiv>
        </MotionDiv>

        {/* Right sidebar — detail frames */}
        <MotionDiv
          className="hidden h-full lg:flex lg:flex-col lg:justify-end"
          variants={m ? heroFade : undefined}
          initial={m ? 'hidden' : undefined}
          animate={m ? 'visible' : undefined}
        >
          <div className="ml-auto w-full max-w-[19rem]">
            <div className="rounded-[30px] border border-white/18 bg-[linear-gradient(180deg,rgba(245,240,232,0.18),rgba(245,240,232,0.08))] p-5 shadow-[0_28px_80px_rgba(4,12,5,0.22)] backdrop-blur-md">
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold/95">
                Estate arrival
              </p>
              <p className="mt-3 font-display text-3xl leading-[1.02] text-white">
                A first view that feels inherited, not installed.
              </p>
            </div>

            <div className="mt-5 grid gap-4">
              {detailFrames.map((frame) => (
                <div
                  key={frame.label}
                  className="relative overflow-hidden rounded-[24px] border border-white/18 shadow-[0_24px_60px_rgba(4,12,5,0.18)]"
                >
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    {frame.label}
                  </div>
                  <div className="relative aspect-[5/4]">
                    <Image
                      src={frame.src}
                      alt={frame.label}
                      fill
                      quality={62}
                      className="object-cover"
                      sizes="(max-width: 1280px) 24vw, 304px"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,10,0.02),rgba(8,16,10,0.16))]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
