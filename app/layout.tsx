import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TransLinkPro - Plateforme de Gestion de Flotte de Transport',
  description: 'Solution complète de gestion de flotte de transport avec suivi GPS, marketplace de prestataires et analytics avancées.',
  keywords: 'transport, flotte, GPS, tracking, logistique, SaaS',
  authors: [{ name: 'TransLinkPro Team' }],
  openGraph: {
    title: 'TransLinkPro - Plateforme de Gestion de Flotte',
    description: 'Solution complète de gestion de flotte de transport',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}

