'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { HavenLogo } from '@/components/HavenLogo';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? {
                backgroundColor: 'rgba(242, 237, 230, 0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: '1px solid #E4DDD4',
                boxShadow: '0 1px 3px rgba(44, 35, 28, 0.06)',
              }
            : { backgroundColor: 'transparent' }
        }
      >
        <nav
          className="max-w-6xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between"
          aria-label="Main navigation"
        >
          <Link href="/" aria-label="Haven — home" className="flex-shrink-0">
            <HavenLogo variant={scrolled ? 'default' : 'inverse'} width={120} />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body font-medium text-[15px] tracking-wide transition-colors duration-200 hover:text-haven-accent-interactive"
                style={{ color: scrolled ? '#2C2C2C' : '#FAF8F5' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="font-body font-semibold text-[15px] tracking-wide px-5 py-2.5 rounded transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: scrolled ? '#4E6B48' : 'rgba(250, 248, 245, 0.15)',
                color: '#FAF8F5',
                border: scrolled ? 'none' : '1.5px solid rgba(250, 248, 245, 0.6)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = scrolled
                  ? '#3D5538'
                  : 'rgba(250, 248, 245, 0.25)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = scrolled
                  ? '#4E6B48'
                  : 'rgba(250, 248, 245, 0.15)';
              }}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 cursor-pointer transition-colors duration-200"
            style={{ color: scrolled ? '#2C2C2C' : '#FAF8F5' }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="nav-mobile-menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          id="nav-mobile-menu"
          className="fixed inset-0 z-[60] flex flex-col"
          style={{ backgroundColor: '#F2EDE6' }}
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-6 h-[72px] border-b border-haven-border">
            <HavenLogo variant="default" width={120} />
            <button
              className="p-2 cursor-pointer text-haven-text transition-colors duration-200 hover:text-haven-accent-interactive"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col flex-1 justify-center px-8 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display font-normal text-[28px] text-haven-text py-3 border-b border-haven-border-subtle transition-colors duration-200 hover:text-haven-accent-interactive"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="px-8 pb-12">
            <Link
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="block w-full py-4 text-center font-body font-semibold text-[17px] tracking-wide rounded text-haven-text-inverse cursor-pointer transition-colors duration-200"
              style={{ backgroundColor: '#4E6B48' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#3D5538'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#4E6B48'; }}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
