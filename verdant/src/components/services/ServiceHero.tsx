'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp } from '@/constants/animation'
import type { Service } from '@/types'

interface ServiceHeroProps {
  service: Service
}

export function ServiceHero({ service }: ServiceHeroProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-end bg-forest-deep overflow-hidden">
      <Image
        src={service.heroImage}
        alt={`${service.name} by Verdant Landscape Design`}
        fill
        className="object-cover opacity-40"
        priority
        sizes="100vw"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20 w-full">
        <MotionDiv
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'visible'}
        >
          <div className="w-12 h-px bg-gold mb-3" />
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-gold mb-4">
            {service.name.toUpperCase()}
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white mb-4">
            {service.name}
          </h1>
          <p className="font-sans text-lg text-white/70 max-w-2xl">
            {service.tagline}
          </p>
        </MotionDiv>
      </div>
    </section>
  )
}
