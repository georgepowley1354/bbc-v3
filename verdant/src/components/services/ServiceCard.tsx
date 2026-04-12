'use client'

import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { serviceIconMap } from '@/components/icons/ServiceIcons'
import { fadeUp } from '@/constants/animation'
import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const IconComponent = serviceIconMap[service.icon]

  return (
    <MotionDiv
      variants={prefersReducedMotion ? undefined : fadeUp}
      className="group"
    >
      <Link
        href={`/services/${service.slug}`}
        className="block bg-stone-mid p-8 transition-shadow duration-300 hover:shadow-lg h-full"
        aria-label={`Learn about ${service.name}`}
      >
        <div className="text-forest-deep mb-6">
          {IconComponent && <IconComponent />}
        </div>
        <h3 className="font-display text-2xl leading-[1.15] text-text-primary mb-3">
          {service.name}
        </h3>
        <p className="font-sans text-base leading-[1.6] text-text-secondary mb-4">
          {service.tagline}
        </p>
        <p className="font-sans text-sm text-sage mb-4">
          {service.pricingRange}
        </p>
        <span className="font-sans text-[13px] text-gold group-hover:text-gold-light transition-colors duration-200">
          Explore &rarr;
        </span>
      </Link>
    </MotionDiv>
  )
}
