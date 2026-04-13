import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block overflow-hidden rounded-[30px] border border-stone-dark/10 bg-white/40 shadow-[0_20px_60px_rgba(28,43,30,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-sage/30 hover:shadow-[0_28px_70px_rgba(28,43,30,0.12)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.heroImage}
          alt={`${project.name} landscape project in ${project.location}`}
          fill
          className="object-cover transition-transform duration-[700ms] group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,24,17,0.02),rgba(16,24,17,0.24))]" />
        <div className="absolute left-5 top-5 rounded-full border border-white/35 bg-white/12 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          {project.category}
        </div>
      </div>

      <div className="p-6 md:p-7">
        <h3 className="font-display text-[30px] leading-[1.02] text-text-primary">
          {project.name}
        </h3>
        <p className="mt-2 font-sans text-sm uppercase tracking-[0.12em] text-text-muted">
          {project.location}
        </p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-stone-dark/10 pt-4">
          <p className="font-sans text-sm text-sage">{project.investmentRange}</p>
          <span className="font-sans text-[13px] uppercase tracking-[0.12em] text-text-secondary transition-colors duration-300 group-hover:text-sage">
            View Case Study
          </span>
        </div>
      </div>
    </Link>
  )
}
