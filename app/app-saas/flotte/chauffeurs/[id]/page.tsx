'use client'

import { useState } from 'react'
import { 
  ArrowLeft,
  User, 
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Camera,
  FileText,
  Award,
  TrendingUp,
  Car,
  Route,
  Fuel,
  Wrench
} from 'lucide-react'
import Link from 'next/link'

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
  dateNaissance: string
  nationalite: string
  salaire: number
  derniereFormation: string
  prochaineFormation: string
  permisExpiration: string
  assuranceExpiration: string
  derniereVisiteMedicale: string
  prochaineVisiteMedicale: string
}

const chauffeurData: Chauffeur = {
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
  permis: 'B, C, D',
  experience: '5 ans',
  vehiculeAttribue: 'T001 - Volvo FH',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  dateNaissance: '1985-03-15',
  nationalite: 'Camerounaise',
  salaire: 450000,
  derniereFormation: '2024-01-10',
  prochaineFormation: '2024-07-10',
  permisExpiration: '2025-12-31',
  assuranceExpiration: '2024-11-30',
  derniereVisiteMedicale: '2024-01-05',
  prochaineVisiteMedicale: '2025-01-05'
}

const trajetsRecents = [
  {
    id: 'T001',
    date: '2024-02-15',
    depart: 'Douala',
    arrivee: 'Yaoundé',
    distance: '250 km',
    duree: '3h 30min',
    statut: 'Terminé',
    note: 5
  },
  {
    id: 'T002',
    date: '2024-02-14',
    depart: 'Yaoundé',
    arrivee: 'Bafoussam',
    distance: '180 km',
    duree: '2h 45min',
    statut: 'Terminé',
    note: 4
  },
  {
    id: 'T003',
    date: '2024-02-13',
    depart: 'Bafoussam',
    arrivee: 'Douala',
    distance: '200 km',
    duree: '3h 15min',
    statut: 'Terminé',
    note: 5
  }
]

const documents = [
  {
    nom: 'Permis de conduire',
    type: 'Permis',
    expiration: '2025-12-31',
    statut: 'Valide',
    couleur: 'bg-green-100 text-green-700'
  },
  {
    nom: 'Assurance véhicule',
    type: 'Assurance',
    expiration: '2024-11-30',
    statut: 'Valide',
    couleur: 'bg-green-100 text-green-700'
  },
  {
    nom: 'Visite médicale',
    type: 'Médical',
    expiration: '2025-01-05',
    statut: 'Valide',
    couleur: 'bg-green-100 text-green-700'
  },
  {
    nom: 'Formation sécurité',
    type: 'Formation',
    expiration: '2024-07-10',
    statut: 'À renouveler',
    couleur: 'bg-yellow-100 text-yellow-700'
  }
]

export default function ChauffeurDetail() {
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'actif':
        return 'bg-green-100 text-green-700'
      case 'inactif':
        return 'bg-red-100 text-red-700'
      case 'en_conge':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'actif':
        return <CheckCircle className="w-4 h-4" />
      case 'inactif':
        return <XCircle className="w-4 h-4" />
      case 'en_conge':
        return <Clock className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: User },
    { id: 'trajets', label: 'Trajets', icon: Route },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'performance', label: 'Performance', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/app-saas/flotte/chauffeurs"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">
                {chauffeurData.prenom} {chauffeurData.nom}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </button>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-trust rounded-lg hover:bg-trust-dark transition-colors">
                <Camera className="w-4 h-4 mr-2" />
                Photo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start space-x-6">
            {/* Photo du chauffeur */}
            <div className="relative">
              <img
                src={chauffeurData.photo}
                alt={`${chauffeurData.prenom} ${chauffeurData.nom}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-trust rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Informations principales */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {chauffeurData.prenom} {chauffeurData.nom}
                  </h2>
                  <p className="text-gray-600">Chauffeur professionnel</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(chauffeurData.statut)}`}>
                    {getStatusIcon(chauffeurData.statut)}
                    <span className="ml-2 capitalize">{chauffeurData.statut}</span>
                  </span>
                </div>
              </div>

              {/* Stats rapides */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-trust">{chauffeurData.note}</div>
                  <div className="text-sm text-gray-600">Note moyenne</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-trust">{chauffeurData.nombreTrajets}</div>
                  <div className="text-sm text-gray-600">Trajets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-trust">{chauffeurData.experience}</div>
                  <div className="text-sm text-gray-600">Expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-trust">{chauffeurData.salaire.toLocaleString()} XAF</div>
                  <div className="text-sm text-gray-600">Salaire</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-trust text-trust'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Informations personnelles */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm text-gray-600">Email</div>
                          <div className="font-medium">{chauffeurData.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm text-gray-600">Téléphone</div>
                          <div className="font-medium">{chauffeurData.telephone}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm text-gray-600">Adresse</div>
                          <div className="font-medium">{chauffeurData.adresse}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm text-gray-600">Date de naissance</div>
                          <div className="font-medium">{new Date(chauffeurData.dateNaissance).toLocaleDateString('fr-FR')}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm text-gray-600">Nationalité</div>
                          <div className="font-medium">{chauffeurData.nationalite}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm text-gray-600">Date d'embauche</div>
                          <div className="font-medium">{new Date(chauffeurData.dateEmbauche).toLocaleDateString('fr-FR')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Véhicule attribué */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Véhicule attribué</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <Car className="w-8 h-8 text-trust mr-4" />
                      <div>
                        <div className="font-medium text-lg">{chauffeurData.vehiculeAttribue}</div>
                        <div className="text-sm text-gray-600">Véhicule actuellement assigné</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents et formations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents et formations</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {documents.map((doc, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{doc.nom}</div>
                          <span className={`text-xs px-2 py-1 rounded-full ${doc.couleur}`}>
                            {doc.statut}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Expire le {new Date(doc.expiration).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trajets' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trajets récents</h3>
                <div className="space-y-4">
                  {trajetsRecents.map((trajet) => (
                    <div key={trajet.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">Trajet #{trajet.id}</div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < trajet.note ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Départ</div>
                          <div className="font-medium">{trajet.depart}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Arrivée</div>
                          <div className="font-medium">{trajet.arrivee}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Distance</div>
                          <div className="font-medium">{trajet.distance}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Durée</div>
                          <div className="font-medium">{trajet.duree}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents du chauffeur</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{doc.nom}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${doc.couleur}`}>
                          {doc.statut}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Type: {doc.type}
                      </div>
                      <div className="text-sm text-gray-600">
                        Expire le {new Date(doc.expiration).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance du chauffeur</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-trust mb-2">{chauffeurData.note}</div>
                    <div className="text-sm text-gray-600">Note moyenne</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-trust mb-2">{chauffeurData.nombreTrajets}</div>
                    <div className="text-sm text-gray-600">Trajets effectués</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-trust mb-2">98%</div>
                    <div className="text-sm text-gray-600">Taux de ponctualité</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
