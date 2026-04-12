'use client'

import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import SectionHeader from '@/components/ui/SectionHeader'
import { fadeUp, stagger } from '@/constants/animation'

const steps = [
  {
    number: '01',
    name: 'Discovery Consultation',
    description:
      'We begin by listening — to your vision, your site, and how you live outdoors. A two-hour on-site consultation maps every possibility.',
  },
  {
    number: '02',
    name: 'Design & Proposal',
    description:
      'Our design team translates the consultation into a full landscape plan with material specifications, plant schedules, and a transparent investment estimate.',
  },
  {
    number: '03',
    name: 'Expert Installation',
    description:
      'Our craftspeople bring the plan to life with precision — stone laid to last generations, plantings established for immediate impact and long-term beauty.',
  },
]

export function ProcessTeaser() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="bg-forest-deep py-section-sm md:py-section"
      aria-labelledby="process-headline"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <MotionDiv
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <SectionHeader
            eyebrow="HOW IT WORKS"
            headline="From Vision to Reality"
            dark={true}
          />
        </MotionDiv>

        {/* Steps container */}
        <MotionDiv
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="relative"
        >
          {/* Connecting horizontal line — desktop only */}
          <div
            className="hidden lg:block absolute top-12 left-[16.666%] right-[16.666%] h-px"
            style={{ backgroundColor: 'rgba(201, 168, 76, 0.3)' }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
            {steps.map((step) => (
              <MotionDiv
                key={step.number}
                variants={prefersReducedMotion ? undefined : fadeUp}
                className="relative flex flex-col"
              >
                {/* Large step number */}
                <div
                  className="font-display font-light leading-none mb-4 select-none"
                  style={{
                    fontSize: '96px',
                    lineHeight: 1,
                    color: 'rgba(201, 168, 76, 0.2)',
                  }}
                  aria-hidden="true"
                >
                  {step.number}
                </div>

                {/* Step content */}
                <h3 className="font-display text-white text-2xl leading-[1.15] mb-4">
                  {step.name}
                </h3>
                <p className="font-sans text-base leading-[1.6]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {step.description}
                </p>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
