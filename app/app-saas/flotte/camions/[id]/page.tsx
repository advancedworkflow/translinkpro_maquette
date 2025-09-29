'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ArrowLeft,
  Truck, 
  Edit, 
  Trash2, 
  FileText, 
  Camera, 
  Shield, 
  Calendar,
  User,
  MapPin,
  Clock,
  Fuel,
  Download,
  Upload,
  Plus,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  Route,
  History,
  Settings
} from 'lucide-react'

export default function TruckDetailsPage() {
  const params = useParams()
  const truckId = params.id as string
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'photos' | 'routes' | 'history'>('overview')

  // Mock data - En réalité, cela viendrait d'une API
  const truck = {
    id: 'T123',
    model: 'Mercedes Actros',
    year: 2022,
    license: 'CM-123-AB',
    vin: 'WDB9634561LA12345',
    mileage: '145,230 km',
    status: 'Actif',
    statusColor: 'bg-green-100 text-green-700',
    driver: 'Marc Dupont',
    driverId: 'D001',
    location: 'Douala Centre',
    fuel: '75%',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15',
    insurance: {
      provider: 'AXA Cameroun',
      policy: 'POL-2024-001',
      expiry: '2024-12-31',
      valid: true
    },
    documents: {
      registration: { valid: true, expiry: '2025-06-30', file: 'registration_t123.pdf' },
      insurance: { valid: true, expiry: '2024-12-31', file: 'insurance_t123.pdf' },
      inspection: { valid: true, expiry: '2024-08-15', file: 'inspection_t123.pdf' },
      permit: { valid: true, expiry: '2025-03-20', file: 'permit_t123.pdf' }
    },
    photos: [
      { id: 1, type: 'exterior', url: '/images/trucks/t123-exterior.jpg', date: '2024-01-10', description: 'Vue extérieure avant' },
      { id: 2, type: 'interior', url: '/images/trucks/t123-interior.jpg', date: '2024-01-10', description: 'Cabine conducteur' },
      { id: 3, type: 'engine', url: '/images/trucks/t123-engine.jpg', date: '2024-01-10', description: 'Moteur' },
      { id: 4, type: 'cargo', url: '/images/trucks/t123-cargo.jpg', date: '2024-01-10', description: 'Zone de chargement' }
    ],
    routes: [
      { id: 'R001', from: 'Douala', to: 'Yaoundé', date: '2024-01-20', distance: '250 km', duration: '4h 30min', status: 'Terminée' },
      { id: 'R002', from: 'Yaoundé', to: 'Bafoussam', date: '2024-01-18', distance: '180 km', duration: '3h 15min', status: 'Terminée' },
      { id: 'R003', from: 'Bafoussam', to: 'Garoua', date: '2024-01-15', distance: '320 km', duration: '5h 45min', status: 'En cours' }
    ],
    maintenanceHistory: [
      { id: 'M001', date: '2024-01-15', type: 'Préventive', description: 'Révision 50,000 km', cost: '125,000 XAF', technician: 'Jean Mboumba' },
      { id: 'M002', date: '2023-10-20', type: 'Corrective', description: 'Changement plaquettes de frein', cost: '85,000 XAF', technician: 'Pierre Nguema' },
      { id: 'M003', date: '2023-07-10', type: 'Préventive', description: 'Vérification transmission', cost: '65,000 XAF', technician: 'Marie Nkoulou' }
    ]
  }

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: Truck },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'photos', name: 'Photos', icon: Camera },
    { id: 'routes', name: 'Itinéraires', icon: Route },
    { id: 'history', name: 'Historique', icon: History }
  ]

  const getDocumentStatus = (valid: boolean, expiry: string) => {
    const expiryDate = new Date(expiry)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (!valid) return { color: 'text-trust', icon: XCircle, text: 'Expiré' }
    if (daysUntilExpiry < 30) return { color: 'text-yellow-600', icon: AlertCircle, text: 'Expire bientôt' }
    return { color: 'text-green-600', icon: CheckCircle, text: 'Valide' }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link 
            href="/app-saas/flotte/camions"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Link>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <h1 className="text-2xl font-light text-gray-900">#{truck.id} - {truck.model}</h1>
            <p className="text-sm text-gray-500 mt-1">{truck.license} • {truck.year} • {truck.mileage}</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-trust text-trust'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Modèle:</span>
                  <span className="text-gray-900 ml-2">{truck.model}</span>
                </div>
                <div>
                  <span className="text-gray-500">Année:</span>
                  <span className="text-gray-900 ml-2">{truck.year}</span>
                </div>
                <div>
                  <span className="text-gray-500">Immatriculation:</span>
                  <span className="text-gray-900 ml-2">{truck.license}</span>
                </div>
                <div>
                  <span className="text-gray-500">VIN:</span>
                  <span className="text-gray-900 ml-2 text-xs">{truck.vin}</span>
                </div>
                <div>
                  <span className="text-gray-500">Kilométrage:</span>
                  <span className="text-gray-900 ml-2">{truck.mileage}</span>
                </div>
                <div>
                  <span className="text-gray-500">Statut:</span>
                  <span className={`text-xs ${truck.statusColor} px-2 py-1 rounded ml-2`}>
                    {truck.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Chauffeur assigné</h3>
              {truck.driver ? (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{truck.driver}</p>
                    <p className="text-sm text-gray-500">ID: {truck.driverId}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Aucun chauffeur assigné</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Assurance</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Compagnie:</span>
                  <span className="text-gray-900 ml-2">{truck.insurance.provider}</span>
                </div>
                <div>
                  <span className="text-gray-500">Police:</span>
                  <span className="text-gray-900 ml-2">{truck.insurance.policy}</span>
                </div>
                <div>
                  <span className="text-gray-500">Expiration:</span>
                  <span className={`ml-2 ${truck.insurance.valid ? 'text-green-600' : 'text-trust'}`}>
                    {truck.insurance.expiry}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Dernière:</span>
                  <span className="text-gray-900 ml-2">{truck.lastMaintenance}</span>
                </div>
                <div>
                  <span className="text-gray-500">Prochaine:</span>
                  <span className="text-gray-900 ml-2">{truck.nextMaintenance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-white border border-gray-200 rounded p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Documents</h3>
            <button className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter document
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(truck.documents).map(([docType, doc]) => {
              const status = getDocumentStatus(doc.valid, doc.expiry)
              return (
                <div key={docType} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 capitalize">{docType}</h4>
                    <div className={`flex items-center ${status.color}`}>
                      {(() => {
                        const StatusIcon = status.icon;
                        return <StatusIcon className="w-4 h-4 mr-1" />;
                      })()}
                      <span className="text-xs">{status.text}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Expire le: {doc.expiry}</p>
                  <div className="flex space-x-2">
                    <button className="text-trust hover:text-trust text-sm flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      Voir
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      Télécharger
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'photos' && (
        <div className="bg-white border border-gray-200 rounded p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Photos</h3>
            <button className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter photo
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {truck.photos.map((photo) => (
              <div key={photo.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-gray-900 text-sm">{photo.description}</h4>
                  <p className="text-xs text-gray-500 mt-1">{photo.type} • {photo.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'routes' && (
        <div className="bg-white border border-gray-200 rounded p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Itinéraires récents</h3>
            <button className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel itinéraire
            </button>
          </div>
          
          <div className="space-y-4">
            {truck.routes.map((route) => (
              <div key={route.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">#{route.id}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    route.status === 'Terminée' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {route.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-500">De:</span>
                    <span className="text-gray-900 ml-1">{route.from}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-500">Vers:</span>
                    <span className="text-gray-900 ml-1">{route.to}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-500">Distance:</span>
                    <span className="text-gray-900 ml-1">{route.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-500">Date:</span>
                    <span className="text-gray-900 ml-1">{route.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white border border-gray-200 rounded p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Historique de maintenance</h3>
          
          <div className="space-y-4">
            {truck.maintenanceHistory.map((maintenance) => (
              <div key={maintenance.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{maintenance.description}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    maintenance.type === 'Préventive' ? 'bg-blue-100 text-trust' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {maintenance.type}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <span className="text-gray-900 ml-2">{maintenance.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Coût:</span>
                    <span className="text-gray-900 ml-2">{maintenance.cost}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Technicien:</span>
                    <span className="text-gray-900 ml-2">{maintenance.technician}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
