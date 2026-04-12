'use client'

import { Project } from '@/types'

type FilterCategory = 'All' | Project['category']

const CATEGORIES: FilterCategory[] = [
  'All',
  'Hardscape',
  'Softscape',
  'Pool',
  'Kitchen',
  'Full Property',
]

interface FilterBarProps {
  activeFilter: FilterCategory
  onFilter: (category: FilterCategory) => void
}

export function FilterBar({ activeFilter, onFilter }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-6 mb-10" role="group" aria-label="Filter projects by category">
      {CATEGORIES.map((category) => {
        const isActive = category === activeFilter
        return (
          <button
            key={category}
            onClick={() => onFilter(category)}
            className={`font-sans text-[13px] uppercase tracking-[0.1em] pb-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 ${
              isActive
                ? 'text-sage border-b-2 border-sage'
                : 'text-text-muted hover:text-text-secondary border-b-2 border-transparent'
            }`}
            aria-pressed={isActive}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
