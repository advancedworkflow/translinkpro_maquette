'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ArrowLeft,
  Route, 
  Edit, 
  Trash2, 
  MapPin,
  Clock,
  DollarSign,
  Truck,
  User,
  Calendar,
  Navigation,
  Package,
  Fuel,
  Download,
  Upload,
  Plus,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  Settings,
  BarChart3,
  TrendingUp,
  FileText
} from 'lucide-react'

export default function TrajetDetailsPage() {
  const params = useParams()
  const trajetId = params.id as string
  const [activeTab, setActiveTab] = useState<'overview' | 'pricing' | 'schedule' | 'analytics'>('overview')

  // Mock data - En réalité, cela viendrait d'une API
  const trajet = {
    id: 'TR001',
    name: 'Douala - Yaoundé',
    from: 'Douala',
    to: 'Yaoundé',
    distance: '250 km',
    duration: '4h 30min',
    type: 'Régulier',
    status: 'Actif',
    statusColor: 'bg-green-100 text-green-700',
    price: '45,000 XAF',
    pricePerKm: '180 XAF/km',
    truck: 'T123 - Mercedes Actros',
    driver: 'Marc Dupont',
    frequency: 'Quotidien',
    lastTrip: '2024-01-20',
    nextTrip: '2024-01-21',
    cargo: 'Marchandises générales',
    fuelCost: '12,500 XAF',
    profit: '32,500 XAF',
    client: 'SARL TransCam',
    priority: 'Haute',
    priorityColor: 'bg-blue-100 text-trust',
    description: 'Trajet régulier entre Douala et Yaoundé pour le transport de marchandises générales',
    route: {
      waypoints: ['Douala Centre', 'Mbalmayo', 'Yaoundé Centre'],
      totalDistance: '250 km',
      estimatedTime: '4h 30min',
      tolls: '2,500 XAF',
      fuelStops: ['Mbalmayo Station']
    },
    pricing: {
      basePrice: '40,000 XAF',
      distancePrice: '5,000 XAF',
      fuelSurcharge: '2,000 XAF',
      tolls: '2,500 XAF',
      total: '45,000 XAF',
      profitMargin: '72%'
    },
    schedule: {
      frequency: 'Quotidien',
      departureTime: '08:00',
      arrivalTime: '12:30',
      workingDays: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      holidays: ['2024-01-01', '2024-12-25']
    },
    analytics: {
      totalTrips: 156,
      totalRevenue: '7,020,000 XAF',
      averageProfit: '32,500 XAF',
      onTimeRate: '94%',
      fuelEfficiency: '8.2 L/100km',
      customerSatisfaction: '4.8/5'
    }
  }

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: Route },
    { id: 'pricing', name: 'Tarification', icon: DollarSign },
    { id: 'schedule', name: 'Planification', icon: Calendar },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }
  ]

  const recentTrips = [
    { id: 'T001', date: '2024-01-20', status: 'Terminé', revenue: '45,000 XAF', profit: '32,500 XAF', onTime: true },
    { id: 'T002', date: '2024-01-19', status: 'Terminé', revenue: '45,000 XAF', profit: '32,500 XAF', onTime: true },
    { id: 'T003', date: '2024-01-18', status: 'Terminé', revenue: '45,000 XAF', profit: '32,500 XAF', onTime: false },
    { id: 'T004', date: '2024-01-17', status: 'Terminé', revenue: '45,000 XAF', profit: '32,500 XAF', onTime: true },
    { id: 'T005', date: '2024-01-16', status: 'Terminé', revenue: '45,000 XAF', profit: '32,500 XAF', onTime: true }
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link 
            href="/app-saas/trajets"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Link>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <h1 className="text-2xl font-light text-gray-900">#{trajet.id} - {trajet.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{trajet.from} → {trajet.to} • {trajet.distance} • {trajet.duration}</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-trust text-trust'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informations du trajet</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Type:</span>
                  <span className="text-gray-900 ml-2">{trajet.type}</span>
                </div>
                <div>
                  <span className="text-gray-500">Statut:</span>
                  <span className={`text-xs ${trajet.statusColor} px-2 py-1 rounded ml-2`}>
                    {trajet.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Fréquence:</span>
                  <span className="text-gray-900 ml-2">{trajet.frequency}</span>
                </div>
                <div>
                  <span className="text-gray-500">Priorité:</span>
                  <span className={`text-xs ${trajet.priorityColor} px-2 py-1 rounded ml-2`}>
                    {trajet.priority}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Client:</span>
                  <span className="text-gray-900 ml-2">{trajet.client}</span>
                </div>
                <div>
                  <span className="text-gray-500">Cargo:</span>
                  <span className="text-gray-900 ml-2">{trajet.cargo}</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-gray-500">Description:</span>
                <p className="text-gray-900 mt-1">{trajet.description}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Assignation</h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-trust rounded flex items-center justify-center">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{trajet.truck}</p>
                    <p className="text-sm text-gray-500">Camion assigné</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{trajet.driver}</p>
                    <p className="text-sm text-gray-500">Chauffeur assigné</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Trajets récents</h3>
              <div className="space-y-3">
                {recentTrips.map((trip) => (
                  <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">#{trip.id}</p>
                        <p className="text-xs text-gray-500">{trip.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">Revenu: <span className="text-gray-900 font-medium">{trip.revenue}</span></span>
                      <span className="text-gray-500">Bénéfice: <span className="text-green-600 font-medium">{trip.profit}</span></span>
                      <span className={`text-xs px-2 py-1 rounded ${trip.onTime ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-trust'}`}>
                        {trip.onTime ? 'À l\'heure' : 'Retard'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tarification</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Prix total:</span>
                  <span className="text-gray-900 font-medium">{trajet.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Prix/km:</span>
                  <span className="text-gray-900">{trajet.pricePerKm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Coût carburant:</span>
                  <span className="text-gray-900">{trajet.fuelCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bénéfice:</span>
                  <span className="text-green-600 font-medium">{trajet.profit}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Prochaine exécution</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-900">{trajet.nextTrip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Départ:</span>
                  <span className="text-gray-900">08:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Arrivée:</span>
                  <span className="text-gray-900">12:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pricing' && (
        <div className="bg-white border border-gray-200 rounded p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Détails de tarification</h3>
            <button className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center">
              <Edit className="w-4 h-4 mr-2" />
              Modifier les tarifs
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-4">Structure des prix</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Prix de base</span>
                  <span className="font-medium">{trajet.pricing.basePrice}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Prix distance</span>
                  <span className="font-medium">{trajet.pricing.distancePrice}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Surcharge carburant</span>
                  <span className="font-medium">{trajet.pricing.fuelSurcharge}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Péages</span>
                  <span className="font-medium">{trajet.pricing.tolls}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
                  <span className="text-gray-900 font-medium">Total</span>
                  <span className="font-bold text-trust">{trajet.pricing.total}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-700 mb-4">Analyse financière</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Marge bénéficiaire</span>
                  <span className="font-medium text-green-600">{trajet.pricing.profitMargin}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Coût par km</span>
                  <span className="font-medium">50 XAF/km</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Revenu par km</span>
                  <span className="font-medium">180 XAF/km</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Bénéfice par km</span>
                  <span className="font-medium text-green-600">130 XAF/km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="bg-white border border-gray-200 rounded p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Planification</h3>
            <button className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle planification
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-4">Horaires</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Fréquence</span>
                  <span className="font-medium">{trajet.schedule.frequency}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Heure de départ</span>
                  <span className="font-medium">{trajet.schedule.departureTime}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Heure d'arrivée</span>
                  <span className="font-medium">{trajet.schedule.arrivalTime}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-700 mb-4">Jours de travail</h4>
              <div className="flex flex-wrap gap-2">
                {trajet.schedule.workingDays.map((day) => (
                  <span key={day} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Métriques clés</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total des trajets</span>
                <span className="text-2xl font-bold text-gray-900">{trajet.analytics.totalTrips}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Chiffre d'affaires total</span>
                <span className="text-2xl font-bold text-green-600">{trajet.analytics.totalRevenue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Bénéfice moyen</span>
                <span className="text-2xl font-bold text-green-600">{trajet.analytics.averageProfit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taux de ponctualité</span>
                <span className="text-2xl font-bold text-trust">{trajet.analytics.onTimeRate}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Efficacité carburant</span>
                <span className="text-2xl font-bold text-trust">{trajet.analytics.fuelEfficiency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Satisfaction client</span>
                <span className="text-2xl font-bold text-yellow-600">{trajet.analytics.customerSatisfaction}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
