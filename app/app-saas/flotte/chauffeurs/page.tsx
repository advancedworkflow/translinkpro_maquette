'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  User, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  UserCheck,
  AlertTriangle
} from 'lucide-react'

interface Chauffeur {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  adresse: string
  dateEmbauche: string
  statut: 'actif' | 'inactif' | 'en_conge'
  note: number
  nombreTrajets: number
  permis: string
  experience: string
  vehiculeAttribue?: string
  photo?: string
}

const chauffeursData: Chauffeur[] = [
  {
    id: '1',
    nom: 'Martin',
    prenom: 'Pierre',
    email: 'p.martin@translink.com',
    telephone: '+237 6 12 34 56 78',
    adresse: '123 Rue de la Paix, Douala, Cameroun',
    dateEmbauche: '2023-01-15',
    statut: 'actif',
    note: 4.8,
    nombreTrajets: 156,
    permis: 'C+E',
    experience: '5 ans',
    vehiculeAttribue: 'Camion-001',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
  },
  {
    id: '2',
    nom: 'Dubois',
    prenom: 'Marie',
    email: 'm.dubois@translink.com',
    telephone: '+237 6 23 45 67 89',
    adresse: '456 Avenue des Champs, Yaoundé, Cameroun',
    dateEmbauche: '2022-08-20',
    statut: 'actif',
    note: 4.9,
    nombreTrajets: 203,
    permis: 'C+E',
    experience: '7 ans',
    vehiculeAttribue: 'Camion-002',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
  },
  {
    id: '3',
    nom: 'Leroy',
    prenom: 'Jean',
    email: 'j.leroy@translink.com',
    telephone: '+237 6 34 56 78 90',
    adresse: '789 Boulevard de la République, Bafoussam, Cameroun',
    dateEmbauche: '2023-03-10',
    statut: 'en_conge',
    note: 4.6,
    nombreTrajets: 89,
    permis: 'C+E',
    experience: '3 ans',
    vehiculeAttribue: 'Camion-003',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
  },
  {
    id: '4',
    nom: 'Moreau',
    prenom: 'Sophie',
    email: 's.moreau@translink.com',
    telephone: '+237 6 45 67 89 01',
    adresse: '321 Rue de la Liberté, Garoua, Cameroun',
    dateEmbauche: '2021-11-05',
    statut: 'inactif',
    note: 4.7,
    nombreTrajets: 134,
    permis: 'C+E',
    experience: '8 ans',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
  }
]

