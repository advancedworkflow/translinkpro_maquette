import Link from 'next/link'
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-trust rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TransLinkPro</span>
            </div>
            <p className="text-gray-400 text-sm">
              Plateforme complète de gestion de flotte de transport avec suivi GPS, 
              marketplace de prestataires et analytics avancées.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solution */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Solution</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/solution" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Vue d'ensemble
                </Link>
              </li>
              <li>
                <Link href="/solution/fonctionnalites" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="/solution/comment-ca-marche" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/solution/avantages" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Avantages
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Vue d'ensemble
                </Link>
              </li>
              <li>
                <Link href="/services/tarifs" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/services/marketplace" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/services/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">contact@translinkpro.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">Paris, France</span>
              </div>
            </div>
            <div className="pt-4">
              <Link 
                href="/app-saas/auth/register" 
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Démarrer maintenant</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 TransLinkPro. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <Link href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Politique de confidentialité
              </Link>
              <Link href="/legal/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Conditions d'utilisation
              </Link>
              <Link href="/legal/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

