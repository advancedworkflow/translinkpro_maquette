'use client'

import { useState, useEffect } from 'react'
import { 
  Truck, 
  MapPin, 
  Package, 
  FileText, 
  Plus,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign
} from 'lucide-react'
import { AuthService } from '../../lib/auth'

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const stats = [
    {
      icon: Truck,
      label: 'Courses totales',
      value: '24',
      change: '+3 ce mois',
      changeColor: 'text-green-600'
    },
    {
      icon: CheckCircle,
      label: 'Livraisons réussies',
      value: '22',
      change: '92%',
      changeColor: 'text-green-600'
    },
    {
      icon: DollarSign,
      label: 'Coût total',
      value: '1,250,000 FCFA',
      change: '+15%',
      changeColor: 'text-gray-600'
    },
    {
      icon: TrendingUp,
      label: 'Économies réalisées',
      value: '180,000 FCFA',
      change: 'vs tarifs standards',
      changeColor: 'text-green-600'
    }
  ]

  const recentDemandes = [
    {
      id: 'DEM-001',
      typeMarchandise: 'Matériaux de construction',
      origine: 'Douala',
      destination: 'Yaoundé',
      statut: 'En cours',
      transporteur: 'Transport Express',
      prix: '85,000 FCFA',
      date: '2024-01-20'
    },
    {
      id: 'DEM-002',
      typeMarchandise: 'Produits alimentaires',
      origine: 'Bafoussam',
      destination: 'Garoua',
      statut: 'Livrée',
      transporteur: 'Logistique Plus',
      prix: '120,000 FCFA',
      date: '2024-01-18'
    },
    {
      id: 'DEM-003',
      typeMarchandise: 'Containers',
      origine: 'Douala Port',
      destination: 'Bertoua',
      statut: 'En attente',
      transporteur: null,
      prix: null,
      date: '2024-01-15'
    }
  ]

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'Livrée':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'En cours':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'En attente':
        return <Clock className="w-4 h-4 text-blue-500" />
      case 'Annulée':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Livrée':
        return 'bg-green-100 text-green-800'
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800'
      case 'En attente':
        return 'bg-blue-100 text-blue-800'
      case 'Annulée':
        return 'bg-red-100 text-red-800'
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
            Tableau de bord - {user.profile.nomComplet}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gérez vos demandes de transport
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-900 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle demande
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
                <div className={`text-xs ${stat.changeColor} mt-1`}>{stat.change}</div>
              </div>
              <div className="icon-trust p-3 rounded-lg">
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Demandes */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-gray-900">Demandes récentes</h2>
              <button className="text-gray-600 hover:text-gray-900 text-sm">
                Voir tout
              </button>
            </div>
            
            <div className="space-y-4">
              {recentDemandes.map((demande) => (
                <div key={demande.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center mr-4">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{demande.id}</h3>
                      <p className="text-xs text-gray-500">{demande.typeMarchandise}</p>
                      <p className="text-xs text-gray-500">
                        {demande.origine} → {demande.destination}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      {demande.prix && (
                        <p className="text-sm font-medium text-gray-900">{demande.prix}</p>
                      )}
                      <p className="text-xs text-gray-500">{demande.date}</p>
                      {demande.transporteur && (
                        <p className="text-xs text-gray-500">{demande.transporteur}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(demande.statut)}
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(demande.statut)}`}>
                        {demande.statut}
                      </span>
                    </div>
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
                Nouvelle demande
              </button>
              
              <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
                <MapPin className="w-4 h-4 mr-3" />
                Suivi en temps réel
              </button>
              
              <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
                <Package className="w-4 h-4 mr-3" />
                Comparer les offres
              </button>
              
              <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
                <FileText className="w-4 h-4 mr-3" />
                Télécharger factures
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-white border border-gray-200 rounded p-6">
            <h2 className="text-lg font-light text-gray-900 mb-4">Profil</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Nom:</span>
                <span className="text-gray-900">{user.profile.nomComplet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Entreprise:</span>
                <span className="text-gray-900">{user.profile.raisonSociale || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Localisation:</span>
                <span className="text-gray-900">{user.profile.localisation.ville}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fréquence:</span>
                <span className="text-gray-900 capitalize">{user.profile.frequenceBesoins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Paiement:</span>
                <span className="text-gray-900 capitalize">
                  {user.profile.modePaiementPrefere.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

