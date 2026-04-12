'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import SectionHeader from '@/components/ui/SectionHeader'
import { fadeUp, slideInLeft } from '@/constants/animation'

export function ManifestoSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="bg-off-white py-section-sm md:py-section"
      aria-labelledby="manifesto-headline"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left column — text */}
          <MotionDiv
            variants={prefersReducedMotion ? undefined : slideInLeft}
            initial={prefersReducedMotion ? undefined : 'hidden'}
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionHeader
              eyebrow="OUR PHILOSOPHY"
              headline="Where Architecture Meets Nature"
              dark={false}
            />
            <div className="mt-8 space-y-5">
              <p className="font-sans text-lg leading-[1.75] text-text-secondary">
                Every great outdoor space begins as an act of listening — to the land, to the light,
                to the way a family lives. We translate that understanding into environments where
                stone, water, and living plants exist in deliberate harmony.
              </p>
              <p className="font-sans text-lg leading-[1.75] text-text-secondary">
                Our work spans hardscaped terraces built to last a century, pool surrounds that
                mirror the Adirondack sky, and kitchen gardens that become the heart of every
                gathering.
              </p>
              <p className="font-sans text-lg leading-[1.75] text-text-secondary">
                We design for the long view — spaces that grow more beautiful with each passing
                season, maturing alongside the families who inhabit them.
              </p>
            </div>
          </MotionDiv>

          {/* Right column — image */}
          <MotionDiv
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial={prefersReducedMotion ? undefined : 'hidden'}
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, margin: '-80px' }}
            className="relative aspect-square overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop"
              alt="Lush garden path through mature plantings with stone stepping stones"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
