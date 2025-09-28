import { Check, Star, Users, Building, CreditCard, Shield } from 'lucide-react'

export default function Tarification() {
  const transporteurPacks = [
    {
      name: 'TransLink BASIC',
      price: '0 XAF',
      period: '/ mois',
      description: 'Idéal pour les nouveaux transporteurs qui découvrent la plateforme',
      features: [
        'Accès illimité à la plateforme',
        'Réception d\'opportunités de transport',
        'Suivi temps réel (1 point par trajet)',
        'Historique des trajets',
        'Support client standard',
        'Paiement sécurisé'
      ],
      goal: 'Attirer le maximum de transporteurs dans l\'écosystème',
      popular: false,
      icon: Users
    },
    {
      name: 'TransLink PREMIUM',
      price: '25,000 XAF',
      period: '/ mois par camion',
      description: 'Conçu pour les grands transporteurs et flottes professionnelles',
      features: [
        'Assurance marchandise 100% incluse',
        'Support client prioritaire',
        'Outil de contrôle et gestion de flotte (multi-camions)',
        'Paiement cash garanti à la livraison',
        'Suivi temps réel illimité + notifications automatiques',
        'Cashback de 10% sur les commissions du premier trajet chaque mois',
        'Commission réduite',
        'Réductions exclusives partenaires (10% garages, 15% pneus & lubrifiants)',
        'Accès aux appels d\'offres PME & coopératives locales',
        'Accès prioritaire aux gros contrats industriels',
        'Badge PREMIUM (classement en tête des résultats)'
      ],
      goal: 'Séduire les acteurs sérieux et professionnels du marché',
      popular: true,
      icon: Star
    }
  ]

  const partenairePacks = [
    {
      name: 'Pack BASIC',
      price: '50,000 XAF',
      period: '/ mois',
      description: 'Visibilité renforcée pour les prestataires de services',
      features: [
        'Visibilité renforcée (mise en avant dans la section marketplace)',
        'Promotions ciblées',
        'Commission réduite sur ventes via la plateforme (5% au lieu de 7%)',
        'Offres spéciales visibles directement par les transporteurs PRO & PREMIUM',
        'Statistiques avancées (taux de conversion, géolocalisation des clients)',
        'Accès aux campagnes marketing co-brandées avec TransLink-Pro'
      ],
      goal: 'Séduire les acteurs sérieux et professionnels du marché',
      popular: false,
      icon: Building
    },
    {
      name: 'Pack PREMIUM',
      price: '2,000,000 XAF',
      period: '/ an',
      description: 'Partenariat stratégique pour les grands acteurs',
      features: [
        'Partenariat stratégique : visibilité maximale (logo dans l\'appli, événements trust)',
        'Accès exclusif aux données & analytics sectoriels (tableaux de bord)',
        'Accès direct aux clients B2B ciblés (PME, coopératives, transporteurs premium)',
        'Commission la plus basse du marché (3%)',
        'Accès à un compte partenaire dédié avec support personnalisé',
        'Invitations prioritaires aux événements trust & networking'
      ],
      goal: 'Séduire les grands assureurs, groupes de garages, vendeurs de pièces et multinationales',
      popular: true,
      icon: Star
    }
  ]

  const paymentMethods = [
    {
      icon: CreditCard,
      title: 'Mobile Money',
      description: 'Intégration native MTN Mobile Money et Orange Money pour des paiements simples et universels'
    },
    {
      icon: Shield,
      title: 'Paiement Bancaire',
      description: 'Paiement par chèque ou virement bancaire via une passerelle de paiement sécurisée'
    },
    {
      icon: Building,
      title: 'Paiement Différé',
      description: 'Paiement différé pour les entreprises (sous 15-30 jours) contre validation de solvabilité'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Modèle Économique & Tarification
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des packs adaptés à chaque acteur de l'écosystème logistique 
            avec des solutions de paiement locales
          </p>
        </div>

        {/* Transporteur Packs */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Packs Transporteurs
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {transporteurPacks.map((pack, index) => (
              <div key={index} className={`card relative ${pack.popular ? 'ring-2 ring-primary-500' : ''}`}>
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Populaire
                    </span>
                  </div>
                )}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <pack.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{pack.name}</h4>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-primary-600">{pack.price}</span>
                      <span className="text-gray-500 ml-1">{pack.period}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{pack.description}</p>
                <ul className="space-y-3 mb-6">
                  {pack.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <strong>Objectif :</strong> {pack.goal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partenaire Packs */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Packs Partenaires Marketplace
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {partenairePacks.map((pack, index) => (
              <div key={index} className={`card relative ${pack.popular ? 'ring-2 ring-primary-500' : ''}`}>
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Premium
                    </span>
                  </div>
                )}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <pack.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{pack.name}</h4>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-primary-600">{pack.price}</span>
                      <span className="text-gray-500 ml-1">{pack.period}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{pack.description}</p>
                <ul className="space-y-3 mb-6">
                  {pack.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <strong>Objectif :</strong> {pack.goal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Solutions de Paiement
          </h3>
          <div className="bg-white rounded-2xl p-8">
            <p className="text-center text-gray-600 mb-8">
              Système de paiement adapté au contexte local camerounais
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {paymentMethods.map((method, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Model */}
        <div className="mt-16 bg-white rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Sources de Revenus
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Commission sur Transaction
              </h4>
              <p className="text-gray-600 mb-4">
                7-15% sur chaque opération de transport
              </p>
              <div className="text-2xl font-bold text-primary-600">
                Revenus principaux
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Abonnements Premium
              </h4>
              <p className="text-gray-600 mb-4">
                Accès à des fonctionnalités avancées pour transporteurs
              </p>
              <div className="text-2xl font-bold text-primary-600">
                Revenus récurrents
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Marketplace Prestataires
              </h4>
              <p className="text-gray-600 mb-4">
                Location d'espace + commission de vente sur chaque produit
              </p>
              <div className="text-2xl font-bold text-primary-600">
                Revenus complémentaires
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


