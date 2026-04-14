import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Haven Massage Services — Albany NY';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#FAF8F5',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Sage accent bar */}
        <div style={{ width: 12, height: '100%', backgroundColor: '#7D9B76', flexShrink: 0 }} />

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 80px',
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: '0.14em',
              color: '#7D9B76',
              textTransform: 'uppercase',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 600,
            }}
          >
            Haven Therapeutic Massage
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 400,
              color: '#2C2C2C',
              lineHeight: 1.2,
              fontFamily: 'Georgia, serif',
            }}
          >
            Massage that works.
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#6B6560',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 300,
              lineHeight: 1.5,
            }}
          >
            Swedish · Deep Tissue · Hot Stone · Prenatal · Couples · Albany NY
          </div>
        </div>

        {/* Bottom warm band */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: '#EDE6DB',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
