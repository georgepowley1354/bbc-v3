import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, projects } from '@/data/projects'
import { CaseStudyHero } from '@/components/portfolio/CaseStudyHero'
import { CaseStudySpecs } from '@/components/portfolio/CaseStudySpecs'
import { CaseStudyGallery } from '@/components/portfolio/CaseStudyGallery'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}

  return {
    title: project.name,
    description: project.description,
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const currentIndex = projects.findIndex((entry) => entry.slug === params.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <main>
      <CaseStudyHero project={project} />
      <CaseStudySpecs project={project} />
      <CaseStudyGallery
        images={project.galleryImages}
        projectName={project.name}
        beforeImage={project.beforeImage}
        afterImage={project.afterImage}
      />

      <section className="bg-forest-deep py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-white/60">
            Next project
          </p>
          <h3 className="mt-4 font-display text-4xl text-white">{nextProject.name}</h3>
          <p className="mt-4 font-sans text-base leading-7 text-white/80">
            Another estate transformation shaped with the same level of restraint, detail, and permanence.
          </p>
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="mt-8 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.14em] text-gold transition-colors duration-200 hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest-deep"
            aria-label={`View ${nextProject.name} case study`}
          >
            View case study →
          </Link>
        </div>
      </section>

      <section className="bg-stone-warm py-section text-center">
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeader
            eyebrow="Start your project"
            headline="Ready to shape your own outdoor world?"
            body="Every significant landscape starts with a conversation about the land, the architecture, and the way you want to live outdoors."
            className="mb-10 items-center text-center [&>*]:mx-auto"
          />
          <Button variant="primary" href="/contact" className="rounded-full px-8">
            Book a consultation
          </Button>
        </div>
      </section>
    </main>
  )
}
