'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Check, User as UserIcon, Store, Truck } from 'lucide-react'
import { AuthService } from '../../lib/auth'
import { User, ClientProfile, PrestataireProfile, TransporteurProfile } from '../../lib/types'
import ClientRegistrationSlide from './slides/ClientRegistrationSlide'
import PrestataireRegistrationSlide from './slides/PrestataireRegistrationSlide'
import TransporteurRegistrationSlide from './slides/TransporteurRegistrationSlide'
import PackageSelectionSlide from './slides/PackageSelectionSlide'

interface RegistrationWizardProps {
  onComplete?: (user: UserType) => void
}

type UserType = 'client' | 'prestataire' | 'transporteur'

interface Step {
  id: number
  title: string
  description: string
  icon: React.ComponentType<any>
  component: React.ComponentType<any>
}

export default function RegistrationWizard({ onComplete }: RegistrationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [error, setError] = useState('')
  const router = useRouter()

  const steps: Step[] = [
    {
      id: 0,
      title: 'Type de compte',
      description: 'Choisissez votre type de compte',
      icon: UserIcon,
      component: UserTypeSelection
    },
    {
      id: 1,
      title: 'Informations de base',
      description: 'Vos informations personnelles',
      icon: UserIcon,
      component: BasicInfoSlide
    },
    {
      id: 2,
      title: 'Configuration du profil',
      description: 'Configuration spécifique à votre type de compte',
      icon: selectedUserType === 'client' ? UserIcon : selectedUserType === 'prestataire' ? Store : Truck,
      component: selectedUserType === 'client' ? ClientRegistrationSlide : 
                 selectedUserType === 'prestataire' ? PrestataireRegistrationSlide : 
                 TransporteurRegistrationSlide
    },
    ...(selectedUserType === 'transporteur' ? [{
      id: 3,
      title: 'Sélection du package',
      description: 'Choisissez votre plan d\'abonnement',
      icon: Check,
      component: PackageSelectionSlide
    }] : []),
    {
      id: selectedUserType === 'transporteur' ? 4 : 3,
      title: 'Finalisation',
      description: 'Création de votre compte',
      icon: Check,
      component: FinalizationSlide
    }
  ]

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 0: // Type de compte
        return selectedUserType !== null
      case 1: // Informations de base
        return !!(formData.firstName && formData.lastName && formData.email && formData.password)
      case 2: // Configuration du profil
        if (selectedUserType === 'client') {
          return !!(formData.telephone && formData.ville && formData.pays)
        } else if (selectedUserType === 'prestataire') {
          return !!(formData.nomEntreprise && formData.categorie && formData.telephone && formData.adresse && formData.ville && formData.pays)
        } else if (selectedUserType === 'transporteur') {
          return !!(formData.nomEntreprise && formData.typeStructure && formData.telephone && formData.siegeSocial && formData.localisationPrincipale)
        }
        return false
      case 3: // Sélection du package (transporteur uniquement)
        if (selectedUserType === 'transporteur') {
          return !!(formData.selectedPackage)
        }
        return true
      case 4: // Finalisation (transporteur) ou case 3 (autres)
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (!validateCurrentStep()) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }
    
    setError('')
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleUserTypeSelect = (type: UserType) => {
    setSelectedUserType(type)
    setFormData({ ...formData, type })
    handleNext()
  }

  const handleFormDataUpdate = (data: any) => {
    setFormData({ ...formData, ...data })
    // Effacer l'erreur quand l'utilisateur commence à remplir les champs
    if (error) {
      setError('')
    }
  }

  const handleSubmit = async () => {
    setError('')
    
    try {
      // Créer le profil selon le type
      let profile: ClientProfile | PrestataireProfile | TransporteurProfile
      
      if (selectedUserType === 'client') {
        profile = {
          nomComplet: `${formData.firstName} ${formData.lastName}`,
          raisonSociale: formData.raisonSociale,
          telephone: formData.telephone,
          localisation: {
            ville: formData.ville,
            pays: formData.pays
          },
          typeMarchandises: formData.typeMarchandises || [],
          frequenceBesoins: formData.frequenceBesoins || 'occasionnel',
          modePaiementPrefere: formData.modePaiementPrefere || 'mobile_money'
        } as ClientProfile
      } else if (selectedUserType === 'prestataire') {
        profile = {
          nomEntreprise: formData.nomEntreprise,
          categorie: formData.categorie,
          adresse: formData.adresse,
          ville: formData.ville,
          pays: formData.pays,
          telephone: formData.telephone,
          horairesOuverture: formData.horairesOuverture,
          siteWeb: formData.siteWeb,
          services: formData.services || [],
          tarifs: formData.tarifs
        } as PrestataireProfile
      } else {
        profile = {
          nomEntreprise: formData.nomEntreprise,
          typeStructure: formData.typeStructure,
          rccm: formData.rccm,
          telephone: formData.telephone,
          siegeSocial: formData.siegeSocial,
          localisationPrincipale: formData.localisationPrincipale,
          typeMarchandises: formData.typeMarchandises || [],
          capaciteOperationnelle: formData.capaciteOperationnelle,
          equipe: formData.equipe,
          documentsLegaux: formData.documentsLegaux,
          servicesAdditionnels: formData.servicesAdditionnels,
          planAbonnement: formData.planAbonnement || 'starter'
        } as TransporteurProfile
      }

      const user = AuthService.register({
        email: formData.email,
        password: formData.password,
        type: selectedUserType!,
        profile
      })

      if (user) {
        onComplete?.(user as any)
        
        // Rediriger selon le type d'utilisateur
        switch (user.type) {
          case 'transporteur':
            router.push('/app-saas')
            break
          case 'prestataire':
            router.push('/app-prestataire')
            break
          case 'client':
            router.push('/app-client')
            break
          default:
            router.push('/app-saas')
        }
      } else {
        setError('Un compte avec cet email existe déjà')
      }
    } catch (err) {
      setError('Erreur lors de la création du compte')
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="w-full">
      {/* Header avec progression */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-light text-gray-900">
              {steps[currentStep].title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {steps[currentStep].description}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Étape {currentStep + 1} sur {steps.length}
          </div>
        </div>

        {/* Barre de progression */}
        <div className="progress-bar w-full h-3">
          <div 
            className="progress-fill"
            style={{ 
              width: `${((currentStep + 1) / steps.length) * 100}%`
            }}
          />
        </div>

        {/* Indicateurs d'étapes */}
        <div className="flex justify-between mt-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center space-x-2 transition-all duration-300 ${
                index <= currentStep ? 'text-trust' : 'text-gray-400'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                index < currentStep ? 'text-white shadow-red-500/30' :
                index === currentStep ? 'text-white shadow-red-500/30' :
                'bg-gray-200 text-gray-400'
              }`}
              style={{
                backgroundColor: index <= currentStep ? 'var(--trust-red)' : undefined
              }}>
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className="text-xs font-medium hidden sm:block">
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contenu de l'étape avec transition */}
      <div className="dashboard-card py-8 px-4 sm:px-10">
        {error && (
          <div className="notification error mb-6">
            {error}
          </div>
        )}

        <div className="transition-all duration-500 ease-in-out">
          <CurrentStepComponent
            formData={formData}
            onUpdate={handleFormDataUpdate}
            onUserTypeSelect={handleUserTypeSelect}
            onSubmit={handleSubmit}
            userType={selectedUserType}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Précédent
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!validateCurrentStep()}
              className={`btn-primary flex items-center ${
                !validateCurrentStep() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Suivant
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-primary flex items-center px-8"
            >
              Créer le compte
              <Check className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Composant de sélection du type d'utilisateur
function UserTypeSelection({ onUserTypeSelect }: { onUserTypeSelect: (type: UserType) => void }) {
  const accountTypes = [
    {
      type: 'client' as const,
      title: 'Client',
      description: 'Demandeur de transport',
      icon: UserIcon,
      features: ['Créer des demandes', 'Suivi temps réel', 'Comparaison offres', 'Historique courses'],
      color: 'bg-blue-50 border-trust hover:border-trust-dark hover:bg-blue-100'
    },
    {
      type: 'prestataire' as const,
      title: 'Prestataire',
      description: 'Services aux transporteurs',
      icon: Store,
      features: ['Vitrine digitale', 'Gestion catalogue', 'Promotions ciblées', 'Suivi ventes'],
      color: 'bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100'
    },
    {
      type: 'transporteur' as const,
      title: 'Transporteur',
      description: 'Prestataire de transport',
      icon: Truck,
      features: ['Gestion flotte', 'Suivi GPS', 'Marketplace', 'Comptabilité'],
      color: 'bg-red-50 border-red-200 hover:border-red-300 hover:bg-red-100'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Choisissez votre type de compte
        </h3>
        <p className="text-sm text-gray-600">
          Sélectionnez le type de compte qui correspond le mieux à vos besoins
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accountTypes.map((accountType) => (
          <div
            key={accountType.type}
            className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${accountType.color}`}
            onClick={() => onUserTypeSelect(accountType.type)}
          >
            <div className="flex items-center mb-4">
              <accountType.icon className="w-8 h-8 text-gray-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">{accountType.title}</h4>
                <p className="text-sm text-gray-500">{accountType.description}</p>
              </div>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              {accountType.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 rounded-full mr-2 bg-trust"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// Composant d'informations de base
function BasicInfoSlide({ formData, onUpdate }: { formData: any, onUpdate: (data: any) => void }) {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Informations de base
        </h3>
        <p className="text-sm text-gray-600">
          Renseignez vos informations personnelles essentielles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prénom *
          </label>
          <input
            type="text"
            value={formData.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-trust focus:border-trust transition-all duration-200"
            placeholder="Jean"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom *
          </label>
          <input
            type="text"
            value={formData.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-trust focus:border-trust transition-all duration-200"
            placeholder="Dupont"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-trust focus:border-trust transition-all duration-200"
            placeholder="votre@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe *
          </label>
          <input
            type="password"
            value={formData.password || ''}
            onChange={(e) => handleChange('password', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-trust focus:border-trust transition-all duration-200"
            placeholder="••••••••"
            required
          />
        </div>
      </div>
    </div>
  )
}

// Composant de finalisation
function FinalizationSlide({ formData, userType, onSubmit }: { 
  formData: any, 
  userType: UserType | null,
  onSubmit: () => void 
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Finalisation
        </h3>
        <p className="text-sm text-gray-600">
          Vérifiez vos informations avant de créer votre compte
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Récapitulatif</h4>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium text-gray-600">Type de compte:</span> <span className="capitalize" style={{color: '#106ebe'}}>{userType}</span></p>
          <p><span className="font-medium text-gray-600">Nom:</span> <span className="text-gray-900">{formData.firstName} {formData.lastName}</span></p>
          <p><span className="font-medium text-gray-600">Email:</span> <span className="text-gray-900">{formData.email}</span></p>
          {formData.telephone && <p><span className="font-medium text-gray-600">Téléphone:</span> <span className="text-gray-900">{formData.telephone}</span></p>}
          {formData.ville && <p><span className="font-medium text-gray-600">Ville:</span> <span className="text-gray-900">{formData.ville}</span></p>}
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          required
          className="h-4 w-4 focus:ring-2 border-gray-300 rounded"
          style={{'--tw-ring-color': '#106ebe', accentColor: '#106ebe'} as any}
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
          J'accepte les{' '}
          <a href="#" className="hover:underline transition-colors" style={{color: '#106ebe'}}>
            conditions d'utilisation
          </a>{' '}
          et la{' '}
          <a href="#" className="hover:underline transition-colors" style={{color: '#106ebe'}}>
            politique de confidentialité
          </a>
        </label>
      </div>
    </div>
  )
}
