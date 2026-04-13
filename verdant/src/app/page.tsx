import { HeroSection } from '@/components/home/HeroSection'
import { LogoBar } from '@/components/home/LogoBar'
import { ManifestoSection } from '@/components/home/ManifestoSection'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { FeaturedProject } from '@/components/home/FeaturedProject'
import { ProcessTeaser } from '@/components/home/ProcessTeaser'
import { SeasonalBanner } from '@/components/home/SeasonalBanner'
import { Testimonials } from '@/components/home/Testimonials'
import { InstagramPlaceholder } from '@/components/home/InstagramPlaceholder'
import { FinalCTA } from '@/components/home/FinalCTA'

export const metadata = {
  title: {
    absolute: 'Verdant Landscape Design | We Build Outdoor Worlds',
  },
  description:
    'Luxury landscape design for the Adirondack region. Hardscape, pools, outdoor kitchens, and full property transformations.',
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <LogoBar />
      <ManifestoSection />
      <ServicesPreview />
      <FeaturedProject />
      <ProcessTeaser />
      <SeasonalBanner />
      <Testimonials />
      <InstagramPlaceholder />
      <FinalCTA />
    </main>
  )
}
