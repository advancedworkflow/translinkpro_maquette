'use client'

import { useState } from 'react'
import MobileOptimized from '../../components/performance/MobileOptimized'
import SafeComponent from '../../components/common/SafeComponent'

export default function TestPerformancePage() {
  const [showComponent, setShowComponent] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">
          Test des Composants de Performance
        </h1>

        <div className="space-y-8">
          {/* Test du composant MobileOptimized */}
          <div className="dashboard-card">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Test MobileOptimized
            </h2>
            <button
              onClick={() => setShowComponent(!showComponent)}
              className="btn-primary mb-4"
            >
              {showComponent ? 'Masquer' : 'Afficher'} le composant
            </button>
            
            {showComponent && (
              <SafeComponent
                fallback={
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">Erreur dans MobileOptimized</p>
                  </div>
                }
              >
                <MobileOptimized>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Contenu {i}</span>
                      </div>
                    ))}
                  </div>
                </MobileOptimized>
              </SafeComponent>
            )}
          </div>

          {/* Test des classes CSS */}
          <div className="dashboard-card">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Test des Classes CSS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="kpi-card">
                <div className="kpi-value text-trust">1.25M XAF</div>
                <div className="kpi-label">Revenus ce mois</div>
                <div className="kpi-change positive">+12% vs mois dernier</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-value text-trust">87%</div>
                <div className="kpi-label">Taux d'utilisation</div>
                <div className="kpi-change positive">+5% vs mois dernier</div>
              </div>
            </div>
          </div>

          {/* Test des boutons */}
          <div className="dashboard-card">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Test des Boutons
            </h2>
            <div className="flex space-x-4">
              <button className="btn-primary">Bouton Principal</button>
              <button className="btn-secondary">Bouton Secondaire</button>
            </div>
          </div>

          {/* Test des notifications */}
          <div className="dashboard-card">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Test des Notifications
            </h2>
            <div className="space-y-3">
              <div className="notification">
                <p className="text-sm font-medium">Notification standard</p>
                <p className="text-xs text-gray-600">Message d'information</p>
              </div>
              <div className="notification success">
                <p className="text-sm font-medium">Notification de succès</p>
                <p className="text-xs text-gray-600">Opération réussie</p>
              </div>
              <div className="notification warning">
                <p className="text-sm font-medium">Notification d'avertissement</p>
                <p className="text-xs text-gray-600">Attention requise</p>
              </div>
              <div className="notification error">
                <p className="text-sm font-medium">Notification d'erreur</p>
                <p className="text-xs text-gray-600">Une erreur s'est produite</p>
              </div>
            </div>
          </div>

          {/* Test de la barre de progression */}
          <div className="dashboard-card">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Test de la Barre de Progression
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-2">Progression 75%</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-2">Progression 100%</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
