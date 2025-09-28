'use client'

import { useState } from 'react'
import { Truck, User, MapPin, Fuel, Clock, Eye, Edit, MoreVertical } from 'lucide-react'
import TruckImage, { DriverAvatar, StatusIndicator } from '../ui/TruckImage'

interface TruckCardProps {
  truck: {
    id: string
    model: string
    driver: string
    location: string
    status: 'active' | 'available' | 'maintenance' | 'inactive'
    speed: string
    fuel: string
    lastUpdate: string
    destination?: string
    eta?: string
  }
  onView?: (truckId: string) => void
  onEdit?: (truckId: string) => void
  className?: string
}

export default function TruckCard({ truck, onView, onEdit, className = '' }: TruckCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className={`dashboard-card p-4 hover:shadow-lg transition-all duration-200 ${className}`}>
      {/* Header avec image et menu */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <TruckImage 
            truckId={truck.id} 
            model={truck.model} 
            size="md" 
            className="mr-3"
          />
          <div>
            <h3 className="font-semibold text-gray-900">#{truck.id}</h3>
            <p className="text-sm text-gray-500">{truck.model}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <StatusIndicator status={truck.status} size="sm" />
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                <button 
                  onClick={() => {
                    onView?.(truck.id)
                    setShowMenu(false)
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Voir détails
                </button>
                <button 
                  onClick={() => {
                    onEdit?.(truck.id)
                    setShowMenu(false)
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Informations du chauffeur */}
      <div className="flex items-center mb-3 p-2 bg-gray-50 rounded-lg">
        <DriverAvatar name={truck.driver} size="sm" className="mr-2" />
        <div>
          <p className="text-sm font-medium text-gray-900">{truck.driver}</p>
          <p className="text-xs text-gray-500">Chauffeur assigné</p>
        </div>
      </div>

      {/* Métriques */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-2 text-gray-500" />
          <div>
            <p className="text-gray-500 text-xs">Localisation</p>
            <p className="text-gray-900 font-medium">{truck.location}</p>
          </div>
        </div>
        
        <div className="flex items-center text-sm">
          <Fuel className="w-4 h-4 mr-2 text-gray-500" />
          <div>
            <p className="text-gray-500 text-xs">Carburant</p>
            <p className="text-gray-900 font-medium">{truck.fuel}</p>
          </div>
        </div>
      </div>

      {/* Vitesse et dernière mise à jour */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <Truck className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-gray-900 font-medium">{truck.speed}</span>
        </div>
        
        <div className="flex items-center text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-xs">{truck.lastUpdate}</span>
        </div>
      </div>

      {/* Destination si disponible */}
      {truck.destination && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Destination:</span>
            <span className="text-gray-900 font-medium">{truck.destination}</span>
          </div>
          {truck.eta && (
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-500">ETA:</span>
              <span className="text-trust font-medium">{truck.eta}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Composant pour la grille de camions
export function TruckGrid({ trucks, onView, onEdit, className = '' }: {
  trucks: Array<TruckCardProps['truck']>
  onView?: (truckId: string) => void
  onEdit?: (truckId: string) => void
  className?: string
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {trucks.map((truck) => (
        <TruckCard
          key={truck.id}
          truck={truck}
          onView={onView}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
