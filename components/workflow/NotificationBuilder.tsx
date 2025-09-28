'use client'

import { useState } from 'react'
import { 
  Bell, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  MapPin,
  Fuel,
  Wrench
} from 'lucide-react'

interface NotificationRule {
  id: string
  name: string
  trigger: string
  condition: string
  action: string
  enabled: boolean
  category: 'sécurité' | 'maintenance' | 'performance' | 'général'
}

const defaultRules: NotificationRule[] = [
  {
    id: '1',
    name: 'Freinage brusque',
    trigger: 'Comportement de conduite',
    condition: 'Décélération > 0.4g',
    action: 'Alerte immédiate + notification conducteur',
    enabled: true,
    category: 'sécurité'
  },
  {
    id: '2',
    name: 'Maintenance prévue',
    trigger: 'Kilométrage véhicule',
    condition: 'Km restants < 1000',
    action: 'Rappel 7 jours avant + notification manager',
    enabled: true,
    category: 'maintenance'
  },
  {
    id: '3',
    name: 'Carburant faible',
    trigger: 'Niveau carburant',
    condition: 'Niveau < 20%',
    action: 'Alerte conducteur + suggestion station',
    enabled: true,
    category: 'performance'
  }
]

const triggerTypes = [
  { value: 'comportement', label: 'Comportement de conduite', icon: AlertTriangle },
  { value: 'kilometrage', label: 'Kilométrage', icon: MapPin },
  { value: 'carburant', label: 'Niveau carburant', icon: Fuel },
  { value: 'maintenance', label: 'Maintenance', icon: Wrench },
  { value: 'performance', label: 'Performance', icon: CheckCircle },
  { value: 'temps', label: 'Temps/Planning', icon: Clock }
]

const actionTypes = [
  { value: 'notification', label: 'Notification push', icon: Bell },
  { value: 'email', label: 'Email', icon: Info },
  { value: 'sms', label: 'SMS', icon: Bell },
  { value: 'dashboard', label: 'Alerte dashboard', icon: AlertTriangle }
]

export default function NotificationBuilder() {
  const [rules, setRules] = useState<NotificationRule[]>(defaultRules)
  const [showBuilder, setShowBuilder] = useState(false)
  const [editingRule, setEditingRule] = useState<NotificationRule | null>(null)

  const handleAddRule = () => {
    setEditingRule({
      id: Date.now().toString(),
      name: '',
      trigger: '',
      condition: '',
      action: '',
      enabled: true,
      category: 'général'
    })
    setShowBuilder(true)
  }

  const handleEditRule = (rule: NotificationRule) => {
    setEditingRule(rule)
    setShowBuilder(true)
  }

  const handleSaveRule = (rule: NotificationRule) => {
    if (editingRule) {
      setRules(prev => 
        prev.some(r => r.id === rule.id) 
          ? prev.map(r => r.id === rule.id ? rule : r)
          : [...prev, rule]
      )
    }
    setShowBuilder(false)
    setEditingRule(null)
  }

  const handleDeleteRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id))
  }

  const handleToggleRule = (id: string) => {
    setRules(prev => prev.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sécurité': return AlertTriangle
      case 'maintenance': return Wrench
      case 'performance': return CheckCircle
      default: return Info
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sécurité': return 'bg-red-100 text-red-800'
      case 'maintenance': return 'bg-blue-100 text-trust'
      case 'performance': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Gestionnaire de notifications
        </h1>
        <p className="text-gray-600">
          Configurez vos alertes et notifications personnalisées pour optimiser votre flotte
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">{rules.length}</div>
          <div className="text-sm text-gray-600">Règles configurées</div>
        </div>
        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">{rules.filter(r => r.enabled).length}</div>
          <div className="text-sm text-gray-600">Règles actives</div>
        </div>
        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">24</div>
          <div className="text-sm text-gray-600">Notifications aujourd'hui</div>
        </div>
        <div className="kpi-card">
          <div className="text-2xl font-bold text-primary mb-1">98%</div>
          <div className="text-sm text-gray-600">Taux de réactivité</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={handleAddRule}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle règle
          </button>
          <button className="btn-secondary">
            Importer template
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Mode:</span>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option value="simple">Simple</option>
            <option value="avance">Avancé</option>
          </select>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => {
          const CategoryIcon = getCategoryIcon(rule.category)
          return (
            <div key={rule.id} className="dashboard-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${getCategoryColor(rule.category)}`}>
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{rule.name}</h3>
                    <p className="text-sm text-gray-600">
                      {rule.trigger} • {rule.condition}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{rule.action}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleToggleRule(rule.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      rule.enabled 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {rule.enabled ? 'Actif' : 'Inactif'}
                  </button>
                  <button
                    onClick={() => handleEditRule(rule)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Rule Builder Modal */}
      {showBuilder && editingRule && (
        <RuleBuilder
          rule={editingRule}
          onSave={handleSaveRule}
          onCancel={() => {
            setShowBuilder(false)
            setEditingRule(null)
          }}
        />
      )}
    </div>
  )
}

interface RuleBuilderProps {
  rule: NotificationRule
  onSave: (rule: NotificationRule) => void
  onCancel: () => void
}

function RuleBuilder({ rule, onSave, onCancel }: RuleBuilderProps) {
  const [formData, setFormData] = useState<NotificationRule>(rule)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="dashboard-card p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary">
            {rule.id ? 'Modifier la règle' : 'Nouvelle règle'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la règle
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
              placeholder="Ex: Freinage brusque"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
            >
              <option value="sécurité">Sécurité</option>
              <option value="maintenance">Maintenance</option>
              <option value="performance">Performance</option>
              <option value="général">Général</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Déclencheur
            </label>
            <select
              value={formData.trigger}
              onChange={(e) => setFormData(prev => ({ ...prev, trigger: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
              required
            >
              <option value="">Sélectionnez un déclencheur</option>
              {triggerTypes.map((trigger) => (
                <option key={trigger.value} value={trigger.label}>
                  {trigger.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition
            </label>
            <input
              type="text"
              value={formData.condition}
              onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
              placeholder="Ex: Décélération > 0.4g"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action
            </label>
            <select
              value={formData.action}
              onChange={(e) => setFormData(prev => ({ ...prev, action: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
              required
            >
              <option value="">Sélectionnez une action</option>
              {actionTypes.map((action) => (
                <option key={action.value} value={action.label}>
                  {action.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="enabled"
              checked={formData.enabled}
              onChange={(e) => setFormData(prev => ({ ...prev, enabled: e.target.checked }))}
              className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
            />
            <label htmlFor="enabled" className="ml-2 block text-sm text-gray-700">
              Activer cette règle
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
