'use client'

import { useState, useEffect } from 'react'
import { 
  Store, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Package, 
  Eye,
  Plus,
  BarChart3,
  Calendar,
  Star
} from 'lucide-react'
import { AuthService } from '../../lib/auth'

export default function PrestataireDashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const stats = [
    {
      icon: DollarSign,
      label: 'Chiffre d\'affaires ce mois',
      value: '2,450,000 FCFA',
      change: '+12%',
      changeColor: 'text-green-600'
    },
    {
      icon: Package,
      label: 'Commandes traitées',
      value: '47',
      change: '+8%',
      changeColor: 'text-green-600'
    },
    {
      icon: Users,
      label: 'Nouveaux clients',
      value: '12',
      change: '+25%',
      changeColor: 'text-green-600'
    },
    {
      icon: Star,
      label: 'Note moyenne',
      value: '4.8/5',
      change: '+0.2',
      changeColor: 'text-green-600'
    }
  ]

  const recentOrders = [
    {
      id: 'CMD-001',
      client: 'Transport Express',
      service: 'Vidange moteur',
      amount: '15,000 FCFA',
      status: 'Terminé',
      date: '2024-01-20'
    },
    {
      id: 'CMD-002',
      client: 'Logistique Plus',
      service: 'Changement pneus',
      amount: '45,000 FCFA',
      status: 'En cours',
      date: '2024-01-19'
    },
    {
      id: 'CMD-003',
      client: 'Camion SARL',
      service: 'Réparation freins',
      amount: '25,000 FCFA',
      status: 'Terminé',
      date: '2024-01-18'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé':
        return 'bg-green-100 text-green-800'
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800'
      case 'En attente':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!user) {
    return <div>Chargement...</div>
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-light text-gray-900">
            Tableau de bord - {user.profile.nomEntreprise}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gérez votre vitrine et vos ventes
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-900 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau service
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="kpi-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="kpi-label">{stat.label}</div>
                <div className="kpi-value text-trust">{stat.value}</div>
                <div className={`text-xs ${stat.changeColor} mt-1`}>{stat.change} vs mois dernier</div>
              </div>
              <div className="icon-trust p-3 rounded-lg">
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-gray-900">Commandes récentes</h2>
              <button className="text-gray-600 hover:text-gray-900 text-sm">
                Voir tout
              </button>
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center mr-4">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{order.id}</h3>
                      <p className="text-xs text-gray-500">{order.client} • {order.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{order.amount}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white border border-gray-200 rounded p-6 mb-6">
            <h2 className="text-lg font-light text-gray-900 mb-4">Actions rapides</h2>
            
            <div className="space-y-3">
              <button className="w-full bg-gray-800 text-white p-3 rounded text-sm hover:bg-gray-900 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-3" />
                Ajouter un service
              </button>
              
              <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
                <TrendingUp className="w-4 h-4 mr-3" />
                Créer une promotion
              </button>
              
              <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
                <BarChart3 className="w-4 h-4 mr-3" />
                Voir les statistiques
              </button>
              
              <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
                <Users className="w-4 h-4 mr-3" />
                Gérer les clients
              </button>
            </div>
          </div>

          {/* Business Info */}
          <div className="bg-white border border-gray-200 rounded p-6">
            <h2 className="text-lg font-light text-gray-900 mb-4">Informations</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Catégorie:</span>
                <span className="text-gray-900 capitalize">{user.profile.categorie}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ville:</span>
                <span className="text-gray-900">{user.profile.ville}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Téléphone:</span>
                <span className="text-gray-900">{user.profile.telephone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Horaires:</span>
                <span className="text-gray-900">{user.profile.horairesOuverture}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

