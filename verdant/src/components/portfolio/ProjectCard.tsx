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
      className="group block bg-stone-mid border-l-2 border-transparent hover:border-sage transition-colors duration-300"
    >
      {/* Image — top 60% */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.heroImage}
          alt={`${project.name} landscape project in ${project.location}`}
          fill
          className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content — bottom 40% */}
      <div className="p-6">
        {/* Category eyebrow */}
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-text-muted mb-2">
          {project.category}
        </p>

        {/* Project name */}
        <h3 className="font-display text-2xl text-text-primary leading-snug mb-1">
          {project.name}
        </h3>

        {/* Location */}
        <p className="font-sans text-sm text-text-muted mb-2">{project.location}</p>

        {/* Investment range */}
        <p className="font-sans text-sm text-sage mb-4">{project.investmentRange}</p>

        {/* CTA */}
        <span className="font-sans text-[13px] text-text-secondary group-hover:text-sage transition-colors duration-300">
          &rarr; View Case Study
        </span>
      </div>
    </Link>
  )
}
