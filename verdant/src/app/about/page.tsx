import { founder, philosophy } from '@/data/about'
import { FounderSection } from '@/components/about/FounderSection'
import { PhilosophySection } from '@/components/about/PhilosophySection'
import { CredentialsGrid } from '@/components/about/CredentialsGrid'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'About | Verdant Landscape Design',
  description:
    'Meet Marcus Velde, principal of Verdant Landscape Design. APLD certified, ISA arborist, designing luxury landscapes in the Capital Region since 2012.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero strip */}
      <section className="bg-forest-deep pt-32 pb-section-sm md:pb-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <SectionHeader
            eyebrow="OUR STORY"
            headline="Where Architecture Meets Nature"
            dark={true}
          />
        </div>
      </section>

      <FounderSection
        name={founder.name}
        title={founder.title}
        bio={founder.bio}
        photoUrl={founder.photoUrl}
      />

      <PhilosophySection pullQuote={philosophy.pullQuote} statement={philosophy.statement} />

      <CredentialsGrid credentials={founder.credentials} />

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
