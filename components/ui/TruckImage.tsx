'use client'

import { useState } from 'react'
import { Truck } from 'lucide-react'

interface TruckImageProps {
  truckId: string
  model?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

export default function TruckImage({ truckId, model, size = 'md', className = '' }: TruckImageProps) {
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  // Générer une couleur basée sur l'ID du camion pour la cohérence
  const getTruckColor = (id: string) => {
    const colors = [
      'bg-trust',
      'bg-green-500', 
      'bg-red-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-indigo-500',
      'bg-pink-500',
      'bg-orange-500'
    ]
    const index = (id || 'default').charCodeAt(0) % colors.length
    return colors[index]
  }

  const getTruckImage = (id: string, model?: string) => {
    // Images de camions basées sur le modèle
    const truckImages: Record<string, string> = {
      'Mercedes': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=100&h=100&fit=crop&crop=center',
      'Volvo': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop&crop=center',
      'Scania': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop&crop=center',
      'MAN': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=100&h=100&fit=crop&crop=center',
      'Iveco': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop&crop=center'
    }

    if (model) {
      const brand = model.split(' ')[0]
      return truckImages[brand] || truckImages['Mercedes']
    }

    // Fallback basé sur l'ID
    const fallbackImages = [
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=100&h=100&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop&crop=center'
    ]
    const index = (id || 'default').charCodeAt(0) % fallbackImages.length
    return fallbackImages[index]
  }

  if (imageError) {
    return (
      <div className={`${sizeClasses[size]} ${getTruckColor(truckId)} rounded-lg flex items-center justify-center ${className}`}>
        <Truck className={`${iconSizes[size]} text-white`} />
      </div>
    )
  }

  return (
    <div className={`${sizeClasses[size]} rounded-lg overflow-hidden ${className}`}>
      <img
        src={getTruckImage(truckId, model)}
        alt={`Camion ${truckId}`}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
        onLoad={() => setImageError(false)}
      />
    </div>
  )
}

// Composant pour les avatars de chauffeurs
export function DriverAvatar({ 
  name, 
  size = 'md', 
  className = '' 
}: { 
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getDriverColor = (name: string) => {
    const colors = [
      'bg-trust',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500'
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className={`${sizeClasses[size]} ${getDriverColor(name)} rounded-full flex items-center justify-center text-white font-medium ${className}`}>
      {getInitials(name)}
    </div>
  )
}

// Composant pour les statuts avec icônes
export function StatusIndicator({ 
  status, 
  size = 'sm' 
}: { 
  status: 'active' | 'available' | 'maintenance' | 'inactive' | string
  size?: 'sm' | 'md'
}) {
  const statusConfig = {
    active: {
      color: 'bg-green-100 text-green-700',
      icon: '🟢',
      label: 'Actif'
    },
    available: {
      color: 'bg-blue-100 text-trust',
      icon: '🔵',
      label: 'Disponible'
    },
    maintenance: {
      color: 'bg-yellow-100 text-yellow-700',
      icon: '🟡',
      label: 'Maintenance'
    },
    inactive: {
      color: 'bg-gray-100 text-gray-700',
      icon: '⚫',
      label: 'Hors service'
    }
  }

  const config = statusConfig[status] || statusConfig.inactive
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1'

  return (
    <span className={`${sizeClass} ${config.color} rounded-full font-medium flex items-center space-x-1`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  )
}
