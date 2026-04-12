'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { fadeUp, stagger, fadeIn } from '@/constants/animation'

const instagramImages = [
  {
    id: '1506126613408-eca07ce68773',
    alt: 'Serene pool surrounded by stone coping and lush plantings',
  },
  {
    id: '1416879595882-3373a0480b5b',
    alt: 'Garden path through native plantings in late afternoon light',
  },
  {
    id: '1558618666-fcd25c85cd64',
    alt: 'Stone terrace with Adirondack mountain views at sunset',
  },
  {
    id: '1594736797933-d0501ba2fe65',
    alt: 'Outdoor kitchen with stone surround and pergola overhead',
  },
  {
    id: '1591825729269-caeb344f6df2',
    alt: 'Formal landscape with clipped hedgerows and stone stairs',
  },
  {
    id: '1570197788417-0e82375c9371',
    alt: 'Infinity edge pool overlooking wooded landscape at dusk',
  },
]

export function InstagramPlaceholder() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="bg-stone-warm py-section-sm md:py-section"
      aria-labelledby="instagram-headline"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <MotionDiv
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <SectionHeader
            eyebrow="FOLLOW OUR WORK"
            headline="@VerdantLandscape"
            dark={false}
          />
        </MotionDiv>

        {/* 3×2 grid */}
        <MotionDiv
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-3 gap-2 sm:gap-3 mb-10"
        >
          {instagramImages.map((img) => (
            <MotionDiv
              key={img.id}
              variants={prefersReducedMotion ? undefined : fadeIn}
              className="relative aspect-square overflow-hidden group"
            >
              <Image
                src={`https://images.unsplash.com/photo-${img.id}?w=400&q=80&auto=format&fit=crop`}
                alt={img.alt}
                fill
                className="object-cover object-center transition-opacity duration-300 group-hover:opacity-90"
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
              />
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Follow button */}
        <div className="flex justify-center">
          <Button variant="ghost-dark" href="#">
            Follow on Instagram
          </Button>
        </div>
      </div>
    </section>
  )
}
