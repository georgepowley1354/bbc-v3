export interface Project {
  id: string
  slug: string
  name: string
  category: 'Hardscape' | 'Softscape' | 'Pool' | 'Kitchen' | 'Full Property'
  location: string
  investmentRange: string
  heroImage: string
  galleryImages: string[]
  description: string
  highlights: string[]
}
