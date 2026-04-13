'use client'

import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp, stagger } from '@/constants/animation'
import SectionHeader from '@/components/ui/SectionHeader'
import { services } from '@/data/services'

export function ServicesPreview() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-off-white py-section" aria-labelledby="services-headline">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <MotionDiv
          className="mb-14"
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
        >
          <SectionHeader
            eyebrow="What we build"
            headline="The outdoor world can be approached in five different ways."
            body="Some projects begin with a terrace. Others begin with a pool, a planting framework, or a complete master plan. Every engagement is designed to feel cohesive at the property scale."
          />
        </MotionDiv>

        <MotionDiv
          className="divide-y divide-stone-dark/55 border-y border-stone-dark/55"
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
        >
          {services.map((service, index) => (
            <MotionDiv
              key={service.slug}
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="group grid cursor-pointer gap-6 py-8 transition-colors duration-200 hover:bg-stone-warm/50 md:grid-cols-[0.2fr_0.5fr_0.3fr] md:items-start md:rounded-2xl md:px-4"
            >
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
                0{index + 1}
              </p>
              <div>
                <h3 className="font-display text-3xl leading-[1.08] text-text-primary md:text-4xl">
                  {service.name}
                </h3>
                <p className="mt-3 max-w-xl font-sans text-base leading-7 text-text-secondary">
                  {service.description}
                </p>
              </div>
              <div className="flex flex-col gap-4 md:items-end">
                <p className="font-sans text-sm uppercase tracking-[0.12em] text-sage">
                  Starting at {service.pricingRange}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.16em] text-forest-deep transition-colors duration-200 hover:text-sage"
                >
                  View service →
                </Link>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  )
}
