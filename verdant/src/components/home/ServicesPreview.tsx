'use client'

import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import SectionHeader from '@/components/ui/SectionHeader'
import { fadeUp, stagger } from '@/constants/animation'
import { services } from '@/data/services'
import { serviceIconMap } from '@/components/icons/ServiceIcons'

export function ServicesPreview() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="bg-stone-warm py-section-sm md:py-section"
      aria-labelledby="services-headline"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <MotionDiv
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-14"
        >
          <SectionHeader
            eyebrow="WHAT WE BUILD"
            headline="Five Ways We Transform Your Property"
            dark={false}
          />
        </MotionDiv>

        {/* Services grid */}
        <MotionDiv
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const IconComponent = serviceIconMap[service.icon]
            return (
              <MotionDiv
                key={service.slug}
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
                  <h3 className="font-display text-2xl leading-[1.15] text-text-primary mb-4">
                    {service.name}
                  </h3>
                  <p className="font-sans text-base leading-[1.6] text-text-secondary">
                    {service.tagline}
                  </p>
                </Link>
              </MotionDiv>
            )
          })}
        </MotionDiv>
      </div>
    </section>
  )
}
