type LogoVariant = 'default' | 'inverse' | 'monochrome';

interface HavenLogoProps {
  variant?: LogoVariant;
  className?: string;
  width?: number;
}

const variants = {
  default: { wordmark: '#7D9B76', leafDark: '#4E6B48', leafLight: '#7D9B76' },
  inverse: { wordmark: '#FAF8F5', leafDark: '#FAF8F5', leafLight: '#7D9B76' },
  monochrome: { wordmark: '#2C2C2C', leafDark: '#2C2C2C', leafLight: '#2C2C2C' },
};

export function HavenLogo({ variant = 'default', className, width = 140 }: HavenLogoProps) {
  const colors = variants[variant];
  const height = Math.round(width * (64 / 180));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 64"
      fill="none"
      width={width}
      height={height}
      className={className}
      aria-label="Haven Therapeutic Massage"
      role="img"
    >
      {/* Botanical leaf mark */}
      <g transform="translate(84, 2)">
        <path
          d="M6 19 C6 19, -3 10, 6 1 C6 1, 11 10, 6 19Z"
          fill={colors.leafDark}
        />
        <path
          d="M6 19 C6 19, 15 10, 6 1 C6 1, 1 10, 6 19Z"
          fill={colors.leafLight}
          opacity="0.72"
        />
        <line
          x1="6"
          y1="1"
          x2="6"
          y2="19"
          stroke={colors.leafDark}
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </g>

      {/* HAVEN wordmark */}
      <text
        x="90"
        y="52"
        textAnchor="middle"
        fontFamily="Lora, Georgia, serif"
        fontSize="22"
        fontWeight="400"
        fill={colors.wordmark}
        letterSpacing="7"
      >
        HAVEN
      </text>
    </svg>
  );
}
