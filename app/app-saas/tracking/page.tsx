'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  MapPin, 
  Truck, 
  Maximize, 
  Filter, 
  RefreshCw,
  Eye,
  Navigation,
  Clock,
  Fuel,
  User
} from 'lucide-react'
import TruckImage, { DriverAvatar, StatusIndicator } from '../../../components/ui/TruckImage'
import RealTimeMap from '../../../components/maps/RealTimeMap'

export default function TrackingPage() {
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null)

  const trucks = [
    {
      id: 'T123',
      model: 'Mercedes Actros',
      driver: 'Marc Dupont',
      location: 'Douala Centre',
      status: 'active' as const,
      statusColor: 'bg-green-100 text-green-700',
      speed: '65 km/h',
      fuel: '75%',
      lastUpdate: 'Il y a 2 min',
      coordinates: [4.0483, 9.7043] as [number, number], // Douala
      destination: 'Yaoundé',
      eta: '2h 15min'
    },
    {
      id: 'T456',
      model: 'Volvo FH',
      driver: 'Julie Martin',
      location: 'Bafoussam',
      status: 'available' as const,
      statusColor: 'bg-blue-100 text-trust',
      speed: '0 km/h',
      fuel: '92%',
      lastUpdate: 'Il y a 5 min',
      coordinates: [5.4737, 10.4171] as [number, number], // Bafoussam
      destination: 'Garoua',
      eta: '4h 30min'
    },
    {
      id: 'T789',
      model: 'Scania R-Series',
      driver: 'Paul Bernard',
      location: 'Bertoua',
      status: 'maintenance' as const,
      statusColor: 'bg-yellow-100 text-yellow-700',
      speed: '0 km/h',
      fuel: '45%',
      lastUpdate: 'Il y a 1h',
      coordinates: [4.5833, 14.0833] as [number, number], // Bertoua
      destination: 'Maroua',
      eta: '6h 45min'
    },
    {
      id: 'T101',
      model: 'MAN TGX',
      driver: 'Pierre Moreau',
      location: 'Yaoundé',
      status: 'active' as const,
      statusColor: 'bg-green-100 text-green-700',
      speed: '55 km/h',
      fuel: '68%',
      lastUpdate: 'Il y a 1 min',
      coordinates: [3.8480, 11.5021] as [number, number], // Yaoundé
      destination: 'Douala',
      eta: '3h 20min'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'En course':
        return <Navigation className="w-4 h-4 text-green-600" />
      case 'Disponible':
        return <Clock className="w-4 h-4 text-trust" />
      case 'Maintenance':
        return <Truck className="w-4 h-4 text-yellow-600" />
      default:
        return <Truck className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Suivi GPS</h1>
          <p className="text-sm text-gray-500 mt-1">Surveillance en temps réel de votre flotte</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary px-4 py-2 text-sm flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </button>
          <button className="btn-secondary px-4 py-2 text-sm flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Trucks List */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-light text-gray-900 mb-4">Flotte ({trucks.length})</h2>
            
            <div className="space-y-3">
              {trucks.map((truck) => (
                <div 
                  key={truck.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedTruck === truck.id 
                      ? 'border-trust bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTruck(truck.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <TruckImage 
                        truckId={truck.id} 
                        model={truck.model} 
                        size="sm" 
                        className="mr-3"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">#{truck.id}</h3>
                        <p className="text-xs text-gray-500">{truck.model}</p>
                      </div>
                    </div>
                    <StatusIndicator status={truck.status} size="sm" />
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center">
                      <DriverAvatar name={truck.driver} size="sm" className="mr-2" />
                      <span className="text-gray-600">{truck.driver}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">{truck.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Navigation className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">{truck.speed}</span>
                    </div>
                    <div className="flex items-center">
                      <Fuel className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">{truck.fuel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="lg:col-span-3">
          <div className="dashboard-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-light text-gray-900">Carte de suivi</h2>
              <div className="flex space-x-2">
                <Link 
                  href="/app-saas/tracking/bigmap"
                  className="btn-primary px-4 py-2 text-sm flex items-center"
                >
                  <Maximize className="w-4 h-4 mr-2" />
                  Agrandir
                </Link>
                <button className="btn-secondary px-4 py-2 text-sm flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Centrer
                </button>
              </div>
            </div>

            {/* Map Container */}
            <div className="h-96 bg-gray-100 rounded relative overflow-hidden">
              <RealTimeMap
                trucks={trucks}
                selectedTruck={selectedTruck}
                onTruckSelect={setSelectedTruck}
                className="h-full w-full"
              />

              {/* Map Overlay Info */}
              <div className="absolute top-4 left-4 bg-white border border-gray-200 rounded p-3 text-xs">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>En course (2)</span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-trust rounded-full mr-2"></div>
                  <span>Disponible (1)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Maintenance (1)</span>
                </div>
              </div>

              {/* Selected Truck Info */}
              {selectedTruck && (
                <div className="absolute bottom-4 right-4 bg-white border border-gray-200 rounded p-4 max-w-xs">
                  {(() => {
                    const truck = trucks.find(t => t.id === selectedTruck)
                    if (!truck) return null
                    
                    return (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium text-gray-900">#{truck.id}</h3>
                          <span className={`text-xs ${truck.statusColor} px-2 py-1 rounded`}>
                            {truck.status}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Chauffeur:</span>
                            <span className="text-gray-900">{truck.driver}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Localisation:</span>
                            <span className="text-gray-900">{truck.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Vitesse:</span>
                            <span className="text-gray-900">{truck.speed}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Carburant:</span>
                            <span className="text-gray-900">{truck.fuel}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Destination:</span>
                            <span className="text-gray-900">{truck.destination}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">ETA:</span>
                            <span className="text-gray-900">{truck.eta}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Dernière MAJ:</span>
                            <span className="text-gray-900">{truck.lastUpdate}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}