import type { Metadata } from 'next';
import { Lora, Raleway } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { StickyBookNow } from '@/components/StickyBookNow';
import { JsonLd } from '@/components/JsonLd';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';
import { CookieNotice } from '@/components/CookieNotice';
import { localBusinessSchema } from '@/lib/schema';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Haven Therapeutic Massage | Jane Smith LMT | Albany NY',
    template: '%s | Haven Therapeutic Massage',
  },
  description:
    'Professional therapeutic massage in Albany, Clifton Park, and Saratoga Springs NY. Jane Smith LMT, licensed since 2000. Swedish, Deep Tissue, Hot Stone, Prenatal, and Couples massage. Book online.',
  keywords: [
    'therapeutic massage Albany NY',
    'massage therapist Clifton Park',
    'deep tissue massage Saratoga Springs',
    'LMT Albany',
    'prenatal massage Capital Region',
    'Jane Smith LMT',
  ],
  authors: [{ name: 'Jane Smith LMT' }],
  creator: 'BBC — Big Bad Coding',
  metadataBase: new URL('https://haven.big-bad-coding.netlify.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Haven Therapeutic Massage',
    url: 'https://haven.big-bad-coding.netlify.app',
  },
  twitter: {
    card: 'summary_large_image',
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${raleway.variable}`}>
      <body className="antialiased bg-haven-bg text-haven-text font-body">
        <JsonLd data={localBusinessSchema} />
        <ServiceWorkerRegistration />
        <Nav />
        <main>{children}</main>
        <Footer />
        <StickyBookNow />
        <CookieNotice />
      </body>
    </html>
  );
}
