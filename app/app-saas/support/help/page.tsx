'use client'

import { useState } from 'react'
import { 
  Search, 
  BookOpen, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronRight,
  FileText,
  Video,
  Download,
  Star
} from 'lucide-react'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Toutes les catégories', count: 45 },
    { id: 'getting-started', name: 'Premiers pas', count: 12 },
    { id: 'fleet', name: 'Gestion de flotte', count: 8 },
    { id: 'tracking', name: 'Suivi et tracking', count: 6 },
    { id: 'payments', name: 'Paiements', count: 5 },
    { id: 'technical', name: 'Support technique', count: 10 },
    { id: 'billing', name: 'Facturation', count: 4 }
  ]

  const articles = [
    {
      id: 1,
      title: 'Comment ajouter un nouveau camion ?',
      category: 'fleet',
      description: 'Guide complet pour ajouter un nouveau véhicule à votre flotte',
      readTime: '5 min',
      difficulty: 'Facile',
      views: 1250,
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      title: 'Configuration du tracking GPS',
      category: 'tracking',
      description: 'Paramétrer le suivi en temps réel de vos véhicules',
      readTime: '8 min',
      difficulty: 'Moyen',
      views: 980,
      rating: 4.6,
      featured: true
    },
    {
      id: 3,
      title: 'Gestion des paiements et factures',
      category: 'payments',
      description: 'Comment gérer vos paiements et générer des factures',
      readTime: '6 min',
      difficulty: 'Facile',
      views: 750,
      rating: 4.7,
      featured: false
    },
    {
      id: 4,
      title: 'Première connexion à la plateforme',
      category: 'getting-started',
      description: 'Guide de démarrage pour nouveaux utilisateurs',
      readTime: '3 min',
      difficulty: 'Facile',
      views: 2100,
      rating: 4.9,
      featured: true
    },
    {
      id: 5,
      title: 'Résolution des problèmes de connexion',
      category: 'technical',
      description: 'Solutions aux problèmes de connexion courants',
      readTime: '4 min',
      difficulty: 'Moyen',
      views: 650,
      rating: 4.4,
      featured: false
    },
    {
      id: 6,
      title: 'Configuration des notifications',
      category: 'getting-started',
      description: 'Personnaliser vos notifications par email et SMS',
      readTime: '3 min',
      difficulty: 'Facile',
      views: 890,
      rating: 4.5,
      featured: false
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-100 text-green-700'
      case 'Moyen': return 'bg-yellow-100 text-yellow-700'
      case 'Difficile': return 'bg-blue-100 text-trust'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Centre d'aide</h1>
        <p className="text-gray-600">Trouvez rapidement les réponses à vos questions</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher dans la base de connaissances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent"
              />
            </div>
          </div>
          <div className="lg:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-black">Chat en direct</h3>
              <p className="text-sm text-gray-600">Obtenez une aide immédiate</p>
            </div>
          </div>
          <button className="btn-primary w-full py-2 px-4 rounded-lg">
            Démarrer le chat
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-trust rounded-lg flex items-center justify-center mr-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-black">Appeler le support</h3>
              <p className="text-sm text-gray-600">+237 6XX XX XX XX</p>
            </div>
          </div>
          <button className="btn-primary w-full py-2 px-4 rounded-lg">
            Appeler maintenant
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-black">Envoyer un email</h3>
              <p className="text-sm text-gray-600">support@translink-pro.cm</p>
            </div>
          </div>
          <button className="btn-primary w-full py-2 px-4 rounded-lg">
            Envoyer un email
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-black mb-4">Catégories populaires</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.slice(1).map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border text-center transition-colors ${
                selectedCategory === category.id
                  ? 'border-trust bg-blue-50 text-trust'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium">{category.name}</div>
              <div className="text-xs text-gray-500 mt-1">{category.count} articles</div>
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-black">
            Articles ({filteredArticles.length})
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Trier par:</span>
            <select className="px-3 py-1 border border-gray-300 rounded text-sm bg-white text-gray-700">
              <option>Pertinence</option>
              <option>Plus récents</option>
              <option>Plus vus</option>
              <option>Mieux notés</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredArticles.map(article => (
            <div key={article.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {article.featured && (
                      <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded mr-2">
                        <Star className="w-3 h-3 inline mr-1" />
                        Recommandé
                      </span>
                    )}
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(article.difficulty)}`}>
                      {article.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-black mb-2 hover:text-trust cursor-pointer">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-3">{article.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {article.views} vues
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      {article.rating}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article trouvé</h3>
          <p className="text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
          <button 
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  )
}
