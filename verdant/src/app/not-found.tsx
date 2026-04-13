import Link from 'next/link'
import { VerdantWordmark } from '@/components/brand/VerdantWordmark'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-forest-deep px-6 py-24 text-white">
      <div className="w-full max-w-2xl rounded-[38px] border border-white/10 bg-white/6 p-10 text-center backdrop-blur-xl">
        <div className="flex justify-center">
          <VerdantWordmark className="h-12 w-auto" />
        </div>
        <p className="mt-8 font-sans text-[11px] uppercase tracking-[0.18em] text-gold/90">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl font-light leading-tight">
          This path doesn’t lead to the garden you were looking for.
        </h1>
        <p className="mx-auto mt-6 max-w-lg font-sans text-base leading-7 text-white/80">
          Head back to the main site and explore Verdant’s portfolio, services, or inquiry experience instead.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-[12px] font-medium uppercase tracking-[0.15em] text-forest-deep transition-colors duration-200 hover:bg-gold-light"
          >
            Return Home
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-full border border-white/18 px-7 py-3 text-[12px] font-medium uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/8"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </main>
  )
}

