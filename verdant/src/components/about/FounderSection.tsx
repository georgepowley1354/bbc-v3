'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp, fadeIn } from '@/constants/animation'

interface FounderSectionProps {
  name: string
  title: string
  bio: readonly string[]
  photoUrl: string
}

export function FounderSection({ name, title, bio, photoUrl }: FounderSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-stone-warm py-section-sm md:py-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-12 lg:gap-16 items-start">
          {/* Left: portrait (45%) */}
          <MotionDiv
            className="lg:col-span-4"
            variants={prefersReducedMotion ? undefined : fadeIn}
            initial={prefersReducedMotion ? undefined : 'hidden'}
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={photoUrl}
                alt={`${name}, founder of Verdant Landscape Design`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </MotionDiv>

          {/* Right: bio (55%) */}
          <MotionDiv
            className="lg:col-span-5"
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial={prefersReducedMotion ? undefined : 'hidden'}
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="w-12 h-px bg-gold mb-3" />
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-gold mb-4">
              {name.toUpperCase()}, PRINCIPAL
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-text-primary mb-2">
              {name}
            </h2>
            <p className="font-sans text-sm tracking-[0.08em] uppercase text-text-muted mb-8">
              {title}
            </p>
            <div className="space-y-6">
              {bio.map((paragraph, i) => (
                <p key={i} className="font-sans text-lg leading-[1.75] text-text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
