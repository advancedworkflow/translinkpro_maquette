'use client'

import { useState } from 'react'
import { Building, MapPin, Clock, Globe, Shield, Wrench, Package, Droplets } from 'lucide-react'

interface PrestataireRegistrationSlideProps {
  formData: any
  onUpdate: (data: any) => void
}

export default function PrestataireRegistrationSlide({ formData, onUpdate }: PrestataireRegistrationSlideProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(formData.services || [])

  const categories = [
    {
      value: 'assurance',
      label: 'Assurance',
      icon: Shield,
      description: 'Assurance auto, flotte, marchandises',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      value: 'garage',
      label: 'Garage',
      icon: Wrench,
      description: 'Réparations, entretien, mécanique',
      color: 'bg-orange-50 border-orange-200 text-orange-700'
    },
    {
      value: 'concessionnaire',
      label: 'Concessionnaire',
      icon: Building,
      description: 'Vente de véhicules neufs et d\'occasion',
      color: 'bg-purple-50 border-purple-200 text-purple-700'
    },
    {
      value: 'pieces_detachees',
      label: 'Pièces détachées',
      icon: Package,
      description: 'Vente de pièces et accessoires',
      color: 'bg-red-50 border-red-200 text-red-700'
    },
    {
      value: 'lubrifiants',
      label: 'Lubrifiants',
      icon: Droplets,
      description: 'Huiles, graisses, fluides',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700'
    }
  ]

  const servicesOptions = {
    assurance: [
      'Assurance auto',
      'Assurance flotte',
      'Assurance marchandises',
      'Assurance responsabilité civile',
      'Assurance tous risques'
    ],
    garage: [
      'Mécanique générale',
      'Carrosserie',
      'Entretien préventif',
      'Réparation moteur',
      'Réparation transmission',
      'Service pneus',
      'Service climatisation'
    ],
    concessionnaire: [
      'Vente véhicules neufs',
      'Vente véhicules d\'occasion',
      'Financement',
      'Garantie étendue',
      'Service après-vente'
    ],
    pieces_detachees: [
      'Pièces moteur',
      'Pièces carrosserie',
      'Pièces électriques',
      'Accessoires',
      'Pneus et jantes',
      'Filtres et huiles'
    ],
    lubrifiants: [
      'Huiles moteur',
      'Huiles hydrauliques',
      'Graisses',
      'Liquides de refroidissement',
      'Additifs'
    ]
  }

  const handleChange = (field: string, value: any) => {
    onUpdate({ [field]: value })
  }

  const handleServiceToggle = (service: string) => {
    const newSelection = selectedServices.includes(service)
      ? selectedServices.filter(s => s !== service)
      : [...selectedServices, service]
    
    setSelectedServices(newSelection)
    onUpdate({ services: newSelection })
  }

  const getAvailableServices = () => {
    return servicesOptions[formData.categorie as keyof typeof servicesOptions] || []
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Configuration du profil prestataire
        </h3>
        <p className="text-sm text-gray-600">
          Renseignez les informations de votre entreprise de services
        </p>
      </div>

      {/* Informations générales */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-trust" />
          Informations générales
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
              Adresse *
            </label>
            <input
              type="text"
              value={formData.adresse || ''}
              onChange={(e) => handleChange('adresse', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="Adresse complète"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site web (facultatif)
            </label>
            <input
              type="url"
              value={formData.siteWeb || ''}
              onChange={(e) => handleChange('siteWeb', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="https://www.votre-site.com"
            />
          </div>
        </div>
      </div>

      {/* Horaires d'ouverture */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-trust" />
          Horaires d'ouverture
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horaires d'ouverture *
            </label>
            <input
              type="text"
              value={formData.horairesOuverture || ''}
              onChange={(e) => handleChange('horairesOuverture', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
              placeholder="Lun-Ven: 8h-18h, Sam: 8h-12h"
              required
            />
          </div>
        </div>
      </div>

      {/* Catégorie de prestataire */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-trust" />
          Catégorie de prestataire
        </h4>
        
        <p className="text-sm text-gray-600 mb-4">
          Sélectionnez la catégorie qui correspond le mieux à votre activité
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <label
              key={category.value}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.categorie === category.value
                  ? 'border-trust bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="categorie"
                value={category.value}
                checked={formData.categorie === category.value}
                onChange={(e) => handleChange('categorie', e.target.value)}
                className="h-4 w-4 text-trust focus:ring-trust border-gray-300"
              />
              <div className="ml-3 flex items-center">
                <category.icon className="w-6 h-6 mr-3 text-gray-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{category.label}</div>
                  <div className="text-sm text-gray-500">{category.description}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Services proposés */}
      {formData.categorie && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2 text-trust" />
            Services proposés
          </h4>
          
          <p className="text-sm text-gray-600 mb-4">
            Sélectionnez les services que vous proposez
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getAvailableServices().map((service) => (
              <label
                key={service}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedServices.includes(service)
                    ? 'border-trust bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">{service}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Informations spécifiques par catégorie */}
      {formData.categorie === 'assurance' && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-trust" />
            Informations assurance
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Types de contrats vendus
              </label>
              <textarea
                value={formData.typesContrats || ''}
                onChange={(e) => handleChange('typesContrats', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
                placeholder="Auto, flotte, marchandises, RC..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durée et tarifs des contrats
              </label>
              <textarea
                value={formData.dureeTarifs || ''}
                onChange={(e) => handleChange('dureeTarifs', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
                placeholder="1 an, 2 ans, tarifs selon véhicule..."
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      {formData.categorie === 'pieces_detachees' && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2 text-trust" />
            Informations pièces détachées
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marques compatibles
              </label>
              <input
                type="text"
                value={formData.marquesCompatibles || ''}
                onChange={(e) => handleChange('marquesCompatibles', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
                placeholder="Toyota, Ford, Mercedes, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conditions de garantie
              </label>
              <input
                type="text"
                value={formData.conditionsGarantie || ''}
                onChange={(e) => handleChange('conditionsGarantie', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
                placeholder="6 mois, 1 an, selon pièce..."
              />
            </div>
          </div>
        </div>
      )}

      {formData.categorie === 'garage' && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <Wrench className="w-5 h-5 mr-2 text-trust" />
            Informations garage
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Types de réparations proposées
              </label>
              <textarea
                value={formData.typesReparations || ''}
                onChange={(e) => handleChange('typesReparations', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
                placeholder="Mécanique, carrosserie, électronique..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services spécifiques
              </label>
              <textarea
                value={formData.servicesSpecifiques || ''}
                onChange={(e) => handleChange('servicesSpecifiques', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust focus:border-transparent"
                placeholder="Entretien préventif, diagnostic..."
                rows={3}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
