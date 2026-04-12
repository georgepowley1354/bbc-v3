import Link from 'next/link'
import Button from '@/components/ui/Button'

const navLinks = ['Portfolio', 'Services', 'Process', 'About', 'Contact']
const serviceLinks = [
  'Hardscape',
  'Softscape',
  'Pools',
  'Outdoor Kitchens',
  'Full Property',
]

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Col 1: Brand */}
          <div>
            <p className="font-sans font-normal tracking-[0.3em] uppercase text-white text-base mb-4">
              VERDANT
            </p>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              We Build Outdoor Worlds
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/40 mb-6">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className="font-sans text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/40 mb-6">
              Services
            </p>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href={`/services#${service.toLowerCase().replace(/\s+/g, '-')}`}
                    className="font-sans text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/40 mb-6">
              Contact
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <p className="font-sans text-sm text-white/70">
                Capital Region, NY
              </p>
              <p className="font-sans text-sm text-white/70">
                info@verdantdesign.com
              </p>
              <p className="font-sans text-sm text-white/70">
                (518) 000-0000
              </p>
            </div>
            <Button variant="ghost" href="/contact" size="md">
              Start a Project
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-white/40">
            © 2026 Verdant Landscape Design
          </p>
          <a
            href="https://bbc-agency.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[12px] text-text-muted hover:text-white/60 transition-colors duration-200"
          >
            Built by BBC
          </a>
        </div>
      </div>
    </footer>
  )
}
