'use client'

import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { slideInLeft, fadeUp } from '@/constants/animation'

interface PhilosophySectionProps {
  pullQuote: string
  statement: readonly string[]
}

export function PhilosophySection({ pullQuote, statement }: PhilosophySectionProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-forest-deep py-section-sm md:py-section">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20 text-center">
        <MotionDiv
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="w-12 h-px bg-gold mb-3 mx-auto" />
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-gold mb-8">
            OUR PHILOSOPHY
          </p>
        </MotionDiv>

        <MotionDiv
          variants={prefersReducedMotion ? undefined : slideInLeft}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
        >
          <blockquote className="font-display font-light italic text-4xl md:text-5xl leading-[1.2] text-white mb-8">
            &ldquo;{pullQuote}&rdquo;
          </blockquote>
        </MotionDiv>

        <MotionDiv
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-6 mt-8"
        >
          {statement.map((paragraph, i) => (
            <p key={i} className="font-sans text-lg leading-[1.75] text-white/70">
              {paragraph}
            </p>
          ))}
        </MotionDiv>
      </div>
    </section>
  )
}
