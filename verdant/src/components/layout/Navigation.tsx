"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { stagger, fadeUp } from '@/constants/animation'

const navLinks = ['Portfolio', 'Services', 'Process', 'About', 'Contact']

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 flex items-center justify-between px-8 md:px-16 transition-all duration-300 ${
          scrolled
            ? 'bg-forest-deep/95 backdrop-blur-md h-16'
            : 'bg-transparent h-24'
        }`}
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-sans font-normal tracking-[0.3em] uppercase text-white text-base"
          aria-label="Verdant — Home"
        >
          VERDANT
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="font-sans text-[14px] tracking-[0.1em] text-white/70 hover:text-white transition-colors duration-200"
            >
              {link}
            </Link>
          ))}
          <Button variant="primary" href="/contact" size="md">
            Start a Project
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-forest-deep flex flex-col items-center justify-center"
            initial={prefersReducedMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-8 text-white p-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Mobile links */}
            <motion.ul
              className="flex flex-col items-center gap-8 list-none"
              variants={prefersReducedMotion ? undefined : stagger}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link}
                  variants={prefersReducedMotion ? undefined : fadeUp}
                >
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className="font-display italic text-4xl text-white hover:text-gold transition-colors duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-12"
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="ghost"
                href="/contact"
                onClick={() => setMobileOpen(false)}
              >
                Start a Project
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
