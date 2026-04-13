'use client'

import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp, stagger } from '@/constants/animation'
import type { ProcessStage } from '@/data/process'

interface ProcessTimelineProps {
  stages: ProcessStage[]
}

export function ProcessTimeline({ stages }: ProcessTimelineProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <MotionDiv
      variants={prefersReducedMotion ? undefined : stagger}
      initial={prefersReducedMotion ? undefined : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
      className="relative"
    >
      {/* Desktop connecting lines — top row */}
      <div
        className="hidden lg:block absolute top-12 left-[16.666%] right-[16.666%] h-px"
        style={{ backgroundColor: 'rgba(201, 168, 76, 0.3)' }}
        aria-hidden="true"
      />
      {/* Second row connector */}
      <div
        className="hidden lg:block absolute h-px left-[16.666%] right-[16.666%]"
        style={{
          backgroundColor: 'rgba(201, 168, 76, 0.3)',
          top: 'calc(50% + 24px)',
        }}
        aria-hidden="true"
      />

      {/* Mobile vertical connecting rail */}
      <div
        className="lg:hidden absolute left-8 top-0 bottom-0 w-px"
        style={{ backgroundColor: 'rgba(201, 168, 76, 0.2)' }}
        aria-hidden="true"
      />

      <ol
        className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 list-none"
        role="list"
        aria-label="Our 6-stage design and installation process"
      >
        {stages.map((stage) => (
          <li key={stage.number}>
            <MotionDiv
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="relative flex flex-col pl-20 lg:pl-0"
            >
              {/* Large step number */}
              <div
                className="font-display font-light leading-none mb-4 select-none lg:relative absolute left-0 top-0"
                style={{
                  fontSize: '96px',
                  lineHeight: 1,
                  color: 'rgba(201, 168, 76, 0.2)',
                }}
                aria-hidden="true"
              >
                {stage.number}
              </div>

              {/* Stage content */}
              <h3 className="font-display text-white text-2xl leading-[1.15] mb-4">
                {stage.name}
              </h3>
              <p
                className="font-sans text-base leading-[1.6]"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                {stage.description}
              </p>
            </MotionDiv>
          </li>
        ))}
      </ol>
    </MotionDiv>
  )
}
