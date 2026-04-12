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

export interface Service {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  outcomes: string[]
  pricingRange: string
  pricingNote: string
  heroImage: string
  galleryImages: string[]
  icon: string
  relatedProjects: string[]
}
