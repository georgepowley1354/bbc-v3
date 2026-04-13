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
      <div
        className="hidden lg:block absolute top-12 left-[16.666%] right-[16.666%] h-px"
        style={{ backgroundColor: 'rgba(184, 147, 75, 0.3)' }}
        aria-hidden="true"
      />
      <div
        className="hidden lg:block absolute h-px left-[16.666%] right-[16.666%]"
        style={{
          backgroundColor: 'rgba(184, 147, 75, 0.3)',
          top: 'calc(50% + 24px)',
        }}
        aria-hidden="true"
      />
      <div
        className="lg:hidden absolute left-8 top-0 bottom-0 w-px"
        style={{ backgroundColor: 'rgba(184, 147, 75, 0.2)' }}
        aria-hidden="true"
      />

      <ol
        className="grid list-none grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8"
        role="list"
        aria-label="Our 6-stage design and installation process"
      >
        {stages.map((stage) => (
          <li key={stage.number}>
            <MotionDiv
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="relative flex flex-col rounded-[28px] border border-white/[0.16] bg-white/[0.12] px-6 py-8 pl-20 backdrop-blur-sm lg:min-h-[290px] lg:pl-6"
            >
              <div
                className="absolute left-6 top-5 select-none font-display font-light leading-none lg:relative lg:left-0 lg:top-0"
                style={{
                  fontSize: '88px',
                  lineHeight: 1,
                  color: 'rgba(184, 147, 75, 0.24)',
                }}
                aria-hidden="true"
              >
                {stage.number}
              </div>

              <h3 className="mb-4 font-display text-[30px] leading-[1.08] text-white lg:mt-20">
                {stage.name}
              </h3>
              <p className="font-sans text-base leading-[1.7] text-white/88">
                {stage.description}
              </p>
            </MotionDiv>
          </li>
        ))}
      </ol>
    </MotionDiv>
  )
}
