import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(140deg, #F2EDE4 0%, #E8DFD0 45%, #D0C9BC 100%)',
          color: '#0F1210',
          padding: '52px 58px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -80,
            top: -60,
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'rgba(184,147,75,0.14)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 18, textTransform: 'uppercase', letterSpacing: 4, color: '#5A8A62', zIndex: 1 }}>
          <div style={{ width: 44, height: 1, background: '#5A8A62' }} />
          Verdant Portfolio
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760, zIndex: 1 }}>
          <div style={{ fontSize: 88, lineHeight: 0.98 }}>Every project, a living world.</div>
          <div style={{ fontSize: 28, lineHeight: 1.42, color: 'rgba(28,43,30,0.72)' }}>
            Featured case studies, estate transformations, and outdoor environments designed to feel calm, permanent, and deeply tied to place.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, zIndex: 1 }}>
          {['Lake George', 'Saratoga Springs', 'Capital Region'].map((label) => (
            <div key={label} style={{ border: '1px solid rgba(28,43,30,0.14)', borderRadius: 999, padding: '12px 18px', fontSize: 18 }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
