export interface Credential {
  body: string
  year: string
  detail?: string
}

export const founder = {
  name: 'Marcus Velde',
  title: 'Principal, Verdant Landscape Design',
  bio: [
    'Marcus Velde founded Verdant in 2012 after a decade practicing architecture in Manhattan — and a lifetime spent in the Adirondack foothills that eventually pulled him home. His work draws from both disciplines: the precision of architectural detailing and the patience of working with living systems.',
    "Every Verdant project begins with the land itself. Before a single stone is placed or a plant is selected, Marcus and his team study the site's topography, light patterns, drainage, and existing ecology. The design grows from those conditions — not against them.",
    'The result is landscape architecture that feels as though it was always there. Terraces that follow the natural grade. Plantings that thrive without fighting the climate. Outdoor rooms that frame the views the property was built to capture.',
  ],
  photoUrl:
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&q=80&auto=format&fit=crop',
  credentials: [
    {
      body: 'APLD Certified Landscape Designer',
      year: '2014',
      detail: 'Association of Professional Landscape Designers',
    },
    {
      body: 'LEED AP — Landscape & Exterior Design',
      year: '2016',
      detail: 'U.S. Green Building Council',
    },
    {
      body: 'ISA Certified Arborist',
      year: '2018',
      detail: 'International Society of Arboriculture',
    },
    {
      body: 'NYSLDA Design Excellence Award',
      year: '2021',
      detail: 'New York State Landscape Designers Association',
    },
    {
      body: 'AIA Residential Design Citation',
      year: '2023',
      detail: 'American Institute of Architects, Eastern NY Chapter',
    },
    {
      body: 'Saratoga Living Best of the Best — Landscape Design',
      year: '2024',
      detail: 'Regional publication award, three consecutive years',
    },
  ] as Credential[],
} as const

export const philosophy = {
  statement: [
    "We believe the best landscapes are the ones you forget were designed. When stone, water, and planting compose themselves around the way a family actually lives outdoors — when a terrace catches the last light at exactly the hour you sit down to dinner — that's not an accident. That's the result of listening longer than most designers are willing to.",
    "Our work is rooted in restraint. We use fewer materials, placed with greater intention. We choose native species that don't need to be replaced every three years. We build structures heavy enough to outlast the mortgage. The properties we design are not showrooms — they're places where children grow up, where seasons turn, where the boundary between inside and outside quietly dissolves.",
  ],
  pullQuote: 'The best landscapes are the ones you forget were designed.',
}
