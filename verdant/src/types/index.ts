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

// Contact form types
export type ProjectType =
  | 'Hardscape'
  | 'Softscape'
  | 'Pool & Water'
  | 'Outdoor Kitchen'
  | 'Full Property Design'
  | 'Maintenance Plan'

export type BudgetRange =
  | 'Under $25k'
  | '$25k – $75k'
  | '$75k – $150k'
  | '$150k – $300k'
  | '$300k+'

export type Timeline =
  | 'This season'
  | 'Within 6 months'
  | 'Within a year'
  | 'Planning ahead'

export interface ContactFormValues {
  name: string
  email: string
  phone: string
  projectType: ProjectType | ''
  budgetRange: BudgetRange | ''
  description: string
  timeline: Timeline | ''
}
