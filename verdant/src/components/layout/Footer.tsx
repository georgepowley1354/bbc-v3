import Link from 'next/link'
import Button from '@/components/ui/Button'
import { services } from '@/data/services'
import { VerdantWordmark } from '@/components/brand/VerdantWordmark'

const navLinks = ['Portfolio', 'Services', 'Process', 'About', 'Contact']

export default function Footer() {
  return (
    <footer className="bg-forest-deep px-6 py-16 text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-10">
          <div>
            <VerdantWordmark className="h-10 w-auto text-white" priority="subtle" />
            <p className="mt-6 max-w-sm font-sans text-base leading-7 text-white/70">
              Estate-caliber landscape architecture for Saratoga Springs, Lake George, and the
              Capital Region.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/12 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white/60">
                Outdoor Worlds
              </span>
              <span className="rounded-full border border-white/12 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white/60">
                Now Booking 2026
              </span>
            </div>
          </div>

          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-white/56">
              Navigation
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className="font-sans text-sm text-white/72 transition-colors duration-200 hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-white/56">
              Signature Services
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-sans text-sm text-white/72 transition-colors duration-200 hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-white/56">
              Inquiries
            </p>
            <div className="mt-6 space-y-3 font-sans text-sm text-white/72">
              <p>Saratoga Springs, Lake George, and the Capital Region</p>
              <a href="mailto:inquiries@verdant.bbc-agency.com" className="block transition-colors duration-200 hover:text-white">
                inquiries@verdant.bbc-agency.com
              </a>
              <a href="tel:+15184502764" className="block transition-colors duration-200 hover:text-white">
                (518) 450-2764
              </a>
            </div>
            <div className="mt-8">
              <Button variant="ghost" href="/contact" size="md" className="rounded-full px-6 py-3">
                Request a Consultation
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-sm text-white/58">
            © 2026 Verdant Landscape Design. Crafted as a BBC flagship showcase.
          </p>
          <a
            href="https://bbc-agency.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[12px] uppercase tracking-[0.14em] text-white/50 transition-colors duration-200 hover:text-white"
          >
            Built by BBC
          </a>
        </div>
      </div>
    </footer>
  )
}
