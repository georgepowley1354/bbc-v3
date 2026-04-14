import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Haven Therapeutic Massage',
    short_name: 'Haven',
    description: 'Book therapeutic massage with Jane Smith LMT in the Capital Region NY.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F5',
    theme_color: '#7D9B76',
    orientation: 'portrait',
    categories: ['health', 'lifestyle'],
    icons: [
      { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    screenshots: [
      {
        src: '/opengraph-image.png',
        sizes: '1200x630',
        type: 'image/png',
        // @ts-expect-error: label is valid in web manifest spec but not yet in Next.js types
        label: 'Haven Therapeutic Massage homepage',
      },
    ],
  };
}
