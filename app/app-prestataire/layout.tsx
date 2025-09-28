'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Store, 
  BarChart3, 
  Package, 
  Users, 
  Settings, 
  Menu, 
  X,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Eye,
  Edit,
  Plus
} from 'lucide-react'
import { AuthService } from '../../lib/auth'

export default function PrestataireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser || currentUser.type !== 'prestataire') {
      router.push('/app-saas/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  // Si c'est une page d'authentification, ne pas appliquer le layout
  if (pathname?.startsWith('/app-saas/auth')) {
    return <>{children}</>
  }

  const navigation = [
    { name: 'Tableau de bord', href: '/app-prestataire', icon: BarChart3 },
    { 
      name: 'Vitrine', 
      icon: Store, 
      children: [
        { name: 'Catalogue', href: '/app-prestataire/catalogue', icon: Package },
        { name: 'Promotions', href: '/app-prestataire/promotions', icon: TrendingUp },
        { name: 'Statistiques', href: '/app-prestataire/statistiques', icon: BarChart3 },
      ]
    },
    { 
      name: 'Ventes', 
      icon: DollarSign, 
      children: [
        { name: 'Commandes', href: '/app-prestataire/commandes', icon: Package },
        { name: 'Facturation', href: '/app-prestataire/facturation', icon: DollarSign },
        { name: 'Clients', href: '/app-prestataire/clients', icon: Users },
      ]
    },
    { name: 'Paramètres', href: '/app-prestataire/parametres', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/app-prestataire') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? [] 
        : [itemName]
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
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:fixed lg:inset-y-0 lg:left-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-gray-300" />
            </div>
            <span className="text-xl font-bold text-white">TransLink-Pro</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        hasActiveChild(item.children)
                          ? 'text-white border-r-2 border-gray-300'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className={`w-5 h-5 mr-3 ${
                          hasActiveChild(item.children) ? 'text-gray-300' : 'text-gray-500'
                        }`} />
                        {item.name}
                      </div>
                      {isExpanded(item.name) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    
                    {isExpanded(item.name) && (
                      <ul className="ml-6 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={child.href}
                              className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                                isActive(child.href)
                                  ? 'text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                              }`}
                            >
                              <child.icon className={`w-4 h-4 mr-3 ${
                                isActive(child.href) ? 'text-gray-300' : 'text-gray-500'
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
                        ? 'text-white border-r-2 border-gray-300'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${
                      isActive(item.href) ? 'text-gray-300' : 'text-gray-500'
                    }`} />
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-300">GP</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.profile.nomEntreprise}
              </p>
              <p className="text-xs text-gray-400 truncate capitalize">
                {user.profile.categorie}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Déconnexion
          </button>
        </div>
      </div>
        
      {/* Main content */}
      <div className="flex-1 lg:ml-64">
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
                  <span className="text-sm font-medium text-gray-600">GP</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user.profile.nomEntreprise}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.profile.categorie}
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

