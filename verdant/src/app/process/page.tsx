import { stages } from '@/data/process'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { ProcessTimeline } from '@/components/process/ProcessTimeline'

export const metadata = {
  title: 'Our Process',
  description:
    'From discovery consultation to aftercare, our six-stage process is built for luxury outdoor environments.',
}

export default function ProcessPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-[radial-gradient(circle_at_top_right,rgba(184,147,75,0.14),transparent_26%),linear-gradient(180deg,#0f1210_0%,#0c0f0d_100%)] pt-32 pb-section-sm md:pb-section">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
          <SectionHeader
            eyebrow="How it works"
            headline="From vision to reality"
            body="Every Verdant project follows a deliberate six-stage process, from the first site visit to the seasonal care plan that keeps your landscape thriving for years to come."
            className="mb-12 md:mb-16"
            as="h1"
            dark={true}
          />
        </div>
      </section>

      <section className="bg-stone-warm pb-section-sm md:pb-section">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
          <div className="overflow-hidden rounded-[42px] border border-forest-deep/8 bg-[radial-gradient(circle_at_top_right,rgba(184,147,75,0.16),transparent_24%),linear-gradient(180deg,#151c17_0%,#0f1210_100%)] px-6 py-8 shadow-[0_28px_90px_rgba(28,43,30,0.10)] md:px-10 md:py-10">
          <ProcessTimeline stages={stages} />
          </div>
        </div>
      </section>

      <section className="bg-stone-warm py-section text-center">
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeader
            eyebrow="Begin with discovery"
            headline="Start with a conversation"
            body="The first step is always the same: we listen. Tell us about your property and how you want to live outdoors."
            className="mb-10 items-center text-center [&>*]:mx-auto"
          />
          <Button variant="primary" href="/contact" className="rounded-full px-8">
            Schedule a consultation
          </Button>
        </div>
      </section>
    </main>
  )
}
