'use client'

import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp } from '@/constants/animation'
import Button from '@/components/ui/Button'

export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-forest-deep py-section" aria-labelledby="final-cta-headline">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <MotionDiv
          className="overflow-hidden rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(184,147,75,0.14),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-8 py-14 text-center md:px-14 md:py-20"
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div>
            <div className="mx-auto w-12 border-t border-gold" />
            <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.18em] text-gold">
              Start your project
            </p>
          </div>

          <h2
            id="final-cta-headline"
            className="mx-auto mt-8 max-w-4xl font-display text-5xl font-light leading-[1.02] text-white md:text-7xl"
          >
            If the property deserves more than landscaping, let&apos;s talk.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-8 text-white/80">
            Verdant is now booking Spring and Summer 2026 for estate gardens, terraces,
            poolscapes, and full-property transformations throughout the Capital Region.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="primary" href="/contact" size="lg" className="rounded-full px-8">
              Request a consultation
            </Button>
            <Button variant="ghost" href="/portfolio" size="lg" className="rounded-full px-8">
              Review the portfolio
            </Button>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
