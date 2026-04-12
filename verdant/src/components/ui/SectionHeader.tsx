interface SectionHeaderProps {
  eyebrow: string
  headline: string
  body?: string
  dark?: boolean
  className?: string
}

export default function SectionHeader({
  eyebrow,
  headline,
  body,
  dark = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={className}>
      {/* Gold rule */}
      <div className="w-12 h-px bg-gold mb-3" />
      {/* Eyebrow */}
      <p
        className={`font-sans text-[11px] tracking-[0.2em] uppercase mb-4 ${
          dark ? 'text-gold' : 'text-text-muted'
        }`}
      >
        {eyebrow}
      </p>
      {/* Headline */}
      <h2
        className={`font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] ${
          dark ? 'text-white' : 'text-text-primary'
        }`}
      >
        {headline}
      </h2>
      {/* Optional body */}
      {body && (
        <p
          className={`font-sans text-lg leading-relaxed mt-6 max-w-2xl ${
            dark ? 'text-white/70' : 'text-text-secondary'
          }`}
        >
          {body}
        </p>
      )}
    </div>
  )
}
