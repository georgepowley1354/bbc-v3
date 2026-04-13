'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp, stagger } from '@/constants/animation'
import SectionHeader from '@/components/ui/SectionHeader'

const testimonials = [
  {
    quote:
      'The terrace Verdant built has completely transformed how we use our property. What was once an unusable slope is now the heart of our home from May through October.',
    clientName: 'Margaret & Thomas K.',
    locationAndProject: 'Lake George | Adirondack Terrace',
    projectImage:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop',
    projectImageAlt: 'Stone terrace overlooking Lake George with outdoor seating area',
  },
  {
    quote:
      'Verdant understood exactly what we wanted from the site visit onward. The final result feels calm, expensive, and entirely natural to the property.',
    clientName: 'Sarah L.',
    locationAndProject: 'Saratoga Springs | Willowmere Garden',
    projectImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop',
    projectImageAlt: 'Luxury garden estate with manicured lawn and stone accents in Saratoga Springs',
  },
]

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-forest-mid py-section text-white" aria-labelledby="testimonials-headline">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <MotionDiv
          className="mb-14"
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
        >
          <SectionHeader
            eyebrow="Client stories"
            headline="Proof that the finished work feels as good as it looks."
            dark={true}
          />
        </MotionDiv>

        <MotionDiv
          className="grid gap-6 lg:grid-cols-2"
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map((testimonial) => (
            <MotionDiv
              key={testimonial.clientName}
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="overflow-hidden rounded-[34px] border border-white/10 bg-white/6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            >
              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[260px]">
                  <Image
                    src={testimonial.projectImage}
                    alt={testimonial.projectImageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                  />
                </div>
                <div className="p-8 md:p-9">
                  <p className="font-display text-6xl leading-none text-gold/55">"</p>
                  <blockquote className="mt-4 font-display text-3xl italic leading-[1.35] text-white">
                    {testimonial.quote}
                  </blockquote>
                  <div className="mt-8 h-px w-10 bg-gold" />
                  <p className="mt-6 font-sans text-sm uppercase tracking-[0.12em] text-white">
                    {testimonial.clientName}
                  </p>
                  <p className="mt-2 font-sans text-sm text-white/70">
                    {testimonial.locationAndProject}
                  </p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  )
}
