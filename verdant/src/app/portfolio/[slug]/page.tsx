import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, projects } from '@/data/projects'
import { CaseStudyHero } from '@/components/portfolio/CaseStudyHero'
import { CaseStudySpecs } from '@/components/portfolio/CaseStudySpecs'
import { CaseStudyGallery } from '@/components/portfolio/CaseStudyGallery'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: `${project.name} | Verdant Portfolio`,
    description: project.description,
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  // Next project (wrap around)
  const currentIndex = projects.findIndex((p) => p.slug === params.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <main>
      <CaseStudyHero project={project} />
      <CaseStudySpecs project={project} />
      <CaseStudyGallery images={project.galleryImages} projectName={project.name} />

      {/* Next project */}
      <section className="bg-forest-deep py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-sans text-[12px] uppercase tracking-[0.2em] text-white/40 mb-2">
            Next Project
          </p>
          <h3 className="font-display text-3xl text-white mb-6">{nextProject.name}</h3>
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="font-sans text-sm text-gold hover:text-gold-light transition-colors duration-200 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest-deep"
            aria-label={`View ${nextProject.name} case study`}
          >
            View Case Study &rarr;
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-warm py-section text-center">
        <div className="max-w-2xl mx-auto px-6">
          <SectionHeader
            eyebrow="START YOUR PROJECT"
            headline="Ready to Start Your Outdoor World?"
            body="Every great landscape begins with a conversation. Tell us about your property and vision."
            className="mb-10 items-center text-center [&>*]:mx-auto"
          />
          <Button variant="primary" href="/contact">
            Start a Project
          </Button>
        </div>
      </section>
    </main>
  )
}
