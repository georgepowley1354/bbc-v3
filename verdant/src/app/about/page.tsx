import { studio, philosophy } from '@/data/about'
import { FounderSection } from '@/components/about/FounderSection'
import { PhilosophySection } from '@/components/about/PhilosophySection'
import { CredentialsGrid } from '@/components/about/CredentialsGrid'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'About',
  description:
    'Learn the story behind Verdant Landscape Design, a boutique studio creating luxury outdoor worlds across Saratoga Springs, Lake George, and the Capital Region.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero strip */}
      <section className="bg-[radial-gradient(circle_at_top_right,rgba(184,147,75,0.14),transparent_28%),linear-gradient(180deg,#0f1210_0%,#0c0f0d_100%)] pt-32 pb-section-sm md:pb-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <SectionHeader
            eyebrow="OUR STORY"
            headline="A studio built for outdoor worlds that feel inherited."
            body="Verdant was created for homeowners who want more than landscaping. The studio blends architecture, planting, grading, stonework, and outdoor living into landscapes that feel permanent, calm, and inseparable from the property."
            dark={true}
          />
        </div>
      </section>

      <FounderSection
        name={studio.name}
        title={studio.title}
        eyebrow={studio.eyebrow}
        imageAlt={studio.alt}
        bio={studio.story}
        photoUrl={studio.photoUrl}
      />

      <PhilosophySection pullQuote={philosophy.pullQuote} statement={philosophy.statement} />

      <CredentialsGrid credentials={studio.credentials} />

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
