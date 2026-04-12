import { Check } from 'lucide-react'
import { Project } from '@/types'

interface CaseStudySpecsProps {
  project: Project
}

export function CaseStudySpecs({ project }: CaseStudySpecsProps) {
  return (
    <section className="bg-stone-warm py-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — pull quote + description */}
          <div>
            <p className="font-display italic text-2xl text-text-secondary leading-relaxed mb-6">
              &ldquo;{project.description.split('. ')[0]}.&rdquo;
            </p>
            <p className="font-sans text-base text-text-secondary leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Right — specs + highlights */}
          <div>
            {/* Spec definition list */}
            <dl className="space-y-5 mb-10">
              <div className="flex flex-col gap-1">
                <dt className="font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  Location
                </dt>
                <dd className="font-sans text-base text-text-secondary">{project.location}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  Category
                </dt>
                <dd className="font-sans text-base text-text-secondary">{project.category}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  Investment Range
                </dt>
                <dd className="font-sans text-base text-sage font-medium">
                  {project.investmentRange}
                </dd>
              </div>
            </dl>

            {/* Project highlights */}
            <div>
              <p className="font-sans text-[12px] uppercase tracking-[0.15em] font-medium text-text-muted mb-4">
                Project Highlights
              </p>
              <ul className="space-y-3">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className="text-sage mt-0.5 shrink-0"
                      size={16}
                      aria-hidden="true"
                    />
                    <span className="font-sans text-base text-text-secondary">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
