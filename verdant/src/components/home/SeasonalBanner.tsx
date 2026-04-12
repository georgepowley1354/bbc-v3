export function SeasonalBanner() {
  return (
    <div
      className="bg-gold py-5"
      role="banner"
      aria-label="Seasonal availability notice"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex justify-center">
        <p className="font-sans font-medium text-sm tracking-[0.1em] uppercase text-forest-deep text-center">
          Now Booking Spring &amp; Summer 2026 &mdash; Limited Slots Available
        </p>
      </div>
    </div>
  )
}
