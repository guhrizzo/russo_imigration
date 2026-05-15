import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Instrument_Sans, Newsreader } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './i18n/LanguageContext'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  weight: ['400', '500', '600', '700'],
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  weight: ['400'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Russo Immigration | New Beginnings. Extraordinary Futures.',
  description: 'Especialistas em imigração nos EUA. Assessoria personalizada para seu processo de asilo, visto e legalização. Estamos com você em cada etapa.',
  keywords: 'russo immigration, imigração eua, asilo, visto americano, legalização eua, consultoria imigração',
  openGraph: {
    title: 'Russo Immigration',
    description: 'New Beginnings. Extraordinary Futures.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} ${instrumentSans.variable} ${newsreader.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-jakarta">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
