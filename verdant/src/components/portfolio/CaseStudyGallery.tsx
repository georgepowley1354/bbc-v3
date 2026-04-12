'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger } from '@/constants/animation'
import SectionHeader from '@/components/ui/SectionHeader'

interface CaseStudyGalleryProps {
  images: string[]
  projectName: string
}

export function CaseStudyGallery({ images, projectName }: CaseStudyGalleryProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-stone-mid py-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader eyebrow="PROJECT GALLERY" headline="In the Details" className="mb-12" />

        <motion.div
          className="grid sm:grid-cols-2 gap-4"
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={prefersReducedMotion ? undefined : stagger}
        >
          {images.map((src, i) => (
            <motion.div
              key={i}
              className="relative aspect-[4/3] overflow-hidden"
              variants={prefersReducedMotion ? undefined : fadeUp}
            >
              <Image
                src={src}
                alt={`${projectName} gallery image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
