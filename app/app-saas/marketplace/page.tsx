'use client'

import { useState } from 'react'
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Heart, 
  Star, 
  Shield, 
  Wrench, 
  Car, 
  Truck, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail,
  Eye,
  Plus,
  X,
  ChevronDown,
  CheckCircle,
  Clock,
  Award,
  Users,
  TrendingUp
} from 'lucide-react'

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOffer, setSelectedOffer] = useState<any>(null)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: 'all', name: 'Toutes les offres', icon: ShoppingCart },
    { id: 'insurance', name: 'Assurances', icon: Shield },
    { id: 'parts', name: 'Pièces détachées', icon: Wrench },
    { id: 'tires', name: 'Pneus & Roues', icon: Car },
    { id: 'engine', name: 'Moteur & Transmission', icon: Truck },
    { id: 'maintenance', name: 'Maintenance', icon: Wrench }
  ]

  const insuranceOffers = [
    {
      id: 'INS001',
      title: 'Assurance Flotte Complète',
      provider: 'AXA Cameroun',
      category: 'insurance',
      price: '450,000',
      currency: 'XAF',
      period: '/mois',
      rating: 4.8,
      reviews: 124,
      description: 'Couverture complète pour votre flotte de camions avec assistance 24h/7j',
      features: [
        'Couverture tous risques',
        'Assistance panne 24h/7j',
        'Remorquage gratuit',
        'Véhicule de remplacement',
        'Couverture conducteur'
      ],
      location: 'Douala, Cameroun',
      contact: '+237 6 77 12 34 56',
      email: 'contact@axa-cm.com',
      validity: '12 mois',
      coverage: 'Tous véhicules < 3.5T',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop'
    },
    {
      id: 'INS002',
      title: 'Assurance Transport de Marchandises',
      provider: 'Allianz Cameroun',
      category: 'insurance',
      price: '320,000',
      currency: 'XAF',
      period: '/mois',
      rating: 4.6,
      reviews: 89,
      description: 'Protection spécialisée pour le transport de marchandises',
      features: [
        'Couverture marchandises',
        'Responsabilité civile',
        'Perte d\'exploitation',
        'Frais de dédouanement',
        'Transit international'
      ],
      location: 'Yaoundé, Cameroun',
      contact: '+237 6 99 88 77 66',
      email: 'transport@allianz-cm.com',
      validity: '12 mois',
      coverage: 'Marchandises jusqu\'à 50M XAF',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
    },
    {
      id: 'INS003',
      title: 'Assurance Responsabilité Civile',
      provider: 'NSIA Cameroun',
      category: 'insurance',
      price: '180,000',
      currency: 'XAF',
      period: '/mois',
      rating: 4.4,
      reviews: 67,
      description: 'Couverture responsabilité civile pour transporteurs',
      features: [
        'RC Transport',
        'RC Exploitation',
        'Défense et recours',
        'Frais de justice',
        'Dommages corporels'
      ],
      location: 'Bafoussam, Cameroun',
      contact: '+237 6 55 44 33 22',
      email: 'rc@nsia-cm.com',
      validity: '12 mois',
      coverage: 'Garantie 100M XAF',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop'
    }
  ]

  const partsOffers = [
    {
      id: 'PAR001',
      title: 'Pneus Michelin XDE2+ 295/80R22.5',
      provider: 'Pneus Pro Cameroun',
      category: 'tires',
      price: '85,000',
      currency: 'XAF',
      period: '/unité',
      rating: 4.7,
      reviews: 156,
      description: 'Pneus haute performance pour camions longue distance',
      features: [
        'Résistance à l\'usure',
        'Économie de carburant',
        'Grip optimal',
        'Garantie 2 ans',
        'Installation gratuite'
      ],
      location: 'Douala, Cameroun',
      contact: '+237 6 77 99 88 77',
      email: 'vente@pneuspro-cm.com',
      stock: 'En stock (24 unités)',
      brand: 'Michelin',
      size: '295/80R22.5',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      id: 'PAR002',
      title: 'Moteur Mercedes OM 501 LA',
      provider: 'Moteurs Diesel Pro',
      category: 'engine',
      price: '2,500,000',
      currency: 'XAF',
      period: '/unité',
      rating: 4.9,
      reviews: 23,
      description: 'Moteur diesel reconditionné pour Mercedes Actros',
      features: [
        'Moteur reconditionné',
        'Garantie 1 an',
        'Installation incluse',
        'Pièces d\'origine',
        'Test de fonctionnement'
      ],
      location: 'Yaoundé, Cameroun',
      contact: '+237 6 99 55 44 33',
      email: 'moteurs@dieselpro-cm.com',
      stock: 'En stock (3 unités)',
      brand: 'Mercedes',
      model: 'OM 501 LA',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop'
    },
    {
      id: 'PAR003',
      title: 'Kit de Freinage Complet',
      provider: 'Freins Express',
      category: 'parts',
      price: '180,000',
      currency: 'XAF',
      period: '/kit',
      rating: 4.5,
      reviews: 78,
      description: 'Kit complet de freinage pour camions lourds',
      features: [
        'Plaquettes de frein',
        'Disques de frein',
        'Étriers complets',
        'Liquide de frein',
        'Installation gratuite'
      ],
      location: 'Bafoussam, Cameroun',
      contact: '+237 6 55 77 88 99',
      email: 'freins@express-cm.com',
      stock: 'En stock (12 kits)',
      brand: 'Brembo',
      compatibility: 'Mercedes, Volvo, Scania',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop'
    },
    {
      id: 'PAR004',
      title: 'Filtre à Huile Mann-Filter',
      provider: 'Filtres Auto Pro',
      category: 'parts',
      price: '12,500',
      currency: 'XAF',
      period: '/unité',
      rating: 4.3,
      reviews: 234,
      description: 'Filtre à huile haute qualité pour moteurs diesel',
      features: [
        'Filtration optimale',
        'Longue durée de vie',
        'Compatible multi-marques',
        'Garantie 6 mois',
        'Livraison gratuite'
      ],
      location: 'Douala, Cameroun',
      contact: '+237 6 77 44 55 66',
      email: 'filtres@autopro-cm.com',
      stock: 'En stock (150 unités)',
      brand: 'Mann-Filter',
      reference: 'HU 7008 z',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
    }
  ]

  const allOffers = [...insuranceOffers, ...partsOffers]

  const filteredOffers = allOffers.filter(offer => {
    const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory
    const matchesSearch = offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const openOfferModal = (offer: any) => {
    setSelectedOffer(offer)
    setShowOfferModal(true)
  }

  const closeOfferModal = () => {
    setSelectedOffer(null)
    setShowOfferModal(false)
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.icon : ShoppingCart
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : 'Autre'
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Marketplace</h1>
          <p className="text-sm text-gray-500 mt-1">Assurances, pièces détachées et services pour votre flotte</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center bg-white"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </button>
          <button className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Publier une offre
          </button>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher des offres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-trust text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total offres</p>
              <p className="text-2xl font-light text-gray-900">{allOffers.length}</p>
            </div>
            <div className="w-10 h-10 bg-trust rounded flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Assurances</p>
              <p className="text-2xl font-light text-gray-900">{insuranceOffers.length}</p>
            </div>
            <div className="w-10 h-10 bg-trust rounded flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pièces détachées</p>
              <p className="text-2xl font-light text-gray-900">{partsOffers.length}</p>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Fournisseurs</p>
              <p className="text-2xl font-light text-gray-900">12</p>
            </div>
            <div className="w-10 h-10 bg-purple-500 rounded flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => {
          const CategoryIcon = getCategoryIcon(offer.category)
          return (
            <div key={offer.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="h-48 bg-gray-100 relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-trust text-white px-2 py-1 rounded text-xs">
                    {getCategoryName(offer.category)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{offer.title}</h3>
                  <div className="flex items-center ml-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{offer.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-2">{offer.provider}</p>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{offer.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">{offer.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">{offer.reviews} avis</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-trust">{offer.price}</span>
                    <span className="text-sm text-gray-500 ml-1">{offer.currency}{offer.period}</span>
                  </div>
                  <button
                    onClick={() => openOfferModal(offer)}
                    className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Voir
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Offer Detail Modal */}
      {showOfferModal && selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-900">{selectedOffer.title}</h2>
              <button
                onClick={closeOfferModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image and Basic Info */}
                <div>
                  <div className="h-64 bg-gray-100 rounded-lg mb-4">
                    <img
                      src={selectedOffer.image}
                      alt={selectedOffer.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-trust">{selectedOffer.price}</span>
                      <span className="text-lg text-gray-500">{selectedOffer.currency}{selectedOffer.period}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-medium text-gray-900 ml-2">{selectedOffer.rating}</span>
                      <span className="text-sm text-gray-500 ml-2">({selectedOffer.reviews} avis)</span>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{selectedOffer.location}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Détails de l'offre</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                      <p className="text-sm text-gray-600">{selectedOffer.description}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Caractéristiques</h4>
                      <ul className="space-y-1">
                        {selectedOffer.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedOffer.validity && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Validité</h4>
                        <p className="text-sm text-gray-600">{selectedOffer.validity}</p>
                      </div>
                    )}

                    {selectedOffer.coverage && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Couverture</h4>
                        <p className="text-sm text-gray-600">{selectedOffer.coverage}</p>
                      </div>
                    )}

                    {selectedOffer.stock && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Stock</h4>
                        <p className="text-sm text-gray-600">{selectedOffer.stock}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{selectedOffer.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{selectedOffer.email}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-trust text-white px-6 py-3 rounded text-sm hover:bg-trust-dark transition-colors flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Contacter le vendeur
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors flex items-center bg-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Favoris
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
