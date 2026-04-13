export interface ProcessStage {
  number: string
  name: string
  description: string
}

export const stages: ProcessStage[] = [
  {
    number: '01',
    name: 'Discovery',
    description:
      'We begin by listening — to your vision, your site, and how you live outdoors. A two-hour on-site consultation maps every possibility, from sun exposure and drainage patterns to the views worth framing and the ones worth screening.',
  },
  {
    number: '02',
    name: 'Design',
    description:
      'Our design team translates the consultation into a full landscape plan — material specifications, plant schedules, grading, irrigation, and lighting. You see exactly what your property will become before a single stone is moved.',
  },
  {
    number: '03',
    name: 'Proposal',
    description:
      'We present a transparent investment estimate alongside the final design. Scope, timeline, material selections, and phasing options are all documented. No surprises — just a clear path from plan to reality.',
  },
  {
    number: '04',
    name: 'Build',
    description:
      'Our craftspeople bring the plan to life with precision. Stone laid to last generations, plantings established for immediate impact and long-term beauty. A dedicated project manager keeps you informed at every stage.',
  },
  {
    number: '05',
    name: 'Reveal',
    description:
      'We walk the completed project together — every terrace, planting bed, and sight line. A professional photographer documents the work. Any punch list items are addressed before we consider the project complete.',
  },
  {
    number: '06',
    name: 'Aftercare',
    description:
      'Your landscape is a living system. We provide a seasonal maintenance plan, plant establishment monitoring, and priority scheduling for any adjustments during the first growing season.',
  },
]
