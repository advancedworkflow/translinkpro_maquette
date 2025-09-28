'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Truck, ArrowRight } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-trust rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">TransLinkPro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/solution" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Solution
            </Link>
            <Link href="/marche-modele" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Marché & Modèle
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Services
            </Link>
            <Link href="/entreprise" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Entreprise
            </Link>
            <Link href="/presentation" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Investisseurs
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              href="/app-saas/auth/login" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Connexion
            </Link>
            <Link 
              href="/presentation" 
              className="btn-primary"
            >
              🔴 Investir maintenant
            </Link>
            <Link 
              href="/app-saas/auth/register" 
              className="btn-secondary"
            >
              ⚫ Demander une démo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary-500 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/solution" 
                className="text-gray-600 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Solution
              </Link>
              <Link 
                href="/marche-modele" 
                className="text-gray-600 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Marché & Modèle
              </Link>
              <Link 
                href="/services" 
                className="text-gray-600 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/entreprise" 
                className="text-gray-600 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Entreprise
              </Link>
              <Link 
                href="/presentation" 
                className="text-gray-600 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Investisseurs
              </Link>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link 
                  href="/app-saas/auth/login" 
                  className="block text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  href="/presentation" 
                  className="btn-trust-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔴 Investir maintenant
                </Link>
                <Link 
                  href="/app-saas/auth/register" 
                  className="btn-trust-secondary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ⚫ Demander une démo
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
