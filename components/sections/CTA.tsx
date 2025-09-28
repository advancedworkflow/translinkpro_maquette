import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function CTA() {
  const benefits = [
    'Essai gratuit de 14 jours',
    'Aucun engagement',
    'Support dédié inclus',
    'Migration gratuite'
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à révolutionner votre gestion de flotte ?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Rejoignez des centaines d'entreprises qui font confiance à TransLinkPro 
            pour optimiser leurs opérations de transport
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-200" />
                <span className="text-primary-100">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/app-saas/auth/register" 
              className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Démarrer gratuitement</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/services/tarifs" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
            >
              Voir les tarifs
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-primary-200 mb-4">
              Déjà utilisé par plus de 50 entreprises
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-sm">Transport Express</div>
              <div className="text-sm">Logistique Plus</div>
              <div className="text-sm">Transport Moderne</div>
              <div className="text-sm">+ 47 autres</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



