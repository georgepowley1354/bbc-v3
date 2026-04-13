'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '@/components/ui/Button'

const navLinks = ['Portfolio', 'Services', 'Process', 'About', 'Contact']
const darkHeroRoutes = new Set(['/portfolio', '/services', '/process', '/about', '/contact'])

export default function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const isHome = pathname === '/'
  const hasDarkHero = isHome || darkHeroRoutes.has(pathname)
  const useLightText = hasDarkHero ? !pastHero : false
  const navShellClass = useLightText
    ? 'bg-transparent'
    : 'border-b border-stone-dark/45 bg-stone-warm/92 backdrop-blur-xl'
  const desktopLinkClass = useLightText
    ? 'text-white hover:text-white'
    : 'text-forest-deep/72 hover:text-forest-deep'
  const mobileButtonClass = useLightText
    ? 'border-white/16 text-white'
    : 'border-forest-deep/16 text-forest-deep'

  useEffect(() => {
    const handleScroll = () => {
      if (!hasDarkHero) {
        setPastHero(true)
        return
      }

      const cutoff = isHome
        ? window.innerHeight * 0.78
        : Math.min(window.innerHeight * 0.38, 220)

      setPastHero(window.scrollY >= cutoff)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasDarkHero, isHome])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${navShellClass}`}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-20">
          <Link href="/" className="flex items-center" aria-label="Verdant home">
            <svg
              viewBox="0 0 520 128"
              fill="none"
              className={`h-6 w-auto transition-colors duration-200 ${useLightText ? 'text-white' : 'text-forest-deep'}`}
              aria-hidden="true"
            >
              <path d="M20 18 Q80 8, 150 16 Q220 24, 290 14 Q360 4, 430 16 Q470 22, 500 14" stroke="#B8934B" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55"/>
              <path d="M27 38 L52 100 H60 L85 38 H77 L56 93 L35 38 Z" fill="currentColor"/>
              <path d="M95 38 H153 V46 H103 V65 H149 V73 H103 V92 H153 V100 H95 Z" fill="currentColor"/>
              <path fillRule="evenodd" d="M163 100 V38 H195 L206 42 L212 49 V61 L206 68 L195 73 L216 100 H206 L186 73 H170 V100 Z M170 45 H193 L199 49 L201 55 L199 61 L193 66 H170 Z" fill="currentColor"/>
              <path fillRule="evenodd" d="M231 38 H255 L268 42 L276 52 L279 61 L277 75 L268 86 L254 100 H231 Z M238 46 H253 L263 50 L268 58 L268 70 L262 80 L251 93 H238 Z" fill="currentColor"/>
              <path d="M299 100 L324 38 H332 L357 100 H349 L341 81 H315 L307 100 Z M318 74 H338 L328 47 Z" fill="currentColor"/>
              <path d="M367 100 V38 H375 L413 88 V38 H421 V100 H413 L375 50 V100 Z" fill="currentColor"/>
              <path d="M435 38 H493 V46 H468 V100 H460 V46 H435 Z" fill="currentColor"/>
            </svg>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className={`font-sans text-[13px] uppercase tracking-[0.14em] transition-colors duration-200 ${desktopLinkClass}`}
              >
                {link}
              </Link>
            ))}
            <Button variant="primary" href="/contact" size="md" className="rounded-full px-6 py-3">
              Book a Consultation
            </Button>
          </div>

          <button
            className={`rounded-full border p-3 transition-colors duration-200 md:hidden ${mobileButtonClass}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-forest-deep px-6 pb-10 pt-8">
            <div className="flex items-center justify-between">
              <p className="font-sans text-[12px] uppercase tracking-[0.32em] text-white/60">
                Verdant
              </p>
              <button
                className="rounded-full border border-white/16 p-3 text-white transition-colors duration-200 hover:border-white/30"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>
            </div>

            <div className="mx-auto mt-12 max-w-md">
              <div className="w-10 border-t border-gold" />
              <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.24em] text-gold/80">
                Navigation
              </p>

              <ul className="mt-10 flex list-none flex-col gap-5">
                {navLinks.map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase()}`}
                      className="group flex items-center gap-4"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-6" />
                      <span className="font-display text-[38px] italic leading-none text-white transition-colors duration-200 group-hover:text-gold">
                        {link}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-14 rounded-[28px] border border-white/10 bg-white/[0.04] px-6 py-7">
                <p className="font-sans text-[10px] uppercase tracking-[0.20em] text-gold">
                  Now Booking
                </p>
                <p className="mt-4 font-display text-3xl leading-[1.08] text-white">
                  Spring &amp; Summer 2026
                </p>
                <p className="mt-3 font-sans text-sm leading-7 text-white/65">
                  Estate gardens, outdoor kitchens, and full-property transformations across the Capital Region.
                </p>
                <div className="mt-6">
                  <Button
                    variant="primary"
                    href="/contact"
                    className="w-full rounded-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    Start Your Project
                  </Button>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-8">
                <a href="mailto:inquiries@verdant.bbc-agency.com" className="font-sans text-sm text-white/50 transition-colors duration-200 hover:text-white">
                  inquiries@verdant.bbc-agency.com
                </a>
                <a href="tel:+15184502764" className="font-sans text-sm text-white/50 transition-colors duration-200 hover:text-white">
                  (518) 450-2764
                </a>
              </div>
            </div>
        </div>
      )}
    </>
  )
}
