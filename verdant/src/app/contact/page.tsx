import { ContactForm } from '@/components/contact/ContactForm'
import { ServiceAreaMap } from '@/components/contact/ServiceAreaMap'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata = {
  title: 'Start a Project',
  description:
    'Request a premium landscape consultation for Saratoga Springs, Lake George, and the Capital Region.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-stone-warm">
      <section className="bg-[radial-gradient(circle_at_top_right,rgba(184,147,75,0.14),transparent_26%),linear-gradient(180deg,#0f1210_0%,#0c0f0d_100%)] pt-32 pb-section-sm md:pb-section">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
          <SectionHeader
            eyebrow="Start your project"
            headline="A premium inquiry, designed to qualify the right work."
            body="Verdant takes on a limited number of projects each season. Share your scope, investment range, and timeline, and we'll tell you quickly whether the fit is right."
            dark={true}
            as="h1"
          />
        </div>
      </section>

      <section className="py-section">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-12 lg:grid-cols-[1.08fr_0.92fr] lg:px-20">
          <ContactForm />
          <div className="space-y-8">
            <ServiceAreaMap />
            <div className="rounded-[32px] border border-stone-dark/70 bg-stone-mid p-6 shadow-[0_24px_60px_rgba(28,43,30,0.08)]">
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
                Ideal fit
              </p>
              <h3 className="mt-3 font-display text-3xl text-text-primary">
                Best suited for full-property transformations and layered outdoor living
                environments.
              </h3>
              <ul className="mt-6 space-y-3 font-sans text-base leading-7 text-text-secondary">
                <li>Projects beginning at $25k with strong alignment from $50k+</li>
                <li>Estate gardens, terraces, pools, and outdoor kitchens</li>
                <li>Homeowners who value design clarity, permanence, and restraint</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
