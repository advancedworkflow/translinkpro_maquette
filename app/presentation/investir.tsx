import { CheckCircle, TrendingUp, Shield, Users, Zap, Target } from 'lucide-react'

export default function Investir() {
  const reasons = [
    {
      icon: TrendingUp,
      title: 'Marché informel structuré',
      description: 'Première plateforme à structurer un marché informel de plusieurs milliards de XAF en Afrique Centrale.'
    },
    {
      icon: Shield,
      title: 'Modèle économique diversifié',
      description: 'Revenus via commissions (7-15%), abonnements premium et marketplace avec marge brute de 75%.'
    },
    {
      icon: Users,
      title: 'Partenariats stratégiques',
      description: 'Accords en discussion avancée avec syndicats, bureaux de fret et institutions publiques.'
    },
    {
      icon: Zap,
      title: 'Impact transformateur',
      description: 'Réduction des trajets à vide, formalisation économique et lutte contre la pollution.'
    },
    {
      icon: Target,
      title: 'Expansion progressive',
      description: 'Stratégie de déploiement en 4 phases : Cameroun → CEMAC → CEEAC → Afrique de l\'Ouest.'
    },
    {
      icon: CheckCircle,
      title: 'Solutions adaptées localement',
      description: 'Intégration Mobile Money, paiement différé et adaptation au contexte camerounais.'
    }
  ]

  const investmentDetails = [
    {
      amount: '1,750,000,000 XAF',
      title: 'Financement Initial',
      description: 'Développement technique, opérations, marketing et fonds de roulement',
      timeline: '24 mois'
    },
    {
      amount: '5,000,000,000 XAF',
      title: 'Série A',
      description: 'Expansion régionale et développement de l\'équipe',
      timeline: '2027-2028'
    },
    {
      amount: '15,000,000,000 XAF',
      title: 'Série B',
      description: 'Expansion internationale et acquisitions stratégiques',
      timeline: '2029-2030'
    }
  ]

  return (
    <section className="py-20 bg-trust-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 heading-trust">
            Pourquoi Investir dans TransLink-Pro ?
          </h2>
          <p className="text-xl text-trust-light max-w-4xl mx-auto">
            Une opportunité unique de participer à la révolution de la logistique 
            en Afrique Centrale et de structurer un marché informel de plusieurs milliards de XAF
          </p>
        </div>

        {/* Reasons to Invest */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div key={index} className="card-trust hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-trust-gray-100 rounded-lg flex items-center justify-center mb-6">
                <reason.icon className="w-8 h-8 text-trust-black" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-4 heading-trust">
                {reason.title}
              </h3>
              <p className="text-trust-light">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Investment Rounds */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-12 text-center heading-trust">
            Besoins en Financement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentDetails.map((round, index) => (
              <div key={index} className="card-trust text-center">
                <div className="text-3xl font-bold mb-4 heading-trust-red">
                  {round.amount}
                </div>
                <div className="text-xl font-semibold mb-4 heading-trust">
                  {round.title}
                </div>
                <div className="text-trust-light mb-4">
                  {round.description}
                </div>
                <div className="text-sm text-trust-gray-500">
                  {round.timeline}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funding Breakdown */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center heading-trust">
            Répartition du Financement Initial (1,750,000,000 XAF)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-trust text-center">
              <div className="text-2xl font-bold mb-2 heading-trust-red">150M XAF</div>
              <div className="text-sm text-trust-light">Développement Technique</div>
            </div>
            <div className="card-trust text-center">
              <div className="text-2xl font-bold mb-2 heading-trust-red">420M XAF</div>
              <div className="text-sm text-trust-light">Opérations & Marketing</div>
            </div>
            <div className="card-trust text-center">
              <div className="text-2xl font-bold mb-2 heading-trust-red">80M XAF</div>
              <div className="text-sm text-trust-light">Salaires Équipe Core</div>
            </div>
            <div className="card-trust text-center">
              <div className="text-2xl font-bold mb-2 heading-trust-red">1,000M XAF</div>
              <div className="text-sm text-trust-light">Fonds de Roulement</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center card-trust">
          <h3 className="text-3xl font-bold mb-6 heading-trust">
            Rejoignez-nous dans cette aventure
          </h3>
          <p className="text-lg text-trust-light mb-8 max-w-3xl mx-auto">
            Contactez-nous pour découvrir comment participer à la révolution 
            de la logistique en Afrique Centrale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-trust-primary">
              Contact Investisseurs
            </button>
            <button className="btn-trust-secondary">
              Voir la Présentation
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-trust-light mb-2">
            Pour plus d'informations sur l'investissement
          </p>
          <p className="text-trust">
            Email: <a href="mailto:Keving.mbateng@gmail.com" className="text-trust-red hover:underline">Keving.mbateng@gmail.com</a>
          </p>
          <p className="text-trust mt-2">
            Téléphone: <span className="text-trust-red">+237 695 292 310</span>
          </p>
          <p className="text-trust mt-2">
            Adresse: Bonapriso, 1098 avenue de l'indépendance
          </p>
        </div>
      </div>
    </section>
  )
}
