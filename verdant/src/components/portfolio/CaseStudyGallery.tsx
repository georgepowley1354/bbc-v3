'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger } from '@/constants/animation'
import SectionHeader from '@/components/ui/SectionHeader'
import { BeforeAfterSlider } from '@/components/portfolio/BeforeAfterSlider'

interface CaseStudyGalleryProps {
  images: string[]
  projectName: string
  beforeImage: string
  afterImage: string
}

export function CaseStudyGallery({
  images,
  projectName,
  beforeImage,
  afterImage,
}: CaseStudyGalleryProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-stone-mid py-section">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <SectionHeader
          eyebrow="Transformation"
          headline="See the property shift"
          body="From first site conditions to the final reveal, every Verdant project is built to feel more resolved, more generous, and more valuable than what stood there before."
          className="mb-12"
        />

        <BeforeAfterSlider
          beforeImage={beforeImage}
          afterImage={afterImage}
          projectName={projectName}
        />

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2"
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={prefersReducedMotion ? undefined : stagger}
        >
          {images.map((src, index) => (
            <motion.div
              key={src}
              className="relative overflow-hidden rounded-[28px]"
              variants={prefersReducedMotion ? undefined : fadeUp}
            >
              <div className="absolute left-4 top-4 z-10 rounded-full bg-white/78 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-forest-deep">
                Detail {index + 1}
              </div>
              <div className="relative aspect-[4/3]">
                <Image
                  src={src}
                  alt={`${projectName} gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
