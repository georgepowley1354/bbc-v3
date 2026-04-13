import { services } from '@/data/services'
import SectionHeader from '@/components/ui/SectionHeader'
import { ServiceCardGrid } from '@/components/services/ServiceCardGrid'

export const metadata = {
  title: 'Services',
  description:
    'Five ways we transform your property: hardscape, softscape, pool, outdoor kitchens, and full property design.',
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-stone-warm">
      <section className="bg-[radial-gradient(circle_at_top_right,rgba(184,147,75,0.14),transparent_26%),linear-gradient(180deg,#0f1210_0%,#0c0f0d_100%)] pt-32 pb-section-sm md:pb-section">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
          <SectionHeader
            eyebrow="What we build"
            headline="Five ways we shape your property"
            dark={true}
            as="h1"
          />
        </div>
      </section>

      <section className="bg-stone-warm py-section-sm md:py-section">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
          <ServiceCardGrid services={services} />
        </div>
      </section>
    </main>
  )
}
