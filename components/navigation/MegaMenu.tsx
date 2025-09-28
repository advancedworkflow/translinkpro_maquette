'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Truck, BarChart3, Building2, Users, MapPin, CreditCard, Globe, Briefcase, FileText } from 'lucide-react'

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const menuItems = [
    {
      title: 'Solution',
      href: '/solution',
      icon: Truck,
      description: 'Découvrez notre plateforme complète',
      subItems: [
        { title: 'Fonctionnalités', href: '/solution/fonctionnalites', icon: Truck },
        { title: 'Comment ça marche', href: '/solution/comment-ca-marche', icon: MapPin },
        { title: 'Avantages', href: '/solution/avantages', icon: BarChart3 },
      ]
    },
    {
      title: 'Marché & Modèle',
      href: '/marche-modele',
      icon: BarChart3,
      description: 'Opportunité et modèle économique',
      subItems: [
        { title: 'Opportunité marché', href: '/marche-modele/opportunite', icon: Globe },
        { title: 'Modèle économique', href: '/marche-modele/modele', icon: CreditCard },
        { title: 'Analyse concurrentielle', href: '/marche-modele/competitifs', icon: Users },
      ]
    },
    {
      title: 'Services',
      href: '/services',
      icon: Building2,
      description: 'Nos offres et tarifs',
      subItems: [
        { title: 'Tarifs', href: '/services/tarifs', icon: CreditCard },
        { title: 'Marketplace', href: '/services/marketplace', icon: Globe },
        { title: 'FAQ', href: '/services/faq', icon: FileText },
      ]
    },
    {
      title: 'Entreprise',
      href: '/entreprise',
      icon: Users,
      description: 'À propos de TransLinkPro',
      subItems: [
        { title: 'Équipe', href: '/entreprise/equipe', icon: Users },
        { title: 'Médias', href: '/entreprise/medias', icon: Building2 },
        { title: 'Carrières', href: '/entreprise/carrieres', icon: Briefcase },
        { title: 'Contact', href: '/entreprise/contact', icon: MapPin },
      ]
    }
  ]

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="hidden md:flex items-center justify-center space-x-8 py-4">
          {menuItems.map((item) => (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.title)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors py-2 font-medium"
              >
                <item.icon className="w-4 h-4" strokeWidth={1.5} />
                <span>{item.title}</span>
                <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
              </Link>

              {/* Mega Menu Dropdown */}
              {activeMenu === item.title && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[800px] bg-white rounded-lg shadow-lg border border-gray-200 py-6 z-50">
                  <div className="px-6 pb-4 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 px-6 pt-4">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <subItem.icon className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                            {subItem.title}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
