'use client'

import { useState } from 'react'
import { 
  X, 
  UserPlus, 
  Truck, 
  List, 
  Eye, 
  Edit, 
  MapPin, 
  Clock, 
  Fuel, 
  User, 
  Settings,
  Save,
  Plus,
  Search,
  Filter
} from 'lucide-react'

interface QuickActionModalProps {
  isOpen: boolean
  onClose: () => void
  action: 'create-driver' | 'create-truck' | 'view-drivers' | 'view-trucks' | 'view-truck' | 'edit-disposition' | null
}

export default function QuickActionModal({ isOpen, onClose, action }: QuickActionModalProps) {
  if (!isOpen || !action) return null

  const renderContent = () => {
    switch (action) {
      case 'create-driver':
        return <CreateDriverForm onClose={onClose} />
      case 'create-truck':
        return <CreateTruckForm onClose={onClose} />
      case 'view-drivers':
        return <ViewDriversList onClose={onClose} />
      case 'view-trucks':
        return <ViewTrucksList onClose={onClose} />
      case 'view-truck':
        return <ViewTruckDetails onClose={onClose} />
      case 'edit-disposition':
        return <EditDispositionForm onClose={onClose} />
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="dashboard-card p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary">
            {getActionTitle(action)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  )
}

function getActionTitle(action: string) {
  const titles = {
    'create-driver': 'Créer un nouveau chauffeur',
    'create-truck': 'Ajouter un nouveau camion',
    'view-drivers': 'Liste des chauffeurs',
    'view-trucks': 'Liste des camions',
    'view-truck': 'Détails du camion',
    'edit-disposition': 'Modifier la disposition'
  }
  return titles[action as keyof typeof titles] || 'Action'
}

// Formulaire de création de chauffeur
function CreateDriverForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    license: '',
    experience: '',
    truck: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de création
    console.log('Création chauffeur:', formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prénom *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
            placeholder="+237 6 XX XX XX XX"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de permis *
          </label>
          <input
            type="text"
            value={formData.license}
            onChange={(e) => setFormData(prev => ({ ...prev, license: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Années d'expérience
          </label>
          <input
            type="number"
            value={formData.experience}
            onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
            min="0"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Camion assigné
        </label>
        <select
          value={formData.truck}
          onChange={(e) => setFormData(prev => ({ ...prev, truck: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
        >
          <option value="">Sélectionner un camion</option>
          <option value="T123">T123 - Mercedes Actros</option>
          <option value="T456">T456 - Volvo FH</option>
          <option value="T789">T789 - Scania R-Series</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn-primary flex items-center"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Créer le chauffeur
        </button>
      </div>
    </form>
  )
}

// Formulaire de création de camion
function CreateTruckForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    model: '',
    brand: '',
    year: '',
    plate: '',
    capacity: '',
    fuelType: '',
    driver: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Création camion:', formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marque *
          </label>
          <select
            value={formData.brand}
            onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
            required
          >
            <option value="">Sélectionner une marque</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Volvo">Volvo</option>
            <option value="Scania">Scania</option>
            <option value="MAN">MAN</option>
            <option value="Iveco">Iveco</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modèle *
          </label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Année *
          </label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
            min="2000"
            max="2024"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plaque d'immatriculation *
          </label>
          <input
            type="text"
            value={formData.plate}
            onChange={(e) => setFormData(prev => ({ ...prev, plate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
            placeholder="CM-123-AB"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capacité (tonnes)
          </label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
            min="0"
            step="0.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de carburant
          </label>
          <select
            value={formData.fuelType}
            onChange={(e) => setFormData(prev => ({ ...prev, fuelType: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
          >
            <option value="">Sélectionner</option>
            <option value="Diesel">Diesel</option>
            <option value="Essence">Essence</option>
            <option value="Hybride">Hybride</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Chauffeur assigné
        </label>
        <select
          value={formData.driver}
          onChange={(e) => setFormData(prev => ({ ...prev, driver: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
        >
          <option value="">Sélectionner un chauffeur</option>
          <option value="Marc Dupont">Marc Dupont</option>
          <option value="Julie Martin">Julie Martin</option>
          <option value="Paul Bernard">Paul Bernard</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn-primary flex items-center"
        >
          <Truck className="w-4 h-4 mr-2" />
          Ajouter le camion
        </button>
      </div>
    </form>
  )
}

// Liste des chauffeurs
function ViewDriversList({ onClose }: { onClose: () => void }) {
  const drivers = [
    { id: 1, name: 'Marc Dupont', status: 'En course', truck: 'T123 - Mercedes Actros', rating: 4.8, lastTrip: 'Il y a 2h' },
    { id: 2, name: 'Julie Martin', status: 'Disponible', truck: 'T456 - Volvo FH', rating: 4.9, lastTrip: 'Il y a 4h' },
    { id: 3, name: 'Paul Bernard', status: 'Maintenance', truck: 'T789 - Scania R-Series', rating: 4.7, lastTrip: 'Il y a 1 jour' },
    { id: 4, name: 'Pierre Moreau', status: 'En course', truck: 'T101 - MAN TGX', rating: 4.6, lastTrip: 'Il y a 1h' }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un chauffeur..."
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none ring-trust focus:border-transparent"
            />
          </div>
          <button className="btn-secondary px-3 py-2 text-sm flex items-center">
            <Filter className="w-4 h-4 mr-1" />
            Filtrer
          </button>
        </div>
        <button className="btn-primary px-3 py-2 text-sm flex items-center">
          <Plus className="w-4 h-4 mr-1" />
          Nouveau
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr className="text-left">
              <th className="pb-3 text-sm font-medium text-gray-700">Chauffeur</th>
              <th className="pb-3 text-sm font-medium text-gray-700">Statut</th>
              <th className="pb-3 text-sm font-medium text-gray-700">Camion</th>
              <th className="pb-3 text-sm font-medium text-gray-700">Note</th>
              <th className="pb-3 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-gray-600">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{driver.name}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    driver.status === 'En course' ? 'bg-green-100 text-green-700' :
                    driver.status === 'Disponible' ? 'bg-blue-100 text-trust' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {driver.status}
                  </span>
                </td>
                <td className="py-4 text-sm text-gray-900">{driver.truck}</td>
                <td className="py-4 text-sm text-gray-900">{driver.rating}/5</td>
                <td className="py-4">
                  <button className="text-trust hover:text-trust-dark text-sm">
                    Voir détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="btn-secondary"
        >
          Fermer
        </button>
      </div>
    </div>
  )
}

// Liste des camions
function ViewTrucksList({ onClose }: { onClose: () => void }) {
  const trucks = [
    { id: 'T123', model: 'Mercedes Actros', driver: 'Marc Dupont', status: 'Actif', fuel: '75%', mileage: '145,230 km' },
    { id: 'T456', model: 'Volvo FH', driver: 'Julie Martin', status: 'Disponible', fuel: '92%', mileage: '98,450 km' },
    { id: 'T789', model: 'Scania R-Series', driver: 'Paul Bernard', status: 'Maintenance', fuel: '45%', mileage: '203,890 km' },
    { id: 'T101', model: 'MAN TGX', driver: 'Pierre Moreau', status: 'Actif', fuel: '68%', mileage: '87,320 km' }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un camion..."
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none ring-trust focus:border-transparent"
            />
          </div>
          <button className="btn-secondary px-3 py-2 text-sm flex items-center">
            <Filter className="w-4 h-4 mr-1" />
            Filtrer
          </button>
        </div>
        <button className="btn-primary px-3 py-2 text-sm flex items-center">
          <Plus className="w-4 h-4 mr-1" />
          Nouveau
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trucks.map((truck) => (
          <div key={truck.id} className="dashboard-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-trust rounded-lg flex items-center justify-center mr-3">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Camion #{truck.id}</h3>
                  <p className="text-sm text-gray-500">{truck.model}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                truck.status === 'Actif' ? 'bg-green-100 text-green-700' :
                truck.status === 'Disponible' ? 'bg-blue-100 text-trust' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {truck.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Chauffeur:</span>
                <span className="text-gray-900">{truck.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Carburant:</span>
                <span className="text-gray-900">{truck.fuel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Kilométrage:</span>
                <span className="text-gray-900">{truck.mileage}</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <button className="text-trust hover:text-trust-dark text-sm">
                Voir détails
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="btn-secondary"
        >
          Fermer
        </button>
      </div>
    </div>
  )
}

// Détails d'un camion
function ViewTruckDetails({ onClose }: { onClose: () => void }) {
  const truck = {
    id: 'T123',
    model: 'Mercedes Actros',
    brand: 'Mercedes',
    year: '2020',
    plate: 'CM-123-AB',
    driver: 'Marc Dupont',
    status: 'En course',
    fuel: '75%',
    mileage: '145,230 km',
    location: 'Douala Centre',
    destination: 'Yaoundé',
    eta: '2h 15min'
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="dashboard-card p-4">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Truck className="w-5 h-5 mr-2 text-trust" />
            Informations générales
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">ID:</span>
              <span className="font-medium">{truck.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Modèle:</span>
              <span className="font-medium">{truck.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Marque:</span>
              <span className="font-medium">{truck.brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Année:</span>
              <span className="font-medium">{truck.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Plaque:</span>
              <span className="font-medium">{truck.plate}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card p-4">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-trust" />
            Chauffeur assigné
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Nom:</span>
              <span className="font-medium">{truck.driver}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Statut:</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                {truck.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Localisation:</span>
              <span className="font-medium">{truck.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Destination:</span>
              <span className="font-medium">{truck.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">ETA:</span>
              <span className="font-medium">{truck.eta}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card p-4">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-trust" />
          État technique
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-trust mb-1">{truck.fuel}</div>
            <div className="text-sm text-gray-600">Carburant</div>
            <div className="progress-bar mt-2">
              <div className="progress-fill" style={{ width: truck.fuel }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-trust mb-1">{truck.mileage}</div>
            <div className="text-sm text-gray-600">Kilométrage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">98%</div>
            <div className="text-sm text-gray-600">État général</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="btn-secondary"
        >
          Fermer
        </button>
        <button className="btn-primary flex items-center">
          <Edit className="w-4 h-4 mr-2" />
          Modifier
        </button>
      </div>
    </div>
  )
}

// Formulaire de modification de disposition
function EditDispositionForm({ onClose }: { onClose: () => void }) {
  const [disposition, setDisposition] = useState({
    layout: 'grid',
    showFilters: true,
    showStats: true,
    itemsPerPage: 10,
    defaultView: 'all'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Modification disposition:', disposition)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type d'affichage
          </label>
          <select
            value={disposition.layout}
            onChange={(e) => setDisposition(prev => ({ ...prev, layout: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
          >
            <option value="grid">Grille</option>
            <option value="list">Liste</option>
            <option value="table">Tableau</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vue par défaut
          </label>
          <select
            value={disposition.defaultView}
            onChange={(e) => setDisposition(prev => ({ ...prev, defaultView: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
          >
            <option value="all">Tous</option>
            <option value="active">Actifs</option>
            <option value="available">Disponibles</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Éléments par page
          </label>
          <select
            value={disposition.itemsPerPage}
            onChange={(e) => setDisposition(prev => ({ ...prev, itemsPerPage: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-trust focus:border-transparent"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Options d'affichage</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={disposition.showFilters}
              onChange={(e) => setDisposition(prev => ({ ...prev, showFilters: e.target.checked }))}
              className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Afficher les filtres</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={disposition.showStats}
              onChange={(e) => setDisposition(prev => ({ ...prev, showStats: e.target.checked }))}
              className="h-4 w-4 text-trust focus:ring-trust border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Afficher les statistiques</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn-primary flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </button>
      </div>
    </form>
  )
}
