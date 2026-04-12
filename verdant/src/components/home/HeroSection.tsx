'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv, MotionH1, MotionP } from '@/components/ui/MotionDiv'
import Button from '@/components/ui/Button'
import { heroEntrance, fadeUp, stagger } from '@/constants/animation'

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  const imageVariant = prefersReducedMotion ? undefined : heroEntrance
  const contentVariant = prefersReducedMotion ? undefined : stagger
  const itemVariant = prefersReducedMotion ? undefined : fadeUp

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <MotionDiv
        className="absolute inset-0"
        variants={imageVariant}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        animate={prefersReducedMotion ? undefined : 'visible'}
      >
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop"
          alt="Luxury stone terrace with lush garden landscaping at golden hour"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </MotionDiv>

      {/* Gradient overlay — forest-deep 70% bottom to transparent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(28,43,30,0.92) 0%, rgba(28,43,30,0.70) 40%, rgba(28,43,30,0.20) 80%, transparent 100%)',
        }}
      />

      {/* Content — bottom aligned */}
      <MotionDiv
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20 md:pb-28 w-full"
        variants={contentVariant}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        animate={prefersReducedMotion ? undefined : 'visible'}
      >
        {/* Gold rule + eyebrow */}
        <MotionDiv variants={itemVariant}>
          <div className="w-12 h-px bg-gold mb-3" />
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/60 mb-6">
            Saratoga Springs
          </p>
        </MotionDiv>

        {/* Hero headline */}
        <MotionDiv variants={itemVariant}>
          <MotionH1 className="font-display font-light leading-[0.95] text-white text-[60px] sm:text-[80px] lg:text-[96px]">
            We Build
            <br />
            <span className="italic">Outdoor Worlds.</span>
          </MotionH1>
        </MotionDiv>

        {/* Subline */}
        <MotionP
          variants={itemVariant}
          className="font-sans text-lg text-white/70 mt-6 max-w-xl leading-relaxed"
        >
          Luxury landscape architecture for the Adirondack region — crafting stone terraces,
          poolscapes, and full-property transformations that endure for generations.
        </MotionP>

        {/* CTA buttons */}
        <MotionDiv variants={itemVariant} className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button variant="primary" href="/contact">
            Start a Project
          </Button>
          <Button variant="ghost" href="/portfolio">
            View Our Work
          </Button>
        </MotionDiv>
      </MotionDiv>

      {/* Scroll indicator */}
      <MotionDiv
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                opacity: [0, 1, 1, 0],
                y: [-8, 0, 4, 8],
                transition: {
                  delay: 2,
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }
        }
        aria-hidden="true"
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/40">
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-white/40"
          aria-hidden="true"
        >
          <path d="M8 4 L8 20 M3 15 L8 20 L13 15" />
        </svg>
      </MotionDiv>
    </section>
  )
}
