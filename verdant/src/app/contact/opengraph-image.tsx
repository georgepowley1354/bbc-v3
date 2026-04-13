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
            'linear-gradient(135deg, #F2EDE4 0%, #E8E0D2 40%, #D0C9BC 100%)',
          color: '#0F1210',
          padding: '52px 58px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 18, textTransform: 'uppercase', letterSpacing: 4, color: '#5A8A62', zIndex: 1 }}>
          <div style={{ width: 44, height: 1, background: '#5A8A62' }} />
          Start a Verdant project
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 760, zIndex: 1 }}>
          <div style={{ fontSize: 88, lineHeight: 0.98 }}>A premium inquiry for serious outdoor work.</div>
          <div style={{ fontSize: 28, lineHeight: 1.42, color: 'rgba(28,43,30,0.74)' }}>
            Saratoga Springs, Lake George, and the Capital Region. Estate gardens, terraces, poolscapes, and full-property transformations.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, zIndex: 1 }}>
          {['$25k-50k', '$50k-100k', '$100k+'].map((label) => (
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
