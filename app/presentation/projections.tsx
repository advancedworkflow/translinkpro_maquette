import { TrendingUp, DollarSign, Users, BarChart3 } from 'lucide-react'

export default function Projections() {
  const projections = [
    {
      year: '2026',
      revenue: '3,144,000,000 XAF',
      users: '500',
      growth: 'Lancement'
    },
    {
      year: '2027',
      revenue: '6,288,000,000 XAF',
      users: '1,000',
      growth: '+100%'
    },
    {
      year: '2028',
      revenue: '12,576,000,000 XAF',
      users: '2,000',
      growth: '+100%'
    },
    {
      year: '2029',
      revenue: '25,152,000,000 XAF',
      users: '3,500',
      growth: '+100%'
    },
    {
      year: '2030',
      revenue: '31,440,000,000 XAF',
      users: '5,000',
      growth: '+25%'
    }
  ]

  const keyMetrics = [
    {
      icon: DollarSign,
      title: 'Chiffre d\'affaires',
      value: '31,440,000,000 XAF',
      period: '2030',
      description: 'Croissance exponentielle basée sur 5000 camions'
    },
    {
      icon: Users,
      title: 'Camions actifs',
      value: '5,000+',
      period: '2030',
      description: 'Transporteurs sur la plateforme'
    },
    {
      icon: BarChart3,
      title: 'Marge brute',
      value: '75%',
      period: '2030',
      description: 'Modèle commission + abonnements'
    },
    {
      icon: TrendingUp,
      title: 'Trajets annuels',
      value: '780,000',
      period: '2030',
      description: '6 trajets/semaine par camion'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Projections Financières
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Croissance basée sur un modèle commission + abonnements avec expansion progressive 
            en Afrique Centrale et de l'Ouest
          </p>
        </div>

        {/* Revenue Projections Table */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Projections de Croissance
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Année</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Chiffre d'affaires</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Camions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Croissance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projections.map((projection, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {projection.year}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {projection.revenue}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {projection.users}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {projection.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {metric.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {metric.title}
              </div>
              <div className="text-sm text-gray-500 mb-2">
                {metric.period}
              </div>
              <div className="text-sm text-gray-600">
                {metric.description}
              </div>
            </div>
          ))}
        </div>

        {/* Business Model */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Hypothèses de Gains
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Commission Transport
              </h4>
              <p className="text-gray-600 mb-4">
                7-15% sur chaque opération de transport
              </p>
              <div className="text-2xl font-bold text-primary-600">
                3,120,000,000 XAF/an
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Abonnements Premium
              </h4>
              <p className="text-gray-600 mb-4">
                25,000 XAF/mois par camion premium
              </p>
              <div className="text-2xl font-bold text-primary-600">
                24,000,000 XAF/an
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Marketplace
              </h4>
              <p className="text-gray-600 mb-4">
                Packs partenaires + commissions ventes
              </p>
              <div className="text-2xl font-bold text-primary-600">
                34,000,000 XAF/an
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

