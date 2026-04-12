'use client'

import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import SectionHeader from '@/components/ui/SectionHeader'
import { fadeUp, stagger } from '@/constants/animation'

interface Service {
  name: string
  slug: string
  description: string
  icon: React.ReactNode
}

// Custom SVG icons — 48×48 viewBox, strokeWidth 1.5, currentColor, no fill
const HardscapeIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Stone/paver grid pattern */}
    <rect x="6" y="6" width="16" height="10" rx="0.5" />
    <rect x="26" y="6" width="16" height="10" rx="0.5" />
    <rect x="6" y="20" width="11" height="10" rx="0.5" />
    <rect x="21" y="20" width="11" height="10" rx="0.5" />
    <rect x="36" y="20" width="6" height="10" rx="0.5" />
    <rect x="6" y="34" width="16" height="8" rx="0.5" />
    <rect x="26" y="34" width="16" height="8" rx="0.5" />
  </svg>
)

const SoftscapeIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Leaf/plant form */}
    <path d="M24 40 C24 40 24 20 12 10 C20 10 32 14 34 26" />
    <path d="M24 40 C24 40 24 20 36 10 C28 10 16 14 14 26" />
    <line x1="24" y1="40" x2="24" y2="28" />
    <path d="M18 34 Q24 28 30 32" />
  </svg>
)

const PoolIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Water ripple concentric */}
    <circle cx="24" cy="24" r="4" />
    <path d="M24 24 m-10 0 a10 10 0 0 1 20 0" />
    <path d="M24 24 m-16 0 a16 16 0 0 1 32 0" />
    <path d="M8 30 Q12 26 16 30 Q20 34 24 30 Q28 26 32 30 Q36 34 40 30" />
    <path d="M8 36 Q12 32 16 36 Q20 40 24 36 Q28 32 32 36 Q36 40 40 36" />
  </svg>
)

const KitchenIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Flame/grill */}
    <rect x="10" y="30" width="28" height="4" rx="1" />
    <rect x="8" y="34" width="32" height="6" rx="1" />
    <line x1="16" y1="30" x2="16" y2="34" />
    <line x1="24" y1="30" x2="24" y2="34" />
    <line x1="32" y1="30" x2="32" y2="34" />
    {/* Flame */}
    <path d="M20 28 C20 22 24 20 24 16 C24 20 28 22 28 28" />
    <path d="M22 28 C22 24 24 22 24 20 C24 22 26 24 26 28" />
  </svg>
)

const FullPropertyIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Property boundary outline with interior zones */}
    <rect x="6" y="6" width="36" height="36" rx="1" />
    <rect x="12" y="18" width="10" height="10" rx="0.5" />
    <rect x="26" y="12" width="12" height="12" rx="0.5" />
    <circle cx="16" cy="34" r="4" />
    <path d="M24 34 Q28 30 34 32 Q38 34 36 38 Q32 42 28 40 Q24 38 24 34Z" />
  </svg>
)

const services: Service[] = [
  {
    name: 'Hardscape Design',
    slug: 'hardscape',
    description:
      'Stone terraces, retaining walls, and paver systems built to last generations. We source regional bluestone and granite for authentic Adirondack character.',
    icon: <HardscapeIcon />,
  },
  {
    name: 'Softscape & Planting',
    slug: 'softscape',
    description:
      'Native and curated plantings that thrive in the Capital Region climate. Every composition is designed to evolve beautifully across all four seasons.',
    icon: <SoftscapeIcon />,
  },
  {
    name: 'Pool & Surround',
    slug: 'pool',
    description:
      'Poolscapes that integrate seamlessly with the natural landscape. From infinity edges to stone-coped perimeter terraces, we treat water as a design element.',
    icon: <PoolIcon />,
  },
  {
    name: 'Outdoor Kitchens',
    slug: 'outdoor-kitchens',
    description:
      'Full outdoor culinary environments with built-in grills, masonry ovens, and weatherproof storage — designed for the serious host.',
    icon: <KitchenIcon />,
  },
  {
    name: 'Full Property Design',
    slug: 'full-property',
    description:
      'Whole-property master plans that unify every outdoor zone into a coherent landscape. The most transformative work we do.',
    icon: <FullPropertyIcon />,
  },
]

export function ServicesPreview() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="bg-stone-warm py-section-sm md:py-section"
      aria-labelledby="services-headline"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <MotionDiv
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-14"
        >
          <SectionHeader
            eyebrow="WHAT WE BUILD"
            headline="Five Ways We Transform Your Property"
            dark={false}
          />
        </MotionDiv>

        {/* Services grid */}
        <MotionDiv
          variants={prefersReducedMotion ? undefined : stagger}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <MotionDiv
              key={service.slug}
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="group"
            >
              <Link
                href={`/services/${service.slug}`}
                className="block bg-stone-mid p-8 transition-shadow duration-300 hover:shadow-lg h-full"
                aria-label={`Learn about ${service.name}`}
              >
                <div className="text-forest-deep mb-6">{service.icon}</div>
                <h3 className="font-display text-2xl leading-[1.15] text-text-primary mb-4">
                  {service.name}
                </h3>
                <p className="font-sans text-base leading-[1.6] text-text-secondary">
                  {service.description}
                </p>
              </Link>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  )
}
