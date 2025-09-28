'use client'

import { useState, useEffect } from 'react'
import { Wifi, WifiOff, Sync, CheckCircle, AlertCircle } from 'lucide-react'

interface OfflineSyncProps {
  onSyncComplete?: () => void
}

export default function OfflineSync({ onSyncComplete }: OfflineSyncProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [pendingSync, setPendingSync] = useState(false)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle')
  const [pendingData, setPendingData] = useState<any[]>([])

  useEffect(() => {
    // Détecter le statut de connexion
    const handleOnline = () => {
      setIsOnline(true)
      if (pendingData.length > 0) {
        handleSync()
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Vérifier le statut initial
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [pendingData.length])

  const handleSync = async () => {
    if (!isOnline || pendingData.length === 0) return

    setSyncStatus('syncing')
    setPendingSync(true)

    try {
      // Simuler la synchronisation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Ici, vous enverriez les données au serveur
      console.log('Synchronisation des données:', pendingData)
      
      setSyncStatus('success')
      setPendingData([])
      onSyncComplete?.()
      
      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setSyncStatus('idle')
        setPendingSync(false)
      }, 3000)
    } catch (error) {
      setSyncStatus('error')
      setTimeout(() => {
        setSyncStatus('idle')
        setPendingSync(false)
      }, 3000)
    }
  }

  const addPendingData = (data: any) => {
    setPendingData(prev => [...prev, data])
  }

  if (!isOnline) {
    return (
      <div className="offline-indicator">
        <div className="flex items-center space-x-2">
          <WifiOff className="w-4 h-4" />
          <span>Mode hors ligne</span>
        </div>
      </div>
    )
  }

  if (pendingData.length > 0 && isOnline) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Sync className={`w-4 h-4 ${
                syncStatus === 'syncing' ? 'animate-spin text-trust' :
                syncStatus === 'success' ? 'text-green-500' :
                syncStatus === 'error' ? 'text-red-500' :
                'text-gray-400'
              }`} />
              <span className="text-sm font-medium text-gray-900">
                {syncStatus === 'syncing' ? 'Synchronisation...' :
                 syncStatus === 'success' ? 'Synchronisé' :
                 syncStatus === 'error' ? 'Erreur de sync' :
                 'Données en attente'}
              </span>
            </div>
            {syncStatus === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
            {syncStatus === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
          </div>
          
          <div className="text-xs text-gray-600 mb-3">
            {pendingData.length} élément(s) en attente de synchronisation
          </div>
          
          {syncStatus === 'idle' && (
            <button
              onClick={handleSync}
              className="w-full btn-primary text-sm py-2"
            >
              Synchroniser maintenant
            </button>
          )}
          
          {syncStatus === 'syncing' && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-trust h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}

// Hook pour gérer les données hors ligne
export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(true)
  const [pendingData, setPendingData] = useState<any[]>([])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const addPendingData = (data: any) => {
    setPendingData(prev => [...prev, data])
  }

  const clearPendingData = () => {
    setPendingData([])
  }

  return {
    isOnline,
    pendingData,
    addPendingData,
    clearPendingData
  }
}

// Composant pour les notifications de statut de connexion
export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowStatus(true)
      setTimeout(() => setShowStatus(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowStatus(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!showStatus) return null

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
      isOnline 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`}>
      <div className="flex items-center space-x-2">
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span className="text-sm font-medium">Connexion rétablie</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">Mode hors ligne</span>
          </>
        )}
      </div>
    </div>
  )
}
