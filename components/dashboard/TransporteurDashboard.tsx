'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Truck, 
  MapPin, 
  Fuel, 
  Clock, 
  DollarSign,
  BarChart3,
  Settings,
  Bell
} from 'lucide-react'

interface KPIData {
  revenue: {
    current: number
    previous: number
    change: number
  }
  utilization: {
    current: number
    previous: number
    change: number
  }
  emptyMiles: {
    current: number
    previous: number
    change: number
  }
}

export default function TransporteurDashboard() {
  const [viewMode, setViewMode] = useState<'quick' | 'pro'>('quick')
  
  // Données simulées en XAF
  const kpiData: KPIData = {
    revenue: {
      current: 1250000,
      previous: 1100000,
      change: 13.6
    },
    utilization: {
      current: 87,
      previous: 82,
      change: 6.1
    },
    emptyMiles: {
      current: 15,
      previous: 22,
      change: -31.8
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CM', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">Dashboard Transporteur</h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('quick')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    viewMode === 'quick' 
                      ? 'bg-trust text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Mode Rapide
                </button>
                <button
                  onClick={() => setViewMode('pro')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    viewMode === 'pro' 
                      ? 'bg-trust text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Mode Pro
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mode Selection */}
        <div className={`mb-8 ${viewMode === 'quick' ? 'quick-mode' : 'pro-mode'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary">
                {viewMode === 'quick' ? 'Vue d\'ensemble rapide' : 'Analytics avancés'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {viewMode === 'quick' 
                  ? 'Les 3 métriques essentielles pour optimiser votre activité'
                  : 'Analyse complète de vos performances et tendances'
                }
              </p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Revenus */}
          <div className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div className="icon-trust p-3 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className={`flex items-center space-x-1 ${
                kpiData.revenue.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpiData.revenue.change > 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {formatPercentage(kpiData.revenue.change)}
                </span>
              </div>
            </div>
            <div className="kpi-value text-trust">
              {formatCurrency(kpiData.revenue.current)}
            </div>
            <div className="kpi-label">Revenus ce mois</div>
            <div className="kpi-change positive mt-2">
              vs {formatCurrency(kpiData.revenue.previous)} le mois dernier
            </div>
          </div>

          {/* Taux d'utilisation */}
          <div className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div className="icon-trust p-3 rounded-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className={`flex items-center space-x-1 ${
                kpiData.utilization.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpiData.utilization.change > 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {formatPercentage(kpiData.utilization.change)}
                </span>
              </div>
            </div>
            <div className="kpi-value text-trust">
              {kpiData.utilization.current}%
            </div>
            <div className="kpi-label">Taux d'utilisation</div>
            <div className="kpi-change positive mt-2">
              vs {kpiData.utilization.previous}% le mois dernier
            </div>
          </div>

          {/* Kilomètres à vide */}
          <div className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div className="icon-trust p-3 rounded-lg">
                <Truck className="w-6 h-6" />
              </div>
              <div className={`flex items-center space-x-1 ${
                kpiData.emptyMiles.change < 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpiData.emptyMiles.change < 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {formatPercentage(kpiData.emptyMiles.change)}
                </span>
              </div>
            </div>
            <div className="kpi-value text-trust">
              {kpiData.emptyMiles.current}%
            </div>
            <div className="kpi-label">Km à vide</div>
            <div className="kpi-change positive mt-2">
              vs {kpiData.emptyMiles.previous}% le mois dernier
            </div>
          </div>
        </div>

        {/* Contenu selon le mode */}
        {viewMode === 'quick' ? (
          <QuickModeView />
        ) : (
          <ProModeView />
        )}
      </div>
    </div>
  )
}

// Mode Rapide - 3 actions clés
function QuickModeView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Carte principale */}
      <div className="dashboard-card">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-trust" />
          Carte des trajets actifs
        </h3>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-trust mx-auto mb-4" />
            <p className="text-gray-600">Carte interactive en temps réel</p>
            <p className="text-sm text-gray-500 mt-2">3 véhicules en route</p>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="space-y-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-primary mb-4">Actions rapides</h3>
          <div className="space-y-3">
            <button className="w-full btn-primary flex items-center justify-center">
              <Truck className="w-4 h-4 mr-2" />
              Nouvelle demande
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              <Clock className="w-4 h-4 mr-2" />
              Voir planning
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              <Fuel className="w-4 h-4 mr-2" />
              Consommation
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-primary mb-4">Notifications</h3>
          <div className="space-y-3">
            <div className="notification">
              <p className="text-sm font-medium">Véhicule CM-001</p>
              <p className="text-xs text-gray-600">Arrivée prévue à Yaoundé dans 2h</p>
            </div>
            <div className="notification warning">
              <p className="text-sm font-medium">Maintenance</p>
              <p className="text-xs text-gray-600">CM-003 : Contrôle technique dans 5 jours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mode Pro - Analytics complets
function ProModeView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Graphiques */}
      <div className="lg:col-span-2 space-y-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-primary mb-4">Évolution des revenus</h3>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <BarChart3 className="w-12 h-12 text-trust" />
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-primary mb-4">Carte des trajets</h3>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <MapPin className="w-12 h-12 text-trust" />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-primary mb-4">Véhicules actifs</h3>
          <div className="space-y-3">
            {[
              { id: 'CM-001', status: 'En route', route: 'Douala → Yaoundé', progress: 75 },
              { id: 'CM-002', status: 'Chargement', route: 'Port de Douala', progress: 30 },
              { id: 'CM-003', status: 'Disponible', route: 'Garage Central', progress: 0 }
            ].map((vehicle) => (
              <div key={vehicle.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{vehicle.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    vehicle.status === 'En route' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'Chargement' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{vehicle.route}</p>
                {vehicle.progress > 0 && (
                  <div className="progress-bar h-2">
                    <div 
                      className="progress-fill"
                      style={{ width: `${vehicle.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-primary mb-4">Alertes</h3>
          <div className="space-y-3">
            <div className="notification error">
              <p className="text-sm font-medium">Carburant faible</p>
              <p className="text-xs text-gray-600">CM-001 : 15% restant</p>
            </div>
            <div className="notification warning">
              <p className="text-sm font-medium">Retard possible</p>
              <p className="text-xs text-gray-600">CM-002 : Trafic dense sur A1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
