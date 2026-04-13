'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp, fadeIn, stagger } from '@/constants/animation'
import Button from '@/components/ui/Button'

export function FeaturedProject() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-forest-deep py-section text-white" aria-labelledby="featured-project-headline">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <MotionDiv
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
        >
          <MotionDiv className="grid gap-4" variants={prefersReducedMotion ? undefined : fadeIn}>
            <div className="relative overflow-hidden rounded-[36px]">
              <div className="absolute left-5 top-5 z-10 rounded-full bg-white/82 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-forest-deep">
                Featured transformation
              </div>
              <div className="relative aspect-[16/10]">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop"
                  alt="Luxury stone terrace with panoramic lake view and outdoor seating"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/6 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold/85">Before</p>
                <p className="mt-3 font-sans text-sm leading-7 text-white/80">
                  A steep, underused edge with beautiful views and no practical place to gather.
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/6 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold/85">After</p>
                <p className="mt-3 font-sans text-sm leading-7 text-white/80">
                  A lake-facing entertaining terrace with integrated fire, planting, and structure.
                </p>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv className="max-w-xl" variants={prefersReducedMotion ? undefined : fadeUp}>
            <div className="w-12 border-t border-gold" />
            <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
              Case study
            </p>
            <h2
              id="featured-project-headline"
              className="mt-6 font-display text-5xl font-light leading-[1.02] md:text-6xl"
            >
              The Adirondack Terrace
            </h2>
            <p className="mt-6 font-sans text-lg leading-8 text-white/82">
              A full-property intervention on the edge of Lake George, designed to turn a difficult
              grade change into the most memorable part of the estate.
            </p>
            <div className="mt-8 grid gap-5 border-y border-white/10 py-8 md:grid-cols-3">
              <div>
                <p className="font-display text-3xl">$180k+</p>
                <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.16em] text-white/60">
                  Investment
                </p>
              </div>
              <div>
                <p className="font-display text-3xl">4,200 sq ft</p>
                <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.16em] text-white/60">
                  Stone terrace
                </p>
              </div>
              <div>
                <p className="font-display text-3xl">14 weeks</p>
                <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.16em] text-white/60">
                  Build window
                </p>
              </div>
            </div>
            <p className="mt-8 font-sans text-base leading-7 text-white/80">
              Designed to frame the view, manage water elegantly, and give the family a true
              evening destination with privacy built into the planting strategy.
            </p>
            <div className="mt-10">
              <Button variant="ghost" href="/portfolio/adirondack-terrace" className="rounded-full px-8">
                View case study
              </Button>
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  )
}
