'use client'

import { Check } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp, stagger } from '@/constants/animation'
import Button from '@/components/ui/Button'
import type { Service } from '@/types'

interface ServiceOutcomesProps {
  service: Service
}

export function ServiceOutcomes({ service }: ServiceOutcomesProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-stone-warm py-section-sm md:py-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left column — description + outcomes (60%) */}
          <MotionDiv
            className="lg:col-span-3"
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial={prefersReducedMotion ? undefined : 'hidden'}
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="font-sans text-lg leading-[1.75] text-text-secondary mb-10">
              {service.description}
            </p>
            <h2 className="font-display text-3xl leading-[1.15] text-text-primary mb-6">
              What You&apos;ll Get
            </h2>
            <MotionDiv
              variants={prefersReducedMotion ? undefined : stagger}
              initial={prefersReducedMotion ? undefined : 'hidden'}
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-4"
            >
              {service.outcomes.map((outcome) => (
                <MotionDiv
                  key={outcome}
                  variants={prefersReducedMotion ? undefined : fadeUp}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-sage mt-0.5 shrink-0" aria-hidden="true" />
                  <p className="font-sans text-base leading-[1.6] text-text-secondary">
                    {outcome}
                  </p>
                </MotionDiv>
              ))}
            </MotionDiv>
          </MotionDiv>

          {/* Right column — pricing card (40%) */}
          <MotionDiv
            className="lg:col-span-2"
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial={prefersReducedMotion ? undefined : 'hidden'}
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, margin: '-80px' }}
          >
            <aside
              className="bg-stone-mid border border-stone-dark p-8 sticky top-24"
              aria-label="Investment range for this service"
            >
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-text-muted mb-3">
                Investment Range
              </p>
              <div className="w-12 h-px bg-gold mb-3" aria-hidden="true" />
              <p className="font-display text-4xl text-text-primary leading-[1.1] mb-2">
                {service.pricingRange}
              </p>
              <p className="font-sans text-sm text-text-muted leading-[1.5] mb-8">
                {service.pricingNote}
              </p>
              <Button variant="primary" href="/contact">
                Start a Project
              </Button>
            </aside>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
