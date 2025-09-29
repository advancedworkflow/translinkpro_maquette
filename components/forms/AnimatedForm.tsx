'use client'

import { useState } from 'react'
import AnimatedInput from './AnimatedInput'
import AnimatedButton from './AnimatedButton'
import AnimatedSelect from './AnimatedSelect'
import AnimatedTextarea from './AnimatedTextarea'
import { User, Mail, Phone, MapPin, Calendar, FileText, Camera, Shield, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  birthDate: string
  description: string
  role: string
  department: string
}

interface AnimatedFormProps {
  onSubmit: (data: FormData) => void
  initialData?: Partial<FormData>
  className?: string
}

export default function AnimatedForm({ onSubmit, initialData, className = '' }: AnimatedFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    country: initialData?.country || '',
    birthDate: initialData?.birthDate || '',
    description: initialData?.description || '',
    role: initialData?.role || '',
    department: initialData?.department || ''
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const countries = [
    { value: 'cm', label: 'Cameroun', icon: <MapPin className="w-4 h-4" /> },
    { value: 'fr', label: 'France', icon: <MapPin className="w-4 h-4" /> },
    { value: 'us', label: 'États-Unis', icon: <MapPin className="w-4 h-4" /> },
    { value: 'de', label: 'Allemagne', icon: <MapPin className="w-4 h-4" /> },
    { value: 'gb', label: 'Royaume-Uni', icon: <MapPin className="w-4 h-4" /> }
  ]

  const roles = [
    { value: 'admin', label: 'Administrateur', icon: <Shield className="w-4 h-4" /> },
    { value: 'manager', label: 'Gestionnaire', icon: <User className="w-4 h-4" /> },
    { value: 'driver', label: 'Chauffeur', icon: <User className="w-4 h-4" /> },
    { value: 'technician', label: 'Technicien', icon: <User className="w-4 h-4" /> },
    { value: 'dispatcher', label: 'Dispatcher', icon: <User className="w-4 h-4" /> }
  ]

  const departments = [
    { value: 'fleet', label: 'Flotte', icon: <FileText className="w-4 h-4" /> },
    { value: 'maintenance', label: 'Maintenance', icon: <FileText className="w-4 h-4" /> },
    { value: 'logistics', label: 'Logistique', icon: <FileText className="w-4 h-4" /> },
    { value: 'finance', label: 'Finance', icon: <FileText className="w-4 h-4" /> },
    { value: 'hr', label: 'Ressources Humaines', icon: <FileText className="w-4 h-4" /> }
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis'
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Format de téléphone invalide'
    }

    if (!formData.role) {
      newErrors.role = 'Le rôle est requis'
    }

    if (!formData.department) {
      newErrors.department = 'Le département est requis'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simuler une soumission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      onSubmit(formData)
      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Informations personnelles */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-trust" />
          Informations personnelles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedInput
            label="Prénom"
            value={formData.firstName}
            onChange={(value) => handleInputChange('firstName', value)}
            error={errors.firstName}
            required
            icon={<User className="w-4 h-4" />}
          />
          
          <AnimatedInput
            label="Nom"
            value={formData.lastName}
            onChange={(value) => handleInputChange('lastName', value)}
            error={errors.lastName}
            required
            icon={<User className="w-4 h-4" />}
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
            required
            icon={<Phone className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Adresse */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-trust" />
          Adresse
        </h3>
        
        <div className="space-y-4">
          <AnimatedInput
            label="Adresse"
            value={formData.address}
            onChange={(value) => handleInputChange('address', value)}
            icon={<MapPin className="w-4 h-4" />}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedInput
              label="Ville"
              value={formData.city}
              onChange={(value) => handleInputChange('city', value)}
              icon={<MapPin className="w-4 h-4" />}
            />
            
            <AnimatedSelect
              label="Pays"
              options={countries}
              value={formData.country}
              onChange={(value) => handleInputChange('country', value)}
              searchable
            />
          </div>
        </div>
      </div>

      {/* Informations professionnelles */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-trust" />
          Informations professionnelles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedSelect
            label="Rôle"
            options={roles}
            value={formData.role}
            onChange={(value) => handleInputChange('role', value)}
            error={errors.role}
            required
            searchable
          />
          
          <AnimatedSelect
            label="Département"
            options={departments}
            value={formData.department}
            onChange={(value) => handleInputChange('department', value)}
            error={errors.department}
            required
            searchable
          />
          
          <AnimatedInput
            label="Date de naissance"
            type="text"
            value={formData.birthDate}
            onChange={(value) => handleInputChange('birthDate', value)}
            icon={<Calendar className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-trust" />
          Description
        </h3>
        
        <AnimatedTextarea
          label="Description personnelle"
          value={formData.description}
          onChange={(value) => handleInputChange('description', value)}
          placeholder="Décrivez-vous en quelques mots..."
          maxLength={500}
          showCharCount
          showExpandButton
        />
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-4">
        <AnimatedButton
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              address: '',
              city: '',
              country: '',
              birthDate: '',
              description: '',
              role: '',
              department: ''
            })
            setErrors({})
            setSubmitStatus('idle')
          }}
        >
          Réinitialiser
        </AnimatedButton>
        
        <AnimatedButton
          type="submit"
          variant="primary"
          loading={isSubmitting}
          success={submitStatus === 'success'}
          error={submitStatus === 'error'}
          animation="glow"
          ripple
        >
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </AnimatedButton>
      </div>

      {/* Messages de statut */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fadeIn">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-green-700 font-medium">
              Formulaire soumis avec succès !
            </span>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-fadeIn">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700 font-medium">
              Erreur lors de la soumission. Veuillez vérifier les champs.
            </span>
          </div>
        </div>
      )}
    </form>
  )
}


