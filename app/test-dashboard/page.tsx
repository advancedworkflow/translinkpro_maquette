'use client'

import { useState } from 'react'
import TransporteurDashboard from '../../components/dashboard/TransporteurDashboard'
import InteractiveMap from '../../components/maps/InteractiveMap'
import NotificationBuilder from '../../components/workflow/NotificationBuilder'
import DashboardTemplates from '../../components/dashboard/DashboardTemplates'
import LocalizedContent from '../../components/content/LocalizedContent'
import Hero from '../../components/sections/Hero'
import SafeComponent from '../../components/common/SafeComponent'

export default function TestDashboardPage() {
  const [activeComponent, setActiveComponent] = useState('dashboard')

  const components = [
    { id: 'hero', name: 'Hero Section', component: Hero },
    { id: 'dashboard', name: 'Dashboard Transporteur', component: TransporteurDashboard },
    { id: 'map', name: 'Carte Interactive', component: InteractiveMap },
    { id: 'notifications', name: 'Gestionnaire Notifications', component: NotificationBuilder },
    { id: 'templates', name: 'Templates Dashboard', component: DashboardTemplates },
    { id: 'localized', name: 'Contenu Localisé', component: () => <LocalizedContent type="testimonial" /> }
  ]

  const ActiveComponent = components.find(c => c.id === activeComponent)?.component

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-primary">
            Test des Composants Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Vérification que tous les composants utilisent les classes CSS de la démo
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Composants
              </h2>
              
              <div className="space-y-2">
                {components.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => setActiveComponent(component.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      activeComponent === component.id
                        ? 'bg-trust text-white'
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="font-medium text-sm">{component.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {ActiveComponent && (
              <SafeComponent
                fallback={
                  <div className="dashboard-card p-8 text-center">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      Erreur de chargement
                    </h3>
                    <p className="text-gray-600">
                      Le composant {components.find(c => c.id === activeComponent)?.name} n'a pas pu être chargé.
                    </p>
                  </div>
                }
              >
                <ActiveComponent />
              </SafeComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
