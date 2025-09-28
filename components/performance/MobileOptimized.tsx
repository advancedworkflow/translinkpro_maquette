'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Battery, 
  Signal,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import SafeComponent from '../common/SafeComponent'

interface PerformanceMetrics {
  loadTime: number
  bundleSize: number
  cacheHitRate: number
  networkLatency: number
  memoryUsage: number
}

interface MobileOptimizedProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

function MobileOptimizedComponent({ children, fallback }: MobileOptimizedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(true)
  const [connectionType, setConnectionType] = useState<string>('unknown')
  const [performance, setPerformance] = useState<PerformanceMetrics | null>(null)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  useEffect(() => {
    // Détecter le type de connexion
    const detectConnectionType = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        setConnectionType(connection.effectiveType || 'unknown')
      }
    }

    // Détecter les appareils bas de gamme
    const detectLowEndDevice = () => {
      const isLowEnd = 
        navigator.hardwareConcurrency <= 2 ||
        navigator.deviceMemory <= 2 ||
        window.innerWidth <= 768
      setIsLowEndDevice(isLowEnd)
    }

    // Mesurer les performances
    const measurePerformance = () => {
      if ('performance' in window && performance.getEntriesByType) {
        try {
          const navigationEntries = performance.getEntriesByType('navigation')
          if (navigationEntries.length > 0) {
            const navigation = navigationEntries[0] as PerformanceNavigationTiming
            const metrics: PerformanceMetrics = {
              loadTime: navigation.loadEventEnd - navigation.loadEventStart,
              bundleSize: 0, // Sera calculé par le bundler
              cacheHitRate: 0, // Sera calculé par le service worker
              networkLatency: navigation.responseEnd - navigation.requestStart,
              memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
            }
            setPerformance(metrics)
          }
        } catch (error) {
          console.warn('Performance API not available:', error)
          // Métriques par défaut
          setPerformance({
            loadTime: 0,
            bundleSize: 0,
            cacheHitRate: 0,
            networkLatency: 0,
            memoryUsage: 0
          })
        }
      }
    }

    // Détecter le statut de connexion
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Initialisation
    detectConnectionType()
    detectLowEndDevice()
    measurePerformance()
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Simuler le chargement
    setTimeout(() => setIsLoading(false), 1000)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Optimisations pour appareils bas de gamme
  const optimizedChildren = isLowEndDevice ? (
    <div className="space-y-4">
      <div className="text-center py-8">
        <Smartphone className="w-12 h-12 text-trust mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-primary mb-2">
          Mode optimisé activé
        </h3>
        <p className="text-sm text-gray-600">
          Interface simplifiée pour une meilleure performance
        </p>
      </div>
      {children}
    </div>
  ) : children

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-trust animate-spin mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-primary mb-2">
            Chargement optimisé
          </h2>
          <p className="text-sm text-gray-600">
            Adaptation à votre appareil en cours...
          </p>
        </div>
      </div>
    )
  }

  if (!isOnline && fallback) {
    return <>{fallback}</>
  }

  return (
    <div className="relative">
      {/* Indicateur de performance mobile */}
      <MobilePerformanceIndicator 
        isOnline={isOnline}
        connectionType={connectionType}
        performance={performance}
        isLowEndDevice={isLowEndDevice}
      />
      
      {optimizedChildren}
    </div>
  )
}

// Export avec error boundary
export default function MobileOptimized(props: MobileOptimizedProps) {
  return (
    <SafeComponent
      fallback={
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-yellow-800 font-medium">Mode optimisé indisponible</h3>
          <p className="text-yellow-600 text-sm mt-1">
            Affichage en mode standard.
          </p>
        </div>
      }
    >
      <MobileOptimizedComponent {...props} />
    </SafeComponent>
  )
}

interface MobilePerformanceIndicatorProps {
  isOnline: boolean
  connectionType: string
  performance: PerformanceMetrics | null
  isLowEndDevice: boolean
}

