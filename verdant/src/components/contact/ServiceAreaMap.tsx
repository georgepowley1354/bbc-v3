const areas = [
  { name: 'Saratoga Springs', position: 'left-[28%] top-[30%]' },
  { name: 'Lake George', position: 'left-[55%] top-[16%]' },
  { name: 'Capital Region', position: 'left-[38%] top-[58%]' },
]

export function ServiceAreaMap() {
  return (
    <div className="rounded-[32px] border border-stone-dark/70 bg-stone-mid p-6 shadow-[0_24px_60px_rgba(28,43,30,0.08)]">
      <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
        Service Area
      </p>
      <h3 className="mt-3 font-display text-3xl text-text-primary">Saratoga to the Southern Adirondacks</h3>
      <p className="mt-3 max-w-xl font-sans text-base leading-7 text-text-secondary">
        Verdant focuses on estate-scale landscape and outdoor living projects throughout Saratoga
        Springs, Lake George, and the greater Capital Region.
      </p>

      <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[26px] bg-[radial-gradient(circle_at_top,#eef0e6_0%,#e2dbc9_42%,#d7cfbf_100%)]">
        <div className="absolute inset-[10%] rounded-[34px] border border-white/40" />
        <div className="absolute left-[12%] top-[18%] h-[54%] w-[54%] rounded-[45%] border border-forest-deep/10" />
        <div className="absolute left-[44%] top-[8%] h-[66%] w-[32%] rotate-[14deg] rounded-[46%] border border-forest-deep/10" />
        <div className="absolute left-[26%] top-[46%] h-[26%] w-[30%] rotate-[-8deg] rounded-[42%] border border-forest-deep/10" />

        {areas.map((area) => (
          <div key={area.name} className={`absolute ${area.position}`}>
            <div className="h-3 w-3 rounded-full bg-gold shadow-[0_0_0_8px_rgba(184,147,75,0.18)]" />
            <div className="mt-3 rounded-full bg-forest-deep px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white shadow-[0_16px_30px_rgba(28,43,30,0.22)]">
              {area.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

