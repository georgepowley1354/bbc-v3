'use client'

import { Award } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp, stagger } from '@/constants/animation'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Credential } from '@/data/about'

interface CredentialsGridProps {
  credentials: readonly Credential[]
}

export function CredentialsGrid({ credentials }: CredentialsGridProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-stone-warm py-section-sm md:py-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <MotionDiv
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-14"
        >
          <SectionHeader
            eyebrow="STUDIO MARKERS"
            headline="Built carefully, grown deliberately"
            body="Verdant has evolved through a series of deliberate studio decisions: fewer projects, deeper planning, stronger craft partnerships, and a long-view approach to what makes a property feel complete."
          />
        </MotionDiv>

        <MotionDiv
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {credentials.map((cred) => (
            <MotionDiv
              key={cred.body}
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="bg-stone-mid p-6"
            >
              <Award className="w-6 h-6 text-sage mb-4" aria-hidden="true" />
              <p className="font-sans font-medium text-[15px] text-text-primary mb-1">{cred.body}</p>
              <p className="font-sans font-light text-[13px] text-text-muted mb-1">{cred.year}</p>
              {cred.detail && (
                <p className="font-sans text-sm text-text-secondary">{cred.detail}</p>
              )}
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  )
}
