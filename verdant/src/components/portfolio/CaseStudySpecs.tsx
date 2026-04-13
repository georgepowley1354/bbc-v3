import { Check } from 'lucide-react'
import { Project } from '@/types'

interface CaseStudySpecsProps {
  project: Project
}

export function CaseStudySpecs({ project }: CaseStudySpecsProps) {
  return (
    <section className="bg-stone-warm py-section">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-20">
        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
            Project narrative
          </p>
          <p className="mt-5 font-display text-3xl italic leading-[1.35] text-text-secondary">
            “{project.description.split('. ')[0]}.”
          </p>
          <p className="mt-6 font-sans text-base leading-8 text-text-secondary">
            {project.description}
          </p>
          <div className="mt-10 rounded-[28px] bg-forest-deep px-6 py-6 text-white">
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold/90">
              Outcome
            </p>
            <p className="mt-3 font-display text-3xl leading-[1.2]">
              {project.outcome}
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-[28px] border border-stone-dark/70 bg-stone-mid p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
              Project details
            </p>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="font-sans text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  Location
                </dt>
                <dd className="mt-1 font-sans text-base text-text-secondary">{project.location}</dd>
              </div>
              <div>
                <dt className="font-sans text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  Investment
                </dt>
                <dd className="mt-1 font-sans text-base font-medium text-sage">{project.investmentRange}</dd>
              </div>
              <div>
                <dt className="font-sans text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  Timeline
                </dt>
                <dd className="mt-1 font-sans text-base text-text-secondary">{project.timeline}</dd>
              </div>
              <div>
                <dt className="font-sans text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  Category
                </dt>
                <dd className="mt-1 font-sans text-base text-text-secondary">{project.category}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[28px] border border-stone-dark/70 bg-stone-mid p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
              Materials used
            </p>
            <ul className="mt-6 space-y-3">
              {project.materials.map((material) => (
                <li key={material} className="flex items-start gap-3">
                  <Check className="mt-0.5 shrink-0 text-sage" size={16} aria-hidden="true" />
                  <span className="font-sans text-base text-text-secondary">{material}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-stone-dark/70 bg-stone-mid p-6 md:col-span-2">
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
              Project highlights
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="rounded-[24px] border border-white/50 bg-white/40 p-5">
                  <span className="font-sans text-sm leading-7 text-text-secondary">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
