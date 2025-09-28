'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Camera, 
  Shield, 
  Calendar,
  User,
  MapPin,
  Clock,
  Fuel,
  Settings,
  Download,
  Upload,
  MoreVertical,
  X,
  CheckCircle,
  AlertTriangle,
  Wrench,
  CreditCard,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  Activity,
  TrendingUp,
  BarChart3,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'

export default function CamionsPage() {
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showTruckDetail, setShowTruckDetail] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [createModalTab, setCreateModalTab] = useState('general')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([])

  const trucks = [
    {
      id: 'T123',
      model: 'Mercedes Actros',
      year: 2022,
      license: 'CM-123-AB',
      vin: 'WDB9634561LA12345',
      mileage: '145,230 km',
      status: 'Actif',
      statusColor: 'bg-green-100 text-green-700',
      driver: 'Marc Dupont',
      driverId: 'D001',
      location: 'Douala Centre',
      fuel: '75%',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      insurance: {
        provider: 'AXA Cameroun',
        policy: 'POL-2024-001',
        expiry: '2024-12-31',
        valid: true
      },
      documents: {
        registration: true,
        insurance: true,
        inspection: true,
        permit: true
      },
      photos: [
        { id: 1, type: 'exterior', url: '/images/trucks/t123-exterior.jpg', date: '2024-01-10' },
        { id: 2, type: 'interior', url: '/images/trucks/t123-interior.jpg', date: '2024-01-10' },
        { id: 3, type: 'engine', url: '/images/trucks/t123-engine.jpg', date: '2024-01-10' }
      ],
      routes: [
        { id: 'R001', from: 'Douala', to: 'Yaoundé', date: '2024-01-20', distance: '250 km', duration: '4h 30min' },
        { id: 'R002', from: 'Yaoundé', to: 'Bafoussam', date: '2024-01-18', distance: '180 km', duration: '3h 15min' }
      ]
    },
    {
      id: 'T456',
      model: 'Volvo FH',
      year: 2021,
      license: 'CM-456-CD',
      vin: 'YV2J4A1234A123456',
      mileage: '98,450 km',
      status: 'Disponible',
      statusColor: 'bg-blue-100 text-trust',
      driver: 'Julie Martin',
      driverId: 'D002',
      location: 'Bafoussam',
      fuel: '92%',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      insurance: {
        provider: 'Allianz Cameroun',
        policy: 'POL-2024-002',
        expiry: '2024-11-30',
        valid: true
      },
      documents: {
        registration: true,
        insurance: true,
        inspection: false,
        permit: true
      },
      photos: [
        { id: 1, type: 'exterior', url: '/images/trucks/t456-exterior.jpg', date: '2024-01-05' }
      ],
      routes: [
        { id: 'R003', from: 'Bafoussam', to: 'Garoua', date: '2024-01-15', distance: '320 km', duration: '5h 45min' }
      ]
    },
    {
      id: 'T789',
      model: 'Scania R-Series',
      year: 2020,
      license: 'CM-789-EF',
      vin: 'YS2J4X2000A123456',
      mileage: '203,890 km',
      status: 'Maintenance',
      statusColor: 'bg-yellow-100 text-yellow-700',
      driver: null,
      driverId: null,
      location: 'Atelier Yaoundé',
      fuel: '45%',
      lastMaintenance: '2024-01-18',
      nextMaintenance: '2024-02-18',
      insurance: {
        provider: 'NSIA Cameroun',
        policy: 'POL-2024-003',
        expiry: '2024-10-15',
        valid: true
      },
      documents: {
        registration: true,
        insurance: true,
        inspection: true,
        permit: false
      },
      photos: [],
      routes: []
    }
  ]

  // Données détaillées du camion T123
  const truckT123Details = {
    id: 'T123',
    model: 'Mercedes Actros',
    year: '2022',
    registration: 'CM-123-AB',
    vin: 'WDB9634561LA12345',
    driver: 'Marc Dupont',
    status: 'Actif',
    mileage: '145,230 km',
    fuel: '75%',
    color: 'Blanc',
    engine: 'OM 501 LA - 12.8L',
    power: '450 CV',
    transmission: 'Automatique 12 vitesses',
    weight: '18,000 kg',
    capacity: '25,000 kg',
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop'
    ],
    insurance: {
      provider: 'AXA Cameroun',
      policy: 'POL-2024-001234',
      expiry: '2024-12-31',
      coverage: 'Tous risques',
      amount: '50,000,000 XAF'
    },
    maintenance: {
      lastService: '2024-01-15',
      nextService: '2024-04-15',
      serviceInterval: '15,000 km',
      lastOilChange: '2024-01-15',
      lastTireChange: '2023-11-20',
      totalMaintenanceCost: '2,450,000 XAF'
    },
    documents: [
      { name: 'Carte grise', type: 'pdf', size: '2.3 MB', date: '2022-01-15' },
      { name: 'Assurance', type: 'pdf', size: '1.8 MB', date: '2024-01-01' },
      { name: 'Contrôle technique', type: 'pdf', size: '1.2 MB', date: '2023-12-10' },
      { name: 'Permis de circulation', type: 'pdf', size: '0.9 MB', date: '2022-01-15' }
    ],
    history: [
      { date: '2024-01-15', event: 'Maintenance préventive', type: 'maintenance', cost: '450,000 XAF' },
      { date: '2023-12-10', event: 'Contrôle technique', type: 'inspection', cost: '25,000 XAF' },
      { date: '2023-11-20', event: 'Changement pneus', type: 'maintenance', cost: '320,000 XAF' },
      { date: '2023-10-05', event: 'Réparation freins', type: 'repair', cost: '180,000 XAF' },
      { date: '2023-08-15', event: 'Vidange moteur', type: 'maintenance', cost: '85,000 XAF' }
    ],
    performance: {
      averageSpeed: '65 km/h',
      fuelConsumption: '28 L/100km',
      tripsCompleted: 156,
      totalDistance: '45,230 km',
      efficiency: '92%'
    }
  }

  const filteredTrucks = trucks.filter(truck => {
    const matchesSearch = truck.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         truck.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         truck.license.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (truck.driver && truck.driver.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = filterStatus === 'all' || truck.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const selectedTruckData = trucks.find(t => t.id === selectedTruck)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Gestion des Camions</h1>
          <p className="text-sm text-gray-500 mt-1">Gestion complète de la flotte de camions</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau camion
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="kpi-label">Total camions</div>
              <div className="kpi-value text-trust">{trucks.length}</div>
              <div className="text-xs text-green-600 mt-1">+2 ce mois</div>
            </div>
            <div className="icon-trust p-3 rounded-lg">
              <Truck className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="kpi-label">Actifs</div>
              <div className="kpi-value text-trust">{trucks.filter(t => t.status === 'Actif').length}</div>
              <div className="text-xs text-green-600 mt-1">+1 cette semaine</div>
            </div>
            <div className="icon-trust p-3 rounded-lg">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="kpi-label">En maintenance</div>
              <div className="kpi-value text-trust">{trucks.filter(t => t.status === 'Maintenance').length}</div>
              <div className="text-xs text-orange-600 mt-1">-1 cette semaine</div>
            </div>
            <div className="icon-trust p-3 rounded-lg">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="kpi-label">Documents expirés</div>
              <div className="kpi-value text-trust">1</div>
              <div className="text-xs text-red-600 mt-1">Attention requise</div>
            </div>
            <div className="icon-trust p-3 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trucks List */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-gray-900">Flotte ({filteredTrucks.length})</h2>
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
                  <option value="Disponible">Disponible</option>
                  <option value="Maintenance">Maintenance</option>
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
                      <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center mr-4">
                        <Truck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">#{truck.id} - {truck.model}</h3>
                        <p className="text-xs text-gray-500">{truck.license} • {truck.year} • {truck.mileage}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${truck.statusColor} px-2 py-1 rounded`}>
                        {truck.status}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">Chauffeur:</span>
                      <span className="text-gray-900 ml-1">{truck.driver || 'Non assigné'}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">Localisation:</span>
                      <span className="text-gray-900 ml-1">{truck.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Fuel className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">Carburant:</span>
                      <span className="text-gray-900 ml-1">{truck.fuel}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">Prochaine maintenance:</span>
                      <span className="text-gray-900 ml-1">{truck.nextMaintenance}</span>
                    </div>
                  </div>

                  {/* Documents Status */}
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center">
                      <Shield className="w-3 h-3 mr-1 text-gray-500" />
                      <span className="text-gray-600">Documents:</span>
                    </div>
                    <div className="flex space-x-2">
                      {Object.entries(truck.documents).map(([doc, valid]) => (
                        <span 
                          key={doc}
                          className={`px-2 py-1 rounded text-xs ${
                            valid ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-trust'
                          }`}
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
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
                  <Link href={`/app-saas/flotte/camions/${selectedTruckData.id}`}>
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
                {/* Basic Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Informations générales</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Modèle:</span>
                      <span className="text-gray-900">{selectedTruckData.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Année:</span>
                      <span className="text-gray-900">{selectedTruckData.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Immatriculation:</span>
                      <span className="text-gray-900">{selectedTruckData.license}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">VIN:</span>
                      <span className="text-gray-900 text-xs">{selectedTruckData.vin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Kilométrage:</span>
                      <span className="text-gray-900">{selectedTruckData.mileage}</span>
                    </div>
                  </div>
                </div>

                {/* Driver Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Chauffeur assigné</h4>
                  <div className="space-y-2 text-sm">
                    {selectedTruckData.driver ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Nom:</span>
                          <span className="text-gray-900">{selectedTruckData.driver}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">ID:</span>
                          <span className="text-gray-900">{selectedTruckData.driverId}</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-gray-500 py-2">
                        Aucun chauffeur assigné
                      </div>
                    )}
                  </div>
                </div>

                {/* Insurance Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Assurance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Compagnie:</span>
                      <span className="text-gray-900">{selectedTruckData.insurance.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Police:</span>
                      <span className="text-gray-900">{selectedTruckData.insurance.policy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Expiration:</span>
                      <span className={`text-xs ${selectedTruckData.insurance.valid ? 'text-green-600' : 'text-trust'}`}>
                        {selectedTruckData.insurance.expiry}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2 pt-4">
                  <Link href={`/app-saas/flotte/camions/${selectedTruckData.id}`} className="flex-1">
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
            <div className="bg-white border border-gray-200 rounded p-6">
              <div className="text-center text-gray-500">
                <Truck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Sélectionnez un camion pour voir les détails</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Truck Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-medium text-gray-900">Nouveau camion</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'general', name: 'Général', icon: Truck },
                  { id: 'technical', name: 'Technique', icon: Wrench },
                  { id: 'documents', name: 'Documents', icon: FileText },
                  { id: 'images', name: 'Images', icon: Camera },
                  { id: 'insurance', name: 'Assurance', icon: Shield }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCreateModalTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      createModalTab === tab.id
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

            <div className="p-6">
              {/* General Tab */}
              {createModalTab === 'general' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Modèle *</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="Mercedes Actros" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Année *</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="2022" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Immatriculation *</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="CM-123-AB" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">VIN *</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="WDB9634561LA12345" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="Blanc" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kilométrage</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="145230" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Chauffeur assigné</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                        <option>Sélectionner un chauffeur</option>
                        <option>Marc Dupont</option>
                        <option>Julie Martin</option>
                        <option>Paul Bernard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                        <option>Actif</option>
                        <option>Maintenance</option>
                        <option>Hors service</option>
                        <option>Disponible</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Niveau de carburant (%)</label>
                      <input type="number" min="0" max="100" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="75" />
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Tab */}
              {createModalTab === 'technical' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type de moteur</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="Diesel" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Puissance (CV)</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="450" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                        <option>Manuelle</option>
                        <option>Automatique</option>
                        <option>Semi-automatique</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Poids à vide (kg)</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="7500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Charge utile (kg)</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="25000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Longueur (m)</label>
                      <input type="number" step="0.1" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="12.5" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Largeur (m)</label>
                      <input type="number" step="0.1" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="2.5" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hauteur (m)</label>
                      <input type="number" step="0.1" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="3.8" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type de carburant</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                        <option>Diesel</option>
                        <option>Essence</option>
                        <option>GPL</option>
                        <option>Électrique</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {createModalTab === 'documents' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Carte grise</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Glissez-déposez ou cliquez pour sélectionner</p>
                        <button className="text-gray-600 text-sm font-medium">Parcourir</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Permis de circulation</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Glissez-déposez ou cliquez pour sélectionner</p>
                        <button className="text-gray-600 text-sm font-medium">Parcourir</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contrôle technique</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Glissez-déposez ou cliquez pour sélectionner</p>
                        <button className="text-gray-600 text-sm font-medium">Parcourir</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certificat d'assurance</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Glissez-déposez ou cliquez pour sélectionner</p>
                        <button className="text-gray-600 text-sm font-medium">Parcourir</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Images Tab */}
              {createModalTab === 'images' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Photo principale</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Glissez-déposez ou cliquez pour sélectionner</p>
                        <button className="text-gray-600 text-sm font-medium">Parcourir</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vue latérale</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Glissez-déposez ou cliquez pour sélectionner</p>
                        <button className="text-gray-600 text-sm font-medium">Parcourir</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vue arrière</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Glissez-déposez ou cliquez pour sélectionner</p>
                        <button className="text-gray-600 text-sm font-medium">Parcourir</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Intérieur cabine</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Glissez-déposez ou cliquez pour sélectionner</p>
                        <button className="text-gray-600 text-sm font-medium">Parcourir</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Moteur</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Glissez-déposez ou cliquez pour sélectionner</p>
                        <button className="text-gray-600 text-sm font-medium">Parcourir</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pneus</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Glissez-déposez ou cliquez pour sélectionner</p>
                        <button className="text-gray-600 text-sm font-medium">Parcourir</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Insurance Tab */}
              {createModalTab === 'insurance' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Compagnie d'assurance</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="AXA Cameroun" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de police</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="POL-2024-001234" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date d'expiration</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Montant de la prime (XAF)</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" placeholder="150000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type de couverture</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                        <option>Tous risques</option>
                        <option>Responsabilité civile</option>
                        <option>Vol et incendie</option>
                        <option>Bris de glace</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-500">
                * Champs obligatoires
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 bg-white"
                >
                  Annuler
                </button>
                <button className="btn-primary px-6 py-2 rounded text-sm">
                  Créer le camion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup détaillé du camion T123 */}
      {showTruckDetail && selectedTruck === 'T123' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-medium text-gray-900">Camion #{truckT123Details.id}</h2>
                  <p className="text-sm text-gray-500">{truckT123Details.model} - {truckT123Details.year}</p>
                </div>
              </div>
              <button
                onClick={() => setShowTruckDetail(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', name: 'Vue d\'ensemble', icon: BarChart3 },
                  { id: 'documents', name: 'Documents', icon: FileText },
                  { id: 'photos', name: 'Photos', icon: Camera },
                  { id: 'maintenance', name: 'Maintenance', icon: Wrench },
                  { id: 'history', name: 'Historique', icon: Clock }
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-trust text-trust'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.name}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Images */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Photos du camion</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {truckT123Details.images.map((image, index) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={image}
                            alt={`Camion T123 - Photo ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Informations générales */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Modèle</label>
                          <p className="text-sm text-gray-900">{truckT123Details.model}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Année</label>
                          <p className="text-sm text-gray-900">{truckT123Details.year}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Immatriculation</label>
                          <p className="text-sm text-gray-900">{truckT123Details.registration}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">VIN</label>
                          <p className="text-sm text-gray-900 font-mono">{truckT123Details.vin}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Chauffeur</label>
                          <p className="text-sm text-gray-900">{truckT123Details.driver}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Statut</label>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {truckT123Details.status}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-md font-medium text-gray-900 mb-3">Spécifications techniques</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <label className="text-gray-500">Moteur</label>
                            <p className="text-gray-900">{truckT123Details.engine}</p>
                          </div>
                          <div>
                            <label className="text-gray-500">Puissance</label>
                            <p className="text-gray-900">{truckT123Details.power}</p>
                          </div>
                          <div>
                            <label className="text-gray-500">Transmission</label>
                            <p className="text-gray-900">{truckT123Details.transmission}</p>
                          </div>
                          <div>
                            <label className="text-gray-500">Couleur</label>
                            <p className="text-gray-900">{truckT123Details.color}</p>
                          </div>
                          <div>
                            <label className="text-gray-500">Poids à vide</label>
                            <p className="text-gray-900">{truckT123Details.weight}</p>
                          </div>
                          <div>
                            <label className="text-gray-500">Charge utile</label>
                            <p className="text-gray-900">{truckT123Details.capacity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {truckT123Details.documents.map((doc, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="w-8 h-8 text-gray-600 mr-3" />
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                              <p className="text-xs text-gray-500">{doc.type.toUpperCase()} • {doc.size} • {doc.date}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-gray-600">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'photos' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Galerie photos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {truckT123Details.images.map((image, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                        <img
                          src={image}
                          alt={`Camion T123 - Photo ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'maintenance' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Prochaines interventions</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Dernier service</span>
                          <span className="text-sm text-gray-900">{truckT123Details.maintenance.lastService}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Prochain service</span>
                          <span className="text-sm text-trust font-medium">{truckT123Details.maintenance.nextService}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Intervalle</span>
                          <span className="text-sm text-gray-900">{truckT123Details.maintenance.serviceInterval}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Dernières interventions</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Vidange moteur</span>
                          <span className="text-sm text-gray-900">{truckT123Details.maintenance.lastOilChange}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Changement pneus</span>
                          <span className="text-sm text-gray-900">{truckT123Details.maintenance.lastTireChange}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Coût total</span>
                          <span className="text-sm text-gray-900 font-medium">{truckT123Details.maintenance.totalMaintenanceCost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Historique des interventions</h3>
                  <div className="space-y-4">
                    {truckT123Details.history.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            item.type === 'maintenance' ? 'bg-trust' :
                            item.type === 'inspection' ? 'bg-green-500' :
                            'bg-gray-800'
                          }`}></div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{item.event}</h4>
                            <p className="text-xs text-gray-500">{item.date}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-4">
                <button className="btn-primary px-4 py-2 rounded text-sm flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center bg-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <MapPin className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
