'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Truck, 
  Route, 
  MapPin, 
  CreditCard, 
  Store, 
  BarChart3, 
  Settings,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navigation = [
    {
      name: 'Tableau de bord',
      href: '/app-saas',
      icon: LayoutDashboard,
    },
    {
      name: 'Flotte',
      href: '/app-saas/flotte',
      icon: Truck,
    },
    {
      name: 'Courses',
      href: '/app-saas/courses',
      icon: Route,
    },
    {
      name: 'Tracking',
      href: '/app-saas/tracking',
      icon: MapPin,
    },
    {
      name: 'Paiements',
      href: '/app-saas/paiements',
      icon: CreditCard,
    },
    {
      name: 'Marketplace',
      href: '/app-saas/marketplace',
      icon: Store,
    },
    {
      name: 'Analytics',
      href: '/app-saas/analytics',
      icon: BarChart3,
    },
    {
      name: 'Administration',
      href: '/app-saas/admin',
      icon: Settings,
    },
  ]

  return (
    <div className={`bg-gray-100 border-r border-gray-300 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-trust rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-semibold text-gray-900">TransLinkPro</span>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
            title={isCollapsed ? "Développer la sidebar" : "Réduire la sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-700" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`sidebar-link ${
                  isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-300">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-600" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 truncate">
                  john@example.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

