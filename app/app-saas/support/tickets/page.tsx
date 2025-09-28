'use client'

import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  MessageCircle,
  FileText,
  Calendar,
  User,
  ChevronRight,
  Eye,
  Reply
} from 'lucide-react'

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const tickets = [
    {
      id: 'TKT-2024-001234',
      subject: 'Problème de connexion GPS sur le camion T123',
      description: 'Le dispositif GPS du camion T123 ne transmet plus de données depuis hier matin.',
      status: 'open',
      priority: 'high',
      category: 'technical',
      assignee: 'Marie Dubois',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:20:00Z',
      messages: 3
    },
    {
      id: 'TKT-2024-001235',
      subject: 'Demande de formation sur la nouvelle interface',
      description: 'Nous aimerions organiser une session de formation pour notre équipe.',
      status: 'in_progress',
      priority: 'medium',
      category: 'training',
      assignee: 'Jean Martin',
      createdAt: '2024-01-14T15:45:00Z',
      updatedAt: '2024-01-15T09:15:00Z',
      messages: 5
    },
    {
      id: 'TKT-2024-001236',
      subject: 'Question sur la facturation du mois de décembre',
      description: 'Je ne comprends pas certains éléments de ma facture de décembre.',
      status: 'resolved',
      priority: 'low',
      category: 'billing',
      assignee: 'Sophie Laurent',
      createdAt: '2024-01-10T11:20:00Z',
      updatedAt: '2024-01-12T16:30:00Z',
      messages: 2
    },
    {
      id: 'TKT-2024-001237',
      subject: 'Demande de fonctionnalité : export des rapports',
      description: 'Serait-il possible d\'ajouter une fonction d\'export des rapports en PDF ?',
      status: 'closed',
      priority: 'medium',
      category: 'feature_request',
      assignee: 'Pierre Moreau',
      createdAt: '2024-01-08T09:10:00Z',
      updatedAt: '2024-01-11T14:45:00Z',
      messages: 4
    }
  ]

  const statuses = [
    { value: 'all', label: 'Tous les statuts', count: tickets.length },
    { value: 'open', label: 'Ouvert', count: tickets.filter(t => t.status === 'open').length },
    { value: 'in_progress', label: 'En cours', count: tickets.filter(t => t.status === 'in_progress').length },
    { value: 'resolved', label: 'Résolu', count: tickets.filter(t => t.status === 'resolved').length },
    { value: 'closed', label: 'Fermé', count: tickets.filter(t => t.status === 'closed').length }
  ]

  const priorities = [
    { value: 'all', label: 'Toutes les priorités' },
    { value: 'low', label: 'Faible' },
    { value: 'medium', label: 'Moyen' },
    { value: 'high', label: 'Élevé' },
    { value: 'urgent', label: 'Urgent' }
  ]

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'open':
        return { icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Ouvert' }
      case 'in_progress':
        return { icon: AlertCircle, color: 'text-trust', bgColor: 'bg-blue-100', label: 'En cours' }
      case 'resolved':
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100', label: 'Résolu' }
      case 'closed':
        return { icon: XCircle, color: 'text-gray-600', bgColor: 'bg-gray-100', label: 'Fermé' }
      default:
        return { icon: Clock, color: 'text-gray-600', bgColor: 'bg-gray-100', label: 'Inconnu' }
    }
  }

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'low':
        return { color: 'text-green-700', bgColor: 'bg-green-100', label: 'Faible' }
      case 'medium':
        return { color: 'text-yellow-700', bgColor: 'bg-yellow-100', label: 'Moyen' }
      case 'high':
        return { color: 'text-orange-700', bgColor: 'bg-orange-100', label: 'Élevé' }
      case 'urgent':
        return { color: 'text-trust', bgColor: 'bg-blue-100', label: 'Urgent' }
      default:
        return { color: 'text-gray-700', bgColor: 'bg-gray-100', label: 'Inconnu' }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Mes tickets de support</h1>
          <p className="text-gray-600">Gérez vos demandes d'assistance et suivez leur progression</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-trust text-white px-6 py-3 rounded-lg hover:bg-trust-dark transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statuses.slice(1).map(status => (
          <div key={status.value} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{status.label}</p>
                <p className="text-2xl font-bold text-black">{status.count}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                getStatusInfo(status.value).bgColor
              }`}>
                <status.icon className={`w-6 h-6 ${getStatusInfo(status.value).color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher dans les tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent"
              />
            </div>
          </div>
          <div className="lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label} ({status.count})
                </option>
              ))}
            </select>
          </div>
          <div className="lg:w-48">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700"
            >
              {priorities.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black">
            Tickets ({filteredTickets.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredTickets.map(ticket => {
            const statusInfo = getStatusInfo(ticket.status)
            const priorityInfo = getPriorityInfo(ticket.priority)
            
            return (
              <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium text-black mr-3">
                        {ticket.subject}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.bgColor} ${priorityInfo.color}`}>
                        {priorityInfo.label}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {ticket.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Créé le {formatDate(ticket.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {ticket.assignee}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {ticket.messages} messages
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 ml-6">
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color} mb-2`}>
                        <statusInfo.icon className="w-4 h-4 mr-1" />
                        {statusInfo.label}
                      </div>
                      <p className="text-xs text-gray-500">
                        Mis à jour le {formatDate(ticket.updatedAt)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <Reply className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun ticket trouvé</h3>
            <p className="text-gray-600 mb-4">Aucun ticket ne correspond à vos critères de recherche</p>
            <button 
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
                setPriorityFilter('all')
              }}
              className="bg-trust text-white px-4 py-2 rounded-lg hover:bg-trust-dark transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Nouveau ticket</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700"
                    placeholder="Décrivez brièvement votre problème"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priorité
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700">
                      <option>Moyen</option>
                      <option>Faible</option>
                      <option>Élevé</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700">
                      <option>Support technique</option>
                      <option>Question générale</option>
                      <option>Facturation</option>
                      <option>Demande de fonctionnalité</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description détaillée *
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700 resize-none"
                    placeholder="Décrivez votre problème en détail..."
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-trust text-white rounded-lg hover:bg-trust-dark transition-colors"
                  >
                    Créer le ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


