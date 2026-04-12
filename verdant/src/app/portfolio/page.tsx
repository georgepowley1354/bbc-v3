import SectionHeader from '@/components/ui/SectionHeader'
import { MasonryGrid } from '@/components/portfolio/MasonryGrid'

export const metadata = {
  title: 'Portfolio | Verdant Landscape Design',
  description:
    'Browse our portfolio of luxury landscape design projects across the Adirondack region.',
}

export default function PortfolioPage() {
  return (
    <main className="bg-stone-warm min-h-screen">
      <section className="pt-32 py-section max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeader
          eyebrow="OUR WORK"
          headline="Every Project, A Living World"
          body="Five unique landscapes, each shaped to the land and the life that unfolds within it."
        />
        <div className="mt-16">
          <MasonryGrid />
        </div>
      </section>
    </main>
  )
}
