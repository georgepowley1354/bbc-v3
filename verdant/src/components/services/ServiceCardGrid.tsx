'use client'

import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { stagger } from '@/constants/animation'
import { ServiceCard } from '@/components/services/ServiceCard'
import type { Service } from '@/types'

interface ServiceCardGridProps {
  services: Service[]
}

export function ServiceCardGrid({ services }: ServiceCardGridProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <MotionDiv
      variants={prefersReducedMotion ? undefined : stagger}
      initial={prefersReducedMotion ? undefined : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {services.map((service, index) => (
        <div
          key={service.slug}
          className={index === services.length - 1 ? 'lg:col-start-2' : ''}
        >
          <ServiceCard service={service} />
        </div>
      ))}
    </MotionDiv>
  )
}
