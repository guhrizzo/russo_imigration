import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Russo Immigration | Novos Começos. Futuros Extraordinários.',
  description: 'Especialistas em imigração nos EUA. Assessoria personalizada para seu processo de asilo, visto e legalização. Estamos com você em cada etapa.',
  keywords: 'russo immigration, imigração eua, asilo, visto americano, legalização eua, consultoria imigração',
  openGraph: {
    title: 'Russo Immigration',
    description: 'Novos Começos. Futuros Extraordinários.',
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
      <body>{children}</body>
    </html>
  )
}
