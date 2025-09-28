'use client'

import { useState } from 'react'
import { AnimatedForm, AnimatedInput, AnimatedButton, AnimatedSelect, AnimatedTextarea } from '../../components/forms'
import { User, Mail, Phone, MapPin, Calendar, FileText, Camera, Shield, Settings, Download } from 'lucide-react'

export default function DemoFormsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    category: '',
    priority: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: 'general', label: 'Général', icon: <FileText className="w-4 h-4" /> },
    { value: 'technical', label: 'Technique', icon: <Settings className="w-4 h-4" /> },
    { value: 'billing', label: 'Facturation', icon: <Download className="w-4 h-4" /> },
    { value: 'support', label: 'Support', icon: <Shield className="w-4 h-4" /> }
  ]

  const priorities = [
    { value: 'low', label: 'Faible', icon: <div className="w-3 h-3 bg-green-500 rounded-full" /> },
    { value: 'medium', label: 'Moyenne', icon: <div className="w-3 h-3 bg-yellow-500 rounded-full" /> },
    { value: 'high', label: 'Élevée', icon: <div className="w-3 h-3 bg-red-500 rounded-full" /> }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simuler une soumission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    alert('Formulaire soumis avec succès !')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Composants de Formulaire Animés
          </h1>
          <p className="text-gray-600">
            Démonstration des composants de formulaire personnalisés avec animations et interactivité
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire simple */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Formulaire Simple
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatedInput
                label="Nom complet"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                error={errors.name}
                required
                icon={<User className="w-4 h-4" />}
                maxLength={50}
              />

              <AnimatedInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                error={errors.email}
                required
                icon={<Mail className="w-4 h-4" />}
              />

              <AnimatedInput
                label="Téléphone"
                type="tel"
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                error={errors.phone}
                icon={<Phone className="w-4 h-4" />}
              />

              <AnimatedSelect
                label="Catégorie"
                options={categories}
                value={formData.category}
                onChange={(value) => handleInputChange('category', value)}
                error={errors.category}
                searchable
              />

              <AnimatedSelect
                label="Priorité"
                options={priorities}
                value={formData.priority}
                onChange={(value) => handleInputChange('priority', value)}
                error={errors.priority}
              />

              <AnimatedTextarea
                label="Message"
                value={formData.message}
                onChange={(value) => handleInputChange('message', value)}
                error={errors.message}
                placeholder="Décrivez votre demande..."
                maxLength={500}
                showCharCount
                showExpandButton
              />

              <div className="flex space-x-4">
                <AnimatedButton
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      message: '',
                      category: '',
                      priority: ''
                    })
                    setErrors({})
                  }}
                >
                  Réinitialiser
                </AnimatedButton>

                <AnimatedButton
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  animation="glow"
                  ripple
                >
                  Envoyer
                </AnimatedButton>
              </div>
            </form>
          </div>

          {/* Démonstration des boutons */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Variantes de Boutons
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Variantes</h3>
                <div className="grid grid-cols-2 gap-3">
                  <AnimatedButton variant="primary" animation="glow">
                    Primaire
                  </AnimatedButton>
                  <AnimatedButton variant="secondary">
                    Secondaire
                  </AnimatedButton>
                  <AnimatedButton variant="outline">
                    Contour
                  </AnimatedButton>
                  <AnimatedButton variant="ghost">
                    Fantôme
                  </AnimatedButton>
                  <AnimatedButton variant="success">
                    Succès
                  </AnimatedButton>
                  <AnimatedButton variant="danger">
                    Danger
                  </AnimatedButton>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Tailles</h3>
                <div className="flex items-center space-x-3">
                  <AnimatedButton size="sm">Petit</AnimatedButton>
                  <AnimatedButton size="md">Moyen</AnimatedButton>
                  <AnimatedButton size="lg">Grand</AnimatedButton>
                  <AnimatedButton size="xl">Très grand</AnimatedButton>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">États</h3>
                <div className="flex items-center space-x-3">
                  <AnimatedButton loading>
                    Chargement
                  </AnimatedButton>
                  <AnimatedButton success>
                    Succès
                  </AnimatedButton>
                  <AnimatedButton error>
                    Erreur
                  </AnimatedButton>
                  <AnimatedButton disabled>
                    Désactivé
                  </AnimatedButton>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Animations</h3>
                <div className="grid grid-cols-2 gap-3">
                  <AnimatedButton animation="bounce">
                    Bounce
                  </AnimatedButton>
                  <AnimatedButton animation="pulse">
                    Pulse
                  </AnimatedButton>
                  <AnimatedButton animation="shake">
                    Shake
                  </AnimatedButton>
                  <AnimatedButton animation="glow">
                    Glow
                  </AnimatedButton>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Avec icônes</h3>
                <div className="flex items-center space-x-3">
                  <AnimatedButton icon={<Download className="w-4 h-4" />}>
                    Télécharger
                  </AnimatedButton>
                  <AnimatedButton 
                    icon={<Settings className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Paramètres
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire complet */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Formulaire Complet
          </h2>
          
          <AnimatedForm
            onSubmit={(data) => {
              console.log('Données du formulaire:', data)
              alert('Formulaire soumis avec succès !')
            }}
          />
        </div>
      </div>
    </div>
  )
}


