'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/navigation/Header'
import Footer from '@/components/navigation/Footer'
import MegaMenu from '@/components/navigation/MegaMenu'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Si c'est une page SaaS, prestataire, client ou d'authentification, ne pas afficher le header/footer principal
  if (pathname?.startsWith('/app-saas') || pathname?.startsWith('/app-prestataire') || pathname?.startsWith('/app-client') || pathname?.startsWith('/test')) {
    return <>{children}</>
  }

  // Pour toutes les autres pages (site principal), afficher le layout complet
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MegaMenu />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

