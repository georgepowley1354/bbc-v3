export interface Credential {
  body: string
  year: string
  detail?: string
}

export const studio = {
  name: 'Verdant Landscape Design',
  title: 'Luxury landscape and outdoor living studio',
  eyebrow: 'The Verdant Studio',
  alt: 'Verdant landscape studio team reviewing garden and property plans outdoors',
  story: [
    'Verdant Landscape Design began as a quiet refusal to treat luxury properties like checklists. Long before the studio had a name, its early work was shaped by a simple belief: the most valuable landscapes are not the loudest ones, but the ones that feel inevitable to the land they belong to.',
    'The studio formally took shape in Saratoga Springs in 2012, built around a cross-disciplinary team of landscape designers, planting specialists, stone artisans, and site planners who shared an obsession with proportion, restraint, and permanence. Verdant was never meant to be a volume operation. From the beginning, it was designed as a boutique practice for homeowners who wanted a property to feel fully composed, not merely improved.',
    'Today Verdant serves Saratoga Springs, Lake George, and the wider Capital Region with projects that blend architecture, grading, planting, water, lighting, and outdoor living into one coherent experience. Each commission begins with the same question: what should this property feel like five years from now, once the materials have softened, the plantings have matured, and the work has settled naturally into place?',
  ],
  photoUrl:
    'https://images.unsplash.com/photo-1769787641374-cb51b024762a?w=900&h=1200&q=80&auto=format&fit=crop',
  credentials: [
    {
      body: 'Boutique studio founded in Saratoga Springs',
      year: '2012',
      detail: 'Created to serve legacy-minded residential properties across the Adirondack region',
    },
    {
      body: 'Integrated hardscape, planting, and outdoor-living practice',
      year: '2016',
      detail: 'Expanded from design consultancy into full property-scale planning and build orchestration',
    },
    {
      body: 'Regional network of specialty craftspeople',
      year: '2018',
      detail: 'Stone, timber, irrigation, lighting, and planting partners aligned to Verdant standards',
    },
    {
      body: 'Estate-focused project model',
      year: '2021',
      detail: 'Refined around fewer projects, deeper planning, and higher-touch client communication',
    },
    {
      body: 'Known for calm, permanent outdoor worlds',
      year: '2023',
      detail: 'A reputation built through referral-led work across Saratoga, Lake George, and the Capital Region',
    },
    {
      body: 'Now booking seasonal flagship commissions',
      year: '2026',
      detail: 'Selective project calendar prioritizing full-property transformations and layered outdoor living',
    },
  ] as Credential[],
} as const

export const philosophy = {
  statement: [
    'Verdant believes a landscape should feel quieter and more complete after design, not more decorated. The studio favors fewer materials, stronger lines, better drainage, deeper planting logic, and outdoor rooms that hold up long after the reveal photography is gone.',
    'That philosophy is why Verdant approaches every commission as a long-view composition. Terraces are positioned for the real light. Garden rooms are scaled to the architecture. Planting palettes are built to mature beautifully rather than peak once. The goal is never spectacle for its own sake. It is the rare feeling that the property has become more itself than it was before.',
  ],
  pullQuote: 'Luxury is not more elements. It is greater coherence.',
}
