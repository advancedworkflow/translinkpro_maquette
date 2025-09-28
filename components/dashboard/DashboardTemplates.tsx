'use client'

import { useState } from 'react'
import { 
  Shield, 
  Fuel, 
  Wrench, 
  TrendingUp, 
  MapPin, 
  Clock,
  DollarSign,
  Users,
  Truck,
  BarChart3
} from 'lucide-react'

interface DashboardTemplate {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  category: 'sécurité' | 'carburant' | 'maintenance' | 'performance'
  kpis: string[]
  color: string
}

const templates: DashboardTemplate[] = [
  {
    id: 'securite',
    name: 'Sécurité',
    description: 'Surveillance des comportements de conduite et alertes sécurité',
    icon: Shield,
    category: 'sécurité',
    kpis: ['Score de conduite', 'Alertes sécurité', 'Incidents', 'Formations'],
    color: 'bg-red-500'
  },
  {
    id: 'carburant',
    name: 'Optimisation carburant',
    description: 'Suivi consommation et optimisation des coûts carburant',
    icon: Fuel,
    category: 'carburant',
    kpis: ['Consommation/L', 'Coût carburant', 'Économies', 'Efficacité'],
    color: 'bg-green-500'
  },
  {
    id: 'maintenance',
    name: 'Maintenance préventive',
    description: 'Planification et suivi des maintenances véhicules',
    icon: Wrench,
    category: 'maintenance',
    kpis: ['Maintenances prévues', 'Coûts maintenance', 'Disponibilité', 'Alertes'],
    color: 'bg-trust'
  },
  {
    id: 'performance',
    name: 'Performance opérationnelle',
    description: 'Analyse des performances et optimisation des trajets',
    icon: TrendingUp,
    category: 'performance',
    kpis: ['Revenus', 'Taux utilisation', 'Km à vide', 'Satisfaction client'],
    color: 'bg-purple-500'
  }
]

