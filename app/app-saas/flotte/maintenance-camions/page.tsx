'use client'

import { useState } from 'react'
import { 
  Truck, 
  Wrench, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Plus,
  Filter,
  Search,
  Edit,
  Eye,
  Trash2,
  Phone,
  MessageSquare,
  FileText,
  Settings,
  User
} from 'lucide-react'

export default function MaintenanceCamionsPage() {
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const stats = [
    {
      icon: Truck,
      label: 'Véhicules en maintenance',
      value: '8',
      change: '+2 cette semaine',
      changeColor: 'text-yellow-600'
    },
    {
      icon: AlertTriangle,
      label: 'Maintenances urgentes',
      value: '3',
      change: 'À traiter rapidement',
      changeColor: 'text-red-600'
    },
    {
      icon: CheckCircle,
      label: 'Maintenances terminées',
      value: '15',
      change: '+5 ce mois',
      changeColor: 'text-green-600'
    },
    {
      icon: Calendar,
      label: 'Prochaines échéances',
      value: '12',
      change: '7 jours à venir',
      changeColor: 'text-blue-600'
    }
  ]

  const trucks = [
    {
      id: 'T123',
      model: 'Mercedes Actros',
      driver: 'Marc Dupont',
      license: 'CM-123-AB',
      mileage: '145,230 km',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      status: 'En cours',
      statusColor: 'bg-yellow-100 text-yellow-700',
      issues: [
        { type: 'Moteur', description: 'Changement filtre à air', priority: 'Moyenne', date: '2024-01-20' },
        { type: 'Freins', description: 'Vérification plaquettes', priority: 'Haute', date: '2024-01-25' }
      ],
      phone: '+237 6 12 34 56 78'
    },
    {
      id: 'T456',
      model: 'Volvo FH',
      driver: 'Julie Martin',
      license: 'CM-456-CD',
      mileage: '98,450 km',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      status: 'Programmée',
      statusColor: 'bg-blue-100 text-trust',
      issues: [
        { type: 'Transmission', description: 'Vérification boîte de vitesses', priority: 'Basse', date: '2024-02-01' }
      ],
      phone: '+237 6 23 45 67 89'
    },
    {
      id: 'T789',
      model: 'Scania R-Series',
      driver: 'Paul Bernard',
      license: 'CM-789-EF',
      mileage: '203,890 km',
      lastMaintenance: '2023-12-20',
      nextMaintenance: '2024-03-20',
      status: 'Urgente',
      statusColor: 'bg-blue-100 text-trust',
      issues: [
        { type: 'Moteur', description: 'Révision complète moteur', priority: 'Critique', date: '2024-01-18' },
        { type: 'Suspension', description: 'Changement amortisseurs', priority: 'Haute', date: '2024-01-22' },
        { type: 'Électricité', description: 'Problème alternateur', priority: 'Critique', date: '2024-01-20' }
      ],
      phone: '+237 6 34 56 78 90'
    },
    {
      id: 'T101',
      model: 'MAN TGX',
      driver: 'Pierre Moreau',
      license: 'CM-101-GH',
      mileage: '87,320 km',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-04-05',
      status: 'Terminée',
      statusColor: 'bg-green-100 text-green-700',
      issues: [],
      phone: '+237 6 45 67 89 01'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critique':
        return 'bg-red-100 text-red-700'
      case 'Haute':
        return 'bg-orange-100 text-orange-700'
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-700'
      case 'Basse':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredTrucks = trucks.filter(truck => {
    if (filterStatus === 'all') return true
    return truck.status === filterStatus
  })

  const selectedTruckData = trucks.find(t => t.id === selectedTruck)

  return (
    <div className="p-6">
      {/* Stats Section */}
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

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-3">
          <button className="border border-gray-300 text-gray-900 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </button>
          <button className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle maintenance
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trucks List */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-gray-900">Flotte ({filteredTrucks.length})</h2>
              <div className="flex space-x-2">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-xs bg-white"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="En cours">En cours</option>
                  <option value="Programmée">Programmée</option>
                  <option value="Urgente">Urgente</option>
                  <option value="Terminée">Terminée</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredTrucks.map((truck) => (
                <div 
                  key={truck.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTruck === truck.id 
                      ? 'border-trust bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTruck(truck.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-trust rounded flex items-center justify-center mr-3">
                        <Truck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">#{truck.id} - {truck.model}</h3>
                        <p className="text-xs text-gray-500">{truck.license} • {truck.mileage}</p>
                      </div>
                    </div>
                    <span className={`text-xs ${truck.statusColor} px-2 py-1 rounded`}>
                      {truck.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500">Chauffeur:</span>
                      <span className="text-gray-900 ml-1">{truck.driver}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Dernière maintenance:</span>
                      <span className="text-gray-900 ml-1">{truck.lastMaintenance}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Prochaine maintenance:</span>
                      <span className="text-gray-900 ml-1">{truck.nextMaintenance}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Problèmes:</span>
                      <span className="text-gray-900 ml-1">{truck.issues.length}</span>
                    </div>
                  </div>

                  {truck.issues.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1">
                        {truck.issues.slice(0, 2).map((issue, index) => (
                          <span key={index} className={`text-xs ${getPriorityColor(issue.priority)} px-2 py-1 rounded`}>
                            {issue.type}
                          </span>
                        ))}
                        {truck.issues.length > 2 && (
                          <span className="text-xs text-gray-500 px-2 py-1">
                            +{truck.issues.length - 2} autres
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Truck Details */}
        <div>
          {selectedTruckData ? (
            <div className="bg-white border border-gray-200 rounded p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">#{selectedTruckData.id}</h3>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Informations générales</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Modèle:</span>
                      <span className="text-gray-900">{selectedTruckData.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Immatriculation:</span>
                      <span className="text-gray-900">{selectedTruckData.license}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Chauffeur:</span>
                      <span className="text-gray-900">{selectedTruckData.driver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Kilométrage:</span>
                      <span className="text-gray-900">{selectedTruckData.mileage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Statut:</span>
                      <span className={`text-xs ${selectedTruckData.statusColor} px-2 py-1 rounded`}>
                        {selectedTruckData.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Maintenance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Dernière:</span>
                      <span className="text-gray-900">{selectedTruckData.lastMaintenance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Prochaine:</span>
                      <span className="text-gray-900">{selectedTruckData.nextMaintenance}</span>
                    </div>
                  </div>
                </div>

                {selectedTruckData.issues.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Problèmes identifiés</h4>
                    <div className="space-y-2">
                      {selectedTruckData.issues.map((issue, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{issue.type}</span>
                            <span className={`text-xs ${getPriorityColor(issue.priority)} px-2 py-1 rounded`}>
                              {issue.priority}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{issue.description}</p>
                          <p className="text-xs text-gray-500">Date: {issue.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 pt-4">
                  <button className="flex-1 bg-trust text-white px-3 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-900 px-3 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded p-6">
              <div className="text-center text-gray-500">
                <Truck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Sélectionnez un camion pour voir les détails</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
