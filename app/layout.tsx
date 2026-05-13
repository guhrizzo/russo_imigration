import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from './i18n/LanguageContext'

export const metadata: Metadata = {
  title: 'Russo Imigration | New Beginnings. Extraordinary Futures.',
  description: 'Especialistas em imigração nos EUA. Assessoria personalizada para seu processo de asilo, visto e legalização. Estamos com você em cada etapa.',
  keywords: 'russo imigration, imigração eua, asilo, visto americano, legalização eua, consultoria imigração',
  openGraph: {
    title: 'Russo Imigration',
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
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
