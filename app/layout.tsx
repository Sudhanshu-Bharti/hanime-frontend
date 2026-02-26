import './theme.css'
import './globals.css'
import { Manrope, Sora } from 'next/font/google'
import Navbar from "@/components/Navbar";
import { Analytics } from '@vercel/analytics/react';
import Footer from "@/components/Footer";
export const metadata = {
  metadataBase: new URL('https://hanime-hub.vercel.app'),
  title: {
    default: 'Hanime Hub - Watch Hentai Online HD',
    template: '%s | Hanime Hub'
  },
  description: 'Heaven for Hentai lovers! Watch hentai online in high quality. Free download HD hentai. Stream hentai videos free with zero ads.',
  keywords: ['hentai', 'anime', 'watch online', 'HD', 'free hentai', 'hanime'],
  openGraph: {
    title: 'Hanime Hub - Watch Hentai Online HD',
    description: 'Watch your favorite hentai in high quality for free on Hanime Hub.',
    url: 'https://hanime-hub.vercel.app',
    siteName: 'Hanime Hub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hanime Hub - Watch Hentai Online HD',
    description: 'Watch your favorite hentai in high quality for free on Hanime Hub.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

const manrope = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

const sora = Sora({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://hanime-cdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hanime-cdn.com" />
        <link rel="preconnect" href="https://cached.freeanimehentai.net" crossOrigin="anonymous" />
      </head>
      <body className={`${manrope.variable} ${sora.variable}`}>
        <div className="app-shell">
          <Navbar />
          <main className="app-main">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
