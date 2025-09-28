'use client'

import { useState } from 'react'
import { 
  CreditCard,
  Banknote,
  Smartphone,
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Filter,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Receipt,
  BarChart3,
  PieChart
} from 'lucide-react'

interface Paiement {
  id: string
  client: {
    nom: string
    prenom: string
    email: string
    telephone: string
    photo?: string
  }
  trajet: {
    id: string
    depart: string
    arrivee: string
    date: string
    distance: string
  }
  montant: number
  devise: string
  methode: 'mobile_money' | 'carte_bancaire' | 'especes' | 'virement'
  statut: 'paye' | 'en_attente' | 'echec' | 'rembourse'
  datePaiement: string
  dateCreation: string
  frais: number
  commission: number
  reference: string
  notes?: string
}

const paiementsData: Paiement[] = [
  {
    id: 'PAY-2024-001',
    client: {
      nom: 'Nguema',
      prenom: 'Marie',
      email: 'marie.nguema@email.com',
      telephone: '+237 6 12 34 56 78',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
    },
    trajet: {
      id: 'TRAJ-001',
      depart: 'Douala Centre',
      arrivee: 'Aéroport de Douala',
      date: '2024-02-15',
      distance: '12 km'
    },
    montant: 15000,
    devise: 'XAF',
    methode: 'mobile_money',
    statut: 'paye',
    datePaiement: '2024-02-15T14:30:00',
    dateCreation: '2024-02-15T14:25:00',
    frais: 500,
    commission: 1500,
    reference: 'MTN-789456123',
    notes: 'Paiement mobile money MTN'
  },
  {
    id: 'PAY-2024-002',
    client: {
      nom: 'Mballa',
      prenom: 'Jean',
      email: 'jean.mballa@email.com',
      telephone: '+237 6 23 45 67 89',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    trajet: {
      id: 'TRAJ-002',
      depart: 'Yaoundé Centre',
      arrivee: 'Bastos',
      date: '2024-02-15',
      distance: '8 km'
    },
    montant: 8000,
    devise: 'XAF',
    methode: 'carte_bancaire',
    statut: 'paye',
    datePaiement: '2024-02-15T16:45:00',
    dateCreation: '2024-02-15T16:40:00',
    frais: 200,
    commission: 800,
    reference: 'CARD-456789123',
    notes: 'Paiement carte Visa'
  },
  {
    id: 'PAY-2024-003',
    client: {
      nom: 'Fotso',
      prenom: 'Claire',
      email: 'claire.fotso@email.com',
      telephone: '+237 6 34 56 78 90',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
    },
    trajet: {
      id: 'TRAJ-003',
      depart: 'Bafoussam',
      arrivee: 'Dschang',
      date: '2024-02-14',
      distance: '45 km'
    },
    montant: 25000,
    devise: 'XAF',
    methode: 'especes',
    statut: 'paye',
    datePaiement: '2024-02-14T10:15:00',
    dateCreation: '2024-02-14T10:10:00',
    frais: 0,
    commission: 2500,
    reference: 'CASH-001',
    notes: 'Paiement en espèces'
  },
  {
    id: 'PAY-2024-004',
    client: {
      nom: 'Tchoumi',
      prenom: 'Paul',
      email: 'paul.tchoumi@email.com',
      telephone: '+237 6 45 67 89 01',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    trajet: {
      id: 'TRAJ-004',
      depart: 'Garoua',
      arrivee: 'Maroua',
      date: '2024-02-14',
      distance: '120 km'
    },
    montant: 45000,
    devise: 'XAF',
    methode: 'virement',
    statut: 'en_attente',
    datePaiement: '',
    dateCreation: '2024-02-14T08:30:00',
    frais: 1000,
    commission: 4500,
    reference: 'VIR-789123456',
    notes: 'Virement bancaire en cours'
  },
  {
    id: 'PAY-2024-005',
    client: {
      nom: 'Ndjock',
      prenom: 'Sylvie',
      email: 'sylvie.ndjock@email.com',
      telephone: '+237 6 56 78 90 12',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face'
    },
    trajet: {
      id: 'TRAJ-005',
      depart: 'Bertoua',
      arrivee: 'Abong-Mbang',
      date: '2024-02-13',
      distance: '80 km'
    },
    montant: 35000,
    devise: 'XAF',
    methode: 'mobile_money',
    statut: 'echec',
    datePaiement: '',
    dateCreation: '2024-02-13T15:20:00',
    frais: 0,
    commission: 0,
    reference: 'MTN-123456789',
    notes: 'Échec du paiement mobile money'
  },
  {
    id: 'PAY-2024-006',
    client: {
      nom: 'Kouam',
      prenom: 'David',
      email: 'david.kouam@email.com',
      telephone: '+237 6 67 89 01 23',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face'
    },
    trajet: {
      id: 'TRAJ-006',
      depart: 'Ebolowa',
      arrivee: 'Sangmélima',
      date: '2024-02-13',
      distance: '60 km'
    },
    montant: 28000,
    devise: 'XAF',
    methode: 'carte_bancaire',
    statut: 'rembourse',
    datePaiement: '2024-02-13T12:00:00',
    dateCreation: '2024-02-13T11:45:00',
    frais: 0,
    commission: 0,
    reference: 'CARD-987654321',
    notes: 'Remboursement effectué'
  }
]

export default function PaiementsPage() {
  const [paiements, setPaiements] = useState<Paiement[]>(paiementsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatut, setFilterStatut] = useState('all')
  const [filterMethode, setFilterMethode] = useState('all')
  const [selectedPaiement, setSelectedPaiement] = useState<Paiement | null>(null)
  const [showModal, setShowModal] = useState(false)

  const filteredPaiements = paiements.filter(paiement => {
    const matchesSearch = 
      paiement.client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paiement.client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paiement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paiement.reference.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatut = filterStatut === 'all' || paiement.statut === filterStatut
    const matchesMethode = filterMethode === 'all' || paiement.methode === filterMethode
    
    return matchesSearch && matchesStatut && matchesMethode
  })

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'paye':
        return 'bg-green-100 text-green-700'
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-700'
      case 'echec':
        return 'bg-red-100 text-red-700'
      case 'rembourse':
        return 'bg-blue-100 text-trust'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'paye':
        return <CheckCircle className="w-4 h-4" />
      case 'en_attente':
        return <Clock className="w-4 h-4" />
      case 'echec':
        return <XCircle className="w-4 h-4" />
      case 'rembourse':
        return <ArrowDownRight className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getMethodeIcon = (methode: string) => {
    switch (methode) {
      case 'mobile_money':
        return <Smartphone className="w-4 h-4" />
      case 'carte_bancaire':
        return <CreditCard className="w-4 h-4" />
      case 'especes':
        return <Banknote className="w-4 h-4" />
      case 'virement':
        return <Wallet className="w-4 h-4" />
      default:
        return <DollarSign className="w-4 h-4" />
    }
  }

  const getMethodeLabel = (methode: string) => {
    switch (methode) {
      case 'mobile_money':
        return 'Mobile Money'
      case 'carte_bancaire':
        return 'Carte bancaire'
      case 'especes':
        return 'Espèces'
      case 'virement':
        return 'Virement'
      default:
        return methode
    }
  }

  // Statistiques
  const totalPaiements = paiements.length
  const paiementsPayes = paiements.filter(p => p.statut === 'paye').length
  const paiementsEnAttente = paiements.filter(p => p.statut === 'en_attente').length
  const paiementsEchec = paiements.filter(p => p.statut === 'echec').length
  
  const totalMontant = paiements
    .filter(p => p.statut === 'paye')
    .reduce((sum, p) => sum + p.montant, 0)
  
  const totalCommission = paiements
    .filter(p => p.statut === 'paye')
    .reduce((sum, p) => sum + p.commission, 0)
  
  const totalFrais = paiements
    .filter(p => p.statut === 'paye')
    .reduce((sum, p) => sum + p.frais, 0)

  const stats = [
    {
      label: 'Total Paiements',
      value: totalPaiements.toString(),
      change: '+12%',
      changeColor: 'text-green-600',
      icon: Receipt
    },
    {
      label: 'Montant Total',
      value: `${totalMontant.toLocaleString()} XAF`,
      change: '+8%',
      changeColor: 'text-green-600',
      icon: DollarSign
    },
    {
      label: 'Commissions',
      value: `${totalCommission.toLocaleString()} XAF`,
      change: '+15%',
      changeColor: 'text-green-600',
      icon: TrendingUp
    },
    {
      label: 'Taux de Réussite',
      value: `${Math.round((paiementsPayes / totalPaiements) * 100)}%`,
      change: '+3%',
      changeColor: 'text-green-600',
      icon: BarChart3
    }
  ]

  const methodesStats = [
    {
      methode: 'mobile_money',
      label: 'Mobile Money',
      count: paiements.filter(p => p.methode === 'mobile_money').length,
      montant: paiements
        .filter(p => p.methode === 'mobile_money' && p.statut === 'paye')
        .reduce((sum, p) => sum + p.montant, 0),
      couleur: 'bg-blue-100 text-trust'
    },
    {
      methode: 'carte_bancaire',
      label: 'Carte bancaire',
      count: paiements.filter(p => p.methode === 'carte_bancaire').length,
      montant: paiements
        .filter(p => p.methode === 'carte_bancaire' && p.statut === 'paye')
        .reduce((sum, p) => sum + p.montant, 0),
      couleur: 'bg-green-100 text-green-700'
    },
    {
      methode: 'especes',
      label: 'Espèces',
      count: paiements.filter(p => p.methode === 'especes').length,
      montant: paiements
        .filter(p => p.methode === 'especes' && p.statut === 'paye')
        .reduce((sum, p) => sum + p.montant, 0),
      couleur: 'bg-yellow-100 text-yellow-700'
    },
    {
      methode: 'virement',
      label: 'Virement',
      count: paiements.filter(p => p.methode === 'virement').length,
      montant: paiements
        .filter(p => p.methode === 'virement' && p.statut === 'paye')
        .reduce((sum, p) => sum + p.montant, 0),
      couleur: 'bg-purple-100 text-purple-700'
    }
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Gestion des Paiements</h1>
          <p className="text-sm text-gray-500 mt-1">Gestion des paiements et transactions clients</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-900 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-5 gap-4 mb-8">
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

      {/* Actions rapides et statistiques par méthode - En bas */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        {/* Quick Actions */}
        <div className="bg-gray-50 border border-gray-200 rounded p-6">
          <h2 className="text-lg font-light text-gray-900 mb-4">Actions rapides</h2>
          
          <div className="space-y-3">
            <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
              <CheckCircle className="w-4 h-4 mr-3" />
              Valider tous les paiements
            </button>
            
            <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
              <AlertCircle className="w-4 h-4 mr-3" />
              Voir les échecs
            </button>
            
            <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
              <Clock className="w-4 h-4 mr-3" />
              Paiements en attente
            </button>
            
            <button className="w-full border border-gray-300 text-gray-900 p-3 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-3" />
              Exporter les données
            </button>
          </div>
        </div>

        {/* Statistiques par méthode */}
        <div className="bg-gray-50 border border-gray-200 rounded p-6">
          <h2 className="text-lg font-light text-gray-900 mb-4">Paiements par méthode</h2>
          
          <div className="space-y-3">
            {methodesStats.map((methode, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded">
                <div className="flex items-center">
                  {getMethodeIcon(methode.methode)}
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{methode.label}</div>
                    <div className="text-xs text-gray-500">{methode.count} transactions</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-trust">
                    {methode.montant.toLocaleString()} XAF
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${methode.couleur}`}>
                    {methode.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tableau principal - Pleine largeur */}
      <div className="dashboard-card mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-light text-gray-900">Liste des paiements</h2>
            <button className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded cursor-not-allowed opacity-50">
              Modifier les paiements sélectionnés
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un paiement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-trust focus:border-transparent w-64"
              />
            </div>
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-trust focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="paye">Payé</option>
              <option value="en_attente">En attente</option>
              <option value="echec">Échec</option>
              <option value="rembourse">Remboursé</option>
            </select>
            <select
              value={filterMethode}
              onChange={(e) => setFilterMethode(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-trust focus:border-transparent"
            >
              <option value="all">Toutes les méthodes</option>
              <option value="mobile_money">Mobile Money</option>
              <option value="carte_bancaire">Carte bancaire</option>
              <option value="especes">Espèces</option>
              <option value="virement">Virement</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">Paiement</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Trajet
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Montant
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Méthode
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Statut
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredPaiements.map((paiement) => (
                <tr key={paiement.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-trust hover:text-trust-dark cursor-pointer font-medium">
                        {paiement.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {paiement.client.photo ? (
                        <img
                          src={paiement.client.photo}
                          alt={`${paiement.client.prenom} ${paiement.client.nom}`}
                          className="w-8 h-8 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <Users className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {paiement.client.prenom} {paiement.client.nom}
                        </div>
                        <div className="text-xs text-gray-500">{paiement.client.telephone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {paiement.trajet.depart} → {paiement.trajet.arrivee}
                    </div>
                    <div className="text-xs text-gray-500">
                      {paiement.trajet.distance} • {new Date(paiement.trajet.date).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {paiement.montant.toLocaleString()} {paiement.devise}
                    </div>
                    {paiement.commission > 0 && (
                      <div className="text-xs text-gray-500">
                        Commission: {paiement.commission.toLocaleString()} XAF
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getMethodeIcon(paiement.methode)}
                      <span className="ml-2 text-sm text-gray-900">
                        {getMethodeLabel(paiement.methode)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(paiement.statut)}`}>
                      {getStatutIcon(paiement.statut)}
                      <span className="ml-1 capitalize">{paiement.statut.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(paiement.dateCreation).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button className="text-sm text-trust hover:text-trust-dark bg-trust/10 hover:bg-trust/20 px-3 py-1 rounded transition-colors">
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-center py-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowUpRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de détails du paiement */}
      {showModal && selectedPaiement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Détails du paiement</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations du paiement */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations du paiement</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID Paiement:</span>
                      <span className="font-medium">{selectedPaiement.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Référence:</span>
                      <span className="font-medium">{selectedPaiement.reference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Montant:</span>
                      <span className="font-medium text-lg text-trust">
                        {selectedPaiement.montant.toLocaleString()} {selectedPaiement.devise}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Méthode:</span>
                      <span className="font-medium">{getMethodeLabel(selectedPaiement.methode)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Statut:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatutColor(selectedPaiement.statut)}`}>
                        {getStatutIcon(selectedPaiement.statut)}
                        <span className="ml-1 capitalize">{selectedPaiement.statut.replace('_', ' ')}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Commission:</span>
                      <span className="font-medium">{selectedPaiement.commission.toLocaleString()} XAF</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frais:</span>
                      <span className="font-medium">{selectedPaiement.frais.toLocaleString()} XAF</span>
                    </div>
                  </div>
                </div>

                {/* Informations du client */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations du client</h3>
                  <div className="flex items-center mb-4">
                    {selectedPaiement.client.photo ? (
                      <img
                        src={selectedPaiement.client.photo}
                        alt={`${selectedPaiement.client.prenom} ${selectedPaiement.client.nom}`}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                        <Users className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {selectedPaiement.client.prenom} {selectedPaiement.client.nom}
                      </div>
                      <div className="text-sm text-gray-600">{selectedPaiement.client.email}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Téléphone:</span>
                      <span className="font-medium">{selectedPaiement.client.telephone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations du trajet */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations du trajet</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">ID Trajet</div>
                      <div className="font-medium">{selectedPaiement.trajet.id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Date</div>
                      <div className="font-medium">{new Date(selectedPaiement.trajet.date).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Départ</div>
                      <div className="font-medium">{selectedPaiement.trajet.depart}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Arrivée</div>
                      <div className="font-medium">{selectedPaiement.trajet.arrivee}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Distance</div>
                      <div className="font-medium">{selectedPaiement.trajet.distance}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedPaiement.notes && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedPaiement.notes}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Fermer
                </button>
                {selectedPaiement.statut === 'en_attente' && (
                  <button className="px-4 py-2 text-sm font-medium text-white bg-trust rounded-lg hover:bg-trust-dark transition-colors">
                    Valider le paiement
                  </button>
                )}
                {selectedPaiement.statut === 'echec' && (
                  <button className="px-4 py-2 text-sm font-medium text-white bg-trust rounded-lg hover:bg-trust-dark transition-colors">
                    Relancer le paiement
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}