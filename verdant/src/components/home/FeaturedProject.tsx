'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import Button from '@/components/ui/Button'
import { fadeUp, slideInLeft } from '@/constants/animation'

export function FeaturedProject() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="bg-forest-deep py-section-sm md:py-section"
      aria-labelledby="featured-project-headline"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — large project image */}
          <MotionDiv
            variants={prefersReducedMotion ? undefined : slideInLeft}
            initial={prefersReducedMotion ? undefined : 'hidden'}
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, margin: '-80px' }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80&auto=format&fit=crop"
              alt="The Adirondack Terrace — stone terrace with panoramic lake view and surrounding forest"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle overlay to darken image edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/20 to-transparent" />
          </MotionDiv>

          {/* Right — project details */}
          <MotionDiv
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial={prefersReducedMotion ? undefined : 'hidden'}
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Gold rule + eyebrow */}
            <div className="w-12 h-px bg-gold mb-3" />
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-gold mb-6">
              Featured Project
            </p>

            <h2
              id="featured-project-headline"
              className="font-display font-light text-white text-4xl md:text-5xl leading-[1.05] mb-4"
            >
              The Adirondack Terrace
            </h2>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-sans text-sm text-white/60">Lake George, NY</span>
              <span className="text-white/30" aria-hidden="true">·</span>
              <span className="font-sans text-sm text-white/60">Full Property Design</span>
            </div>

            <p className="font-sans text-base leading-[1.6] text-white/70 mb-6">
              A complete lakeside property transformation — 4,200 sq ft of hand-laid bluestone
              terrace, native Adirondack plantings, and a stone fireplace that becomes the
              gathering center of every evening.
            </p>
            <p className="font-sans text-base leading-[1.6] text-white/70 mb-8">
              Designed to frame unobstructed views of Lake George while providing complete
              privacy from neighboring properties through strategic evergreen screening.
            </p>

            <p className="font-sans text-sm text-gold mb-8 tracking-[0.05em]">
              Investment Range: $180,000 — $220,000
            </p>

            <Button variant="ghost" href="/portfolio/adirondack-terrace">
              View Case Study
            </Button>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
