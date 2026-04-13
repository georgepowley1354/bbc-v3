import Button from '@/components/ui/Button'

export function DesignGuideCTA() {
  return (
    <section className="bg-stone-warm py-section" aria-labelledby="design-guide-headline">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="grid gap-10 rounded-[40px] border border-stone-dark/55 bg-stone-mid/80 px-8 py-12 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
              Complimentary guide
            </p>
            <h2
              id="design-guide-headline"
              className="mt-4 font-display text-4xl leading-[1.02] text-text-primary md:text-5xl"
            >
              Download the Outdoor Living Design Guide.
            </h2>
          </div>

          <div>
            <p className="max-w-2xl font-sans text-base leading-7 text-text-secondary">
              A concise Verdant brief on planning investment ranges, phased property upgrades,
              material restraint, and what separates a premium landscape project from expensive
              clutter.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/verdant-outdoor-living-guide.pdf"
                download
                className="inline-flex items-center justify-center rounded-full bg-sage px-8 py-4 font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-sage-light"
              >
                Download the PDF
              </a>
              <Button variant="ghost-dark" href="/contact" size="md" className="rounded-full px-8">
                Discuss Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
