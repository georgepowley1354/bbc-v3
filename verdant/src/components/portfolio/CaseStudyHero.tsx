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
    <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-forest-deep">
      <Image
        src={project.heroImage}
        alt={`${project.name} in ${project.location}`}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,8,0.14),rgba(7,12,8,0.84))]" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-12 lg:px-20"
        initial={prefersReducedMotion ? undefined : 'hidden'}
        animate="visible"
        variants={prefersReducedMotion ? undefined : stagger}
      >
        <motion.div
          className="max-w-3xl rounded-[34px] border border-white/10 bg-black/16 p-8 backdrop-blur-xl md:p-10"
          variants={prefersReducedMotion ? undefined : fadeUp}
        >
          <div className="mb-4 w-12 border-t border-gold" />
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">
            {project.category}
          </p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[0.98] text-white md:text-7xl">
            {project.name}
          </h1>
          <p className="mt-5 font-sans text-base leading-7 text-white/82 md:text-lg">
            {project.location} · {project.timeline} · {project.investmentRange}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
