import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getServiceBySlug, services } from '@/data/services'
import { getProjectBySlug } from '@/data/projects'
import { ServiceHero } from '@/components/services/ServiceHero'
import { ServiceOutcomes } from '@/components/services/ServiceOutcomes'
import { ServiceGallery } from '@/components/services/ServiceGallery'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  return {
    title: service.name,
    description: service.tagline,
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  // Next service (wrap around)
  const currentIndex = services.findIndex((s) => s.slug === params.slug)
  const nextService = services[(currentIndex + 1) % services.length]

  // Related projects
  const relatedProjects = service.relatedProjects
    .map((slug) => getProjectBySlug(slug))
    .filter(Boolean)

  return (
    <main>
      <ServiceHero service={service} />
      <ServiceOutcomes service={service} />
      <ServiceGallery images={service.galleryImages} serviceName={service.name} />

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-stone-warm py-section-sm md:py-section">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <SectionHeader
              eyebrow="RELATED WORK"
              headline="See It in Practice"
              className="mb-10"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((project) => project && (
                <Link
                  key={project.slug}
                  href={`/portfolio/${project.slug}`}
                  className="block bg-stone-mid p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-text-muted mb-2">
                    {project.category}
                  </p>
                  <h3 className="font-display text-2xl text-text-primary mb-2">
                    {project.name}
                  </h3>
                  <p className="font-sans text-sm text-sage">
                    {project.investmentRange}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next service */}
      <section className="bg-forest-deep py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-sans text-[12px] uppercase tracking-[0.2em] text-white/40 mb-2">
            Next Service
          </p>
          <h3 className="font-display text-3xl text-white mb-6">{nextService.name}</h3>
          <Link
            href={`/services/${nextService.slug}`}
            className="font-sans text-sm text-gold hover:text-gold-light transition-colors duration-200 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest-deep"
            aria-label={`View ${nextService.name} service`}
          >
            Explore Service &rarr;
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
