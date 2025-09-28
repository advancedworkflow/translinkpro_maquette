import { Truck, MapPin, BarChart3, Users, Shield, Zap, Clock, DollarSign } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Truck,
      title: 'Gestion de Flotte',
      description: 'Suivi en temps réel de tous vos véhicules avec géolocalisation GPS précise et historique des trajets.',
      benefits: ['Géolocalisation GPS', 'Historique des trajets', 'Maintenance préventive', 'Gestion des chauffeurs']
    },
    {
      icon: MapPin,
      title: 'Optimisation des Routes',
      description: 'IA pour optimiser automatiquement les parcours et réduire les temps de trajet et les coûts.',
      benefits: ['Optimisation IA', 'Réduction des coûts', 'Temps de trajet', 'Planification automatique']
    },
    {
      icon: BarChart3,
      title: 'Analytics Avancées',
      description: 'Tableaux de bord complets avec KPIs, rapports détaillés et insights pour optimiser vos opérations.',
      benefits: ['KPIs en temps réel', 'Rapports détaillés', 'Prédictions', 'Optimisation continue']
    },
    {
      icon: Users,
      title: 'Marketplace Intégrée',
      description: 'Plateforme pour connecter transporteurs et clients avec système de notation et paiements sécurisés.',
      benefits: ['Mise en relation', 'Système de notation', 'Paiements sécurisés', 'Gestion des contrats']
    },
    {
      icon: Shield,
      title: 'Sécurité & Conformité',
      description: 'Protection des données, conformité RGPD et sécurité de bout en bout pour vos informations sensibles.',
      benefits: ['Chiffrement bout en bout', 'Conformité RGPD', 'Sauvegarde automatique', 'Audit de sécurité']
    },
    {
      icon: Zap,
      title: 'Performance & Scalabilité',
      description: 'Interface intuitive, API robuste et infrastructure cloud pour une performance optimale.',
      benefits: ['Interface intuitive', 'API robuste', 'Infrastructure cloud', 'Scalabilité automatique']
    }
  ]

  const stats = [
    {
      icon: Clock,
      value: '30%',
      label: 'Réduction du temps de trajet'
    },
    {
      icon: DollarSign,
      value: '25%',
      label: 'Économies sur les coûts'
    },
    {
      icon: Truck,
      value: '40%',
      label: 'Amélioration de l\'efficacité'
    },
    {
      icon: Users,
      value: '95%',
      label: 'Satisfaction client'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités Complètes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une plateforme tout-en-un pour gérer efficacement votre flotte de transport 
            et optimiser vos opérations logistiques
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="card hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors">
                <feature.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Résultats Concrets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

