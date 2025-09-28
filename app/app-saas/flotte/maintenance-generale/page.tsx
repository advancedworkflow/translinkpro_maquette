'use client'

import { useState } from 'react'
import { 
  FileText, 
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
  Download,
  Upload,
  Settings,
  Wrench,
  Truck,
  User,
  MapPin
} from 'lucide-react'

export default function MaintenanceGeneralePage() {
  const [selectedMaintenance, setSelectedMaintenance] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  const stats = [
    {
      icon: Wrench,
      label: 'Maintenances en cours',
      value: '12',
      change: '+3 cette semaine',
      changeColor: 'text-yellow-600'
    },
    {
      icon: AlertTriangle,
      label: 'Maintenances urgentes',
      value: '5',
      change: 'À traiter rapidement',
      changeColor: 'text-red-600'
    },
    {
      icon: CheckCircle,
      label: 'Maintenances terminées',
      value: '28',
      change: '+8 ce mois',
      changeColor: 'text-green-600'
    },
    {
      icon: Calendar,
      label: 'Coût total mensuel',
      value: '2,450,000 XAF',
      change: '+15% vs mois dernier',
      changeColor: 'text-blue-600'
    }
  ]

  const maintenances = [
    {
      id: 'M001',
      truckId: 'T123',
      truckModel: 'Mercedes Actros',
      driver: 'Marc Dupont',
      type: 'Préventive',
      description: 'Révision complète 50,000 km',
      date: '2024-01-20',
      status: 'En cours',
      statusColor: 'bg-yellow-100 text-yellow-700',
      duration: '4h',
      cost: '125,000 XAF',
      technician: 'Jean Mboumba',
      location: 'Atelier Douala',
      priority: 'Normale',
      priorityColor: 'bg-blue-100 text-trust',
      parts: [
        { name: 'Filtre à air', quantity: 1, cost: '15,000 XAF' },
        { name: 'Huile moteur', quantity: 8, cost: '45,000 XAF' },
        { name: 'Filtre à huile', quantity: 1, cost: '8,000 XAF' }
      ],
      notes: 'Camion en bon état général, pas de problèmes majeurs détectés.'
    },
    {
      id: 'M002',
      truckId: 'T789',
      truckModel: 'Scania R-Series',
      driver: 'Paul Bernard',
      type: 'Corrective',
      description: 'Réparation système de freinage',
      date: '2024-01-18',
      status: 'Urgente',
      statusColor: 'bg-blue-100 text-trust',
      duration: '6h',
      cost: '180,000 XAF',
      technician: 'Pierre Nguema',
      location: 'Atelier Yaoundé',
      priority: 'Critique',
      priorityColor: 'bg-blue-100 text-trust',
      parts: [
        { name: 'Plaquettes de frein', quantity: 4, cost: '60,000 XAF' },
        { name: 'Disques de frein', quantity: 2, cost: '80,000 XAF' },
        { name: 'Liquide de frein', quantity: 2, cost: '15,000 XAF' }
      ],
      notes: 'Usure anormale des plaquettes, vérifier le système de freinage complet.'
    },
    {
      id: 'M003',
      truckId: 'T456',
      truckModel: 'Volvo FH',
      driver: 'Julie Martin',
      type: 'Préventive',
      description: 'Vérification transmission',
      date: '2024-01-15',
      status: 'Terminée',
      statusColor: 'bg-green-100 text-green-700',
      duration: '3h',
      cost: '85,000 XAF',
      technician: 'Marie Nkoulou',
      location: 'Atelier Bafoussam',
      priority: 'Basse',
      priorityColor: 'bg-green-100 text-green-700',
      parts: [
        { name: 'Huile transmission', quantity: 5, cost: '35,000 XAF' },
        { name: 'Filtre transmission', quantity: 1, cost: '12,000 XAF' }
      ],
      notes: 'Transmission en excellent état, maintenance préventive réussie.'
    },
    {
      id: 'M004',
      truckId: 'T101',
      truckModel: 'MAN TGX',
      driver: 'Pierre Moreau',
      type: 'Préventive',
      description: 'Révision moteur',
      date: '2024-01-12',
      status: 'Programmée',
      statusColor: 'bg-blue-100 text-trust',
      duration: '5h',
      cost: '95,000 XAF',
      technician: 'Alain Mballa',
      location: 'Atelier Douala',
      priority: 'Normale',
      priorityColor: 'bg-blue-100 text-trust',
      parts: [
        { name: 'Bougies', quantity: 6, cost: '25,000 XAF' },
        { name: 'Filtre à carburant', quantity: 1, cost: '18,000 XAF' },
        { name: 'Courroie distribution', quantity: 1, cost: '35,000 XAF' }
      ],
      notes: 'Maintenance programmée selon planning, aucun problème détecté.'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critique':
        return 'bg-red-100 text-red-700'
      case 'Normale':
        return 'bg-yellow-100 text-yellow-700'
      case 'Basse':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredMaintenances = maintenances.filter(maintenance => {
    const statusMatch = filterStatus === 'all' || maintenance.status === filterStatus
    const typeMatch = filterType === 'all' || maintenance.type === filterType
    return statusMatch && typeMatch
  })

  const selectedMaintenanceData = maintenances.find(m => m.id === selectedMaintenance)

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
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button className="border border-gray-300 text-gray-900 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </button>
          <button className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle intervention
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Maintenances List */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-gray-900">Interventions ({filteredMaintenances.length})</h2>
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
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-xs bg-white"
                >
                  <option value="all">Tous les types</option>
                  <option value="Préventive">Préventive</option>
                  <option value="Corrective">Corrective</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredMaintenances.map((maintenance) => (
                <div 
                  key={maintenance.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedMaintenance === maintenance.id 
                      ? 'border-trust bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedMaintenance(maintenance.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-trust rounded flex items-center justify-center mr-3">
                        <Wrench className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">#{maintenance.id} - {maintenance.type}</h3>
                        <p className="text-xs text-gray-500">{maintenance.truckId} • {maintenance.truckModel}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`text-xs ${maintenance.statusColor} px-2 py-1 rounded`}>
                        {maintenance.status}
                      </span>
                      <span className={`text-xs ${maintenance.priorityColor} px-2 py-1 rounded`}>
                        {maintenance.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                    <div>
                      <span className="text-gray-500">Chauffeur:</span>
                      <span className="text-gray-900 ml-1">{maintenance.driver}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <span className="text-gray-900 ml-1">{maintenance.date}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Durée:</span>
                      <span className="text-gray-900 ml-1">{maintenance.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Coût:</span>
                      <span className="text-gray-900 ml-1">{maintenance.cost}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-2">{maintenance.description}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1 text-gray-500" />
                      <span className="text-gray-500">Technicien:</span>
                      <span className="text-gray-900 ml-1">{maintenance.technician}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                      <span className="text-gray-500">Lieu:</span>
                      <span className="text-gray-900 ml-1">{maintenance.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Maintenance Details */}
        <div>
          {selectedMaintenanceData ? (
            <div className="bg-white border border-gray-200 rounded p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">#{selectedMaintenanceData.id}</h3>
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
                      <span className="text-gray-500">Type:</span>
                      <span className="text-gray-900">{selectedMaintenanceData.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Camion:</span>
                      <span className="text-gray-900">{selectedMaintenanceData.truckId} - {selectedMaintenanceData.truckModel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Chauffeur:</span>
                      <span className="text-gray-900">{selectedMaintenanceData.driver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="text-gray-900">{selectedMaintenanceData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Durée:</span>
                      <span className="text-gray-900">{selectedMaintenanceData.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Coût:</span>
                      <span className="text-gray-900">{selectedMaintenanceData.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Statut:</span>
                      <span className={`text-xs ${selectedMaintenanceData.statusColor} px-2 py-1 rounded`}>
                        {selectedMaintenanceData.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Priorité:</span>
                      <span className={`text-xs ${selectedMaintenanceData.priorityColor} px-2 py-1 rounded`}>
                        {selectedMaintenanceData.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Équipe</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Technicien:</span>
                      <span className="text-gray-900">{selectedMaintenanceData.technician}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Lieu:</span>
                      <span className="text-gray-900">{selectedMaintenanceData.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Pièces utilisées</h4>
                  <div className="space-y-2">
                    {selectedMaintenanceData.parts.map((part, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">{part.name}</span>
                          <span className="text-gray-600">{part.cost}</span>
                        </div>
                        <div className="text-xs text-gray-500">Quantité: {part.quantity}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {selectedMaintenanceData.notes}
                  </p>
                </div>

                <div className="flex space-x-2 pt-4">
                  <button className="flex-1 bg-trust text-white px-3 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Rapport
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-900 px-3 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded p-6">
              <div className="text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Sélectionnez une intervention pour voir les détails</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
