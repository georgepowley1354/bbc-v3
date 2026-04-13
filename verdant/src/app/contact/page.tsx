import { ContactForm } from '@/components/contact/ContactForm'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata = {
  title: 'Start a Project | Verdant Landscape Design',
  description:
    'Tell us about your property and vision. Our team will review your inquiry and respond within 48 hours.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Dark hero strip — mirrors about/process pattern */}
      <section className="bg-forest-deep pt-32 pb-section-sm md:pb-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <SectionHeader
            eyebrow="START YOUR PROJECT"
            headline="Let's Build Something Lasting"
            body="Every project begins with a conversation. Tell us about your property, your vision, and your timeline — we'll respond within 48 hours."
            dark={true}
          />
        </div>
      </section>

      {/* Light form section */}
      <section className="bg-stone-warm py-section">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
