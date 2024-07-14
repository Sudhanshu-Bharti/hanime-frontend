import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  metadataBase: new URL('https://hanime.vercel.app'),
  title: 'Hanime - Watch Hentai Online',
  description:
    'Heaven for Hentai lovers! Watch hentai online in high quality. Free download HD hentai. Stream hentai videos free.',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
      <Navbar/>
        {children}
      <Footer/>
        </body>
    </html>
  )
}
