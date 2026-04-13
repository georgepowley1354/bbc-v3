const proofPoints = [
  'Estate Terraces',
  'Poolscapes',
  'Garden Rooms',
  'Outdoor Kitchens',
  'Full-Property Plans',
]

export function LogoBar() {
  return (
    <section className="bg-forest-mid py-6" aria-label="Verdant service focus">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <p className="shrink-0 font-sans text-[10px] uppercase tracking-[0.24em] text-white/50">
            We specialize in
          </p>
          <div className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden="true" />
          <div className="flex flex-wrap justify-center gap-3">
            {proofPoints.map((point) => (
              <span
                key={point}
                className="rounded-full border border-white/12 px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.16em] text-white/70"
              >
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
