'use client'

import { useState } from 'react'
import { Check, Truck, Building, Globe, Star, Zap, ChevronLeft, ChevronRight } from 'lucide-react'

interface PackSelectionSlideProps {
  formData: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

interface Pack {
  id: string
  name: string
  description: string
  price: number
  priceUnit: string
  features: string[]
  icon: React.ComponentType<any>
  color: string
  popular?: boolean
  recommended?: boolean
}

const packs: Pack[] = [
  {
    id: 'starter',
    name: 'Pack Starter',
    description: 'Pour indépendants & petites flottes (1 à 5 camions)',
    price: 10000,
    priceUnit: 'XAF / camion / mois',
    features: [
      'Accès complet à la plateforme',
      'Gestion des demandes de transport (illimitées)',
      'Suivi GPS temps réel (1 tracker par camion inclus)',
      'Notifications (SMS + in-app)',
      'Historique des courses (90 jours)',
      'Assistance de base (email/chatbot)'
    ],
    icon: Truck,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    recommended: true
  },
  {
    id: 'pro',
    name: 'Pack Pro',
    description: 'Pour transporteurs moyens (6 à 20 camions)',
    price: 8500,
    priceUnit: 'XAF / camion / mois',
    features: [
      'Tout du Pack Starter',
      'Dashboard comptabilité & facturation',
      'Historique étendu (1 an)',
      'Maintenance & rappels automatiques',
      'API partenaires (assurances, garages)',
      'Support prioritaire (email + téléphone)'
    ],
    icon: Building,
    color: 'bg-green-50 border-green-200 text-green-700'
  },
  {
    id: 'entreprise',
    name: 'Pack Entreprise',
    description: 'Pour grandes flottes (21 à 100 camions)',
    price: 7000,
    priceUnit: 'XAF / camion / mois',
    features: [
      'Tout du Pack Pro',
      'Analytics avancés (optimisation trajets)',
      'Gestion multi-dépôts (Douala, Yaoundé, etc.)',
      'Accès Marketplace premium',
      'Export comptabilité (Excel, PDF, API ERP)',
      'Historique illimité',
      'Gestion multi-comptes',
      'Support dédié'
    ],
    icon: Globe,
    color: 'bg-purple-50 border-purple-200 text-purple-700'
  },
  {
    id: 'elite',
    name: 'Pack Elite',
    description: 'Pour +100 camions ou corridors internationaux',
    price: 5000,
    priceUnit: 'XAF / camion / mois (dégressif)',
    features: [
      'Tout du Pack Entreprise',
      'SLA 99,9% (support 24/7)',
      'Manager de compte dédié',
      'Intégration sur mesure (ERP)',
      'Suivi réglementaire (douanes)',
      'API ouverte pour connexions partenaires',
      'Rapports réglementaires'
    ],
    icon: Star,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    popular: true
  }
]

const addOns = [
  {
    id: 'gps-premium',
    name: 'GPS Premium Hardware',
    description: 'Achat 50 000 XAF / camion ou location 5 000 XAF / mois',
    icon: Zap
  },
  {
    id: 'assurance-cargaison',
    name: 'Assurance cargaison',
    description: 'Via partenaires - dès 15 000 XAF / mission',
    icon: Zap
  },
  {
    id: 'micro-credit',
    name: 'Micro-crédit carburant & entretien',
    description: 'Via fintech partenaire - frais 2-3%',
    icon: Zap
  },
  {
    id: 'formation-chauffeurs',
    name: 'Formation chauffeurs',
    description: 'Sécurité & éco-conduite - 25 000 XAF / chauffeur',
    icon: Zap
  }
]

export default function PackSelectionSlide({ formData, onUpdate, onNext, onPrev }: PackSelectionSlideProps) {
  const [selectedPack, setSelectedPack] = useState<string>(formData.selectedPack || '')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(formData.selectedAddOns || [])
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(formData.billingCycle || 'monthly')
  const [numberOfTrucks, setNumberOfTrucks] = useState<number>(formData.numberOfTrucks || 1)

  const handlePackSelect = (packId: string) => {
    setSelectedPack(packId)
    onUpdate({
      ...formData,
      selectedPack: packId,
      selectedAddOns,
      billingCycle,
      numberOfTrucks
    })
  }

  const handleAddOnToggle = (addOnId: string) => {
    const newAddOns = selectedAddOns.includes(addOnId)
      ? selectedAddOns.filter(id => id !== addOnId)
      : [...selectedAddOns, addOnId]
    
    setSelectedAddOns(newAddOns)
    onUpdate({
      ...formData,
      selectedPack,
      selectedAddOns: newAddOns,
      billingCycle,
      numberOfTrucks
    })
  }

  const handleBillingCycleChange = (cycle: 'monthly' | 'yearly') => {
    setBillingCycle(cycle)
    onUpdate({
      ...formData,
      selectedPack,
      selectedAddOns,
      billingCycle: cycle,
      numberOfTrucks
    })
  }

  const handleTruckCountChange = (count: number) => {
    setNumberOfTrucks(count)
    onUpdate({
      ...formData,
      selectedPack,
      selectedAddOns,
      billingCycle,
      numberOfTrucks: count
    })
  }

  const calculateTotal = () => {
    if (!selectedPack) return 0
    
    const pack = packs.find(p => p.id === selectedPack)
    if (!pack) return 0
    
    let basePrice = pack.price * numberOfTrucks
    
    // Remise annuelle de 15%
    if (billingCycle === 'yearly') {
      basePrice = basePrice * 12 * 0.85 // 15% de remise
    } else {
      basePrice = basePrice * 12 // Prix mensuel sur 12 mois
    }
    
    return basePrice
  }

  const canProceed = selectedPack && numberOfTrucks > 0

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choisissez votre pack d'abonnement</h2>
        <p className="text-gray-600">Sélectionnez le plan qui correspond le mieux à vos besoins</p>
      </div>

      {/* Cycle de facturation */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cycle de facturation</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => handleBillingCycleChange('monthly')}
            className={`px-6 py-3 rounded-lg border-2 transition-colors ${
              billingCycle === 'monthly'
                ? 'border-trust bg-trust text-white'
                : 'border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => handleBillingCycleChange('yearly')}
            className={`px-6 py-3 rounded-lg border-2 transition-colors ${
              billingCycle === 'yearly'
                ? 'border-trust bg-trust text-white'
                : 'border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            Annuel (-15% de remise)
          </button>
        </div>
      </div>

      {/* Nombre de camions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Nombre de camions</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleTruckCountChange(Math.max(1, numberOfTrucks - 1))}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            -
          </button>
          <span className="text-xl font-semibold min-w-[60px] text-center">{numberOfTrucks}</span>
          <button
            onClick={() => handleTruckCountChange(numberOfTrucks + 1)}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Packs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {packs.map((pack) => {
          const Icon = pack.icon
          const isSelected = selectedPack === pack.id
          const monthlyPrice = pack.price * numberOfTrucks
          const yearlyPrice = monthlyPrice * 12 * 0.85
          const displayPrice = billingCycle === 'yearly' ? yearlyPrice : monthlyPrice
          const priceUnit = billingCycle === 'yearly' ? 'XAF / an' : 'XAF / mois'

          return (
            <div
              key={pack.id}
              onClick={() => handlePackSelect(pack.id)}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-trust bg-trust/5 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Populaire
                  </span>
                </div>
              )}
              
              {pack.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-trust text-white px-3 py-1 rounded-full text-xs font-medium">
                    Recommandé
                  </span>
                </div>
              )}

              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${pack.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">{pack.name}</h3>
                  <p className="text-sm text-gray-600">{pack.description}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-gray-900">
                  {displayPrice.toLocaleString('fr-FR')} {priceUnit}
                </div>
                {billingCycle === 'yearly' && (
                  <div className="text-sm text-green-600">
                    Économisez {((monthlyPrice * 12) - yearlyPrice).toLocaleString('fr-FR')} XAF/an
                  </div>
                )}
              </div>

              <ul className="space-y-2 mb-4">
                {pack.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {isSelected && (
                <div className="flex items-center justify-center text-trust font-medium">
                  <Check className="w-5 h-5 mr-2" />
                  Sélectionné
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add-ons */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Options supplémentaires (Add-ons)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addOns.map((addOn) => {
            const Icon = addOn.icon
            const isSelected = selectedAddOns.includes(addOn.id)
            
            return (
              <div
                key={addOn.id}
                onClick={() => handleAddOnToggle(addOn.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-trust bg-trust/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-trust text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="font-medium text-gray-900">{addOn.name}</h4>
                    <p className="text-sm text-gray-600">{addOn.description}</p>
                  </div>
                  {isSelected && (
                    <Check className="w-5 h-5 text-trust" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Résumé des coûts */}
      {selectedPack && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé des coûts</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Pack sélectionné:</span>
              <span className="font-medium">{packs.find(p => p.id === selectedPack)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Nombre de camions:</span>
              <span className="font-medium">{numberOfTrucks}</span>
            </div>
            <div className="flex justify-between">
              <span>Cycle de facturation:</span>
              <span className="font-medium">{billingCycle === 'yearly' ? 'Annuel' : 'Mensuel'}</span>
            </div>
            {selectedAddOns.length > 0 && (
              <div className="flex justify-between">
                <span>Add-ons sélectionnés:</span>
                <span className="font-medium">{selectedAddOns.length}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold">
                <span>Total estimé:</span>
                <span className="text-trust">{calculateTotal().toLocaleString('fr-FR')} XAF</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Précédent
        </button>
        
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
            canProceed
              ? 'bg-trust text-white hover:bg-trust-dark'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continuer
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  )
}
