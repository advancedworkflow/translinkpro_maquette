'use client'

import { useState } from 'react'
import { ArrowLeft, Maximize2, Minimize2, Layers, Settings } from 'lucide-react'
import Link from 'next/link'
import RealTimeMap from '../../../../components/maps/RealTimeMap'
import TruckImage, { DriverAvatar, StatusIndicator } from '../../../../components/ui/TruckImage'
import './leaflet.css'

export default function BigMapPage() {
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const trucks = [
    {
      id: 'T123',
      model: 'Mercedes Actros',
      driver: 'Marc Dupont',
      location: 'Douala Centre',
      status: 'active' as const,
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
      speed: '55 km/h',
      fuel: '68%',
      lastUpdate: 'Il y a 1 min',
      coordinates: [3.8480, 11.5021] as [number, number], // Yaoundé
      destination: 'Douala',
      eta: '3h 20min'
    }
  ]

  const selectedTruckData = trucks.find(t => t.id === selectedTruck)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/app-saas/tracking"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Carte de suivi GPS</h1>
              <p className="text-sm text-gray-500">Suivi en temps réel de la flotte</p>
              </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleFullscreen}
              className="btn-secondary px-3 py-2 text-sm flex items-center"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4 mr-2" /> : <Maximize2 className="w-4 h-4 mr-2" />}
              {isFullscreen ? 'Réduire' : 'Plein écran'}
            </button>
            <button className="btn-secondary px-3 py-2 text-sm flex items-center">
              <Layers className="w-4 h-4 mr-2" />
              Couches
            </button>
            <button className="btn-secondary px-3 py-2 text-sm flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
                  </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar avec liste des camions */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Flotte active</h2>
              
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carte principale */}
        <div className="flex-1 relative">
          <RealTimeMap
            trucks={trucks}
            selectedTruck={selectedTruck}
            onTruckSelect={setSelectedTruck}
            className="h-full w-full"
          />
          
          {/* Panneau d'informations du camion sélectionné */}
          {selectedTruckData && (
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Détails du camion</h3>
                <button 
                  onClick={() => setSelectedTruck(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <TruckImage 
                    truckId={selectedTruckData.id} 
                    model={selectedTruckData.model} 
                    size="md" 
                    className="mr-3"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">#{selectedTruckData.id}</h4>
                    <p className="text-sm text-gray-500">{selectedTruckData.model}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Chauffeur:</span>
                    <div className="flex items-center mt-1">
                      <DriverAvatar name={selectedTruckData.driver} size="sm" className="mr-2" />
                      <span className="text-gray-900">{selectedTruckData.driver}</span>
                </div>
                </div>
                  <div>
                    <span className="text-gray-500">Statut:</span>
                    <div className="mt-1">
                      <StatusIndicator status={selectedTruckData.status} size="sm" />
                </div>
                </div>
                  <div>
                    <span className="text-gray-500">Vitesse:</span>
                    <p className="text-gray-900 font-medium">{selectedTruckData.speed}</p>
                </div>
                  <div>
                    <span className="text-gray-500">Carburant:</span>
                    <p className="text-gray-900 font-medium">{selectedTruckData.fuel}</p>
                </div>
                  <div>
                    <span className="text-gray-500">Localisation:</span>
                    <p className="text-gray-900">{selectedTruckData.location}</p>
                </div>
                  <div>
                    <span className="text-gray-500">Destination:</span>
                    <p className="text-gray-900">{selectedTruckData.destination}</p>
                </div>
                  <div>
                    <span className="text-gray-500">ETA:</span>
                    <p className="text-gray-900 font-medium">{selectedTruckData.eta}</p>
                </div>
                  <div>
                    <span className="text-gray-500">Dernière MAJ:</span>
                    <p className="text-gray-900">{selectedTruckData.lastUpdate}</p>
                </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}