'use client'

import { useState } from 'react'
import { 
  Calendar,
  Plus,
  Filter,
  Search,
  Clock,
  Truck,
  User,
  Wrench,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Settings,
  Download,
  Upload,
  Bell,
  Star,
  Target,
  TrendingUp,
  BarChart3,
  Users,
  Car,
  Route,
  Fuel,
  Activity
} from 'lucide-react'

export default function PlanificationPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'calendar'>('calendar')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [contextMenu, setContextMenu] = useState<{visible: boolean, x: number, y: number, date: Date} | null>(null)
  const [showEventCreateModal, setShowEventCreateModal] = useState(false)
  const [newEventDate, setNewEventDate] = useState<Date | null>(null)

  const tasks = [
    {
      id: 'VOY001',
      title: 'Voyage Douala - Yaoundé',
      type: 'voyage',
      priority: 'high',
      status: 'scheduled',
      date: '2024-01-20',
      time: '06:00',
      duration: '4h30',
      vehicle: 'T123 - Mercedes Actros',
      driver: 'Marc Dupont',
      location: 'Douala → Yaoundé',
      description: 'Transport marchandises générales - Client SARL TransCam',
      cost: '45,000 XAF',
      assignedTo: 'Marc Dupont',
      notes: 'Chargement: 6 tonnes, Départ: 06h00, Arrivée prévue: 10h30',
      client: 'SARL TransCam',
      cargo: 'Marchandises générales',
      weight: '6 tonnes',
      departureTime: '06:00',
      arrivalTime: '10:30'
    },
    {
      id: 'VOY002',
      title: 'Voyage Bafoussam - Garoua',
      type: 'voyage',
      priority: 'medium',
      status: 'confirmed',
      date: '2024-01-22',
      time: '08:00',
      duration: '5h45',
      vehicle: 'T456 - Volvo FH',
      driver: 'Julie Martin',
      location: 'Bafoussam → Garoua',
      description: 'Transport matériaux de construction - Client BTP Cameroun',
      cost: '58,000 XAF',
      assignedTo: 'Julie Martin',
      notes: 'Chargement: 12 tonnes, Départ: 08h00, Arrivée prévue: 13h45',
      client: 'BTP Cameroun',
      cargo: 'Matériaux de construction',
      weight: '12 tonnes',
      departureTime: '08:00',
      arrivalTime: '13:45'
    },
    {
      id: 'VOY003',
      title: 'Voyage Yaoundé - Bertoua',
      type: 'voyage',
      priority: 'high',
      status: 'pending',
      date: '2024-01-25',
      time: '07:30',
      duration: '3h15',
      vehicle: 'T789 - Scania R-Series',
      driver: 'Paul Bernard',
      location: 'Yaoundé → Bertoua',
      description: 'Transport produits agricoles - Client Coopérative Est',
      cost: '35,000 XAF',
      assignedTo: 'Paul Bernard',
      notes: 'Chargement: 8 tonnes, Départ: 07h30, Arrivée prévue: 10h45',
      client: 'Coopérative Est',
      cargo: 'Produits agricoles',
      weight: '8 tonnes',
      departureTime: '07:30',
      arrivalTime: '10:45'
    },
    {
      id: 'PLAN001',
      title: 'Planning chauffeurs - Semaine 4',
      type: 'planning',
      priority: 'medium',
      status: 'completed',
      date: '2024-01-18',
      time: '08:00',
      duration: '8h',
      vehicle: 'N/A',
      driver: 'Tous',
      location: 'Bureau, Douala',
      description: 'Planification des tours de service et repos des chauffeurs',
      cost: '0 XAF',
      assignedTo: 'Responsable planning',
      notes: 'Planning validé pour la semaine du 22-28 janvier'
    },
    {
      id: 'DEP001',
      title: 'Départ camion T101 - Yaoundé',
      type: 'departure',
      priority: 'high',
      status: 'in_progress',
      date: '2024-01-19',
      time: '09:00',
      duration: '1h',
      vehicle: 'T101 - MAN TGX',
      driver: 'Pierre Moreau',
      location: 'Dépôt Douala → Yaoundé',
      description: 'Départ programmé pour mission urgente',
      cost: '0 XAF',
      assignedTo: 'Pierre Moreau',
      notes: 'Vérifications pré-départ effectuées, départ à 09h00'
    },
    {
      id: 'VOY004',
      title: 'Voyage Douala - Bafoussam',
      type: 'voyage',
      priority: 'medium',
      status: 'scheduled',
      date: '2024-01-23',
      time: '14:00',
      duration: '2h30',
      vehicle: 'T123 - Mercedes Actros',
      driver: 'Marc Dupont',
      location: 'Douala → Bafoussam',
      description: 'Transport équipements médicaux - Client Hôpital Central',
      cost: '28,000 XAF',
      assignedTo: 'Marc Dupont',
      notes: 'Chargement: 3 tonnes, Départ: 14h00, Arrivée prévue: 16h30',
      client: 'Hôpital Central',
      cargo: 'Équipements médicaux',
      weight: '3 tonnes',
      departureTime: '14:00',
      arrivalTime: '16:30'
    },
    {
      id: 'VOY005',
      title: 'Voyage Garoua - Maroua',
      type: 'voyage',
      priority: 'high',
      status: 'confirmed',
      date: '2024-01-24',
      time: '05:30',
      duration: '4h15',
      vehicle: 'T456 - Volvo FH',
      driver: 'Julie Martin',
      location: 'Garoua → Maroua',
      description: 'Transport produits pétroliers - Client Total Cameroun',
      cost: '65,000 XAF',
      assignedTo: 'Julie Martin',
      notes: 'Chargement: 15 tonnes, Départ: 05h30, Arrivée prévue: 09h45',
      client: 'Total Cameroun',
      cargo: 'Produits pétroliers',
      weight: '15 tonnes',
      departureTime: '05:30',
      arrivalTime: '09:45'
    },
    {
      id: 'PLAN002',
      title: 'Planning chauffeurs - Semaine 5',
      type: 'planning',
      priority: 'medium',
      status: 'scheduled',
      date: '2024-01-26',
      time: '09:00',
      duration: '6h',
      vehicle: 'N/A',
      driver: 'Tous',
      location: 'Bureau, Douala',
      description: 'Planification des tours de service pour la semaine suivante',
      cost: '0 XAF',
      assignedTo: 'Responsable planning',
      notes: 'Planning à valider pour la semaine du 29 janvier - 4 février'
    },
    {
      id: 'MAINT001',
      title: 'Maintenance préventive T123',
      type: 'maintenance',
      priority: 'high',
      status: 'scheduled',
      date: '2024-01-21',
      time: '08:00',
      duration: '4h',
      vehicle: 'T123 - Mercedes Actros',
      driver: 'Marc Dupont',
      location: 'Garage Central, Douala',
      description: 'Vidange moteur, changement filtres, contrôle freins',
      cost: '450,000 XAF',
      assignedTo: 'Jean Martin',
      notes: 'Vérifier les pneus avant/arrière'
    },
    {
      id: 'INSP001',
      title: 'Contrôle technique T456',
      type: 'inspection',
      priority: 'high',
      status: 'pending',
      date: '2024-01-27',
      time: '14:00',
      duration: '2h',
      vehicle: 'T456 - Volvo FH',
      driver: 'Julie Martin',
      location: 'Centre de contrôle, Yaoundé',
      description: 'Contrôle technique annuel obligatoire',
      cost: '25,000 XAF',
      assignedTo: 'Julie Martin',
      notes: 'Documents à préparer: carte grise, assurance'
    },
    {
      id: 'TRAIN001',
      title: 'Formation sécurité chauffeurs',
      type: 'training',
      priority: 'medium',
      status: 'scheduled',
      date: '2024-01-28',
      time: '08:00',
      duration: '8h',
      vehicle: 'N/A',
      driver: 'Tous',
      location: 'Salle de formation, Douala',
      description: 'Formation sécurité routière et prévention',
      cost: '150,000 XAF',
      assignedTo: 'Formateur externe',
      notes: 'Certificat délivré à tous les participants'
    },
    {
      id: 'REP001',
      title: 'Réparation climatisation T789',
      type: 'repair',
      priority: 'medium',
      status: 'in_progress',
      date: '2024-01-29',
      time: '10:00',
      duration: '3h',
      vehicle: 'T789 - Scania R-Series',
      driver: 'Paul Bernard',
      location: 'Garage Spécialisé, Bafoussam',
      description: 'Réparation système climatisation',
      cost: '320,000 XAF',
      assignedTo: 'Technicien spécialisé',
      notes: 'Pièces commandées, réparation en cours'
    },
    {
      id: 'VOY006',
      title: 'Voyage Douala - Limbe',
      type: 'voyage',
      priority: 'medium',
      status: 'confirmed',
      date: '2024-01-30',
      time: '07:00',
      duration: '3h',
      vehicle: 'T101 - MAN TGX',
      driver: 'Pierre Moreau',
      location: 'Douala → Limbe',
      description: 'Transport produits pétroliers - Client Total Cameroun',
      cost: '42,000 XAF',
      assignedTo: 'Pierre Moreau',
      notes: 'Chargement: 10 tonnes, Départ: 07h00, Arrivée prévue: 10h00',
      client: 'Total Cameroun',
      cargo: 'Produits pétroliers',
      weight: '10 tonnes',
      departureTime: '07:00',
      arrivalTime: '10:00'
    }
  ]

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.driver.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || task.type === filterType
    return matchesSearch && matchesFilter
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-blue-100 text-trust border-blue-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-trust'
      case 'confirmed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'in_progress': return 'bg-purple-100 text-purple-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'voyage': return Route
      case 'planning': return Calendar
      case 'departure': return Truck
      case 'maintenance': return Wrench
      case 'inspection': return CheckCircle
      case 'training': return Users
      case 'repair': return Settings
      default: return Calendar
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return Clock
      case 'confirmed': return CheckCircle
      case 'pending': return AlertCircle
      case 'in_progress': return Activity
      case 'completed': return CheckCircle
      default: return Clock
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    })
  }

  // Fonctions pour le calendrier
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Jours du mois précédent
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false
      })
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)
      const isToday = currentDate.toDateString() === new Date().toDateString()
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday
      })
    }
    
    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day)
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false
      })
    }
    
    return days
  }

  const getTasksForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return tasks.filter(task => task.date === dateString)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const openTaskModal = (task: any) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  const handleContextMenu = (e: React.MouseEvent, date: Date) => {
    e.preventDefault()
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      date: date
    })
  }

  const closeContextMenu = () => {
    setContextMenu(null)
  }

  const createEvent = (date: Date) => {
    setNewEventDate(date)
    setShowEventCreateModal(true)
    closeContextMenu()
  }

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'voyage': return 'bg-green-100 text-green-700 border-green-200'
      case 'planning': return 'bg-blue-100 text-trust border-blue-200'
      case 'departure': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'maintenance': return 'bg-blue-100 text-trust border-blue-200'
      case 'inspection': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'training': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'repair': return 'bg-blue-100 text-trust border-blue-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Planification & Organisation</h1>
          <p className="text-sm text-gray-500 mt-1">Gestion des voyages, trajets, départs camions et planning chauffeurs</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau planning
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="kpi-label">Voyages aujourd'hui</div>
              <div className="kpi-value text-trust">8</div>
              <div className="text-xs text-green-600 mt-1">+2 vs hier</div>
            </div>
            <div className="icon-trust p-3 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="kpi-label">Trajets planifiés</div>
              <div className="kpi-value text-trust">12</div>
              <div className="text-xs text-blue-600 mt-1">Cette semaine</div>
            </div>
            <div className="icon-trust p-3 rounded-lg">
              <Route className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="kpi-label">Chauffeurs actifs</div>
              <div className="kpi-value text-trust">8</div>
              <div className="text-xs text-orange-600 mt-1">3 en congé</div>
            </div>
            <div className="icon-trust p-3 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="kpi-label">Départs camions</div>
              <div className="kpi-value text-trust">15</div>
              <div className="text-xs text-green-600 mt-1">À l'heure</div>
            </div>
            <div className="icon-trust p-3 rounded-lg">
              <Truck className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-200 rounded p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher un voyage, trajet ou planning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          
          <div className="flex space-x-2">
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm bg-white"
            >
              <option value="all">Tous les types</option>
              <option value="voyage">Voyages</option>
              <option value="planning">Planning chauffeurs</option>
              <option value="departure">Départs camions</option>
              <option value="maintenance">Maintenance</option>
              <option value="inspection">Inspection</option>
              <option value="training">Formation</option>
              <option value="repair">Réparation</option>
            </select>
            
            <select 
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as any)}
              className="border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm bg-white"
            >
              <option value="calendar">Vue calendrier</option>
              <option value="month">Vue mensuelle</option>
              <option value="week">Vue hebdomadaire</option>
              <option value="day">Vue journalière</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="bg-white border border-gray-200 rounded mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Calendrier général</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h3 className="text-lg font-medium text-gray-900">
                  {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {/* Légende */}
            <div className="flex items-center justify-center space-x-6 mb-4 p-3 bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                <span className="text-xs text-gray-600">Aujourd'hui</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-50 border border-red-300 rounded"></div>
                <span className="text-xs text-gray-600">Dates importantes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Marqueur priorité</span>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((day, index) => {
                const dayTasks = getTasksForDate(day.date)
                const isToday = day.date.toDateString() === new Date().toDateString()
                const hasImportantEvents = dayTasks.some(task => task.priority === 'high')
                const hasEvents = dayTasks.length > 0
                
                return (
                  <div
                    key={index}
                    className={`min-h-[120px] p-2 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                      day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                    } ${isToday ? 'bg-blue-50 border-blue-300' : ''} ${hasImportantEvents ? 'border-red-300 bg-red-50' : ''}`}
                    onClick={() => {
                      if (hasEvents) {
                        setSelectedDate(day.date)
                        setShowTaskModal(true)
                      }
                    }}
                    onContextMenu={(e) => handleContextMenu(e, day.date)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className={`text-sm font-medium ${
                        day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                      } ${isToday ? 'text-blue-600' : ''} ${hasImportantEvents ? 'text-red-600 font-bold' : ''}`}>
                        {day.date.getDate()}
                      </div>
                      {hasImportantEvents && (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      {dayTasks.slice(0, 3).map(task => {
                        const TypeIcon = getTypeIcon(task.type)
                        const isHighPriority = task.priority === 'high'
                        return (
                          <div
                            key={task.id}
                            className={`p-1 rounded text-xs cursor-pointer hover:shadow-sm transition-all ${getTaskColor(task.type)} ${
                              isHighPriority ? 'ring-1 ring-red-300' : ''
                            }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              openTaskModal(task)
                            }}
                            title={`${task.title} - ${task.time} - ${task.description}`}
                          >
                            <div className="flex items-center space-x-1">
                              <TypeIcon className="w-3 h-3" />
                              <span className="truncate font-medium">{task.title}</span>
                              {isHighPriority && (
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                            <div className="text-xs text-gray-600 mt-0.5 truncate">
                              {task.time} - {task.type === 'voyage' ? task.location : task.location}
                            </div>
                          </div>
                        )
                      })}
                      {dayTasks.length > 3 && (
                        <div className="text-xs text-gray-500 text-center bg-gray-100 rounded px-1 py-0.5">
                          +{dayTasks.length - 3} autres
                        </div>
                      )}
                      {!hasEvents && day.isCurrentMonth && (
                        <div className="text-xs text-gray-400 text-center mt-2">
                          Aucun événement
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px]"
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
          }}
          onClick={closeContextMenu}
        >
          <button
            onClick={() => createEvent(contextMenu.date)}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Créer un événement</span>
          </button>
        </div>
      )}

      {/* Overlay pour fermer le menu contextuel */}
      {contextMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeContextMenu}
        />
      )}

      {/* Tasks List */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {viewMode === 'calendar' ? 'Détails des tâches' : 'Tâches planifiées'}
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredTasks.map((task) => {
            const TypeIcon = getTypeIcon(task.type)
            const StatusIcon = getStatusIcon(task.status)
            
            return (
              <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <TypeIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority === 'high' ? 'Élevée' : task.priority === 'medium' ? 'Moyenne' : 'Faible'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status === 'scheduled' ? 'Planifiée' :
                           task.status === 'confirmed' ? 'Confirmée' :
                           task.status === 'pending' ? 'En attente' :
                           task.status === 'in_progress' ? 'En cours' :
                           'Terminée'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-500">Date:</span>
                          <span className="ml-1 text-gray-900">{formatDate(task.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-500">Heure:</span>
                          <span className="ml-1 text-gray-900">{task.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Truck className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-500">Véhicule:</span>
                          <span className="ml-1 text-gray-900">{task.vehicle}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-500">Chauffeur:</span>
                          <span className="ml-1 text-gray-900">{task.driver}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-500">Lieu:</span>
                          <span className="ml-1 text-gray-900">{task.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-500">Durée:</span>
                          <span className="ml-1 text-gray-900">{task.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-500">Assigné à:</span>
                          <span className="ml-1 text-gray-900">{task.assignedTo}</span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-500">Coût:</span>
                          <span className="ml-1 text-gray-900 font-medium">{task.cost}</span>
                        </div>
                      </div>
                      
                      {task.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded">
                          <p className="text-sm text-gray-600">
                            <strong>Notes:</strong> {task.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-900">Nouvelle tâche</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la tâche *</label>
                  <input type="text" placeholder="Maintenance préventive T123" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de tâche *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                    <option value="">Sélectionner</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="trip">Course</option>
                    <option value="inspection">Inspection</option>
                    <option value="training">Formation</option>
                    <option value="repair">Réparation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heure *</label>
                  <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Véhicule</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                    <option value="">Sélectionner</option>
                    <option value="T123">T123 - Mercedes Actros</option>
                    <option value="T456">T456 - Volvo FH</option>
                    <option value="T789">T789 - Scania R-Series</option>
                    <option value="T101">T101 - MAN TGX</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chauffeur</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                    <option value="">Sélectionner</option>
                    <option value="D001">Marc Dupont</option>
                    <option value="D002">Julie Martin</option>
                    <option value="D003">Pierre Moreau</option>
                    <option value="D004">Paul Bernard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
                    <option value="low">Faible</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Élevée</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durée estimée</label>
                  <input type="text" placeholder="4h" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Décrivez la tâche en détail..."
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                <input type="text" placeholder="Garage Central, Douala" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coût estimé (XAF)</label>
                  <input type="number" placeholder="450000" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigné à</label>
                  <input type="text" placeholder="Jean Martin" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea 
                  rows={2}
                  placeholder="Notes supplémentaires..."
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors bg-white"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-trust text-white rounded text-sm hover:bg-trust-dark transition-colors">
                Créer la tâche
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                {selectedTask ? (
                  <>
                    {(() => {
                      const TypeIcon = getTypeIcon(selectedTask.type)
                      return <TypeIcon className="w-6 h-6 text-trust" />
                    })()}
                    <h2 className="text-xl font-medium text-gray-900">{selectedTask.title}</h2>
                  </>
                ) : (
                  <>
                    <Calendar className="w-6 h-6 text-trust" />
                    <h2 className="text-xl font-medium text-gray-900">
                      Événements du {selectedDate.toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </h2>
                  </>
                )}
              </div>
              <button
                onClick={() => {
                  setShowTaskModal(false)
                  setSelectedTask(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {selectedTask ? (
                // Affichage des détails d'un événement spécifique
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Informations principales */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Type:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskColor(selectedTask.type)}`}>
                            {selectedTask.type === 'voyage' ? 'Voyage' :
                             selectedTask.type === 'planning' ? 'Planning' :
                             selectedTask.type === 'departure' ? 'Départ' :
                             selectedTask.type === 'maintenance' ? 'Maintenance' :
                             selectedTask.type === 'inspection' ? 'Inspection' :
                             selectedTask.type === 'training' ? 'Formation' :
                             selectedTask.type === 'repair' ? 'Réparation' : selectedTask.type}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Priorité:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedTask.priority)}`}>
                            {selectedTask.priority === 'high' ? 'Élevée' : selectedTask.priority === 'medium' ? 'Moyenne' : 'Faible'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Statut:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                            {selectedTask.status === 'scheduled' ? 'Planifiée' :
                             selectedTask.status === 'confirmed' ? 'Confirmée' :
                             selectedTask.status === 'pending' ? 'En attente' :
                             selectedTask.status === 'in_progress' ? 'En cours' :
                             'Terminée'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Date:</span>
                          <span className="text-sm text-gray-900">{formatDate(selectedTask.date)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Heure:</span>
                          <span className="text-sm text-gray-900">{selectedTask.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Durée:</span>
                          <span className="text-sm text-gray-900">{selectedTask.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Informations voyage */}
                    {selectedTask.type === 'voyage' && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Détails du voyage</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Client:</span>
                            <span className="text-sm text-gray-900">{selectedTask.client}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Marchandise:</span>
                            <span className="text-sm text-gray-900">{selectedTask.cargo}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Poids:</span>
                            <span className="text-sm text-gray-900">{selectedTask.weight}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Départ:</span>
                            <span className="text-sm text-gray-900">{selectedTask.departureTime}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Arrivée prévue:</span>
                            <span className="text-sm text-gray-900">{selectedTask.arrivalTime}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Prix:</span>
                            <span className="text-sm font-medium text-trust">{selectedTask.cost}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Informations maintenance */}
                    {selectedTask.type === 'maintenance' && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Détails de la maintenance</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Type de maintenance:</span>
                            <span className="text-sm text-gray-900">Préventive</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Technicien assigné:</span>
                            <span className="text-sm text-gray-900">{selectedTask.assignedTo}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Coût estimé:</span>
                            <span className="text-sm font-medium text-trust">{selectedTask.cost}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Informations inspection */}
                    {selectedTask.type === 'inspection' && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Détails de l'inspection</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Type d'inspection:</span>
                            <span className="text-sm text-gray-900">Contrôle technique</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Inspecteur:</span>
                            <span className="text-sm text-gray-900">{selectedTask.assignedTo}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Coût:</span>
                            <span className="text-sm font-medium text-trust">{selectedTask.cost}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Informations formation */}
                    {selectedTask.type === 'training' && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Détails de la formation</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Type de formation:</span>
                            <span className="text-sm text-gray-900">Sécurité routière</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Formateur:</span>
                            <span className="text-sm text-gray-900">{selectedTask.assignedTo}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Participants:</span>
                            <span className="text-sm text-gray-900">{selectedTask.driver}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Coût:</span>
                            <span className="text-sm font-medium text-trust">{selectedTask.cost}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Informations réparation */}
                    {selectedTask.type === 'repair' && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Détails de la réparation</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Type de réparation:</span>
                            <span className="text-sm text-gray-900">Climatisation</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Technicien:</span>
                            <span className="text-sm text-gray-900">{selectedTask.assignedTo}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Coût:</span>
                            <span className="text-sm font-medium text-trust">{selectedTask.cost}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Informations planning */}
                    {selectedTask.type === 'planning' && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Détails du planning</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Responsable:</span>
                            <span className="text-sm text-gray-900">{selectedTask.assignedTo}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Période:</span>
                            <span className="text-sm text-gray-900">Semaine 5</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Chauffeurs concernés:</span>
                            <span className="text-sm text-gray-900">{selectedTask.driver}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Informations véhicule et chauffeur */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Véhicule et chauffeur</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Véhicule:</span>
                          <span className="text-sm text-gray-900">{selectedTask.vehicle}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Chauffeur:</span>
                          <span className="text-sm text-gray-900">{selectedTask.driver}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Assigné à:</span>
                          <span className="text-sm text-gray-900">{selectedTask.assignedTo}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Lieu:</span>
                          <span className="text-sm text-gray-900">{selectedTask.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
                      <p className="text-sm text-gray-600">{selectedTask.description}</p>
                    </div>

                    {selectedTask.notes && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-sm text-gray-600">{selectedTask.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Affichage de tous les événements d'une journée
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Tous les événements de cette journée
                    </h3>
                    <div className="text-sm text-gray-600">
                      Cliquez sur un événement pour voir ses détails
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {getTasksForDate(selectedDate).map(task => {
                      const TypeIcon = getTypeIcon(task.type)
                      return (
                        <div
                          key={task.id}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => setSelectedTask(task)}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                              <TypeIcon className="w-5 h-5 text-gray-600" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="text-lg font-medium text-gray-900">{task.title}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                  {task.priority === 'high' ? 'Élevée' : task.priority === 'medium' ? 'Moyenne' : 'Faible'}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                  {task.status === 'scheduled' ? 'Planifiée' :
                                   task.status === 'confirmed' ? 'Confirmée' :
                                   task.status === 'pending' ? 'En attente' :
                                   task.status === 'in_progress' ? 'En cours' :
                                   'Terminée'}
                                </span>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                              
                              <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {task.time}
                                </div>
                                <div className="flex items-center">
                                  <Truck className="w-4 h-4 mr-1" />
                                  {task.vehicle}
                                </div>
                                <div className="flex items-center">
                                  <User className="w-4 h-4 mr-1" />
                                  {task.driver}
                                </div>
                                {task.cost !== '0 XAF' && (
                                  <div className="flex items-center">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    {task.cost}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-gray-400">
                              <ChevronRight className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    
                    {getTasksForDate(selectedDate).length === 0 && (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Aucun événement prévu pour cette journée</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button 
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors bg-white"
              >
                Fermer
              </button>
              <button className="px-4 py-2 bg-trust text-white rounded text-sm hover:bg-trust-dark transition-colors">
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Creation Modal */}
      {showEventCreateModal && newEventDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-trust" />
                <h2 className="text-xl font-medium text-gray-900">
                  Créer un événement - {newEventDate.toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowEventCreateModal(false)
                  setNewEventDate(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type d'événement *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust">
                    <option value="">Sélectionner le type</option>
                    <option value="voyage">Voyage</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inspection">Inspection</option>
                    <option value="training">Formation</option>
                    <option value="repair">Réparation</option>
                    <option value="planning">Planning</option>
                    <option value="departure">Départ camion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'événement *</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Voyage Douala - Yaoundé" 
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input 
                    type="date" 
                    defaultValue={newEventDate.toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heure *</label>
                  <input 
                    type="time" 
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust">
                    <option value="low">Faible</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Élevée</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durée</label>
                  <input 
                    type="text" 
                    placeholder="Ex: 4h, 2h30" 
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Véhicule</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust">
                    <option value="">Sélectionner un véhicule</option>
                    <option value="T123 - Mercedes Actros">T123 - Mercedes Actros</option>
                    <option value="T456 - Volvo FH">T456 - Volvo FH</option>
                    <option value="T789 - Scania R-Series">T789 - Scania R-Series</option>
                    <option value="T101 - MAN TGX">T101 - MAN TGX</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chauffeur</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust">
                    <option value="">Sélectionner un chauffeur</option>
                    <option value="Marc Dupont">Marc Dupont</option>
                    <option value="Julie Martin">Julie Martin</option>
                    <option value="Paul Bernard">Paul Bernard</option>
                    <option value="Pierre Moreau">Pierre Moreau</option>
                    <option value="Tous">Tous</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Douala → Yaoundé" 
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coût (XAF)</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigné à</label>
                  <input 
                    type="text" 
                    placeholder="Responsable" 
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Description de l'événement..."
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea 
                  rows={2}
                  placeholder="Notes supplémentaires..."
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:ring-trust focus:border-trust"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button 
                onClick={() => {
                  setShowEventCreateModal(false)
                  setNewEventDate(null)
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors bg-white"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-trust text-white rounded text-sm hover:bg-trust-dark transition-colors">
                Créer l'événement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
