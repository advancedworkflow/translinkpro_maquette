'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  MapPin, 
  Truck, 
  Navigation, 
  Layers, 
  Filter,
  Maximize2,
  Minimize2,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

interface Vehicle {
  id: string
  name: string
  status: 'en_route' | 'loading' | 'available' | 'maintenance'
  position: { lat: number, lng: number }
  destination?: { lat: number, lng: number }
  route?: { lat: number, lng: number }[]
  speed?: number
  fuel?: number
  driver?: string
  lastUpdate: string
}

interface MapView {
  center: { lat: number, lng: number }
  zoom: number
  layers: string[]
}

export default function InteractiveMap() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [mapView, setMapView] = useState<MapView>({
    center: { lat: 4.0483, lng: 9.7043 }, // Douala
    zoom: 10,
    layers: ['vehicles', 'routes', 'traffic']
  })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  // Données simulées
  useEffect(() => {
    const mockVehicles: Vehicle[] = [
      {
        id: 'CM-001',
        name: 'Camion 1',
        status: 'en_route',
        position: { lat: 4.0483, lng: 9.7043 },
        destination: { lat: 3.8480, lng: 11.5021 }, // Yaoundé
        speed: 65,
        fuel: 75,
        driver: 'Jean Manga',
        lastUpdate: 'Il y a 2 min'
      },
      {
        id: 'CM-002',
        name: 'Camion 2',
        status: 'loading',
        position: { lat: 4.0583, lng: 9.7143 },
        speed: 0,
        fuel: 45,
        driver: 'Marie Nguema',
        lastUpdate: 'Il y a 5 min'
      },
      {
        id: 'CM-003',
        name: 'Camion 3',
        status: 'available',
        position: { lat: 4.0383, lng: 9.6943 },
        speed: 0,
        fuel: 90,
        driver: 'Pierre Essomba',
        lastUpdate: 'Il y a 1 min'
      }
    ]
    setVehicles(mockVehicles)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_route': return 'text-green-500'
      case 'loading': return 'text-yellow-500'
      case 'available': return 'text-trust'
      case 'maintenance': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'en_route': return CheckCircle
      case 'loading': return Clock
      case 'available': return Truck
      case 'maintenance': return AlertTriangle
      default: return Truck
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_route': return 'En route'
      case 'loading': return 'Chargement'
      case 'available': return 'Disponible'
      case 'maintenance': return 'Maintenance'
      default: return 'Inconnu'
    }
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : ''} bg-white`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-primary">Carte interactive</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{vehicles.length} véhicules</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Filter className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 bg-gray-50">
          {/* Filtres */}
          {showFilters && (
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Filtres</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="">Tous les statuts</option>
                    <option value="en_route">En route</option>
                    <option value="loading">Chargement</option>
                    <option value="available">Disponible</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau carburant</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="">Tous les niveaux</option>
                    <option value="low">Faible (&lt; 30%)</option>
                    <option value="medium">Moyen (30-70%)</option>
                    <option value="high">Élevé (&gt; 70%)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Liste des véhicules */}
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Véhicules actifs</h3>
            <div className="space-y-3">
              {vehicles.map((vehicle) => {
                const StatusIcon = getStatusIcon(vehicle.status)
                return (
                  <div
                    key={vehicle.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedVehicle?.id === vehicle.id
                        ? 'border-trust bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-4 h-4 ${getStatusColor(vehicle.status)}`} />
                        <span className="font-medium text-sm">{vehicle.id}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        vehicle.status === 'en_route' ? 'bg-green-100 text-green-800' :
                        vehicle.status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
                        vehicle.status === 'available' ? 'bg-blue-100 text-trust' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {getStatusLabel(vehicle.status)}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Conducteur: {vehicle.driver}</div>
                      {vehicle.speed && vehicle.speed > 0 && (
                        <div>Vitesse: {vehicle.speed} km/h</div>
                      )}
                      <div>Carburant: {vehicle.fuel}%</div>
                      <div>Dernière MAJ: {vehicle.lastUpdate}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Carte */}
        <div className="flex-1 relative">
          <div
            ref={mapRef}
            className="w-full h-full bg-gray-100 flex items-center justify-center"
            style={{ height: isFullscreen ? 'calc(100vh - 60px)' : '600px' }}
          >
            {/* Placeholder pour la carte */}
            <div className="text-center">
              <MapPin className="w-16 h-16 text-trust mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Carte interactive
              </h3>
              <p className="text-gray-600 mb-4">
                Visualisation en temps réel des véhicules et trajets
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="kpi-card p-3">
                  <div className="text-sm font-medium text-gray-900">Véhicules actifs</div>
                  <div className="text-2xl font-bold text-trust">{vehicles.length}</div>
                </div>
                <div className="kpi-card p-3">
                  <div className="text-sm font-medium text-gray-900">En route</div>
                  <div className="text-2xl font-bold text-green-500">
                    {vehicles.filter(v => v.status === 'en_route').length}
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay avec contrôles */}
            <div className="absolute top-4 left-4 space-y-2">
              <div className="dashboard-card p-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Layers className="w-5 h-5" />
                </button>
              </div>
              <div className="dashboard-card p-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Navigation className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Informations du véhicule sélectionné */}
            {selectedVehicle && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="dashboard-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{selectedVehicle.id}</h3>
                    <button
                      onClick={() => setSelectedVehicle(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Conducteur</div>
                      <div className="font-medium">{selectedVehicle.driver}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Statut</div>
                      <div className="font-medium">{getStatusLabel(selectedVehicle.status)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Vitesse</div>
                      <div className="font-medium">{selectedVehicle.speed || 0} km/h</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Carburant</div>
                      <div className="font-medium">{selectedVehicle.fuel}%</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      Dernière mise à jour: {selectedVehicle.lastUpdate}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Composant pour les heatmaps
export function HeatmapLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Simulation d'une heatmap */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500 opacity-20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-yellow-500 opacity-20 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/3 left-1/2 w-28 h-28 bg-green-500 opacity-20 rounded-full blur-xl"></div>
    </div>
  )
}

// Composant pour les trajets en temps réel
export function LiveRoute({ route, isActive = false }: { route: { lat: number, lng: number }[], isActive?: boolean }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${isActive ? 'animate-pulse' : ''}`}>
      {/* Simulation d'une route */}
      <svg className="w-full h-full">
        <path
          d="M100,200 Q300,100 500,200 T900,200"
          stroke={isActive ? '#106ebe' : '#6b7280'}
          strokeWidth="3"
          fill="none"
          strokeDasharray={isActive ? '5,5' : 'none'}
          className={isActive ? 'animate-pulse' : ''}
        />
      </svg>
    </div>
  )
}
