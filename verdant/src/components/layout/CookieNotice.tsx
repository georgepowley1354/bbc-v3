'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function CookieNotice() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const acknowledged = window.localStorage.getItem('verdant-cookie-notice')
    if (acknowledged) {
      return
    }

    const revealNotice = () => {
      const revealPoint = isHome
        ? Math.max(window.innerHeight * 0.92, 720)
        : Math.max(window.innerHeight * 0.72, 640)

      if (window.scrollY >= revealPoint) {
        setVisible(true)
        window.removeEventListener('scroll', revealNotice)
      }
    }

    window.addEventListener('scroll', revealNotice, { passive: true })

    return () => {
      window.removeEventListener('scroll', revealNotice)
    }
  }, [isHome, pathname])

  function dismiss() {
    window.localStorage.setItem('verdant-cookie-notice', 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] md:inset-x-auto md:bottom-5 md:right-5 md:max-w-[16rem]">
      <div className="rounded-[22px] border border-white/10 bg-forest-deep/78 px-4 py-3 text-white shadow-[0_16px_34px_rgba(11,20,12,0.22)] backdrop-blur-xl">
        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold/80">
          Privacy Notice
        </p>
        <p className="mt-2 font-sans text-[12px] leading-5 text-white/74">
          Verdant uses essential cookies to improve performance, remember preferences, and keep
          inquiry submissions secure.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex items-center justify-center rounded-full bg-gold px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-forest-deep transition-colors duration-200 hover:bg-gold-light"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/80 transition-colors duration-200 hover:border-white/45 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
