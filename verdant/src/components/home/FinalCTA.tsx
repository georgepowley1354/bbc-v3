'use client'

import { useReducedMotion } from 'framer-motion'
import { MotionDiv, MotionH2, MotionP } from '@/components/ui/MotionDiv'
import Button from '@/components/ui/Button'
import { fadeUp, stagger } from '@/constants/animation'

export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="bg-forest-deep py-section-sm md:py-section"
      aria-labelledby="final-cta-headline"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <MotionDiv
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          {/* Gold rule + eyebrow */}
          <MotionDiv variants={prefersReducedMotion ? undefined : fadeUp}>
            <div className="w-12 h-px bg-gold mb-3 mx-auto" />
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-gold mb-8">
              Start Your Project
            </p>
          </MotionDiv>

          {/* Headline */}
          <MotionH2
            id="final-cta-headline"
            variants={prefersReducedMotion ? undefined : fadeUp}
            className="font-display font-light text-white text-4xl md:text-5xl leading-[1.05] mb-6"
          >
            Your Outdoor World Awaits
          </MotionH2>

          {/* Subline */}
          <MotionP
            variants={prefersReducedMotion ? undefined : fadeUp}
            className="font-sans text-base md:text-lg leading-[1.6] mb-10"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Every project begins with a conversation. Tell us about your property and your vision —
            we&rsquo;ll tell you what&rsquo;s possible.
            Spring 2026 slots are filling quickly for full-property transformations.
          </MotionP>

          {/* CTA buttons — side by side on sm+, stacked on mobile */}
          <MotionDiv
            variants={prefersReducedMotion ? undefined : fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="primary" href="/contact">
              Start a Project
            </Button>
            <Button variant="ghost" href="/portfolio">
              View Our Work
            </Button>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  )
}