function MobilePerformanceIndicator({ 
  isOnline, 
  connectionType, 
  performance, 
  isLowEndDevice 
}: MobilePerformanceIndicatorProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getConnectionIcon = () => {
    if (!isOnline) return WifiOff
    if (connectionType === 'slow-2g' || connectionType === '2g') return Signal
    return Wifi
  }

  const getConnectionColor = () => {
    if (!isOnline) return 'text-red-500'
    if (connectionType === 'slow-2g' || connectionType === '2g') return 'text-yellow-500'
    if (connectionType === '3g') return 'text-trust'
    return 'text-green-500'
  }

  const ConnectionIcon = getConnectionIcon()

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <ConnectionIcon className={`w-4 h-4 ${getConnectionColor()}`} />
            <span className="text-sm font-medium text-gray-900">
              {isOnline ? 'Connecté' : 'Hors ligne'}
            </span>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            {showDetails ? 'Masquer' : 'Détails'}
          </button>
        </div>

        {showDetails && (
          <div className="space-y-2 text-xs text-gray-600 border-t border-gray-200 pt-2">
            <div className="flex justify-between">
              <span>Connexion:</span>
              <span className="capitalize">{connectionType}</span>
            </div>
            {performance && (
              <>
                <div className="flex justify-between">
                  <span>Temps de chargement:</span>
                  <span>{performance.loadTime.toFixed(0)}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Latence réseau:</span>
                  <span>{performance.networkLatency.toFixed(0)}ms</span>
                </div>
              </>
            )}
            {isLowEndDevice && (
              <div className="flex items-center space-x-1 text-yellow-600">
                <AlertCircle className="w-3 h-3" />
                <span>Mode optimisé</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Composant pour le chargement progressif
export function ProgressiveLoader({ 
  items, 
  renderItem, 
  batchSize = 10,
  className = ''
}: {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  batchSize?: number
  className?: string
}) {
  const [loadedItems, setLoadedItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    
    // Simuler le chargement progressif
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const startIndex = loadedItems.length
    const endIndex = Math.min(startIndex + batchSize, items.length)
    const newItems = items.slice(startIndex, endIndex)
    
    setLoadedItems(prev => [...prev, ...newItems])
    setHasMore(endIndex < items.length)
    setIsLoading(false)
  }, [items, loadedItems.length, batchSize, isLoading, hasMore])

  useEffect(() => {
    loadMore()
  }, [])

  return (
    <div className={className}>
      {loadedItems.map((item, index) => renderItem(item, index))}
      
      {hasMore && (
        <div className="text-center py-4">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="btn-secondary flex items-center mx-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Chargement...
              </>
            ) : (
              'Charger plus'
            )}
          </button>
        </div>
      )}
    </div>
  )
}

// Composant pour les images lazy loading
export function LazyImage({ 
  src, 
  alt, 
  className = '',
  placeholder = '/api/placeholder/300/200'
}: {
  src: string
  alt: string
  className?: string
  placeholder?: string
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
        </div>
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  )
}

// Hook pour optimiser les performances
export function usePerformanceOptimization() {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [connectionType, setConnectionType] = useState<string>('unknown')

  useEffect(() => {
    // Détecter les appareils bas de gamme
    const detectLowEndDevice = () => {
      try {
        const isLowEnd = 
          (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
          (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
          window.innerWidth <= 768
        setIsLowEndDevice(isLowEnd)
      } catch (error) {
        console.warn('Hardware detection failed:', error)
        setIsLowEndDevice(window.innerWidth <= 768)
      }
    }

    // Détecter le type de connexion
    const detectConnectionType = () => {
      try {
        if ('connection' in navigator) {
          const connection = (navigator as any).connection
          setConnectionType(connection.effectiveType || 'unknown')
        }
      } catch (error) {
        console.warn('Connection detection failed:', error)
        setConnectionType('unknown')
      }
    }

    detectLowEndDevice()
    detectConnectionType()

    // Optimisations pour appareils bas de gamme
    if (isLowEndDevice) {
      // Réduire les animations
      document.documentElement.style.setProperty('--animation-duration', '0.1s')
      
      // Désactiver les effets visuels coûteux
      document.documentElement.style.setProperty('--blur-radius', '0px')
    }
  }, [isLowEndDevice])

  return {
    isLowEndDevice,
    connectionType,
    shouldReduceAnimations: isLowEndDevice || connectionType === 'slow-2g',
    shouldLazyLoad: isLowEndDevice || connectionType === '2g' || connectionType === 'slow-2g'
  }
}
