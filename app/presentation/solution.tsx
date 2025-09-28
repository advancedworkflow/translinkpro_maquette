import { Truck, MapPin, BarChart3, Users, Shield, Zap } from 'lucide-react'

export default function Solution() {
  const features = [
    {
      icon: Truck,
      title: 'Gestion de Flotte',
      description: 'Suivi en temps réel de tous vos véhicules avec géolocalisation GPS précise.'
    },
    {
      icon: MapPin,
      title: 'Tracking Avancé',
      description: 'Monitoring des routes, temps de trajet et optimisation automatique des parcours.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Tableaux de bord complets avec KPIs et rapports détaillés pour optimiser vos opérations.'
    },
    {
      icon: Users,
      title: 'Marketplace',
      description: 'Plateforme intégrée pour connecter transporteurs et clients avec système de notation.'
    },
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'Protection des données et conformité RGPD avec chiffrement de bout en bout.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Interface intuitive et API robuste pour une intégration facile et rapide.'
    }
  ]

  return (
    <section className="py-20 bg-trust-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 heading-trust">
            Notre Solution
          </h2>
          <p className="text-xl text-trust-light max-w-4xl mx-auto">
            Une plateforme complète qui transforme la gestion de flotte de transport 
            grâce à la technologie et l'innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-trust hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-trust-gray-100 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-trust-black" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-4 heading-trust">
                {feature.title}
              </h3>
              <p className="text-trust-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Problem & Solution */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-8 heading-trust-red">
              Le Problème
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-trust-red rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-trust-light">
                  Gestion manuelle et dispersée des véhicules et chauffeurs
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-trust-red rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-trust-light">
                  Manque de visibilité sur les performances et coûts réels
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-trust-red rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-trust-light">
                  Difficultés à optimiser les routes et réduire les coûts
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-trust-red rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-trust-light">
                  Absence de marketplace pour connecter offre et demande
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-8 heading-trust">
              Notre Solution
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-trust-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-trust-light">
                  Plateforme unifiée pour gérer toute votre flotte en temps réel
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-trust-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-trust-light">
                  Analytics avancées pour optimiser les performances et réduire les coûts
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-trust-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-trust-light">
                  IA pour l'optimisation automatique des routes et la prédiction
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-trust-black rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-trust-light">
                  Marketplace intégrée pour maximiser l'utilisation des véhicules
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