export default function DashboardTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [customizations, setCustomizations] = useState<Record<string, any>>({})

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleCustomize = (templateId: string, customizations: any) => {
    setCustomizations(prev => ({
      ...prev,
      [templateId]: customizations
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Templates de Dashboard
        </h1>
        <p className="text-gray-600">
          Choisissez un template prêt à l'emploi pour votre dashboard ou personnalisez-le selon vos besoins
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`dashboard-card cursor-pointer transition-all ${
              selectedTemplate === template.id ? 'ring-2 ring-trust' : ''
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className="flex items-center mb-4">
              <div className={`${template.color} p-3 rounded-lg mr-3`}>
                <template.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">{template.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{template.category}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{template.description}</p>
            
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                KPIs inclus
              </h4>
              <div className="flex flex-wrap gap-1">
                {template.kpis.map((kpi) => (
                  <span
                    key={kpi}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {kpi}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Preview */}
      {selectedTemplate && (
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary">
              Aperçu du template "{templates.find(t => t.id === selectedTemplate)?.name}"
            </h2>
            <div className="flex space-x-3">
              <button className="btn-secondary">
                Personnaliser
              </button>
              <button className="btn-primary">
                Appliquer ce template
              </button>
            </div>
          </div>

          <TemplatePreview 
            templateId={selectedTemplate} 
            customizations={customizations[selectedTemplate]}
            onCustomize={(customizations) => handleCustomize(selectedTemplate, customizations)}
          />
        </div>
      )}
    </div>
  )
}

interface TemplatePreviewProps {
  templateId: string
  customizations?: any
  onCustomize: (customizations: any) => void
}

function TemplatePreview({ templateId, customizations, onCustomize }: TemplatePreviewProps) {
  const template = templates.find(t => t.id === templateId)
  if (!template) return null

  const renderTemplateContent = () => {
    switch (templateId) {
      case 'securite':
        return <SecuriteTemplate />
      case 'carburant':
        return <CarburantTemplate />
      case 'maintenance':
        return <MaintenanceTemplate />
      case 'performance':
        return <PerformanceTemplate />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {renderTemplateContent()}
    </div>
  )
}

// Template Sécurité
function SecuriteTemplate() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="kpi-card mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-500" />
            Score de sécurité global
          </h3>
          <div className="text-4xl font-bold text-red-500 mb-2">87/100</div>
          <div className="text-sm text-gray-600">+5 points ce mois</div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-primary mb-4">Alertes récentes</h3>
          <div className="space-y-3">
            {[
              { type: 'Freinage brusque', vehicle: 'CM-001', time: 'Il y a 2h', severity: 'warning' },
              { type: 'Vitesse excessive', vehicle: 'CM-002', time: 'Il y a 4h', severity: 'error' },
              { type: 'Accélération brusque', vehicle: 'CM-003', time: 'Il y a 6h', severity: 'warning' }
            ].map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{alert.type}</div>
                  <div className="text-xs text-gray-600">{alert.vehicle} • {alert.time}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  alert.severity === 'error' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {alert.severity === 'error' ? 'Critique' : 'Attention'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">3</div>
          <div className="text-sm text-gray-600">Alertes aujourd'hui</div>
        </div>

        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">0</div>
          <div className="text-sm text-gray-600">Incidents ce mois</div>
        </div>

        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">95%</div>
          <div className="text-sm text-gray-600">Conducteurs formés</div>
        </div>
      </div>
    </div>
  )
}

// Template Carburant
function CarburantTemplate() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="kpi-card mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
            <Fuel className="w-5 h-5 mr-2 text-green-500" />
            Consommation moyenne
          </h3>
          <div className="text-4xl font-bold text-green-500 mb-2">8.2 L/100km</div>
          <div className="text-sm text-gray-600">-0.3 L/100km vs mois dernier</div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-primary mb-4">Économies réalisées</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">45,000 XAF</div>
              <div className="text-sm text-gray-600">Ce mois</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">12%</div>
              <div className="text-sm text-gray-600">Réduction consommation</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">650 XAF/L</div>
          <div className="text-sm text-gray-600">Prix moyen carburant</div>
        </div>

        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">1,200 L</div>
          <div className="text-sm text-gray-600">Consommation totale</div>
        </div>

        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">780,000 XAF</div>
          <div className="text-sm text-gray-600">Coût total carburant</div>
        </div>
      </div>
    </div>
  )
}

// Template Maintenance
function MaintenanceTemplate() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="kpi-card mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
            <Wrench className="w-5 h-5 mr-2 text-trust" />
            Maintenances prévues
          </h3>
          <div className="text-4xl font-bold text-trust mb-2">3</div>
          <div className="text-sm text-gray-600">Cette semaine</div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-primary mb-4">Planning maintenance</h3>
          <div className="space-y-3">
            {[
              { vehicle: 'CM-001', type: 'Contrôle technique', date: '15 Jan 2024', status: 'urgent' },
              { vehicle: 'CM-002', type: 'Vidange moteur', date: '18 Jan 2024', status: 'planned' },
              { vehicle: 'CM-003', type: 'Révision générale', date: '22 Jan 2024', status: 'planned' }
            ].map((maintenance, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{maintenance.vehicle}</div>
                  <div className="text-xs text-gray-600">{maintenance.type} • {maintenance.date}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  maintenance.status === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-trust'
                }`}>
                  {maintenance.status === 'urgent' ? 'Urgent' : 'Planifié'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">98%</div>
          <div className="text-sm text-gray-600">Disponibilité flotte</div>
        </div>

        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">125,000 XAF</div>
          <div className="text-sm text-gray-600">Coût maintenance</div>
        </div>

        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">0</div>
          <div className="text-sm text-gray-600">Pannes ce mois</div>
        </div>
      </div>
    </div>
  )
}

// Template Performance
function PerformanceTemplate() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="kpi-card mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
            Performance globale
          </h3>
          <div className="text-4xl font-bold text-purple-500 mb-2">92/100</div>
          <div className="text-sm text-gray-600">+8 points ce mois</div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-primary mb-4">Métriques clés</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">1.25M XAF</div>
              <div className="text-sm text-gray-600">Revenus ce mois</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">87%</div>
              <div className="text-sm text-gray-600">Taux d'utilisation</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">15%</div>
          <div className="text-sm text-gray-600">Km à vide</div>
        </div>

        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">4.8/5</div>
          <div className="text-sm text-gray-600">Satisfaction client</div>
        </div>

        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">98%</div>
          <div className="text-sm text-gray-600">Livraisons à l'heure</div>
        </div>
      </div>
    </div>
  )
}
