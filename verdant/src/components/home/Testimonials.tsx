'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import SectionHeader from '@/components/ui/SectionHeader'
import { fadeUp, stagger } from '@/constants/animation'

interface Testimonial {
  quote: string
  clientName: string
  locationAndProject: string
  projectImage: string
  projectImageAlt: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'The terrace Verdant built has completely transformed how we use our property. What was once an unusable slope is now the heart of our home — we entertain out there every week from May through October.',
    clientName: 'Margaret & Thomas K.',
    locationAndProject: 'Lake George | Adirondack Terrace',
    projectImage:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
    projectImageAlt: 'Stone terrace overlooking Lake George with outdoor seating area',
  },
  {
    quote:
      'From our first consultation to the final reveal, the Verdant team demonstrated a level of craft and intentionality I rarely encounter. They understood exactly what we were trying to achieve — and delivered something even better.',
    clientName: 'Sarah L.',
    locationAndProject: 'Saratoga Springs | Willowmere Garden',
    projectImage:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&auto=format&fit=crop',
    projectImageAlt: 'Formal garden with stone path and mature plantings in Saratoga Springs',
  },
]

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="bg-forest-mid py-section-sm md:py-section"
      aria-labelledby="testimonials-headline"
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
            eyebrow="CLIENT STORIES"
            headline="What Our Clients Say"
            dark={true}
          />
        </MotionDiv>

        <MotionDiv
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial) => (
            <MotionDiv
              key={testimonial.clientName}
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="bg-forest-mid border border-white/10 overflow-hidden"
            >
              {/* Project photo */}
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src={testimonial.projectImage}
                  alt={testimonial.projectImageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Body */}
              <div className="p-8">
                {/* Gold quote mark — large Cormorant Garamond character */}
                <div
                  className="font-display leading-none mb-4 select-none"
                  style={{
                    fontSize: '72px',
                    lineHeight: 0.5,
                    color: 'rgba(201, 168, 76, 0.6)',
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Quote */}
                <blockquote className="font-display italic text-white leading-[1.5]" style={{ fontSize: '22px' }}>
                  {testimonial.quote}
                </blockquote>

                {/* Gold divider */}
                <div className="w-8 h-px bg-gold mt-8 mb-6" aria-hidden="true" />

                {/* Attribution */}
                <p className="font-sans font-medium text-sm text-white tracking-[0.02em]">
                  {testimonial.clientName}
                </p>
                <p className="font-sans font-light text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {testimonial.locationAndProject}
                </p>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  )
}
