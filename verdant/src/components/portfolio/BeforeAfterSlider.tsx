'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  projectName: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  projectName,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(58)

  return (
    <div className="rounded-[32px] border border-forest-deep/10 bg-stone-mid p-4 shadow-[0_24px_60px_rgba(28,43,30,0.10)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
            Before / After
          </p>
          <h3 className="mt-2 font-display text-3xl text-text-primary">
            Reveal the transformation
          </h3>
        </div>
        <div className="hidden rounded-full border border-stone-dark px-4 py-2 font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary md:block">
          Drag the divider
        </div>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
        <Image
          src={beforeImage}
          alt={`${projectName} before installation`}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={afterImage}
            alt={`${projectName} after installation`}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div
          className="absolute inset-y-0 z-10 w-px bg-white/90"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-forest-deep text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
            <span className="text-xl">↔</span>
          </div>
        </div>

        <div className="absolute left-4 top-4 rounded-full bg-black/35 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white">
          Before
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-gold px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-forest-deep">
          After
        </div>
      </div>

      <input
        type="range"
        min="15"
        max="85"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="mt-5 w-full accent-sage"
        aria-label={`Adjust before and after slider for ${projectName}`}
      />
    </div>
  )
}
