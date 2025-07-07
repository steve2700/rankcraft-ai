import './globals.css'

export const metadata = {
  title: 'RankCraft AI - SEO Content Generator',
  description: 'AI-powered SEO content creation and keyword research platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          {children}
        </div>
      </body>
    </html>
  )
}
