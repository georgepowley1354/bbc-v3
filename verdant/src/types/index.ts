export interface Project {
  id: string
  slug: string
  name: string
  category: 'Hardscape' | 'Softscape' | 'Pool' | 'Kitchen' | 'Full Property'
  location: string
  investmentRange: string
  timeline: string
  heroImage: string
  beforeImage: string
  afterImage: string
  galleryImages: string[]
  description: string
  highlights: string[]
  materials: string[]
  outcome: string
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

export type ProjectType =
  | 'Hardscape'
  | 'Softscape'
  | 'Pool & Water'
  | 'Outdoor Kitchen'
  | 'Full Property Design'
  | 'Maintenance Plan'

export type BudgetRange = '$25k-50k' | '$50k-100k' | '$100k+'

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
