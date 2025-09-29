'use client'

import { useState, useEffect } from 'react'
import { 
  Palette, 
  Smartphone, 
  Map, 
  Bell, 
  BarChart3, 
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'
import Hero from '../sections/Hero'
import TransporteurDashboard from '../dashboard/TransporteurDashboard'
import InteractiveMap from '../maps/InteractiveMap'
import NotificationBuilder from '../workflow/NotificationBuilder'
import DashboardTemplates from '../dashboard/DashboardTemplates'
import LocalizedContent from '../content/LocalizedContent'
import MobileOptimized from '../performance/MobileOptimized'
import OfflineSync, { ConnectionStatus } from '../common/OfflineSync'

interface Feature {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  component: React.ComponentType<any>
  category: 'design' | 'performance' | 'functionality' | 'localization'
}

const features: Feature[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    description: 'Capture de valeur avec métriques locales et CTA investisseurs',
    icon: Palette,
    component: Hero,
    category: 'design'
  },
  {
    id: 'dashboard',
    name: 'Dashboard Transporteur',
    description: 'KPI inspirés de Samsara avec modes Quick/Pro',
    icon: BarChart3,
    component: TransporteurDashboard,
    category: 'functionality'
  },
  {
    id: 'map',
    name: 'Carte Interactive',
    description: 'Visualisation temps réel avec heatmaps et trajets',
    icon: Map,
    component: InteractiveMap,
    category: 'functionality'
  },
  {
    id: 'notifications',
    name: 'Gestionnaire Notifications',
    description: 'Workflow builder pour alertes personnalisées',
    icon: Bell,
    component: NotificationBuilder,
    category: 'functionality'
  },
  {
    id: 'templates',
    name: 'Templates Dashboard',
    description: 'Templates prêts à l\'emploi (sécurité, carburant, maintenance)',
    icon: Settings,
    component: DashboardTemplates,
    category: 'functionality'
  },
  {
    id: 'localized',
    name: 'Contenu Localisé',
    description: 'Microcopy en XAF avec références Douala/Yaoundé',
    icon: Palette,
    component: () => <LocalizedContent type="testimonial" />,
    category: 'localization'
  },
  {
    id: 'mobile',
    name: 'Optimisation Mobile',
    description: 'Performance mobile avec chargement progressif',
    icon: Smartphone,
    component: () => (
      <div className="space-y-6">
        <MobileOptimized>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Image {i}</span>
              </div>
            ))}
          </div>
        </MobileOptimized>
      </div>
    ),
    category: 'performance'
  }
]

export default function FeatureShowcase() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const categories = {
    design: { label: 'Design & UX', color: 'bg-purple-100 text-purple-800' },
    performance: { label: 'Performance', color: 'bg-green-100 text-green-800' },
    functionality: { label: 'Fonctionnalités', color: 'bg-blue-100 text-trust' },
    localization: { label: 'Localisation', color: 'bg-orange-100 text-orange-800' }
  }

  const handleFeatureSelect = (feature: Feature) => {
    setSelectedFeature(feature)
    setIsPlaying(false)
  }

  const handlePlay = () => {
    setIsPlaying(true)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % features.length
        setSelectedFeature(features[next])
        return next
      })
    }, 5000)
    
    // Nettoyer l'intervalle après 30 secondes
    setTimeout(() => {
      clearInterval(interval)
      setIsPlaying(false)
    }, 30000)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setSelectedFeature(null)
    setCurrentIndex(0)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                TransLink-Pro Feature Showcase
              </h1>
              <p className="text-gray-600 mt-2">
                Démonstration des recommandations graphiques & UX implémentées
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={isPlaying ? handlePause : handlePlay}
                className={`btn-primary flex items-center ${
                  isPlaying ? 'bg-red-500 hover:bg-red-600' : ''
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Démo Auto'}
              </button>
              <button
                onClick={handleReset}
                className="btn-secondary flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Liste des fonctionnalités */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Fonctionnalités
              </h2>
              
              <div className="space-y-2">
                {Object.entries(categories).map(([categoryKey, category]) => (
                  <div key={categoryKey}>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${category.color} mb-2`}>
                      {category.label}
                    </div>
                    <div className="space-y-1 ml-2">
                      {features
                        .filter(f => f.category === categoryKey)
                        .map((feature) => (
                          <button
                            key={feature.id}
                            onClick={() => handleFeatureSelect(feature)}
                            className={`w-full text-left p-3 rounded-lg transition-all ${
                              selectedFeature?.id === feature.id
                                ? 'bg-trust text-white'
                                : 'bg-white hover:bg-gray-50 border border-gray-200'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <feature.icon className="w-5 h-5" />
                              <div>
                                <div className="font-medium text-sm">{feature.name}</div>
                                <div className={`text-xs ${
                                  selectedFeature?.id === feature.id ? 'text-trust' : 'text-gray-500'
                                }`}>
                                  {feature.description}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {selectedFeature ? (
              <div className="space-y-6">
                {/* Header de la fonctionnalité */}
                <div className="dashboard-card">
                  <div className="flex items-center space-x-4">
                    <div className="icon-trust p-3 rounded-lg">
                      <selectedFeature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-primary">
                        {selectedFeature.name}
                      </h2>
                      <p className="text-gray-600">{selectedFeature.description}</p>
                      <div className={`inline-block text-xs font-medium px-2 py-1 rounded-full mt-2 ${
                        categories[selectedFeature.category].color
                      }`}>
                        {categories[selectedFeature.category].label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Composant de démonstration */}
                <div className="dashboard-card">
                  <selectedFeature.component />
                </div>
              </div>
            ) : (
              <div className="dashboard-card text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Sélectionnez une fonctionnalité
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Choisissez une fonctionnalité dans la sidebar pour voir la démonstration
                  </p>
                  <button
                    onClick={handlePlay}
                    className="btn-primary"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Démarrer la démo automatique
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Indicateurs de statut */}
      <ConnectionStatus />
      <OfflineSync />
    </div>
  )
}

// Composant pour afficher les métriques de performance
export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    bundleSize: 0,
    cacheHitRate: 0,
    networkLatency: 0
  })

  useEffect(() => {
    // Simuler la collecte de métriques
    const interval = setInterval(() => {
      setMetrics({
        loadTime: Math.random() * 1000 + 500,
        bundleSize: Math.random() * 500 + 200,
        cacheHitRate: Math.random() * 20 + 80,
        networkLatency: Math.random() * 100 + 50
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="kpi-card">
        <div className="text-2xl font-bold text-trust mb-1">
          {metrics.loadTime.toFixed(0)}ms
        </div>
        <div className="text-sm text-gray-600">Temps de chargement</div>
      </div>
      <div className="kpi-card">
        <div className="text-2xl font-bold text-trust mb-1">
          {metrics.bundleSize.toFixed(0)}KB
        </div>
        <div className="text-sm text-gray-600">Taille du bundle</div>
      </div>
      <div className="kpi-card">
        <div className="text-2xl font-bold text-trust mb-1">
          {metrics.cacheHitRate.toFixed(1)}%
        </div>
        <div className="text-sm text-gray-600">Taux de cache</div>
      </div>
      <div className="kpi-card">
        <div className="text-2xl font-bold text-trust mb-1">
          {metrics.networkLatency.toFixed(0)}ms
        </div>
        <div className="text-sm text-gray-600">Latence réseau</div>
      </div>
    </div>
  )
}
