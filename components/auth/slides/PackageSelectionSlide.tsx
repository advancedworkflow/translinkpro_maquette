'use client'

import { useState } from 'react'
import { Check, Truck, Star, Building, Globe, Zap } from 'lucide-react'

interface PackageSelectionSlideProps {
  formData: any
  onUpdate: (data: any) => void
}

const packages = [
  {
    id: 'starter',
    name: 'Pack Starter',
    description: 'Pour indépendants & petites flottes (1 à 5 camions)',
    price: '10 000',
    period: 'XAF / camion / mois',
    icon: Truck,
    color: 'bg-green-50 border-green-200 text-green-700',
    features: [
      'Accès complet à la plateforme',
      'Gestion des demandes de transport (illimitées)',
      'Suivi GPS temps réel (1 tracker par camion inclus)',
      'Notifications (SMS + in-app)',
      'Historique des courses (90 jours)',
      'Assistance de base (email/chatbot)'
    ],
    recommended: false
  },
  {
    id: 'pro',
    name: 'Pack Pro',
    description: 'Pour transporteurs moyens (6 à 20 camions)',
    price: '8 500',
    period: 'XAF / camion / mois',
    icon: Star,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    features: [
      'Tout du Pack Starter',
      'Dashboard comptabilité & facturation (revenus, dépenses, marges)',
      'Historique étendu (1 an)',
      'Maintenance & rappels automatiques',
      'API partenaires (assurances, garages)',
      'Support prioritaire (email + téléphone)'
    ],
    recommended: true
  },
  {
    id: 'entreprise',
    name: 'Pack Entreprise',
    description: 'Pour grandes flottes (21 à 100 camions)',
    price: '7 000',
    period: 'XAF / camion / mois',
    icon: Building,
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    features: [
      'Tout du Pack Pro',
      'Analytics avancés (optimisation trajets, réduction km à vide, rentabilité)',
      'Gestion multi-dépôts (Douala, Yaoundé, etc.)',
      'Accès Marketplace premium (assurances, pièces détachées, garages agréés)',
      'Export comptabilité (Excel, PDF, API ERP)',
      'Historique illimité',
      'Gestion multi-comptes (administrateurs + chauffeurs)',
      'Support dédié'
    ],
    recommended: false
  },
  {
    id: 'elite',
    name: 'Pack Elite',
    description: '+100 camions ou corridors internationaux',
    price: '5 000',
    period: 'XAF / camion / mois (dégressif)',
    icon: Globe,
    color: 'bg-red-50 border-red-200 text-red-700',
    features: [
      'Tout du Pack Entreprise',
      'SLA 99,9% (support 24/7 + manager de compte dédié)',
      'Intégration sur mesure (ERP, systèmes existants)',
      'Suivi réglementaire (douanes, corridors internationaux)',
      'API ouverte pour connexions partenaires',
      'Rapports réglementaires pour syndicats/autorités'
    ],
    recommended: false
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
    id: 'formation',
    name: 'Formation chauffeurs',
    description: 'Sécurité & éco-conduite - pack 25 000 XAF / chauffeur',
    icon: Zap
  }
]

export default function PackageSelectionSlide({ formData, onUpdate }: PackageSelectionSlideProps) {
  const [selectedPackage, setSelectedPackage] = useState(formData.selectedPackage || '')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(formData.selectedAddOns || [])
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
    onUpdate({ selectedPackage: packageId })
  }

  const handleAddOnToggle = (addOnId: string) => {
    const newAddOns = selectedAddOns.includes(addOnId)
      ? selectedAddOns.filter(id => id !== addOnId)
      : [...selectedAddOns, addOnId]
    
    setSelectedAddOns(newAddOns)
    onUpdate({ selectedAddOns: newAddOns })
  }

  const handleBillingChange = (period: 'monthly' | 'yearly') => {
    setBillingPeriod(period)
    onUpdate({ billingPeriod: period })
  }

  const getDiscount = () => {
    return billingPeriod === 'yearly' ? 15 : 0
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="text-center">
        <h3 className="text-2xl font-light text-gray-900 mb-2">
          Choisissez votre plan d'abonnement
        </h3>
        <p className="text-gray-600">
          Tarifs en XAF par camion par mois - Possibilité de payer annuellement avec remise (-15%)
        </p>
      </div>

      {/* Période de facturation */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => handleBillingChange('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => handleBillingChange('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annuel (-15%)
          </button>
        </div>
      </div>

      {/* Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => {
          const Icon = pkg.icon
          const isSelected = selectedPackage === pkg.id
          const discount = getDiscount()
          const finalPrice = Math.round(parseInt(pkg.price.replace(/\s/g, '')) * (1 - discount / 100))
          
          return (
            <div
              key={pkg.id}
              className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-trust bg-red-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              } ${pkg.recommended ? 'ring-2 ring-trust ring-opacity-50' : ''}`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {pkg.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-trust text-white px-3 py-1 rounded-full text-xs font-medium">
                    Recommandé
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${pkg.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{pkg.name}</h4>
                    <p className="text-sm text-gray-600">{pkg.description}</p>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-trust rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {finalPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-600">{pkg.period}</span>
                </div>
                {discount > 0 && (
                  <div className="text-sm text-green-600 mt-1">
                    Économisez {discount}% avec le paiement annuel
                  </div>
                )}
              </div>

              <ul className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Options supplémentaires */}
      <div className="border-t border-gray-200 pt-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Options supplémentaires (Add-ons)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addOns.map((addOn) => {
            const Icon = addOn.icon
            const isSelected = selectedAddOns.includes(addOn.id)
            
            return (
              <div
                key={addOn.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-trust bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleAddOnToggle(addOn.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{addOn.name}</h5>
                      <p className="text-sm text-gray-600">{addOn.description}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 bg-trust rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Exemples de simulation */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Exemples de simulation
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded-lg p-4">
            <div className="font-medium text-gray-900">Transporteur avec 3 camions (Starter)</div>
            <div className="text-gray-600">3 × 10 000 = 30 000 XAF / mois</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="font-medium text-gray-900">Transporteur avec 15 camions (Pro)</div>
            <div className="text-gray-600">15 × 8 500 = 127 500 XAF / mois</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="font-medium text-gray-900">Grande flotte 70 camions (Entreprise)</div>
            <div className="text-gray-600">70 × 7 000 = 490 000 XAF / mois</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="font-medium text-gray-900">Groupe régional 120 camions (Elite)</div>
            <div className="text-gray-600">120 × 5 000 = 600 000 XAF / mois</div>
          </div>
        </div>
      </div>
    </div>
  )
}
