import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Verdant Landscape Design',
    short_name: 'Verdant',
    description:
      'Luxury landscape and outdoor living design serving Saratoga Springs, Lake George, and the Capital Region.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F1210',
    theme_color: '#0F1210',
    icons: [
      {
        src: '/verdant-wordmark.svg',
        sizes: '520x128',
        type: 'image/svg+xml',
      },
    ],
  }
}

