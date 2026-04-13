interface SectionHeaderProps {
  eyebrow: string
  headline: string
  body?: string
  dark?: boolean
  className?: string
  as?: 'h1' | 'h2'
}

export default function SectionHeader({
  eyebrow,
  headline,
  body,
  dark = false,
  className = '',
  as: Heading = 'h2',
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <div className="w-12 h-px bg-gold mb-3" />
      <p
        className={`font-sans text-[11px] tracking-[0.2em] uppercase mb-4 ${
          dark ? 'text-gold' : 'text-text-muted'
        }`}
      >
        {eyebrow}
      </p>
      <Heading
        className={`text-pretty font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] ${
          dark ? 'text-white' : 'text-text-primary'
        }`}
      >
        {headline}
      </Heading>
      {body && (
        <p
          className={`font-sans text-lg leading-relaxed mt-6 max-w-2xl ${
            dark ? 'text-stone-100' : 'text-text-secondary'
          }`}
        >
          {body}
        </p>
      )}
    </div>
  )
}
