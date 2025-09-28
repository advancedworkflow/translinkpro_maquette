'use client'

import { useState } from 'react'
import { MapPin, Package, Clock, CreditCard, Building } from 'lucide-react'

interface ClientRegistrationSlideProps {
  formData: any
  onUpdate: (data: any) => void
}

export default function ClientRegistrationSlide({ formData, onUpdate }: ClientRegistrationSlideProps) {
  const [selectedMarchandises, setSelectedMarchandises] = useState<string[]>(formData.typeMarchandises || [])
  const [isEntreprise, setIsEntreprise] = useState(!!formData.raisonSociale)

  const marchandisesOptions = [
    'Alimentaire',
    'Matériaux de construction',
    'Containers',
    'Produits chimiques',
    'Textiles',
    'Électronique',
    'Automobile',
    'Pharmaceutique',
    'Autres'
  ]

  const frequenceOptions = [
    { value: 'occasionnel', label: 'Occasionnel', description: 'Quelques fois par mois' },
    { value: 'hebdomadaire', label: 'Hebdomadaire', description: 'Chaque semaine' },
    { value: 'quotidien', label: 'Quotidien', description: 'Tous les jours' }
  ]

  const paiementOptions = [
    { value: 'mobile_money', label: 'Mobile Money', description: 'Orange Money, MTN Mobile Money' },
    { value: 'carte', label: 'Carte bancaire', description: 'Visa, Mastercard' },
    { value: 'virement', label: 'Virement bancaire', description: 'Transfert bancaire' }
  ]

  const handleChange = (field: string, value: any) => {
    onUpdate({ [field]: value })
  }

  const handleMarchandiseToggle = (marchandise: string) => {
    const newSelection = selectedMarchandises.includes(marchandise)
      ? selectedMarchandises.filter(m => m !== marchandise)
      : [...selectedMarchandises, marchandise]
    
    setSelectedMarchandises(newSelection)
    onUpdate({ typeMarchandises: newSelection })
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Configuration du profil client
        </h3>
        <p className="text-sm text-gray-600">
          Renseignez vos informations pour personnaliser votre expérience
        </p>
      </div>

      {/* Informations de contact */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" style={{color: '#106ebe'}} />
          Informations de contact
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              value={formData.telephone || ''}
              onChange={(e) => handleChange('telephone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
              style={{'--tw-ring-color': '#106ebe'} as any}
              placeholder="+237 6 12 34 56 78"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ville *
            </label>
            <input
              type="text"
              value={formData.ville || ''}
              onChange={(e) => handleChange('ville', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
              style={{'--tw-ring-color': '#106ebe'} as any}
              placeholder="Douala"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pays *
            </label>
            <select
              value={formData.pays || ''}
              onChange={(e) => handleChange('pays', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
              style={{'--tw-ring-color': '#106ebe'} as any}
              required
            >
              <option value="">Sélectionnez un pays</option>
              <option value="Cameroun">Cameroun</option>
              <option value="Gabon">Gabon</option>
              <option value="Congo">Congo</option>
              <option value="Tchad">Tchad</option>
              <option value="RCA">République Centrafricaine</option>
              <option value="Guinée équatoriale">Guinée équatoriale</option>
            </select>
          </div>
        </div>
      </div>

      {/* Type de client */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-trust" />
          Type de client
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="particulier"
              name="clientType"
              checked={!isEntreprise}
              onChange={() => {
                setIsEntreprise(false)
                handleChange('raisonSociale', '')
              }}
              className="h-4 w-4 text-trust focus:ring-trust border-gray-300"
            />
            <label htmlFor="particulier" className="ml-2 block text-sm text-gray-900">
              Particulier
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="entreprise"
              name="clientType"
              checked={isEntreprise}
              onChange={() => setIsEntreprise(true)}
              className="h-4 w-4 text-trust focus:ring-trust border-gray-300"
            />
            <label htmlFor="entreprise" className="ml-2 block text-sm text-gray-900">
              Entreprise
            </label>
          </div>

          {isEntreprise && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raison sociale *
              </label>
              <input
                type="text"
                value={formData.raisonSociale || ''}
                onChange={(e) => handleChange('raisonSociale', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
                placeholder="Nom de votre entreprise"
                required
              />
            </div>
          )}
        </div>
      </div>

      {/* Type de marchandises */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2 text-trust" />
          Type de marchandises transportées
        </h4>
        
        <p className="text-sm text-gray-600 mb-4">
          Sélectionnez les types de marchandises que vous transportez régulièrement
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {marchandisesOptions.map((marchandise) => (
            <label
              key={marchandise}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                selectedMarchandises.includes(marchandise)
                  ? 'border-trust bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedMarchandises.includes(marchandise)}
                onChange={() => handleMarchandiseToggle(marchandise)}
                className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-900">{marchandise}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fréquence des besoins */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-trust" />
          Fréquence des besoins de transport
        </h4>
        
        <div className="space-y-3">
          {frequenceOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                formData.frequenceBesoins === option.value
                  ? 'border-trust bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="frequenceBesoins"
                value={option.value}
                checked={formData.frequenceBesoins === option.value}
                onChange={(e) => handleChange('frequenceBesoins', e.target.value)}
                className="h-4 w-4 text-trust focus:ring-trust border-gray-300"
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Mode de paiement préféré */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-trust" />
          Mode de paiement préféré
        </h4>
        
        <div className="space-y-3">
          {paiementOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                formData.modePaiementPrefere === option.value
                  ? 'border-trust bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="modePaiementPrefere"
                value={option.value}
                checked={formData.modePaiementPrefere === option.value}
                onChange={(e) => handleChange('modePaiementPrefere', e.target.value)}
                className="h-4 w-4 text-trust focus:ring-trust border-gray-300"
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
