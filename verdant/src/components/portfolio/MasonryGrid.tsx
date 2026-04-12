'use client'

import { useState } from 'react'
import { Project } from '@/types'
import { projects } from '@/data/projects'
import { FilterBar } from './FilterBar'
import { ProjectCard } from './ProjectCard'
import useMasonry from '@/hooks/useMasonry'

type FilterCategory = 'All' | Project['category']

export function MasonryGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All')
  const masonryContainer = useMasonry()

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <div>
      <FilterBar activeFilter={activeFilter} onFilter={setActiveFilter} />
      <div
        ref={masonryContainer}
        className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
