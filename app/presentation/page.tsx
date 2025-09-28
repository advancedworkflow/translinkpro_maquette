import Solution from './solution'
import Marche from './marche'
import Projections from './projections'
import Investir from './investir'

export default function PresentationPage() {
  return (
    <div className="min-h-screen bg-trust-white">
      {/* Hero Section */}
      <section className="bg-trust-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 heading-trust">
              TransLinkPro
            </h1>
            <p className="text-2xl md:text-3xl mb-8 heading-trust-red">
              Révolutionner la gestion de flotte de transport
            </p>
            <p className="text-lg text-trust-light max-w-4xl mx-auto mb-12">
              Plateforme SaaS complète pour optimiser la gestion de flotte, 
              réduire les coûts et améliorer l'efficacité opérationnelle.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-trust-primary">
                🔴 Investir maintenant
              </button>
              <button className="btn-trust-secondary">
                ⚫ Demander une démo
              </button>
            </div>
          </div>
        </div>
      </section>

      <Solution />
      <Marche />
      <Projections />
      <Investir />
    </div>
  )
}
