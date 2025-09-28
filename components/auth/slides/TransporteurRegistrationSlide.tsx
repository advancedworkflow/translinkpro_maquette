'use client'

import { useState } from 'react'
import { Truck, Building, MapPin, Package, Users, FileText, Shield, Navigation } from 'lucide-react'

interface TransporteurRegistrationSlideProps {
  formData: any
  onUpdate: (data: any) => void
}

export default function TransporteurRegistrationSlide({ formData, onUpdate }: TransporteurRegistrationSlideProps) {
  const [selectedMarchandises, setSelectedMarchandises] = useState<string[]>(formData.typeMarchandises || [])
  const [selectedTypesCamions, setSelectedTypesCamions] = useState<string[]>(formData.capaciteOperationnelle?.typesCamions || [])
  const [selectedZonesCouverture, setSelectedZonesCouverture] = useState<string[]>(formData.capaciteOperationnelle?.zonesCouverture || [])

  const typesStructure = [
    { value: 'independant', label: 'Indépendant', description: 'Transporteur individuel' },
    { value: 'societe', label: 'Société', description: 'Entreprise de transport' },
    { value: 'cooperative', label: 'Coopérative', description: 'Groupement de transporteurs' }
  ]

  const marchandisesOptions = [
    'Containers',
    'Vrac',
    'Alimentaire',
    'BTP (Bâtiment et Travaux Publics)',
    'Produits chimiques',
    'Textiles',
    'Électronique',
    'Automobile',
    'Pharmaceutique',
    'Matières premières',
    'Produits finis',
    'Autres'
  ]

  const typesCamionsOptions = [
    'Semi-remorque',
    'Benne',
    'Plateau',
    'Fourgon',
    'Citerne',
    'Frigorifique',
    'Porte-conteneurs',
    'Grue',
    'Autres'
  ]

  const zonesCouvertureOptions = [
    'National',
    'CEMAC (Communauté Économique et Monétaire de l\'Afrique Centrale)',
    'International',
    'Régional',
    'Local'
  ]

  const plansAbonnement = [
    {
      value: 'starter',
      label: 'Starter',
      description: 'Parfait pour débuter',
      price: 'Gratuit',
      features: ['Jusqu\'à 5 véhicules', 'Suivi GPS basique', 'Support email']
    },
    {
      value: 'pro',
      label: 'Pro',
      description: 'Pour les transporteurs actifs',
      price: '29€/mois',
      features: ['Jusqu\'à 20 véhicules', 'Suivi GPS avancé', 'Support prioritaire', 'Analytics']
    },
    {
      value: 'entreprise',
      label: 'Entreprise',
      description: 'Pour les grandes flottes',
      price: '99€/mois',
      features: ['Véhicules illimités', 'Toutes les fonctionnalités', 'Support dédié', 'API']
    },
    {
      value: 'elite',
      label: 'Elite',
      description: 'Solution sur mesure',
      price: 'Sur devis',
      features: ['Personnalisation complète', 'Support 24/7', 'Formation', 'Intégrations']
    }
  ]

  const handleChange = (field: string, value: any) => {
    onUpdate({ [field]: value })
  }

  const handleCapaciteChange = (field: string, value: any) => {
    const capaciteOperationnelle = {
      ...formData.capaciteOperationnelle,
      [field]: value
    }
    onUpdate({ capaciteOperationnelle })
  }

  const handleEquipeChange = (field: string, value: any) => {
    const equipe = {
      ...formData.equipe,
      [field]: value
    }
    onUpdate({ equipe })
  }

  const handleDocumentsChange = (field: string, value: any) => {
    const documentsLegaux = {
      ...formData.documentsLegaux,
      [field]: value
    }
    onUpdate({ documentsLegaux })
  }

  const handleServicesChange = (field: string, value: any) => {
    const servicesAdditionnels = {
      ...formData.servicesAdditionnels,
      [field]: value
    }
    onUpdate({ servicesAdditionnels })
  }

  const handleMarchandiseToggle = (marchandise: string) => {
    const newSelection = selectedMarchandises.includes(marchandise)
      ? selectedMarchandises.filter(m => m !== marchandise)
      : [...selectedMarchandises, marchandise]
    
    setSelectedMarchandises(newSelection)
    onUpdate({ typeMarchandises: newSelection })
  }

  const handleTypeCamionToggle = (type: string) => {
    const newSelection = selectedTypesCamions.includes(type)
      ? selectedTypesCamions.filter(t => t !== type)
      : [...selectedTypesCamions, type]
    
    setSelectedTypesCamions(newSelection)
    handleCapaciteChange('typesCamions', newSelection)
  }

  const handleZoneToggle = (zone: string) => {
    const newSelection = selectedZonesCouverture.includes(zone)
      ? selectedZonesCouverture.filter(z => z !== zone)
      : [...selectedZonesCouverture, zone]
    
    setSelectedZonesCouverture(newSelection)
    handleCapaciteChange('zonesCouverture', newSelection)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Configuration du profil transporteur
        </h3>
        <p className="text-sm text-gray-600">
          Renseignez les informations de votre entreprise de transport
        </p>
      </div>

      {/* Profil général */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-trust" />
          Profil général
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'entreprise *
            </label>
            <input
              type="text"
              value={formData.nomEntreprise || ''}
              onChange={(e) => handleChange('nomEntreprise', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="Nom de votre entreprise"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              value={formData.telephone || ''}
              onChange={(e) => handleChange('telephone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="+237 6 12 34 56 78"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Siège social *
            </label>
            <input
              type="text"
              value={formData.siegeSocial || ''}
              onChange={(e) => handleChange('siegeSocial', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="Adresse du siège social"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Localisation principale *
            </label>
            <input
              type="text"
              value={formData.localisationPrincipale || ''}
              onChange={(e) => handleChange('localisationPrincipale', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="Ville principale d'activité"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              N° RCCM (si formel)
            </label>
            <input
              type="text"
              value={formData.rccm || ''}
              onChange={(e) => handleChange('rccm', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="Numéro RCCM"
            />
          </div>
        </div>
      </div>

      {/* Type de structure */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-trust" />
          Type de structure
        </h4>
        
        <div className="space-y-3">
          {typesStructure.map((type) => (
            <label
              key={type.value}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                formData.typeStructure === type.value
                  ? 'border-trust bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="typeStructure"
                value={type.value}
                checked={formData.typeStructure === type.value}
                onChange={(e) => handleChange('typeStructure', e.target.value)}
                className="h-4 w-4 text-trust focus:ring-trust border-gray-300"
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{type.label}</div>
                <div className="text-sm text-gray-500">{type.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Type de marchandises */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2 text-trust" />
          Type de marchandises transportées
        </h4>
        
        <p className="text-sm text-gray-600 mb-4">
          Sélectionnez les types de marchandises que vous transportez
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

      {/* Capacité opérationnelle */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Truck className="w-5 h-5 mr-2 text-trust" />
          Capacité opérationnelle
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de camions disponibles *
            </label>
            <input
              type="number"
              min="1"
              value={formData.capaciteOperationnelle?.nombreCamions || ''}
              onChange={(e) => handleCapaciteChange('nombreCamions', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="5"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kilométrage moyen annuel
            </label>
            <input
              type="number"
              min="0"
              value={formData.capaciteOperationnelle?.kilometrageMoyenAnnuel || ''}
              onChange={(e) => handleCapaciteChange('kilometrageMoyenAnnuel', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacité tonnage (tonnes)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={formData.capaciteOperationnelle?.capacite?.tonnage || ''}
              onChange={(e) => handleCapaciteChange('capacite', {
                ...formData.capaciteOperationnelle?.capacite,
                tonnage: parseFloat(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="25.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacité volume (m³)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={formData.capaciteOperationnelle?.capacite?.volume || ''}
              onChange={(e) => handleCapaciteChange('capacite', {
                ...formData.capaciteOperationnelle?.capacite,
                volume: parseFloat(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="80.0"
            />
          </div>
        </div>

        {/* Types de camions */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Types de camions
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {typesCamionsOptions.map((type) => (
              <label
                key={type}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedTypesCamions.includes(type)
                    ? 'border-trust bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedTypesCamions.includes(type)}
                  onChange={() => handleTypeCamionToggle(type)}
                  className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Zones de couverture */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Zones de couverture
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {zonesCouvertureOptions.map((zone) => (
              <label
                key={zone}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedZonesCouverture.includes(zone)
                    ? 'border-trust bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedZonesCouverture.includes(zone)}
                  onChange={() => handleZoneToggle(zone)}
                  className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">{zone}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Équipe */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-trust" />
          Équipe
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de conducteurs *
            </label>
            <input
              type="number"
              min="1"
              value={formData.equipe?.conducteurs || ''}
              onChange={(e) => handleEquipeChange('conducteurs', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assistants logistiques
            </label>
            <input
              type="number"
              min="0"
              value={formData.equipe?.assistantsLogistiques || ''}
              onChange={(e) => handleEquipeChange('assistantsLogistiques', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="2"
            />
          </div>
        </div>
      </div>

      {/* Documents légaux */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-trust" />
          Documents légaux
        </h4>
        
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.documentsLegaux?.assuranceVehicules || false}
              onChange={(e) => handleDocumentsChange('assuranceVehicules', e.target.checked)}
              className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900">Assurance véhicules</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.documentsLegaux?.controlesTechniques || false}
              onChange={(e) => handleDocumentsChange('controlesTechniques', e.target.checked)}
              className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900">Contrôles techniques</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.documentsLegaux?.autorisationsTransport || false}
              onChange={(e) => handleDocumentsChange('autorisationsTransport', e.target.checked)}
              className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900">Autorisations transport (si international)</span>
          </label>
        </div>
      </div>

      {/* Services additionnels */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Navigation className="w-5 h-5 mr-2 text-trust" />
          Services additionnels
        </h4>
        
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.servicesAdditionnels?.suiviGPS || false}
              onChange={(e) => handleServicesChange('suiviGPS', e.target.checked)}
              className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900">Suivi GPS existant ou besoin d'équipement</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.servicesAdditionnels?.assuranceCargaison || false}
              onChange={(e) => handleServicesChange('assuranceCargaison', e.target.checked)}
              className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900">Assurance cargaison incluse</span>
          </label>
        </div>
      </div>

      {/* Plan d'abonnement */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-trust" />
          Plan d'abonnement
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plansAbonnement.map((plan) => (
            <label
              key={plan.value}
              className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.planAbonnement === plan.value
                  ? 'border-trust bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="planAbonnement"
                value={plan.value}
                checked={formData.planAbonnement === plan.value}
                onChange={(e) => handleChange('planAbonnement', e.target.value)}
                className="h-4 w-4 text-trust focus:ring-trust border-gray-300 mt-1"
              />
              <div className="ml-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">{plan.label}</div>
                  <div className="text-sm font-bold text-trust">{plan.price}</div>
                </div>
                <div className="text-sm text-gray-500 mb-2">{plan.description}</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
