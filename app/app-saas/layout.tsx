'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AuthService } from '../../lib/auth'
import { 
  Truck, 
  BarChart3, 
  Users, 
  MapPin, 
  CreditCard, 
  ShoppingCart, 
  Settings, 
  Menu, 
  X,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  Wrench,
  FileText,
  Calendar,
  AlertTriangle,
  Home, // Added for general section
  HelpCircle, // Added for support section
  MessageCircle, // Added for support
  Phone, // Added for support
  BookOpen, // Added for support
  User // Added for chauffeurs
} from 'lucide-react'

export default function SaasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser || currentUser.type !== 'transporteur') {
      router.push('/app-saas/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  // Si c'est une page d'authentification, ne pas appliquer le layout SaaS
  if (pathname?.startsWith('/app-saas/auth')) {
    return <>{children}</>
  }

  const navigation = [
    { name: 'Tableau de bord', href: '/app-saas', icon: BarChart3 },
    { 
      name: 'Flotte', 
      icon: Truck, 
      children: [
        { name: 'Vue d\'ensemble', href: '/app-saas/flotte', icon: Truck },
        { name: 'Camions', href: '/app-saas/flotte/camions', icon: Truck },
        { name: 'Chauffeurs', href: '/app-saas/flotte/chauffeurs', icon: User },
        { name: 'Maintenance camions', href: '/app-saas/flotte/maintenance-camions', icon: Wrench },
        { name: 'Maintenance générale', href: '/app-saas/flotte/maintenance-generale', icon: FileText },
        { name: 'Planification', href: '/app-saas/flotte/planification', icon: Calendar },
      ]
    },
    { 
      name: 'Général', 
      icon: Home, 
      children: [
        { name: 'Tableau de bord', href: '/app-saas', icon: BarChart3 },
        { name: 'Courses', href: '/app-saas/courses', icon: MapPin },
        { name: 'Trajets', href: '/app-saas/trajets', icon: MapPin },
        { name: 'Tracking', href: '/app-saas/tracking', icon: MapPin },
        { name: 'Planification', href: '/app-saas/planification', icon: Calendar },
        { name: 'Paiements', href: '/app-saas/paiements', icon: CreditCard },
        { name: 'Marketplace', href: '/app-saas/marketplace', icon: ShoppingCart },
        { name: 'Analytics', href: '/app-saas/analytics', icon: BarChart3 },
      ]
    },
    { 
      name: 'Support', 
      icon: HelpCircle, 
      children: [
        { name: 'Centre d\'aide', href: '/app-saas/support/help', icon: BookOpen },
        { name: 'Contact', href: '/app-saas/support/contact', icon: Phone },
        { name: 'Chat en direct', href: '/app-saas/support/chat', icon: MessageCircle },
        { name: 'FAQ', href: '/app-saas/support/faq', icon: HelpCircle },
        { name: 'Tickets', href: '/app-saas/support/tickets', icon: FileText },
      ]
    },
    { name: 'Paramètres', href: '/app-saas/parametres', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/app-saas') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? [] // Fermer le menu si il est déjà ouvert
        : [itemName] // Ouvrir seulement ce menu (fermer les autres)
    )
  }

  const isExpanded = (itemName: string) => expandedItems.includes(itemName)

  const hasActiveChild = (children: any[]) => {
    return children.some(child => isActive(child.href))
  }

  const handleLogout = () => {
    AuthService.logout()
    router.push('/app-saas/auth/login')
  }

  if (!user) {
    return <div>Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

        {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-gray-100 border-r border-gray-300 shadow-lg transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:fixed lg:inset-y-0 lg:left-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-300">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-trust rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-bold text-gray-900">TransLink-Pro</span>
            )}
          </Link>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

              <nav className="mt-8 px-4">
                <ul className="space-y-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {item.children ? (
                        <div>
                          <button
                            onClick={() => !sidebarCollapsed && toggleExpanded(item.name)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                              hasActiveChild(item.children)
                                ? 'bg-trust text-white'
                                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className="relative">
                                <item.icon className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'} ${
                                  hasActiveChild(item.children) ? 'text-white' : 'text-gray-500'
                                }`} />
                                {item.name === 'Flotte' && (
                                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-trust text-white text-xs rounded-full flex items-center justify-center">
                                    3
                                  </span>
                                )}
                              </div>
                              {!sidebarCollapsed && item.name}
                            </div>
                            {!sidebarCollapsed && (isExpanded(item.name) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            ))}
                          </button>
                          
                          {!sidebarCollapsed && isExpanded(item.name) && (
                            <ul className="ml-6 mt-2 space-y-1">
                              {item.children.map((child) => (
                                <li key={child.name}>
                                  <Link
                                    href={child.href}
                                    className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                                      isActive(child.href)
                                        ? 'bg-trust text-white'
                                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                    }`}
                                  >
                                    <child.icon className={`w-4 h-4 mr-3 ${
                                      isActive(child.href) ? 'text-white' : 'text-gray-500'
                                    }`} />
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                            isActive(item.href)
                              ? 'bg-trust text-white'
                              : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                          }`}
                        >
                          <item.icon className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'} ${
                            isActive(item.href) ? 'text-white' : 'text-gray-500'
                          }`} />
                          {!sidebarCollapsed && item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-300">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} mb-4`}>
            <div className="w-8 h-8 bg-trust rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">JD</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.profile.nomEntreprise}
                </p>
                <p className="text-xs text-gray-500 truncate capitalize">
                  {user.profile.typeStructure}
                </p>
              </div>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className={`flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-lg transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className={`w-4 h-4 ${sidebarCollapsed ? '' : 'mr-3'}`} />
            {!sidebarCollapsed && 'Déconnexion'}
          </button>
        </div>
      </div>
        
        {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="hidden sm:block ml-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">JD</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user.profile.nomEntreprise}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.profile.typeStructure}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-screen bg-gray-50">
            {children}
          </main>
      </div>
    </div>
  )
}