import { Service } from '@/types'

export const services: Service[] = [
  {
    id: '1',
    slug: 'hardscape',
    name: 'Hardscape Design',
    tagline: 'Stone terraces, retaining walls, and paver systems built to last generations.',
    description:
      'We source regional bluestone and granite for authentic Adirondack character. Every stone is precision-set by hand, creating terraces, walkways, and retaining walls that anchor your property with permanence. Our hardscape work defines the bones of your outdoor world — the geometry that everything else grows around.',
    outcomes: [
      "Custom stone terrace or patio designed to your property's topography",
      'Precision-cut natural stone — bluestone, granite, or flagstone',
      'Integrated drainage engineering to protect your investment',
      'Retaining walls and grade transitions that feel intentional, not corrective',
    ],
    pricingRange: '$30,000–$65,000',
    pricingNote: 'Varies by square footage, stone selection, and grade complexity',
    heroImage:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&q=80&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&q=80&auto=format&fit=crop',
    ],
    icon: 'hardscape',
    relatedProjects: ['adirondack-terrace'],
  },
  {
    id: '2',
    slug: 'softscape',
    name: 'Softscape & Planting',
    tagline: 'Native and curated plantings that thrive in the Capital Region climate.',
    description:
      'Every composition is designed to evolve beautifully across all four seasons. We pair native species with ornamental cultivars chosen for hardiness, texture, and year-round interest — creating layered gardens that look considered from every angle, in every light.',
    outcomes: [
      'Four-season planting plan with species selected for Zone 4b-5a hardiness',
      'Native and pollinator-friendly plant palette',
      'Soil amendment and bed preparation for long-term plant health',
      'Integrated drip irrigation tailored to each planting zone',
    ],
    pricingRange: '$15,000–$45,000',
    pricingNote: 'Varies by property size, plant maturity, and irrigation scope',
    heroImage:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&q=80&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?w=800&h=600&q=80&auto=format&fit=crop',
    ],
    icon: 'softscape',
    relatedProjects: ['willowmere-garden'],
  },
  {
    id: '3',
    slug: 'pool',
    name: 'Pool & Surround',
    tagline: 'Poolscapes that integrate seamlessly with the natural landscape.',
    description:
      'From infinity edges to stone-coped perimeter terraces, we treat water as a design element — not a commodity. Every pool we design is sited to capture light, frame views, and dissolve the boundary between the built environment and the natural one.',
    outcomes: [
      'Custom pool design sited for sun exposure and privacy',
      'Natural stone coping and surround integrated with hardscape',
      'Equipment concealment and landscape screening',
      'Automated systems — covers, heating, lighting — for year-round use',
    ],
    pricingRange: '$80,000–$130,000',
    pricingNote: 'Varies by pool size, edge treatment, and automation package',
    heroImage:
      'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1200&h=800&q=80&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562184552-997c461f39c8?w=800&h=600&q=80&auto=format&fit=crop',
    ],
    icon: 'pool',
    relatedProjects: ['glasswater-pool'],
  },
  {
    id: '4',
    slug: 'outdoor-kitchens',
    name: 'Outdoor Kitchens',
    tagline: 'Full outdoor culinary environments designed for the serious host.',
    description:
      'We build complete outdoor kitchens with built-in grills, masonry ovens, and weatherproof storage — surrounded by stone, timber, and fire. Every surface is selected for its ability to age beautifully outdoors, turning cooking into an event and dinner into a destination.',
    outcomes: [
      'Professional-grade built-in grill with custom stone or masonry hood',
      'Weatherproof cabinetry, refrigeration, and prep surfaces',
      'Fieldstone or masonry fireplace or fire feature',
      'Covered dining area with lighting for evening use',
    ],
    pricingRange: '$45,000–$85,000',
    pricingNote: 'Varies by appliance selection, masonry scope, and cover structure',
    heroImage:
      'https://images.unsplash.com/photo-1564540574859-0dfb63985953?w=1200&h=800&q=80&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&q=80&auto=format&fit=crop',
    ],
    icon: 'outdoor-kitchens',
    relatedProjects: ['hearthstone-kitchen'],
  },
  {
    id: '5',
    slug: 'full-property',
    name: 'Full Property Design',
    tagline: 'Whole-property master plans that unify every outdoor zone into a coherent landscape.',
    description:
      'The most transformative work we do. A full property engagement means we design every outdoor element — hardscape, planting, water, fire, kitchen, lighting — as one integrated composition. The result is not a collection of features but a single, coherent landscape that unfolds through a carefully orchestrated sequence of spaces.',
    outcomes: [
      'Comprehensive master plan unifying all outdoor zones',
      'Phased installation timeline with priority sequencing',
      'Coordinated material palette across all elements',
      'Arrival sequence, garden rooms, and destination spaces all designed as one',
    ],
    pricingRange: '$120,000–$200,000+',
    pricingNote: 'Varies by property acreage, feature count, and phasing',
    heroImage:
      'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200&h=800&q=80&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&q=80&auto=format&fit=crop',
    ],
    icon: 'full-property',
    relatedProjects: ['ridgeline-estate'],
  },
]

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug)
