'use client'

import { useState } from 'react'
import { 
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Save,
  Edit,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Monitor,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronRight,
  Download,
  Upload,
  Trash2,
  Plus,
  Search,
  Filter,
  BarChart3,
  Users,
  Truck,
  CreditCard,
  FileText,
  Camera,
  Wrench,
  Activity,
  TrendingUp,
  Target,
  Star,
  Heart,
  HelpCircle,
  Info,
  Lock,
  Unlock,
  RefreshCw,
  Power,
  LogOut,
  Building2 as Building
} from 'lucide-react'

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    maintenance: true,
    trips: true,
    alerts: true,
    reports: false
  })

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'company', name: 'Entreprise', icon: Building },
    { id: 'fleet', name: 'Flotte', icon: Truck },
    { id: 'billing', name: 'Facturation', icon: CreditCard },
    { id: 'integrations', name: 'Intégrations', icon: Globe },
    { id: 'system', name: 'Système', icon: Settings }
  ]

  const userProfile = {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@translinkpro.com',
    phone: '+237 6 77 12 34 56',
    role: 'Administrateur',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    department: 'Direction',
    location: 'Douala, Cameroun',
    joinDate: '2022-01-15',
    lastLogin: '2024-01-18 14:30',
    status: 'Actif'
  }

  const companyInfo = {
    name: 'TransLink-Pro Cameroun',
    type: 'SARL',
    address: '123 Avenue de la République, Douala',
    city: 'Douala',
    country: 'Cameroun',
    phone: '+237 6 77 12 34 56',
    email: 'contact@translinkpro-cm.com',
    website: 'www.translinkpro-cm.com',
    taxId: 'M123456789',
    registration: 'RCCM-DL-2022-A-001234',
    founded: '2022-01-01',
    employees: 25,
    vehicles: 32
  }

  const fleetSettings = {
    totalVehicles: 32,
    activeVehicles: 28,
    maintenanceInterval: 15000,
    fuelAlertThreshold: 20,
    speedLimit: 90,
    trackingEnabled: true,
    geofencingEnabled: true,
    maintenanceReminders: true,
    fuelMonitoring: true
  }

  const systemInfo = {
    version: '2.1.4',
    lastUpdate: '2024-01-15',
    databaseSize: '2.3 GB',
    storageUsed: '15.7 GB',
    totalStorage: '100 GB',
    uptime: '99.9%',
    lastBackup: '2024-01-18 02:00',
    nextBackup: '2024-01-19 02:00',
    sslEnabled: true,
    twoFactorEnabled: true
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900">Paramètres</h1>
          <p className="text-sm text-gray-500 mt-1">Configuration de votre compte et de l'application</p>
        </div>
        <div className="flex space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors flex items-center bg-white">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-trust border-r-2 border-trust'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {tab.name}
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Profil utilisateur</h2>
                
                <div className="flex items-start space-x-6 mb-8">
                  <div className="relative">
                    <img
                      src={userProfile.avatar}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <button className="absolute -bottom-1 -right-1 bg-trust text-white rounded-full p-1 hover:bg-trust-dark transition-colors">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-gray-900">{userProfile.firstName} {userProfile.lastName}</h3>
                    <p className="text-gray-600">{userProfile.role}</p>
                    <p className="text-sm text-gray-500">{userProfile.department} • {userProfile.location}</p>
                    <div className="flex items-center mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        userProfile.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-trust'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-1 ${
                          userProfile.status === 'Actif' ? 'bg-green-400' : 'bg-blue-400'
                        }`}></div>
                        {userProfile.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                    <input type="text" defaultValue={userProfile.firstName} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <input type="text" defaultValue={userProfile.lastName} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" defaultValue={userProfile.email} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input type="tel" defaultValue={userProfile.phone} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Département</label>
                    <input type="text" defaultValue={userProfile.department} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                    <input type="text" defaultValue={userProfile.location} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Informations de connexion</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dernière connexion</label>
                      <p className="text-sm text-gray-600">{userProfile.lastLogin}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Membre depuis</label>
                      <p className="text-sm text-gray-600">{userProfile.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Préférences de notification</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Canaux de notification</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Email</p>
                            <p className="text-xs text-gray-500">Recevoir les notifications par email</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.email}
                            onChange={(e) => handleNotificationChange('email', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-trust"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Smartphone className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">SMS</p>
                            <p className="text-xs text-gray-500">Recevoir les notifications par SMS</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.sms}
                            onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-trust"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Notifications push</p>
                            <p className="text-xs text-gray-500">Recevoir les notifications push dans l'application</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.push}
                            onChange={(e) => handleNotificationChange('push', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-trust"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Types de notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'maintenance', label: 'Maintenance', description: 'Alertes de maintenance et réparations' },
                        { key: 'trips', label: 'Courses', description: 'Notifications liées aux courses et trajets' },
                        { key: 'alerts', label: 'Alertes', description: 'Alertes importantes et urgences' },
                        { key: 'reports', label: 'Rapports', description: 'Rapports périodiques et statistiques' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications[item.key as keyof typeof notifications]}
                              onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-trust"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Sécurité</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Mot de passe</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm bg-white text-gray-700"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Authentification à deux facteurs</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">2FA activé</p>
                          <p className="text-xs text-gray-500">Protection supplémentaire pour votre compte</p>
                        </div>
                      </div>
                      <button className="bg-trust text-white px-4 py-2 rounded text-sm hover:bg-trust-dark transition-colors">
                        Configurer
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Sessions actives</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <Monitor className="w-4 h-4 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Chrome sur Windows</p>
                            <p className="text-xs text-gray-500">Douala, Cameroun • Actuel</p>
                          </div>
                        </div>
                        <span className="text-xs text-green-600 font-medium">Actif</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <Smartphone className="w-4 h-4 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Safari sur iPhone</p>
                            <p className="text-xs text-gray-500">Yaoundé, Cameroun • Il y a 2h</p>
                          </div>
                        </div>
                        <button className="text-trust text-xs hover:text-trust">Déconnecter</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Company Tab */}
            {activeTab === 'company' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Informations de l'entreprise</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise</label>
                    <input type="text" defaultValue={companyInfo.name} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type d'entreprise</label>
                    <input type="text" defaultValue={companyInfo.type} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                    <input type="text" defaultValue={companyInfo.address} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                    <input type="text" defaultValue={companyInfo.city} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pays</label>
                    <input type="text" defaultValue={companyInfo.country} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input type="tel" defaultValue={companyInfo.phone} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" defaultValue={companyInfo.email} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site web</label>
                    <input type="url" defaultValue={companyInfo.website} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Numéro fiscal</label>
                    <input type="text" defaultValue={companyInfo.taxId} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">RCCM</label>
                    <input type="text" defaultValue={companyInfo.registration} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                </div>
              </div>
            )}

            {/* Fleet Tab */}
            {activeTab === 'fleet' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Configuration de la flotte</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Intervalle de maintenance (km)</label>
                    <input type="number" defaultValue={fleetSettings.maintenanceInterval} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Seuil d'alerte carburant (%)</label>
                    <input type="number" defaultValue={fleetSettings.fuelAlertThreshold} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Limite de vitesse (km/h)</label>
                    <input type="number" defaultValue={fleetSettings.speedLimit} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Véhicules actifs</label>
                    <input type="number" defaultValue={fleetSettings.activeVehicles} className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700" />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Fonctionnalités</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'trackingEnabled', label: 'Suivi GPS', description: 'Activer le suivi en temps réel' },
                      { key: 'geofencingEnabled', label: 'Géofencing', description: 'Alertes de zone géographique' },
                      { key: 'maintenanceReminders', label: 'Rappels de maintenance', description: 'Notifications automatiques' },
                      { key: 'fuelMonitoring', label: 'Surveillance carburant', description: 'Monitoring de la consommation' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={Boolean(fleetSettings[item.key as keyof typeof fleetSettings])}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-trust"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* System Tab */}
            {activeTab === 'system' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Informations système</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-md font-medium text-gray-900 mb-3">Version</h3>
                    <p className="text-sm text-gray-600">v{systemInfo.version}</p>
                    <p className="text-xs text-gray-500 mt-1">Dernière mise à jour: {systemInfo.lastUpdate}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-md font-medium text-gray-900 mb-3">Stockage</h3>
                    <p className="text-sm text-gray-600">{systemInfo.storageUsed} / {systemInfo.totalStorage}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-trust h-2 rounded-full" style={{ width: '15.7%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-md font-medium text-gray-900 mb-3">Base de données</h3>
                    <p className="text-sm text-gray-600">{systemInfo.databaseSize}</p>
                    <p className="text-xs text-gray-500 mt-1">Taille actuelle</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-md font-medium text-gray-900 mb-3">Disponibilité</h3>
                    <p className="text-sm text-gray-600">{systemInfo.uptime}</p>
                    <p className="text-xs text-gray-500 mt-1">Temps de fonctionnement</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Sauvegarde</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Dernière sauvegarde</p>
                        <p className="text-xs text-gray-500">{systemInfo.lastBackup}</p>
                      </div>
                      <button className="text-trust text-sm hover:text-trust">Télécharger</button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Prochaine sauvegarde</p>
                        <p className="text-xs text-gray-500">{systemInfo.nextBackup}</p>
                      </div>
                      <button className="bg-trust text-white px-3 py-1 rounded text-sm hover:bg-trust-dark">Lancer maintenant</button>
                    </div>
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
