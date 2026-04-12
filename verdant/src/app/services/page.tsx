import { services } from '@/data/services'
import SectionHeader from '@/components/ui/SectionHeader'
import { ServiceCardGrid } from '@/components/services/ServiceCardGrid'

export const metadata = {
  title: 'Services | Verdant Landscape Design',
  description:
    'Five ways we transform your property — hardscape, softscape, pool, outdoor kitchens, and full property design.',
}

export default function ServicesPage() {
  return (
    <main className="bg-stone-warm min-h-screen">
      {/* Hero strip */}
      <section className="bg-forest-deep pt-32 pb-section-sm md:pb-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <SectionHeader
            eyebrow="WHAT WE BUILD"
            headline="Five Ways We Shape Your Property"
            dark={true}
          />
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-stone-warm py-section-sm md:py-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <ServiceCardGrid services={services} />
        </div>
      </section>
    </main>
  )
}
