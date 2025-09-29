'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Import dynamique pour éviter les erreurs SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false })

interface Truck {
  id: string
  model: string
  driver: string
  location: string
  status: 'active' | 'available' | 'maintenance' | 'inactive'
  speed: string
  fuel: string
  lastUpdate: string
  coordinates: [number, number]
  destination: string
  eta: string
}

interface RealTimeMapProps {
  trucks: Truck[]
  selectedTruck?: string | null
  onTruckSelect?: (truckId: string) => void
  className?: string
}

// Composant pour les icônes de camions personnalisées
function TruckIcon({ status, size = 25 }: { status: string, size?: number }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981' // green
      case 'available': return '#3b82f6' // blue
      case 'maintenance': return '#f59e0b' // yellow
      case 'inactive': return '#6b7280' // gray
      default: return '#3b82f6'
    }
  }

  return (
    <div 
      style={{
        width: size,
        height: size,
        backgroundColor: getStatusColor(status),
        borderRadius: '50%',
        border: '3px solid white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.6,
        color: 'white',
        fontWeight: 'bold'
      }}
    >
      🚛
    </div>
  )
}

// Composant pour les marqueurs de camions
function TruckMarker({ truck, onSelect }: { truck: Truck, onSelect: (id: string) => void }) {
  const [L, setL] = useState<any>(null)

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      setL(leaflet.default)
    })
  }, [])

  if (!L) return null

  const icon = L.divIcon({
    html: `<div style="
      width: 30px;
      height: 30px;
      background-color: ${truck.status === 'active' ? '#10b981' : truck.status === 'available' ? '#3b82f6' : truck.status === 'maintenance' ? '#f59e0b' : '#6b7280'};
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: white;
      font-weight: bold;
    ">🚛</div>`,
    className: 'custom-truck-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })

  return (
    <Marker
      position={truck.coordinates}
      icon={icon}
      eventHandlers={{
        click: () => onSelect(truck.id)
      }}
    >
      <Popup>
        <div className="p-2 min-w-[200px]">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
              <span className="text-sm">🚛</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">#{truck.id}</h3>
              <p className="text-xs text-gray-500">{truck.model}</p>
            </div>
          </div>
          
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Chauffeur:</span>
              <span className="text-gray-900">{truck.driver}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Statut:</span>
              <span className={`px-2 py-1 rounded text-xs ${
                truck.status === 'active' ? 'bg-green-100 text-green-700' :
                truck.status === 'available' ? 'bg-blue-100 text-trust' :
                truck.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {truck.status === 'active' ? 'En course' :
                 truck.status === 'available' ? 'Disponible' :
                 truck.status === 'maintenance' ? 'Maintenance' :
                 'Hors service'}
              </span>
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
      </Popup>
    </Marker>
  )
}

export default function RealTimeMap({ trucks, selectedTruck, onTruckSelect, className = '' }: RealTimeMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-trust mx-auto mb-2"></div>
          <p className="text-gray-500">Chargement de la carte...</p>
        </div>
      </div>
    )
  }

  // Centre de la carte (Cameroun)
  const center: [number, number] = [7.3697, 12.3547]

  // Routes simulées entre les villes
  const routes = [
    {
      coordinates: [[4.0483, 9.7043], [3.8480, 11.5021]] as [number, number][], // Douala -> Yaoundé
      color: '#3b82f6'
    },
    {
      coordinates: [[5.4737, 10.4171], [9.3077, 13.5847]] as [number, number][], // Bafoussam -> Garoua
      color: '#10b981'
    },
    {
      coordinates: [[4.5833, 14.0833], [10.3333, 14.1667]] as [number, number][], // Bertoua -> Maroua
      color: '#f59e0b'
    }
  ]

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Routes */}
        {routes.map((route, index) => (
          <Polyline
            key={index}
            positions={route.coordinates}
            color={route.color}
            weight={3}
            opacity={0.7}
          />
        ))}
        
        {/* Marqueurs de camions */}
        {trucks.map((truck) => (
          <TruckMarker
            key={truck.id}
            truck={truck}
            onSelect={onTruckSelect || (() => {})}
          />
        ))}
      </MapContainer>
      
      {/* Légende */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Légende</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>En course</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-trust rounded-full mr-2"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span>Maintenance</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
            <span>Hors service</span>
          </div>
        </div>
      </div>
      
      {/* Contrôles de la carte */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-2 z-[1000]">
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <span className="text-sm">📍</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <span className="text-sm">🔍</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <span className="text-sm">🗺️</span>
          </button>
        </div>
      </div>
    </div>
  )
}
