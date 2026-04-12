import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'ghost-dark'
type ButtonSize = 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children: React.ReactNode
  className?: string
  [key: string]: unknown
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-sage text-white hover:bg-sage-light',
  secondary:
    'border border-gold text-gold hover:bg-gold hover:text-forest-deep',
  ghost:
    'border border-white/50 text-white hover:border-white hover:bg-white/10',
  'ghost-dark':
    'border border-forest-deep text-forest-deep hover:bg-forest-deep hover:text-white',
}

const sizeClasses: Record<ButtonSize, string> = {
  md: 'px-8 py-4 text-[13px]',
  lg: 'px-10 py-5 text-[15px]',
}

const baseClasses =
  'inline-flex items-center justify-center rounded-none font-sans font-medium tracking-[0.1em] uppercase transition-colors duration-300'

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as Record<string, unknown>)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as Record<string, unknown>)}>
      {children}
    </button>
  )
}
