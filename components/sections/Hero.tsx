'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingUp, MapPin, Users, Truck, BarChart3 } from 'lucide-react'

export default function Hero() {
  const [currentMetric, setCurrentMetric] = useState(0)
  
  const metrics = [
    { value: '+25%', label: 'Réduction km à vide', icon: TrendingUp },
    { value: '2.5M XAF', label: 'Revenus moyens/mois', icon: BarChart3 },
    { value: '98%', label: 'Satisfaction clients', icon: Users }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                Optimisez votre{' '}
                <span className="text-trust">transport</span>{' '}
                en Afrique Centrale
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Plateforme intelligente pour transporteurs, clients et prestataires. 
                Réduisez vos coûts, augmentez vos revenus et optimisez vos trajets.
              </p>
            </div>

            {/* Metrics Rotator */}
            <div className="flex items-center space-x-6">
              <div className="kpi-card min-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="icon-trust p-2 rounded-lg">
                    {React.createElement(metrics[currentMetric].icon, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <div className="kpi-value text-trust">{metrics[currentMetric].value}</div>
                    <div className="kpi-label">{metrics[currentMetric].label}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/presentation" className="btn-primary flex items-center justify-center group">
                <span>Investir maintenant</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/app-saas/auth/register" className="btn-secondary flex items-center justify-center">
                <span>Demander une démo</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-trust" />
                <span className="text-sm text-gray-600">Douala, Yaoundé, Libreville</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-trust" />
                <span className="text-sm text-gray-600">500+ transporteurs actifs</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            {/* Dashboard Preview */}
            <div className="dashboard-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary">Dashboard Transporteur</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="kpi-card">
                  <div className="kpi-value text-trust">1.2M XAF</div>
                  <div className="kpi-label">Revenus ce mois</div>
                  <div className="kpi-change positive">+12% vs mois dernier</div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-value text-trust">85%</div>
                  <div className="kpi-label">Taux d'utilisation</div>
                  <div className="kpi-change positive">+5% vs mois dernier</div>
                </div>
              </div>

              {/* Map Preview */}
              <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-trust mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Carte interactive en temps réel</p>
                </div>
              </div>

              {/* Active Vehicles */}
              <div className="space-y-3">
                <h4 className="font-medium text-primary">Véhicules actifs</h4>
                <div className="space-y-2">
                  {[
                    { id: 'CM-001', status: 'En route', location: 'Douala → Yaoundé' },
                    { id: 'CM-002', status: 'Chargement', location: 'Port de Douala' },
                    { id: 'CM-003', status: 'Disponible', location: 'Garage Central' }
                  ].map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Truck className="w-4 h-4 text-trust" />
                        <span className="font-medium text-sm">{vehicle.id}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium text-primary">{vehicle.status}</div>
                        <div className="text-xs text-gray-500">{vehicle.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-trust rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}