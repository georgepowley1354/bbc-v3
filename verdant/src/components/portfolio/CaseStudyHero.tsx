'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Project } from '@/types'
import { fadeUp, stagger } from '@/constants/animation'

interface CaseStudyHeroProps {
  project: Project
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden">
      {/* Hero image */}
      <Image
        src={project.heroImage}
        alt={`${project.name} — ${project.location}`}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Forest-deep gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/10" />

      {/* Content */}
      <motion.div
        className="relative z-10 pb-16 px-8 md:px-16 w-full"
        initial={prefersReducedMotion ? undefined : stagger.visible ? 'hidden' : 'hidden'}
        animate="visible"
        variants={stagger}
      >
        {/* Gold rule */}
        <div className="w-12 h-px bg-gold mb-3" />

        {/* Category eyebrow */}
        <motion.p
          className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold mb-4"
          variants={prefersReducedMotion ? undefined : fadeUp}
        >
          {project.category}
        </motion.p>

        {/* Project name */}
        <motion.h1
          className="font-display text-4xl md:text-6xl text-white font-light leading-tight mb-3"
          variants={prefersReducedMotion ? undefined : fadeUp}
        >
          {project.name}
        </motion.h1>

        {/* Location */}
        <motion.p
          className="font-sans text-white/60 text-base mt-1"
          variants={prefersReducedMotion ? undefined : fadeUp}
        >
          {project.location}
        </motion.p>
      </motion.div>
    </section>
  )
}
