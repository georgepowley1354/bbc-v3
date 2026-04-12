'use client'

import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeIn } from '@/constants/animation'

const publications = [
  'LUXE Interiors',
  'Saratoga Living',
  'Capital Region Life',
  'Albany Business Review',
  'The Knot',
]

export function LogoBar() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="bg-stone-mid py-8"
      aria-label="Featured in publications"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <MotionDiv
          variants={prefersReducedMotion ? undefined : fadeIn}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
        >
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-text-muted opacity-60 shrink-0">
            As Seen In
          </p>
          <div className="w-px h-4 bg-stone-dark hidden sm:block" aria-hidden="true" />
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-6 sm:gap-10">
            {publications.map((pub) => (
              <span
                key={pub}
                className="font-sans text-[11px] tracking-[0.2em] uppercase text-text-muted opacity-60"
              >
                {pub}
              </span>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
