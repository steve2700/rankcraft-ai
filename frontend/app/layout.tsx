import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RankCraft AI - AI-Powered SEO Content Creation Platform | Generate High-Ranking Articles',
  description: 'Create SEO-optimized content that ranks with RankCraft AI. Generate high-quality articles, research keywords, and analyze SEO performance. Free trial available - no credit card required.',
  keywords: 'SEO content creation, AI article generator, keyword research tool, SEO analysis, content marketing, search engine optimization, AI writing assistant, SEO content generator, content creation platform, SEO tools',
  authors: [{ name: 'RankCraft AI Team' }],
  creator: 'RankCraft AI',
  publisher: 'RankCraft AI',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rankcraft-ai.com',
    title: 'RankCraft AI - AI-Powered SEO Content Creation Platform',
    description: 'Create SEO-optimized content that ranks with RankCraft AI. Generate high-quality articles, research keywords, and analyze SEO performance.',
    siteName: 'RankCraft AI',
    images: [
      {
        url: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
        width: 1200,
        height: 630,
        alt: 'RankCraft AI - SEO Content Creation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RankCraft AI - AI-Powered SEO Content Creation Platform',
    description: 'Create SEO-optimized content that ranks with RankCraft AI. Generate high-quality articles, research keywords, and analyze SEO performance.',
    images: ['https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg'],
    creator: '@rankcraftai',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://rankcraft-ai.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          {children}
        </div>
      </body>
    </html>
  )
}
