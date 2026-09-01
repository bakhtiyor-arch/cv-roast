import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CV-ROAST.UZ — AI CV Roaster & Local Salary Check',
  description:
    'Yuklang, kulamiz va bozor qiymatingizni bilib olasiz! AI rezyumeingizni shavqatsiz tahlil qiladi va O\u2018zbekiston bozori maoshini hisoblaydi.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0b051b' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
