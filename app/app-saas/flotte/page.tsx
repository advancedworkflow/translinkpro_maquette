'use client'

import { useState } from 'react'
import { 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin,
  Fuel,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Clock,
  Car,
  AlertTriangle,
  Grid3X3,
  List
} from 'lucide-react'
import TruckImage, { DriverAvatar, StatusIndicator } from '../../../components/ui/TruckImage'
import { TruckGrid } from '../../../components/dashboard/TruckCard'

export default function FlottePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const stats = [
    {
      icon: Truck,
      label: 'Total véhicules',
      value: '32',
      change: '+2',
      changeColor: 'text-green-600'
    },
    {
      icon: UserCheck,
      label: 'En service',
      value: '24',
      change: '+3',
      changeColor: 'text-green-600'
    },
    {
      icon: Clock,
      label: 'Maintenance',
      value: '5',
      change: '-1',
      changeColor: 'text-red-600'
    },
    {
      icon: AlertTriangle,
      label: 'Hors service',
      value: '3',
      change: '+1',
      changeColor: 'text-red-600'
    }
  ]

  const vehicles = [
    {
      id: 'T001',
      model: 'Mercedes Actros 1845',
      plate: 'CM-001-AB',
      driver: 'Jean-Baptiste Mballa',
      status: 'active' as const,
      fuel: 85,
      mileage: 145230,
      lastService: '2024-01-15',
      location: 'Douala',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 'T002',
      model: 'Volvo FH 460',
      plate: 'CM-002-CD',
      driver: 'Marie-Claire Nguema',
      status: 'maintenance' as const,
      fuel: 45,
      mileage: 98450,
      lastService: '2024-02-10',
      location: 'Yaoundé',
      statusColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 'T003',
      model: 'Scania R-Series 450',
      plate: 'CM-003-EF',
      driver: 'Paul Nkeng',
      status: 'available' as const,
      fuel: 92,
      mileage: 203890,
      lastService: '2024-01-28',
      location: 'Bafoussam',
      statusColor: 'bg-blue-100 text-trust'
    },
    {
      id: 'T004',
      model: 'MAN TGX 480',
      plate: 'CM-004-GH',
      driver: 'Pierre Nguema',
      status: 'active' as const,
      fuel: 68,
      mileage: 87320,
      lastService: '2024-02-05',
      location: 'Garoua',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 'T005',
      model: 'Iveco Stralis 440',
      plate: 'CM-005-IJ',
      driver: 'Marie Nguema',
      status: 'inactive' as const,
      fuel: 12,
      mileage: 156780,
      lastService: '2024-01-20',
      location: 'Bertoua',
      statusColor: 'bg-blue-100 text-trust'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(vehicles.length / 2))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(vehicles.length / 2)) % Math.ceil(vehicles.length / 2))
  }

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

      {/* Vehicles Carousel Section */}
      <div className="mb-8">
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-light text-gray-900">Flotte de Véhicules</h2>
            <div className="flex space-x-2">
              <button 
                onClick={prevSlide}
                className="border border-gray-300 text-gray-900 px-3 py-1 rounded text-xs hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextSlide}
                className="border border-gray-300 text-gray-900 px-3 py-1 rounded text-xs hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {vehicles.map((vehicle, index) => (
                <div key={index} className="min-w-80 bg-white border border-gray-200 rounded-lg p-4 mr-4 shadow-sm">
                  <div className="flex items-start space-x-4">
                    {/* Image du camion à gauche */}
                    <div className="flex-shrink-0">
                      <TruckImage 
                        truckId={vehicle.id} 
                        model={vehicle.model} 
                        size="md" 
                        className="w-16 h-16"
                      />
                    </div>
                    
                    {/* Informations à droite */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">Véhicule #{vehicle.id}</h3>
                          <p className="text-xs text-gray-500">{vehicle.model}</p>
                        </div>
                        <span className={`text-xs ${vehicle.statusColor} px-2 py-1 rounded`}>
                          {vehicle.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Chauffeur:</span>
                          <span className="text-gray-900 font-medium">{vehicle.driver}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Plaque:</span>
                          <span className="text-gray-900 font-medium">{vehicle.plate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Carburant:</span>
                          <span className="text-gray-900 font-medium">{vehicle.fuel}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Localisation:</span>
                          <span className="text-gray-900 font-medium">{vehicle.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Search and Actions Section */}
        <div className="col-span-2">
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-gray-900">Recherche et Actions</h2>
              <div className="flex space-x-2">
                <button className="bg-gray-800 text-white px-3 py-1 rounded text-xs flex items-center">
                  <Plus className="w-3 h-3 mr-1" />
                  Ajouter
                </button>
                <button className="border border-gray-300 text-gray-900 px-3 py-1 rounded text-xs">
                  Filtres
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un véhicule..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <select className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                  <option>Tous les statuts</option>
                  <option>En service</option>
                  <option>Maintenance</option>
                  <option>Hors service</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                  <option>Toutes les marques</option>
                  <option>Mercedes</option>
                  <option>Volvo</option>
                  <option>Scania</option>
                </select>
              </div>
            </div>
            </div>
          </div>

        {/* Quick Actions Section */}
        <div>
          <div className="bg-gray-50 border border-gray-200 rounded p-6 mb-6">
            <h2 className="text-lg font-light text-gray-900 mb-4">Actions rapides</h2>
            
            <div className="space-y-3">
              <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-3" />
                Ajouter véhicule
              </button>
              
              <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
                <Eye className="w-4 h-4 mr-3" />
                Voir détails
              </button>
              
              <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
                <Edit className="w-4 h-4 mr-3" />
                Modifier véhicule
            </button>
              
              <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
                <Settings className="w-4 h-4 mr-3" />
                Paramètres
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Vehicles List Section */}
      <div className="mt-8">
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-light text-gray-900">Liste des véhicules</h2>
            <div className="flex space-x-2">
              <button className="border border-gray-300 text-gray-900 px-3 py-1 rounded text-xs flex items-center">
                <Filter className="w-3 h-3 mr-1" />
                Filtrer
              </button>
              <button className="bg-gray-800 text-white px-3 py-1 rounded text-xs flex items-center">
                <Truck className="w-3 h-3 mr-1" />
                Vue grille
              </button>
        </div>
      </div>

        <div className="overflow-x-auto">
          <table className="w-full">
              <thead className="border-b border-gray-100">
                <tr className="text-left">
                  <th className="pb-3 text-sm font-normal text-gray-500">Véhicule</th>
                  <th className="pb-3 text-sm font-normal text-gray-500">Chauffeur</th>
                  <th className="pb-3 text-sm font-normal text-gray-500">Statut</th>
                  <th className="pb-3 text-sm font-normal text-gray-500">Carburant</th>
                  <th className="pb-3 text-sm font-normal text-gray-500">Localisation</th>
                  <th className="pb-3 text-sm font-normal text-gray-500">Actions</th>
              </tr>
            </thead>
              <tbody className="divide-y divide-gray-50">
                {vehicles.map((vehicle, index) => (
                  <tr key={index}>
                    <td className="py-4">
                      <div className="flex items-center">
                        <TruckImage 
                          truckId={vehicle.id} 
                          model={vehicle.model} 
                          size="xs" 
                          className="mr-3"
                        />
                    <div>
                          <div className="text-sm font-medium text-gray-900">{vehicle.model}</div>
                          <div className="text-xs text-gray-500">{vehicle.plate}</div>
                        </div>
                    </div>
                  </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <DriverAvatar name={vehicle.driver} size="sm" className="mr-2" />
                        <span className="text-sm text-gray-900">{vehicle.driver}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <StatusIndicator status={vehicle.status} size="sm" />
                  </td>
                    <td className="py-4 text-sm text-gray-900">{vehicle.fuel}%</td>
                    <td className="py-4 text-sm text-gray-500">{vehicle.location}</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="bg-black text-white p-1 rounded text-xs">
                          <Eye className="w-3 h-3" />
                      </button>
                        <button className="bg-white text-gray-700 border border-gray-300 p-1 rounded text-xs">
                          <Edit className="w-3 h-3" />
                      </button>
                        <button className="bg-gray-500 text-white p-1 rounded text-xs">
                          <Settings className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Vue grille des camions */}
      <div className="mt-8">
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-light text-gray-900">Vue grille des véhicules</h2>
            <div className="flex space-x-2">
              <button className="btn-secondary px-3 py-1 rounded text-xs flex items-center">
                <Grid3X3 className="w-3 h-3 mr-1" />
                Vue grille
              </button>
              <button className="border border-gray-300 text-gray-900 px-3 py-1 rounded text-xs flex items-center">
                <List className="w-3 h-3 mr-1" />
                Vue liste
              </button>
            </div>
          </div>
          
          <TruckGrid 
            trucks={vehicles.map(v => ({
              id: v.id,
              model: v.model,
              driver: v.driver,
              location: v.location,
              status: v.status,
              speed: '0 km/h', // Valeur par défaut
              fuel: `${v.fuel}%`,
              lastUpdate: 'Il y a 5 min', // Valeur par défaut
              destination: 'Non assigné' // Valeur par défaut
            }))}
            onView={(truckId) => console.log('Voir camion:', truckId)}
            onEdit={(truckId) => console.log('Modifier camion:', truckId)}
          />
        </div>
      </div>
    </div>
  )
}

