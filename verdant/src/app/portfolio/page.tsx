import SectionHeader from '@/components/ui/SectionHeader'
import { MasonryGrid } from '@/components/portfolio/MasonryGrid'

export const metadata = {
  title: 'Portfolio',
  description:
    'Browse our portfolio of luxury landscape design projects across the Adirondack region.',
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-[radial-gradient(circle_at_top_right,rgba(184,147,75,0.14),transparent_26%),linear-gradient(180deg,#0f1210_0%,#0c0f0d_100%)] pt-32 pb-section-sm md:pb-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader
          eyebrow="OUR WORK"
          headline="Every Project, A Living World"
          body="Five unique landscapes, each shaped to the land and the life that unfolds within it."
          as="h1"
          dark={true}
        />
        </div>
      </section>
      <section className="bg-stone-warm py-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <MasonryGrid />
        </div>
      </section>
    </main>
  )
}
