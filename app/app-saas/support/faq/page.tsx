'use client'

import { useState } from 'react'
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  BookOpen,
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react'

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqCategories = [
    {
      id: 'getting-started',
      name: 'Premiers pas',
      icon: BookOpen,
      questions: [
        {
          id: 1,
          question: 'Comment créer mon compte TransLink-Pro ?',
          answer: 'Pour créer votre compte, cliquez sur "S\'inscrire" sur la page d\'accueil, remplissez le formulaire avec vos informations d\'entreprise et validez votre email. Un représentant vous contactera dans les 24h pour finaliser l\'activation.'
        },
        {
          id: 2,
          question: 'Quels sont les prérequis pour utiliser la plateforme ?',
          answer: 'Vous devez avoir une entreprise de transport légale, un ordinateur ou smartphone avec connexion internet, et des véhicules équipés de dispositifs GPS compatibles (nous pouvons vous aider à les installer).'
        },
        {
          id: 3,
          question: 'Comment configurer mon premier véhicule ?',
          answer: 'Allez dans la section "Flotte" > "Camions" > "Ajouter un camion". Remplissez les informations du véhicule, téléchargez les documents requis (carte grise, assurance) et notre équipe validera l\'ajout sous 24h.'
        }
      ]
    },
    {
      id: 'fleet-management',
      name: 'Gestion de flotte',
      icon: HelpCircle,
      questions: [
        {
          id: 4,
          question: 'Comment ajouter un nouveau chauffeur ?',
          answer: 'Dans la section "Flotte" > "Chauffeurs", cliquez sur "Ajouter un chauffeur". Remplissez ses informations personnelles, téléchargez son permis de conduire et ses documents d\'identité. Le chauffeur recevra ses identifiants par SMS.'
        },
        {
          id: 5,
          question: 'Puis-je assigner un chauffeur à plusieurs véhicules ?',
          answer: 'Oui, un chauffeur peut être assigné à plusieurs véhicules selon les besoins de votre entreprise. Vous pouvez gérer ces assignations depuis le profil du chauffeur ou depuis la fiche du véhicule.'
        },
        {
          id: 6,
          question: 'Comment programmer la maintenance de mes véhicules ?',
          answer: 'Allez dans "Flotte" > "Maintenance" > "Planifier". Sélectionnez le véhicule, le type d\'intervention, la date et l\'atelier. Le système vous enverra des rappels automatiques.'
        }
      ]
    },
    {
      id: 'tracking',
      name: 'Suivi et tracking',
      icon: HelpCircle,
      questions: [
        {
          id: 7,
          question: 'Comment fonctionne le tracking GPS en temps réel ?',
          answer: 'Nos dispositifs GPS envoient la position de vos véhicules toutes les 30 secondes. Vous pouvez voir leur localisation, vitesse, direction et statut sur la carte interactive. Les données sont mises à jour en temps réel.'
        },
        {
          id: 8,
          question: 'Que faire si un véhicule n\'apparaît pas sur la carte ?',
          answer: 'Vérifiez d\'abord la connexion internet du véhicule. Si le problème persiste, contactez notre support technique. Nous pouvons diagnostiquer à distance et si nécessaire, envoyer un technicien sur site.'
        },
        {
          id: 9,
          question: 'Puis-je recevoir des alertes en cas de problème ?',
          answer: 'Oui, vous pouvez configurer des alertes pour : excès de vitesse, sortie de zone autorisée, panne moteur, vol, et bien d\'autres. Les alertes sont envoyées par SMS, email et notification push.'
        }
      ]
    },
    {
      id: 'billing',
      name: 'Facturation et paiements',
      icon: HelpCircle,
      questions: [
        {
          id: 10,
          question: 'Comment fonctionne la facturation ?',
          answer: 'Nous facturons mensuellement selon votre forfait. Vous recevez une facture détaillée par email le 1er de chaque mois. Le paiement se fait par virement bancaire, mobile money ou carte bancaire.'
        },
        {
          id: 11,
          question: 'Puis-je changer de forfait en cours d\'abonnement ?',
          answer: 'Oui, vous pouvez changer de forfait à tout moment. Le changement prend effet au prochain cycle de facturation. Les différences de prix sont calculées au prorata.'
        },
        {
          id: 12,
          question: 'Que se passe-t-il en cas de retard de paiement ?',
          answer: 'Un rappel automatique est envoyé 3 jours avant échéance. En cas de retard, un second rappel est envoyé. Après 15 jours de retard, l\'accès peut être temporairement suspendu jusqu\'au règlement.'
        }
      ]
    }
  ]

  const toggleItem = (itemId: number) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Questions fréquentes</h1>
        <p className="text-gray-600">Trouvez rapidement les réponses aux questions les plus courantes</p>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher dans les FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent"
          />
        </div>
      </div>

      {/* Quick Help */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <MessageCircle className="w-12 h-12 text-trust mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-black mb-2">Chat en direct</h3>
          <p className="text-gray-600 mb-4">Obtenez une aide immédiate</p>
          <button className="bg-trust text-white px-4 py-2 rounded-lg hover:bg-trust-dark transition-colors">
            Démarrer le chat
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <Phone className="w-12 h-12 text-trust mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-black mb-2">Appeler le support</h3>
          <p className="text-gray-600 mb-4">+237 6XX XX XX XX</p>
          <button className="bg-trust text-white px-4 py-2 rounded-lg hover:bg-trust-dark transition-colors">
            Appeler
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <Mail className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-black mb-2">Envoyer un email</h3>
          <p className="text-gray-600 mb-4">support@translink-pro.cm</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            Envoyer
          </button>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white border border-gray-200 rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <category.icon className="w-6 h-6 text-trust mr-3" />
                <h2 className="text-xl font-semibold text-black">{category.name}</h2>
                <span className="ml-auto text-sm text-gray-500">
                  {category.questions.length} questions
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {category.questions.map((question) => (
                <div key={question.id} className="p-6">
                  <button
                    onClick={() => toggleItem(question.id)}
                    className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <h3 className="text-lg font-medium text-black pr-4">
                      {question.question}
                    </h3>
                    {openItems.includes(question.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {openItems.includes(question.id) && (
                    <div className="mt-4 pl-2">
                      <p className="text-gray-700 leading-relaxed">
                        {question.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune question trouvée</h3>
          <p className="text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="bg-trust text-white px-4 py-2 rounded-lg hover:bg-trust-dark transition-colors"
          >
            Réinitialiser la recherche
          </button>
        </div>
      )}

      {/* Contact CTA */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-black mb-2">Vous ne trouvez pas votre réponse ?</h3>
        <p className="text-gray-600 mb-6">
          Notre équipe de support est là pour vous aider. Contactez-nous et nous vous répondrons rapidement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-trust text-white px-6 py-3 rounded-lg hover:bg-trust-dark transition-colors">
            Contacter le support
          </button>
          <button className="border border-trust text-trust px-6 py-3 rounded-lg hover:bg-red-50 transition-colors">
            Créer un ticket
          </button>
        </div>
      </div>
    </div>
  )
}


