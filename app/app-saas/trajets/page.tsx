'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Route, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
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
  Settings,
  Download,
  Upload,
  MoreVertical,
  X,
  TrendingUp
} from 'lucide-react'

export default function TrajetsPage() {
  const [selectedTrajet, setSelectedTrajet] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  const trajets = [
    {
      id: 'CMD001',
      name: 'Douala - Yaoundé',
      from: 'Douala',
      to: 'Yaoundé',
      distance: '250 km',
      duration: '4h 30min',
      type: 'Régulier',
      status: 'En cours',
      statusColor: 'bg-orange-100 text-orange-700',
      price: '45,000 XAF',
      pricePerKm: '180 XAF/km',
      assignedTrucks: ['T123 - Mercedes Actros', 'T456 - Volvo FH'],
      drivers: ['Marc Dupont', 'Julie Martin'],
      frequency: 'Quotidien',
      orderDate: '2024-01-20',
      deliveryDate: '2024-01-21',
      cargo: 'Marchandises générales',
      fuelCost: '12,500 XAF',
      profit: '32,500 XAF',
      client: 'SARL TransCam',
      clientContact: '+237 6 12 34 56 78',
      priority: 'Haute',
      priorityColor: 'bg-blue-100 text-trust',
      completedTrips: 28,
      totalRevenue: '1,260,000 XAF',
      avgDelay: '15 min',
      efficiency: '92%',
      availableCapacity: '8 tonnes',
      requiredCapacity: '6 tonnes'
    },
    {
      id: 'CMD002',
      name: 'Bafoussam - Garoua',
      from: 'Bafoussam',
      to: 'Garoua',
      distance: '320 km',
      duration: '5h 45min',
      type: 'Occasionnel',
      status: 'Terminé',
      statusColor: 'bg-green-100 text-green-700',
      price: '58,000 XAF',
      pricePerKm: '181 XAF/km',
      assignedTrucks: ['T456 - Volvo FH', 'T789 - Scania R-Series'],
      drivers: ['Julie Martin', 'Paul Bernard'],
      frequency: 'Hebdomadaire',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-22',
      cargo: 'Matériaux de construction',
      fuelCost: '16,000 XAF',
      profit: '42,000 XAF',
      client: 'BTP Cameroun',
      clientContact: '+237 6 98 76 54 32',
      priority: 'Normale',
      priorityColor: 'bg-yellow-100 text-yellow-700',
      completedTrips: 12,
      totalRevenue: '696,000 XAF',
      avgDelay: '8 min',
      efficiency: '96%',
      availableCapacity: '15 tonnes',
      requiredCapacity: '12 tonnes'
    },
    {
      id: 'TR003',
      name: 'Yaoundé - Bertoua',
      from: 'Yaoundé',
      to: 'Bertoua',
      distance: '180 km',
      duration: '3h 15min',
      type: 'Régulier',
      status: 'En cours',
      statusColor: 'bg-orange-100 text-orange-700',
      price: '32,000 XAF',
      pricePerKm: '178 XAF/km',
      truck: 'T101 - MAN TGX',
      driver: 'Pierre Moreau',
      frequency: 'Bi-hebdomadaire',
      lastTrip: '2024-01-19',
      nextTrip: '2024-01-23',
      cargo: 'Produits alimentaires',
      fuelCost: '9,000 XAF',
      profit: '23,000 XAF',
      client: 'AgroCam',
      priority: 'Basse',
      priorityColor: 'bg-green-100 text-green-700',
      completedTrips: 18,
      totalRevenue: '576,000 XAF',
      avgDelay: '22 min',
      efficiency: '88%'
    },
    {
      id: 'TR004',
      name: 'Douala - Maroua',
      from: 'Douala',
      to: 'Maroua',
      distance: '450 km',
      duration: '8h 30min',
      type: 'Longue distance',
      status: 'Terminé',
      statusColor: 'bg-green-100 text-green-700',
      price: '85,000 XAF',
      pricePerKm: '189 XAF/km',
      truck: 'T789 - Scania R-Series',
      driver: 'Paul Bernard',
      frequency: 'Mensuel',
      lastTrip: '2024-01-10',
      nextTrip: '2024-02-10',
      cargo: 'Équipements industriels',
      fuelCost: '22,500 XAF',
      profit: '62,500 XAF',
      client: 'Industrie Nord',
      priority: 'Haute',
      priorityColor: 'bg-blue-100 text-trust',
      completedTrips: 6,
      totalRevenue: '510,000 XAF',
      avgDelay: '5 min',
      efficiency: '98%'
    },
    {
      id: 'TR005',
      name: 'Limbe - Bamenda',
      from: 'Limbe',
      to: 'Bamenda',
      distance: '180 km',
      duration: '3h 45min',
      type: 'Régulier',
      status: 'Programmé',
      statusColor: 'bg-blue-100 text-trust',
      price: '35,000 XAF',
      pricePerKm: '194 XAF/km',
      truck: 'T234 - Iveco Stralis',
      driver: 'Fatou Diallo',
      frequency: 'Bi-hebdomadaire',
      lastTrip: '2024-01-18',
      nextTrip: '2024-01-24',
      cargo: 'Produits frais',
      fuelCost: '10,500 XAF',
      profit: '24,500 XAF',
      client: 'FraisCam',
      priority: 'Haute',
      priorityColor: 'bg-blue-100 text-trust',
      completedTrips: 15,
      totalRevenue: '525,000 XAF',
      avgDelay: '12 min',
      efficiency: '94%'
    },
    {
      id: 'TR006',
      name: 'Ebolowa - Kribi',
      from: 'Ebolowa',
      to: 'Kribi',
      distance: '150 km',
      duration: '2h 30min',
      type: 'Occasionnel',
      status: 'Terminé',
      statusColor: 'bg-green-100 text-green-700',
      price: '28,000 XAF',
      pricePerKm: '187 XAF/km',
      truck: 'T567 - Renault Kerax',
      driver: 'Aïcha Bello',
      frequency: 'Hebdomadaire',
      lastTrip: '2024-01-17',
      nextTrip: '2024-01-25',
      cargo: 'Textiles',
      fuelCost: '8,400 XAF',
      profit: '19,600 XAF',
      client: 'Textile Sud',
      priority: 'Normale',
      priorityColor: 'bg-yellow-100 text-yellow-700',
      completedTrips: 8,
      totalRevenue: '224,000 XAF',
      avgDelay: '18 min',
      efficiency: '90%'
    }
  ]

  const filteredTrajets = trajets.filter(trajet => {
    const matchesSearch = trajet.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trajet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trajet.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trajet.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trajet.client.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || trajet.status === filterStatus
    const matchesType = filterType === 'all' || trajet.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const selectedTrajetData = trajets.find(t => t.id === selectedTrajet)

  const totalRevenue = trajets.reduce((sum, trajet) => {
    return sum + parseInt(trajet.totalRevenue.replace(/[^\d]/g, ''))
  }, 0)

  const totalProfit = trajets.reduce((sum, trajet) => {
    return sum + parseInt(trajet.profit.replace(/[^\d]/g, ''))
  }, 0)

  const totalTrips = trajets.reduce((sum, trajet) => {
    return sum + trajet.completedTrips
  }, 0)

  const activeTrips = trajets.filter(t => t.status === 'En cours').length
  const completedTrips = trajets.filter(t => t.status === 'Terminé').length
  const avgEfficiency = Math.round(trajets.reduce((sum, trajet) => {
    return sum + parseInt(trajet.efficiency.replace('%', ''))
  }, 0) / trajets.length)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Commandes de Trajets</h1>
          <p className="text-sm text-gray-500 mt-1">Gestion des commandes clients et assignation aux camions</p>
        </div>
        <div className="flex space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle commande
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="kpi-label">Commandes clients</div>
              <div className="kpi-value text-trust">{trajets.length}</div>
              <div className="text-xs text-green-600 mt-1">+5 cette semaine</div>
            </div>
            <div className="icon-trust p-3 rounded-lg">
              <Route className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="kpi-label">Chiffre d'affaires</div>
              <div className="kpi-value text-trust">{totalRevenue.toLocaleString()} XAF</div>
              <div className="text-xs text-green-600 mt-1">+12% vs mois dernier</div>
            </div>
            <div className="icon-trust p-3 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="kpi-label">Commandes en cours</div>
              <div className="kpi-value text-trust">{activeTrips}</div>
              <div className="text-xs text-orange-600 mt-1">{completedTrips} livrées</div>
            </div>
            <div className="icon-trust p-3 rounded-lg">
              <Navigation className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="kpi-label">Taux de satisfaction</div>
              <div className="kpi-value text-trust">{avgEfficiency}%</div>
              <div className="text-xs text-green-600 mt-1">+3% vs mois dernier</div>
            </div>
            <div className="icon-trust p-3 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trajets List */}
        <div className="lg:col-span-2">
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-gray-900">Commandes Clients ({filteredTrajets.length})</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm bg-white"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="Actif">Actif</option>
                  <option value="Programmé">Programmé</option>
                  <option value="En cours">En cours</option>
                  <option value="Terminé">Terminé</option>
                </select>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm bg-white"
                >
                  <option value="all">Tous les types</option>
                  <option value="Régulier">Régulier</option>
                  <option value="Occasionnel">Occasionnel</option>
                  <option value="Longue distance">Longue distance</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredTrajets.map((trajet) => (
                <div 
                  key={trajet.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTrajet === trajet.id 
                      ? 'border-trust bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTrajet(trajet.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-trust rounded flex items-center justify-center mr-4">
                        <Route className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">#{trajet.id} - {trajet.name}</h3>
                        <p className="text-xs text-gray-500">{trajet.from} → {trajet.to} • {trajet.distance} • {trajet.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${trajet.statusColor} px-2 py-1 rounded`}>
                        {trajet.status}
                      </span>
                      <span className={`text-xs ${trajet.priorityColor} px-2 py-1 rounded`}>
                        {trajet.priority}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                    <div className="flex items-center">
                      <DollarSign className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">Prix:</span>
                      <span className="text-gray-900 ml-1 font-medium">{trajet.price}</span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">Camion:</span>
                      <span className="text-gray-900 ml-1">{trajet.truck}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">Chauffeur:</span>
                      <span className="text-gray-900 ml-1">{trajet.driver}</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">Client:</span>
                      <span className="text-gray-900 ml-1">{trajet.client}</span>
                    </div>
                  </div>

                  {/* Financial Info */}
                  <div className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600">Coût carburant: <span className="text-gray-900 font-medium">{trajet.fuelCost}</span></span>
                      <span className="text-gray-600">Bénéfice: <span className="text-green-600 font-medium">{trajet.profit}</span></span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600">Fréquence: <span className="text-gray-900 font-medium">{trajet.frequency}</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Trajet Details */}
        <div>
          {selectedTrajetData ? (
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">#{selectedTrajetData.id}</h3>
                <div className="flex space-x-2">
                  <Link href={`/app-saas/trajets/${selectedTrajetData.id}`}>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                  </Link>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Route Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Itinéraire</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">De:</span>
                      <span className="text-gray-900">{selectedTrajetData.from}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Vers:</span>
                      <span className="text-gray-900">{selectedTrajetData.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Distance:</span>
                      <span className="text-gray-900">{selectedTrajetData.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Durée:</span>
                      <span className="text-gray-900">{selectedTrajetData.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tarification</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Prix total:</span>
                      <span className="text-gray-900 font-medium">{selectedTrajetData.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Prix/km:</span>
                      <span className="text-gray-900">{selectedTrajetData.pricePerKm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Coût carburant:</span>
                      <span className="text-gray-900">{selectedTrajetData.fuelCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bénéfice:</span>
                      <span className="text-green-600 font-medium">{selectedTrajetData.profit}</span>
                    </div>
                  </div>
                </div>

                {/* Assignment Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Assignation</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Camion:</span>
                      <span className="text-gray-900">{selectedTrajetData.truck}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Chauffeur:</span>
                      <span className="text-gray-900">{selectedTrajetData.driver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Client:</span>
                      <span className="text-gray-900">{selectedTrajetData.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Fréquence:</span>
                      <span className="text-gray-900">{selectedTrajetData.frequency}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2 pt-4">
                  <Link href={`/app-saas/trajets/${selectedTrajetData.id}`} className="flex-1">
                    <button className="btn-primary w-full px-3 py-2 rounded text-sm flex items-center justify-center">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir détails
                    </button>
                  </Link>
                  <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="dashboard-card">
              <div className="text-center text-gray-500">
                <Route className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Sélectionnez un trajet pour voir les détails</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Trajet Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="dashboard-card p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Nouveau trajet</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Route Information */}
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">Informations de l'itinéraire</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville de départ</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="Douala" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville d'arrivée</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="Yaoundé" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="250" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Durée estimée</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="4h 30min" />
                  </div>
                </div>
              </div>

              {/* Pricing Information */}
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">Tarification</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix total (XAF)</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="45000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix par km (XAF)</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="180" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coût carburant (XAF)</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="12500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de trajet</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                      <option value="Régulier">Régulier</option>
                      <option value="Occasionnel">Occasionnel</option>
                      <option value="Longue distance">Longue distance</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Assignment Information */}
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">Assignation</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Camion</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                      <option value="">Sélectionner un camion</option>
                      <option value="T123">T123 - Mercedes Actros</option>
                      <option value="T456">T456 - Volvo FH</option>
                      <option value="T789">T789 - Scania R-Series</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chauffeur</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                      <option value="">Sélectionner un chauffeur</option>
                      <option value="D001">Marc Dupont</option>
                      <option value="D002">Julie Martin</option>
                      <option value="D003">Pierre Moreau</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="Nom du client" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fréquence</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                      <option value="Quotidien">Quotidien</option>
                      <option value="Hebdomadaire">Hebdomadaire</option>
                      <option value="Bi-hebdomadaire">Bi-hebdomadaire</option>
                      <option value="Mensuel">Mensuel</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 bg-white"
                >
                  Annuler
                </button>
                <button className="btn-primary px-4 py-2 rounded text-sm">
                  Créer le trajet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