export default function ChauffeursPage() {
  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>(chauffeursData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('tous')
  const [selectedChauffeur, setSelectedChauffeur] = useState<Chauffeur | null>(null)
  const [showModal, setShowModal] = useState(false)

  const stats = [
    {
      icon: UserCheck,
      label: 'Chauffeurs actifs',
      value: '24',
      change: '+3 ce mois',
      changeColor: 'text-green-600'
    },
    {
      icon: Clock,
      label: 'En congé',
      value: '2',
      change: '1 retour prévu',
      changeColor: 'text-yellow-600'
    },
    {
      icon: Star,
      label: 'Note moyenne',
      value: '4.7',
      change: '+0.2 vs mois dernier',
      changeColor: 'text-green-600'
    },
    {
      icon: AlertTriangle,
      label: 'À former',
      value: '3',
      change: 'Formation sécurité',
      changeColor: 'text-red-600'
    }
  ]

  const filteredChauffeurs = chauffeurs.filter(chauffeur => {
    const matchesSearch = 
      chauffeur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chauffeur.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chauffeur.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'tous' || chauffeur.statut === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'actif':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'inactif':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'en_conge':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'actif':
        return 'bg-green-100 text-green-800'
      case 'inactif':
        return 'bg-red-100 text-red-800'
      case 'en_conge':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleViewChauffeur = (chauffeur: Chauffeur) => {
    setSelectedChauffeur(chauffeur)
    setShowModal(true)
  }

  const handleDeleteChauffeur = (id: string) => {
    setChauffeurs(chauffeurs.filter(chauffeur => chauffeur.id !== id))
  }

  return (
    <div className="p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="kpi-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="kpi-label">{stat.label}</div>
                <div className="kpi-value text-trust">{stat.value}</div>
                <div className={`text-xs ${stat.changeColor} mt-1`}>{stat.change}</div>
              </div>
              <div className="icon-trust p-3 rounded-lg">
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-3">
          <button className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau chauffeur
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chauffeurs List */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-light text-gray-900">Chauffeurs ({filteredChauffeurs.length})</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm bg-white"
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                  <option value="en_conge">En congé</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredChauffeurs.map((chauffeur) => (
                <div 
                  key={chauffeur.id}
                  className="p-4 rounded-lg border cursor-pointer transition-all border-gray-200 hover:border-gray-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {chauffeur.photo ? (
                        <img
                          src={chauffeur.photo}
                          alt={`${chauffeur.prenom} ${chauffeur.nom}`}
                          className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {chauffeur.prenom} {chauffeur.nom}
                        </h3>
                        <p className="text-xs text-gray-500">{chauffeur.permis} • {chauffeur.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${getStatusColor(chauffeur.statut)} px-2 py-1 rounded`}>
                        {chauffeur.statut.replace('_', ' ')}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                    <div className="flex items-center">
                      <Mail className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">Email:</span>
                      <span className="text-gray-900 ml-1">{chauffeur.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">Téléphone:</span>
                      <span className="text-gray-900 ml-1">{chauffeur.telephone}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">Note:</span>
                      <span className="text-gray-900 ml-1">{chauffeur.note}/5</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-2 text-gray-500" />
                      <span className="text-gray-600">Trajets:</span>
                      <span className="text-gray-900 ml-1">{chauffeur.nombreTrajets}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs">
                      <span className="text-gray-600">Véhicule attribué:</span>
                      <span className="text-gray-900 ml-1">{chauffeur.vehiculeAttribue || 'Non attribué'}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewChauffeur(chauffeur)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteChauffeur(chauffeur.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Chauffeur Details */}
        <div>
          {selectedChauffeur ? (
            <div className="bg-white border border-gray-200 rounded p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {selectedChauffeur.photo ? (
                    <img
                      src={selectedChauffeur.photo}
                      alt={`${selectedChauffeur.prenom} ${selectedChauffeur.nom}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">#{selectedChauffeur.id}</h3>
                    <p className="text-sm text-gray-600">{selectedChauffeur.prenom} {selectedChauffeur.nom}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Basic Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Informations générales</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nom:</span>
                      <span className="text-gray-900">{selectedChauffeur.prenom} {selectedChauffeur.nom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="text-gray-900">{selectedChauffeur.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Téléphone:</span>
                      <span className="text-gray-900">{selectedChauffeur.telephone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Statut:</span>
                      <span className={`text-xs ${getStatusColor(selectedChauffeur.statut)} px-2 py-1 rounded`}>
                        {selectedChauffeur.statut.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Professional Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Informations professionnelles</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Permis:</span>
                      <span className="text-gray-900">{selectedChauffeur.permis}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Expérience:</span>
                      <span className="text-gray-900">{selectedChauffeur.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Note:</span>
                      <span className="text-gray-900 flex items-center">
                        <Star className="w-3 h-3 mr-1 text-yellow-400" />
                        {selectedChauffeur.note}/5
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Trajets:</span>
                      <span className="text-gray-900">{selectedChauffeur.nombreTrajets}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2 pt-4">
                  <Link 
                    href={`/app-saas/flotte/chauffeurs/${selectedChauffeur.id}`}
                    className="flex-1 bg-trust text-white px-3 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Voir détails
                  </Link>
                  <button className="flex-1 bg-gray-800 text-white px-3 py-2 rounded text-sm hover:bg-gray-900 transition-colors flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded p-6">
              <div className="text-center text-gray-500">
                <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Sélectionnez un chauffeur pour voir les détails</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de détails du chauffeur */}
      {showModal && selectedChauffeur && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-medium text-gray-900">Détails du chauffeur</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                  <p className="text-sm text-gray-900">
                    {selectedChauffeur.prenom} {selectedChauffeur.nom}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <p className="text-sm text-gray-900 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {selectedChauffeur.email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <p className="text-sm text-gray-900 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {selectedChauffeur.telephone}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <div className="flex items-center">
                    {getStatusIcon(selectedChauffeur.statut)}
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedChauffeur.statut)}`}>
                      {selectedChauffeur.statut.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <p className="text-sm text-gray-900 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedChauffeur.adresse}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date d'embauche</label>
                  <p className="text-sm text-gray-900 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(selectedChauffeur.dateEmbauche).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                  <p className="text-sm text-gray-900 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-400" />
                    {selectedChauffeur.note}/5
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de trajets</label>
                  <p className="text-sm text-gray-900">{selectedChauffeur.nombreTrajets}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permis</label>
                  <p className="text-sm text-gray-900">{selectedChauffeur.permis}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expérience</label>
                  <p className="text-sm text-gray-900">{selectedChauffeur.experience}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Véhicule attribué</label>
                  <p className="text-sm text-gray-900">
                    {selectedChauffeur.vehiculeAttribue || 'Non attribué'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-500">
                ID: {selectedChauffeur.id}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 bg-white"
                >
                  Fermer
                </button>
                <button className="bg-gray-800 text-white px-6 py-2 rounded text-sm hover:bg-gray-900">
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
