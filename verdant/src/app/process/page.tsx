import { stages } from '@/data/process'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { ProcessTimeline } from '@/components/process/ProcessTimeline'

export const metadata = {
  title: 'Our Process | Verdant Landscape Design',
  description:
    'From discovery consultation to aftercare — our 6-stage process for designing and building luxury outdoor environments.',
}

export default function ProcessPage() {
  return (
    <main className="min-h-screen">
      {/* Full-page dark background */}
      <section className="bg-forest-deep pt-32 pb-section-sm md:pb-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <SectionHeader
            eyebrow="HOW IT WORKS"
            headline="From Vision to Reality"
            body="Every Verdant project follows a deliberate six-stage process — from the first site visit to the seasonal care plan that keeps your landscape thriving for years to come."
            dark={true}
            className="mb-16"
          />

          <ProcessTimeline stages={stages} />
        </div>
      </section>

      {/* CTA — light section at bottom */}
      <section className="bg-stone-warm py-section text-center">
        <div className="max-w-2xl mx-auto px-6">
          <SectionHeader
            eyebrow="BEGIN WITH DISCOVERY"
            headline="Start With a Conversation"
            body="The first step is always the same — we listen. Tell us about your property and how you want to live outdoors."
            className="mb-10 items-center text-center [&>*]:mx-auto"
          />
          <Button variant="primary" href="/contact">
            Schedule a Consultation
          </Button>
        </div>
      </section>
    </main>
  )
}
