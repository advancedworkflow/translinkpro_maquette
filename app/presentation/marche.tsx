import { TrendingUp, Globe, Users, DollarSign, MapPin, Building } from 'lucide-react'

export default function Marche() {
  const marketStats = [
    {
      icon: DollarSign,
      value: 'Plusieurs Milliards XAF',
      label: 'Marché logistique Afrique Centrale',
      description: 'Marché informel non structuré'
    },
    {
      icon: Users,
      value: 'Milliers',
      label: 'Transporteurs informels',
      description: 'Au Cameroun et sous-région'
    },
    {
      icon: Building,
      value: 'Milliers',
      label: 'PME et particuliers',
      description: 'Avec besoins logistiques récurrents'
    },
    {
      icon: MapPin,
      value: '5%',
      label: 'Objectif Phase 1',
      description: 'Acquérir 5% du marché camerounais'
    }
  ]

  const opportunities = [
    {
      title: 'Formalisation du secteur informel',
      description: 'Structurer un marché informel de plusieurs milliards de XAF avec accès au crédit et assurance.',
      impact: 'Très fort'
    },
    {
      title: 'Réduction des trajets à vide',
      description: 'Optimiser les retours et réduire l\'empreinte carbone du secteur transport.',
      impact: 'Très fort'
    },
    {
      title: 'Intégration Mobile Money',
      description: 'Solutions de paiement adaptées au contexte local avec MTN Mobile Money et Orange Money.',
      impact: 'Fort'
    },
    {
      title: 'Marketplace de services',
      description: 'Connecter transporteurs avec assureurs, garagistes et vendeurs de pièces.',
      impact: 'Fort'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Marché Cible & Opportunité
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un marché informel de plusieurs milliards de XAF en Afrique Centrale 
            prêt pour la digitalisation et la formalisation
          </p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {marketStats.map((stat, index) => (
            <div key={index} className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary-600" />
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

        {/* Market Opportunities */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Opportunités Clés
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="card">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-semibold text-gray-900">
                    {opportunity.title}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    opportunity.impact === 'Très fort' 
                      ? 'bg-green-100 text-green-800'
                      : opportunity.impact === 'Fort'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {opportunity.impact}
                  </span>
                </div>
                <p className="text-gray-600">
                  {opportunity.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Advantage */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Notre Avantage Concurrentiel
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Première Plateforme Régionale
              </h4>
              <p className="text-gray-600">
                Première plateforme digitale intégrée de mise en relation et d'optimisation logistique en Afrique Centrale.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Écosystème Complet
              </h4>
              <p className="text-gray-600">
                Connecte transporteurs, clients et prestataires dans un écosystème digital unifié avec marketplace intégrée.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Adaptation Locale
              </h4>
              <p className="text-gray-600">
                Solutions adaptées au contexte local : Mobile Money, paiement différé, partenariats avec syndicats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

