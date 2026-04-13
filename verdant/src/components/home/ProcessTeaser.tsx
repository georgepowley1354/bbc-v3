'use client'

import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp, stagger } from '@/constants/animation'
import SectionHeader from '@/components/ui/SectionHeader'

const steps = [
  {
    number: '01',
    name: 'Discovery',
    description:
      'We study the property, the existing architecture, and the way you want to live outdoors.',
  },
  {
    number: '02',
    name: 'Design',
    description:
      'Materials, planting, grading, and investment are shaped into one clear proposal.',
  },
  {
    number: '03',
    name: 'Reveal',
    description:
      'The build is executed with the same restraint and detail that shaped the plan.',
  },
]

export function ProcessTeaser() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-stone-warm py-section" aria-labelledby="process-headline">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <MotionDiv
          className="mb-14"
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
        >
          <SectionHeader
            eyebrow="How it works"
            headline="A premium process, designed to feel calm from the first conversation."
            body="Verdant sells the experience as much as the finished landscape: clarity, timing, communication, and work that arrives feeling inevitable."
          />
        </MotionDiv>

        <MotionDiv
          className="grid gap-6 lg:grid-cols-3"
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
        >
          {steps.map((step) => (
            <MotionDiv
              key={step.number}
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="rounded-[30px] border border-stone-dark/55 bg-stone-mid/70 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
            >
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
                {step.number}
              </p>
              <h3 className="mt-4 font-display text-3xl leading-[1.1] text-text-primary">
                {step.name}
              </h3>
              <p className="mt-4 font-sans text-base leading-7 text-text-secondary">
                {step.description}
              </p>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  )
}
