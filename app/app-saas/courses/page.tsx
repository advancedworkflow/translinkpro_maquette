'use client'

import { useState } from 'react'
import { 
  MapPin, 
  Clock, 
  Flag, 
  Route, 
  Filter, 
  ArrowUpDown,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Calendar,
  Phone,
  Star,
  User,
  Car,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Truck,
  Package,
  TrendingUp,
  X
} from 'lucide-react'
import TruckImage, { DriverAvatar, StatusIndicator } from '../../../components/ui/TruckImage'

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedDemande, setSelectedDemande] = useState<any>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Données des demandes de transport
  const demandesTransport = [
    {
      id: 'DT001',
      client: 'Marie Nguema',
      phone: '+237 6 12 34 56 78',
      trajet: 'Douala → Yaoundé',
      marchandise: 'Marchandises (2 tonnes)',
      date: 'Demain 08:00',
      prix: '45 000 XAF',
      statut: 'Nouvelle',
      statutColor: 'bg-green-100 text-green-700',
      details: {
        depart: 'Douala, Cameroun',
        arrivee: 'Yaoundé, Cameroun',
        distance: '250 km',
        duree: '4h 30min',
        typeVehicule: 'Camion 10 tonnes',
        description: 'Transport de marchandises générales',
        contact: '+237 6 12 34 56 78',
        email: 'marie.nguema@email.com'
      }
    },
    {
      id: 'DT002',
      client: 'Jean Mballa',
      phone: '+237 6 98 76 54 32',
      trajet: 'Bafoussam → Garoua',
      marchandise: 'Matériaux (5 tonnes)',
      date: 'Lundi 14:00',
      prix: '78 000 XAF',
      statut: 'En attente',
      statutColor: 'bg-blue-100 text-trust',
      details: {
        depart: 'Bafoussam, Cameroun',
        arrivee: 'Garoua, Cameroun',
        distance: '420 km',
        duree: '6h 15min',
        typeVehicule: 'Camion 15 tonnes',
        description: 'Transport de matériaux de construction',
        contact: '+237 6 98 76 54 32',
        email: 'jean.mballa@email.com'
      }
    },
    {
      id: 'DT003',
      client: 'Fatou Diallo',
      phone: '+237 6 55 44 33 22',
      trajet: 'Limbe → Bamenda',
      marchandise: 'Produits frais (1 tonne)',
      date: 'Aujourd\'hui 16:00',
      prix: '32 000 XAF',
      statut: 'Urgente',
      statutColor: 'bg-yellow-100 text-yellow-700',
      details: {
        depart: 'Limbe, Cameroun',
        arrivee: 'Bamenda, Cameroun',
        distance: '180 km',
        duree: '3h 45min',
        typeVehicule: 'Camion frigorifique',
        description: 'Transport de produits frais nécessitant réfrigération',
        contact: '+237 6 55 44 33 22',
        email: 'fatou.diallo@email.com'
      }
    },
    {
      id: 'DT004',
      client: 'Pierre Essomba',
      phone: '+237 6 77 88 99 00',
      trajet: 'Bertoua → Ngaoundéré',
      marchandise: 'Équipements (3 tonnes)',
      date: 'Mercredi 10:00',
      prix: '65 000 XAF',
      statut: 'Nouvelle',
      statutColor: 'bg-green-100 text-green-700',
      details: {
        depart: 'Bertoua, Cameroun',
        arrivee: 'Ngaoundéré, Cameroun',
        distance: '320 km',
        duree: '5h 20min',
        typeVehicule: 'Camion 12 tonnes',
        description: 'Transport d\'équipements industriels',
        contact: '+237 6 77 88 99 00',
        email: 'pierre.essomba@email.com'
      }
    },
    {
      id: 'DT005',
      client: 'Aïcha Bello',
      phone: '+237 6 11 22 33 44',
      trajet: 'Ebolowa → Kribi',
      marchandise: 'Textiles (1.5 tonnes)',
      date: 'Vendredi 12:00',
      prix: '28 000 XAF',
      statut: 'En attente',
      statutColor: 'bg-blue-100 text-trust',
      details: {
        depart: 'Ebolowa, Cameroun',
        arrivee: 'Kribi, Cameroun',
        distance: '150 km',
        duree: '2h 30min',
        typeVehicule: 'Camion 8 tonnes',
        description: 'Transport de textiles et vêtements',
        contact: '+237 6 11 22 33 44',
        email: 'aicha.bello@email.com'
      }
    },
    {
      id: 'DT006',
      client: 'Mohamed Ali',
      phone: '+237 6 99 88 77 66',
      trajet: 'Maroua → Garoua',
      marchandise: 'Céréales (4 tonnes)',
      date: 'Hier 15:00',
      prix: '52 000 XAF',
      statut: 'Expirée',
      statutColor: 'bg-red-100 text-red-700',
      details: {
        depart: 'Maroua, Cameroun',
        arrivee: 'Garoua, Cameroun',
        distance: '280 km',
        duree: '4h 45min',
        typeVehicule: 'Camion 12 tonnes',
        description: 'Transport de céréales et produits agricoles',
        contact: '+237 6 99 88 77 66',
        email: 'mohamed.ali@email.com'
      }
    }
  ]

  const handleOpenPopup = (demande: any) => {
    setSelectedDemande(demande)
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setSelectedDemande(null)
  }

  const tabs = [
    { id: 'all', label: 'Toutes les demandes' },
    { id: 'pending', label: 'En attente' },
    { id: 'accepted', label: 'Acceptées' },
    { id: 'in-progress', label: 'En cours' },
    { id: 'completed', label: 'Terminées' },
    { id: 'cancelled', label: 'Annulées' }
  ]

  const stats = [
    {
      label: 'Nouvelles demandes',
      value: '12',
      change: '+3 aujourd\'hui',
      changeColor: 'text-green-600',
      icon: Package
    },
    {
      label: 'En attente',
      value: '8',
      change: 'À traiter',
      changeColor: 'text-yellow-600',
      icon: Clock
    },
    {
      label: 'En cours',
      value: '24',
      change: 'Actives',
      changeColor: 'text-trust',
      icon: Truck
    },
    {
      label: 'Terminées',
      value: '156',
      change: 'Cette semaine',
      changeColor: 'text-green-600',
      icon: CheckCircle
    },
    {
      label: 'Taux d\'acceptation',
      value: '94%',
      change: '+2% vs hier',
      changeColor: 'text-green-600',
      icon: TrendingUp
    }
  ]

  const requests = [
    {
      id: 'DEM-2024-001',
      status: 'Nouvelle',
      statusColor: 'bg-yellow-100 text-yellow-700',
      time: 'Il y a 5 min',
      client: 'Fatou Ndiaye',
      phone: '+237 6 12 34 56 78',
      type: 'Transport standard',
      passengers: '2 personnes',
      departure: 'Douala Centre, Cameroun',
      arrival: 'Aéroport de Douala',
      timeRequested: 'Aujourd\'hui 15:30',
      price: '15 000 XAF',
      actions: [
        { label: 'Accepter', color: 'bg-trust text-white' },
        { label: 'Refuser', color: 'border border-gray-300 text-gray-900' }
      ]
    },
    {
      id: 'DEM-2024-002',
      status: 'Assignée',
      statusColor: 'bg-blue-100 text-trust',
      time: 'Il y a 15 min',
      client: 'Jean Martin',
      phone: '+237 6 23 45 67 89',
      driver: 'Marc Dupont',
      vehicle: '#A123',
      departure: 'Yaoundé Centre, Cameroun',
      arrival: 'Aéroport de Yaoundé',
      timeRequested: 'Départ prévu: 14:00',
      price: '25 000 XAF',
      actions: [
        { label: 'Suivre', color: 'bg-trust text-white' },
        { label: 'Contacter', color: 'border border-gray-300 text-gray-900' }
      ]
    },
    {
      id: 'DEM-2024-003',
      status: 'En cours',
      statusColor: 'bg-green-100 text-green-700',
      time: 'Il y a 45 min',
      client: 'Sophie Laurent',
      phone: '+33 7 89 01 23 45',
      driver: 'Julie Martin',
      vehicle: '#B456',
      departure: 'Gare de Lyon, Paris',
      arrival: 'La Défense, Paris',
      timeRequested: 'Progression: 65% (ETA 15 min)',
      price: '€32.00',
      actions: [
        { label: 'Suivre GPS', color: 'bg-trust text-white' },
        { label: 'Appeler', color: 'border border-gray-300 text-gray-900' }
      ]
    },
    {
      id: 'DEM-2024-004',
      status: 'Programmée',
      statusColor: 'bg-yellow-100 text-yellow-700',
      time: 'Il y a 2h',
      client: 'Pierre Durand',
      phone: '+33 6 45 67 89 01',
      type: 'Transport premium',
      passengers: '4 personnes',
      departure: 'Hôtel Le Meurice, Paris',
      arrival: 'Château de Versailles',
      timeRequested: 'Programmé: Demain 10:00',
      price: '€85.00',
      actions: [
        { label: 'Assigner', color: 'bg-trust text-white' },
        { label: 'Modifier', color: 'border border-gray-300 text-gray-900' }
      ]
    },
    {
      id: 'DEM-2024-005',
      status: 'Terminée',
      statusColor: 'bg-gray-100 text-gray-700',
      time: 'Il y a 3h',
      client: 'Anne Moreau',
      rating: '⭐⭐⭐⭐⭐ (5/5)',
      driver: 'Paul Bernard',
      duration: '45 minutes',
      departure: 'Opéra Garnier, Paris',
      arrival: 'Terminée',
      timeRequested: 'Terminée',
      price: '€45.00',
      actions: [
        { label: 'Voir détails', color: 'bg-trust text-white' },
        { label: 'Facturer', color: 'border border-gray-300 text-gray-900' }
      ]
    }
  ]

  return (
    <div className="p-6">
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 rounded p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded text-sm font-normal transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-5 gap-4 mb-8">
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

      {/* Demandes de transport par les clients */}
      <div className="mb-8">
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-light text-gray-900">Demandes de transport par les clients</h2>
            <button className="btn-primary px-4 py-2 text-sm flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle demande
            </button>
          </div>
          
          {/* Liste des demandes */}
          <div className="space-y-4">
            {demandesTransport.map((demande) => (
              <div key={demande.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <DriverAvatar name={demande.client} size="sm" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{demande.client}</h3>
                          <p className="text-xs text-gray-500">{demande.phone}</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-gray-600">{demande.trajet}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-gray-600">{demande.marchandise}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-gray-600">{demande.date}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{demande.prix}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`${demande.statutColor} text-xs px-2 py-1 rounded-full`}>
                      {demande.statut}
                    </span>
                    <button 
                      onClick={() => handleOpenPopup(demande)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs flex items-center rounded transition-colors"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tableau principal - Pleine largeur */}
      <div className="dashboard-card mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-light text-gray-900">Courses en cours</h2>
            <button className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded cursor-not-allowed opacity-50">
              Modifier les demandes sélectionnées
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-trust focus:border-transparent"
              />
            </div>
            <button className="btn-secondary px-3 py-2 text-sm flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </button>
            <button className="btn-secondary px-3 py-2 text-sm flex items-center">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Trier
            </button>
            <button className="btn-secondary px-3 py-2 text-sm flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </button>
          </div>
        </div>
        
        {/* Tableau interactif */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">Demande</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Trajet
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Chauffeur
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Statut
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Prix
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {requests.map((request, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-trust hover:text-trust-dark cursor-pointer font-medium">
                        #{request.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DriverAvatar name={request.client} size="sm" className="mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{request.client}</div>
                        <div className="text-xs text-gray-500">{request.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <MapPin className="w-3 h-3 mr-2 text-green-600" />
                        <span className="text-xs">{request.departure}</span>
                      </div>
                      <div className="flex items-center">
                        <Flag className="w-3 h-3 mr-2 text-trust" />
                        <span className="text-xs">{request.arrival}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {request.driver ? (
                      <div className="flex items-center">
                        <TruckImage truckId={request.vehicle || 'default'} size="xs" className="mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{request.driver}</div>
                          <div className="text-xs text-gray-500">{request.vehicle}</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Non assigné</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusIndicator 
                      status={request.status === 'Nouvelle' ? 'available' : 
                             request.status === 'Assignée' ? 'active' : 
                             request.status === 'En cours' ? 'active' : 'inactive'} 
                      size="sm" 
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.price}</div>
                    <div className="text-xs text-gray-500">{request.timeRequested}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button className="text-sm text-trust hover:text-trust-dark bg-trust/10 hover:bg-trust/20 px-3 py-1 rounded transition-colors">
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-center py-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowUpRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Actions rapides et statut des chauffeurs - En bas */}
      <div className="grid grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-gray-50 border border-gray-200 rounded p-6">
          <h2 className="text-lg font-light text-gray-900 mb-4">Actions rapides</h2>
          
          <div className="space-y-3">
            <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
              <CheckCircle className="w-4 h-4 mr-3" />
              Accepter toutes
            </button>
            
            <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
              <AlertCircle className="w-4 h-4 mr-3" />
              Voir en attente
            </button>
            
            <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
              <Play className="w-4 h-4 mr-3" />
              Courses actives
            </button>
            
            <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
              <Calendar className="w-4 h-4 mr-3" />
              Programmer
            </button>
          </div>
        </div>

        {/* Driver Status */}
        <div className="bg-gray-50 border border-gray-200 rounded p-6">
          <h2 className="text-lg font-light text-gray-900 mb-4">Statut des chauffeurs</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <div className="flex items-center">
                <DriverAvatar name="Marc Dupont" size="sm" className="mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Marc Dupont</div>
                  <div className="text-xs text-gray-500">En course</div>
                </div>
              </div>
              <button className="text-xs text-trust hover:text-trust-dark">
                <Phone className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <div className="flex items-center">
                <DriverAvatar name="Julie Martin" size="sm" className="mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Julie Martin</div>
                  <div className="text-xs text-gray-500">Disponible</div>
                </div>
              </div>
              <button className="text-xs text-trust hover:text-trust-dark">
                <Phone className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
              <div className="flex items-center">
                <DriverAvatar name="Paul Bernard" size="sm" className="mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Paul Bernard</div>
                  <div className="text-xs text-gray-500">Pause</div>
                </div>
              </div>
              <button className="text-xs text-trust hover:text-trust-dark">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup de détails de la demande */}
      {isPopupOpen && selectedDemande && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header du popup */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <DriverAvatar name={selectedDemande.client} size="md" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedDemande.client}</h2>
                  <p className="text-sm text-gray-500">{selectedDemande.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`${selectedDemande.statutColor} text-xs px-3 py-1 rounded-full`}>
                  {selectedDemande.statut}
                </span>
                <button
                  onClick={handleClosePopup}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contenu du popup */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations du trajet */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Route className="w-5 h-5 mr-2 text-trust" />
                    Détails du trajet
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Départ</span>
                      <span className="text-sm font-medium text-gray-900">{selectedDemande.details.depart}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Arrivée</span>
                      <span className="text-sm font-medium text-gray-900">{selectedDemande.details.arrivee}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Distance</span>
                      <span className="text-sm font-medium text-gray-900">{selectedDemande.details.distance}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Durée estimée</span>
                      <span className="text-sm font-medium text-gray-900">{selectedDemande.details.duree}</span>
                    </div>
                  </div>
                </div>

                {/* Informations de la marchandise */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-trust" />
                    Marchandise
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Type de véhicule</span>
                      <span className="text-sm font-medium text-gray-900">{selectedDemande.details.typeVehicule}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Marchandise</span>
                      <span className="text-sm font-medium text-gray-900">{selectedDemande.marchandise}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Date de transport</span>
                      <span className="text-sm font-medium text-gray-900">{selectedDemande.date}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-trust/10 rounded-lg">
                      <span className="text-sm text-gray-600">Prix proposé</span>
                      <span className="text-lg font-bold text-trust">{selectedDemande.prix}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {selectedDemande.details.description}
                </p>
              </div>

              {/* Contact */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 mr-3 text-trust" />
                    <span className="text-sm text-gray-900">{selectedDemande.details.contact}</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 mr-3 text-trust" />
                    <span className="text-sm text-gray-900">{selectedDemande.details.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions du popup */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Fermer
              </button>
              {selectedDemande.statut !== 'Expirée' && (
                <>
                  <button className="px-4 py-2 text-sm text-white bg-trust hover:bg-trust-dark rounded-lg transition-colors">
                    Accepter
                  </button>
                  <button className="px-4 py-2 text-sm text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
                    Refuser
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
