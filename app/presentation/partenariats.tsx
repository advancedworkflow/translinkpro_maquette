import { Building, Users, Globe, Handshake, Target, TrendingUp } from 'lucide-react'

export default function Partenariats() {
  const strategicPartners = [
    {
      icon: Building,
      title: 'Bureaux de Fret',
      partners: [
        'BGFT (Bureau de Gestion de Fret Terrestre)',
        'BARC (Bureau d\'Affrètement Routier Centrafricain)',
        'BNF (Bureau National de Fret Tchadien)'
      ],
      description: 'Partenariats pour l\'onboarding massif des transporteurs'
    },
    {
      icon: Users,
      title: 'Syndicats Transporteurs',
      partners: [
        'GTTC (Groupement des Transporteurs du Cameroun)',
        'SNTRC (Syndicat National des Transporteurs Routiers)',
        'SYNCPROTCAM (Syndicat des Professionnels du Transport)'
      ],
      description: 'Accès direct aux milliers de transporteurs membres'
    },
    {
      icon: Globe,
      title: 'Institutions Publiques',
      partners: [
        'Chambres de Commerce',
        'Ministères du Transport',
        'ONG et Sociétés d\'études'
      ],
      description: 'Support institutionnel et facilitation réglementaire'
    },
    {
      icon: Handshake,
      title: 'Prestataires Services',
      partners: [
        'Grands assureurs nationaux',
        'Réseaux de garagistes',
        'Distributeurs de pièces détachées',
        'CAMTRACK (compagnie de tracking)'
      ],
      description: 'Enrichissement de la marketplace avec services spécialisés'
    }
  ]

  const b2bTargets = [
    {
      icon: Target,
      title: 'Sociétés Maritimes',
      description: 'Gestion de la logistique terrestre pour les ports'
    },
    {
      icon: Target,
      title: 'Entreprises Minières',
      description: 'Transport de matériel et personnel vers les sites'
    },
    {
      icon: Target,
      title: 'Agro-industrielles',
      description: 'Logistique pour l\'exportation de produits agricoles'
    },
    {
      icon: Target,
      title: 'Distributeurs',
      description: 'Optimisation de la chaîne d\'approvisionnement'
    },
    {
      icon: Target,
      title: 'Transitaires',
      description: 'Intégration dans les services de transit international'
    }
  ]

  const expansionPhases = [
    {
      phase: 'Phase 1 (2026-2027)',
      scope: 'Douala, Yaoundé, Kribi, Bafoussam et corridors nationaux',
      icon: TrendingUp
    },
    {
      phase: 'Phase 2 (2027-2028)',
      scope: 'Extension Cameroun + connexion corridors internationaux CEMAC',
      icon: TrendingUp
    },
    {
      phase: 'Phase 3 (2028-2030)',
      scope: 'Déploiement dans toute la CEEAC (10 pays)',
      icon: TrendingUp
    },
    {
      phase: 'Phase 4 (2030)',
      scope: 'Implantation en Afrique de l\'Ouest',
      icon: TrendingUp
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Partenariats Stratégiques
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des accords en discussion avancée avec les acteurs clés du secteur 
            pour un déploiement rapide et efficace
          </p>
        </div>

        {/* Strategic Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Partenaires Institutionnels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {strategicPartners.map((partner, index) => (
              <div key={index} className="card">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <partner.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {partner.title}
                </h4>
                <p className="text-gray-600 mb-4">
                  {partner.description}
                </p>
                <ul className="space-y-2">
                  {partner.partners.map((partnerName, partnerIndex) => (
                    <li key={partnerIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                      {partnerName}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* B2B Targets */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Contrats B2B Visés
          </h3>
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-center text-gray-600 mb-8">
              Nous visons la signature de contrats entreprise avec de grandes sociétés 
              pour gérer tout ou partie de leur logistique via notre plateforme
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {b2bTargets.map((target, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <target.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {target.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {target.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expansion Phases */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Stratégie de Déploiement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expansionPhases.map((phase, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <phase.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {phase.phase}
                  </h4>
                </div>
                <p className="text-gray-600">
                  {phase.scope}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


