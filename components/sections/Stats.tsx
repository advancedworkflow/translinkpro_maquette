import { Truck, Users, MapPin, TrendingUp, Globe, DollarSign } from 'lucide-react'

export default function Stats() {
  const stats = [
    {
      icon: Truck,
      value: '500+',
      label: 'Camions ciblés',
      description: 'Phase 1 - Cameroun'
    },
    {
      icon: Users,
      value: '5,000+',
      label: 'Transporteurs',
      description: 'Objectif 2030'
    },
    {
      icon: MapPin,
      value: '4',
      label: 'Pays CEMAC',
      description: 'Expansion Phase 2'
    },
    {
      icon: TrendingUp,
      value: '31.4B XAF',
      label: 'CA Projeté',
      description: 'Objectif 2030'
    },
    {
      icon: Globe,
      value: '10',
      label: 'Pays CEEAC',
      description: 'Expansion Phase 3'
    },
    {
      icon: DollarSign,
      value: '75%',
      label: 'Marge Brute',
      description: 'Modèle économique'
    }
  ]

  const impactStats = [
    {
      title: 'Réduction des trajets à vide',
      value: '40%',
      description: 'Optimisation des retours et réduction de l\'empreinte carbone'
    },
    {
      title: 'Formalisation économique',
      value: '100%',
      description: 'Intégration des acteurs informels dans l\'économie numérique'
    },
    {
      title: 'Temps de mise en relation',
      value: '5 min',
      description: 'Contre plusieurs heures de recherche traditionnelle'
    },
    {
      title: 'Satisfaction client',
      value: '95%',
      description: 'Grâce à la transparence et au suivi en temps réel'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            TransLink-Pro en Chiffres
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des objectifs ambitieux pour révolutionner la logistique en Afrique Centrale
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="card text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Impact Transformateur
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((impact, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {impact.value}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {impact.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {impact.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Opportunity */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Opportunité de Marché
            </h3>
            <p className="text-primary-100 mb-6 max-w-3xl mx-auto">
              Un marché informel de plusieurs milliards de XAF en Afrique Centrale 
              prêt pour la digitalisation et la structuration
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Milliers</div>
                <div className="text-primary-200">Transporteurs informels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Milliers</div>
                <div className="text-primary-200">PME avec besoins logistiques</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5%</div>
                <div className="text-primary-200">Objectif Phase 1 Cameroun</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


