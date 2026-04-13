'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp, fadeIn, stagger } from '@/constants/animation'
import SectionHeader from '@/components/ui/SectionHeader'

export function ManifestoSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-stone-warm py-section" aria-labelledby="manifesto-headline">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <MotionDiv
          className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
        >
          <MotionDiv className="max-w-xl" variants={prefersReducedMotion ? undefined : fadeUp}>
            <SectionHeader
              eyebrow="Our philosophy"
              headline="Landscape architecture that makes a property feel inevitable."
              dark={false}
            />
            <div className="mt-8 space-y-5">
              <p className="font-sans text-lg leading-8 text-text-secondary">
                Verdant listens before it designs. We study grade, drainage, light, and the way a
                family actually lives outside before we decide where stone should land or where a
                view should open.
              </p>
              <p className="font-sans text-lg leading-8 text-text-secondary">
                The result is not a collection of amenities. It is a sequence of outdoor rooms that
                feel calm, permanent, and fully tuned to the property they inhabit.
              </p>
            </div>
          </MotionDiv>

          <MotionDiv className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]" variants={prefersReducedMotion ? undefined : fadeIn}>
            <div className="relative overflow-hidden rounded-[34px]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80&auto=format&fit=crop"
                  alt="Formal garden with sculpted hedges and stone walkway through mature plantings"
                  fill
                  quality={68}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 38vw"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-[30px] bg-stone-mid p-6">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  Design lens
                </p>
                <p className="mt-4 font-display text-3xl leading-[1.15] text-text-primary">
                  Architecture, softened by time and planting.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-[30px]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80&auto=format&fit=crop"
                    alt="Stone retaining wall with layered planting beds and mature greenery"
                    fill
                    quality={64}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 26vw"
                  />
                </div>
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  )
}
