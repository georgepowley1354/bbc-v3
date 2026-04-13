import type { Metadata } from 'next'
import { Cinzel, DM_Sans } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const CookieNotice = dynamic(() => import('@/components/layout/CookieNotice'), {
  ssr: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://verdant.bbc-agency.com'),
  title: {
    default: 'Verdant Landscape Design',
    template: '%s | Verdant Landscape Design',
  },
  description:
    'Luxury landscape and outdoor living design for Saratoga Springs, Lake George, and the Capital Region.',
  openGraph: {
    siteName: 'Verdant Landscape Design',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-home.svg',
        width: 1200,
        height: 630,
        alt: 'Verdant Landscape Design luxury outdoor living showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verdant Landscape Design',
    description:
      'Luxury landscape and outdoor living design for Saratoga Springs, Lake George, and the Capital Region.',
    images: ['/og-home.svg'],
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LandscapeDesigner',
  name: 'Verdant Landscape Design',
  description:
    'Luxury landscape architecture and outdoor living design serving Saratoga Springs, Lake George, and the Capital Region.',
  areaServed: ['Saratoga Springs', 'Lake George', 'Capital Region'],
  url: 'https://verdant.bbc-agency.com',
  telephone: '+1-518-450-2764',
  email: 'inquiries@verdant.bbc-agency.com',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${dmSans.variable}`}>
      <body className="bg-stone-warm font-sans text-text-primary antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieNotice />
      </body>
    </html>
  )
}
