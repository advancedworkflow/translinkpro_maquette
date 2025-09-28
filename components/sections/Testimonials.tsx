import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Directrice Logistique',
      company: 'Transport Express',
      content: 'TransLinkPro a révolutionné notre gestion de flotte. Nous avons réduit nos coûts de 30% et amélioré significativement notre efficacité opérationnelle.',
      rating: 5,
      avatar: 'MD'
    },
    {
      name: 'Jean-Pierre Martin',
      role: 'PDG',
      company: 'Logistique Plus',
      content: 'La plateforme est intuitive et les fonctionnalités d\'optimisation des routes sont exceptionnelles. Nos chauffeurs sont plus satisfaits et nos clients aussi.',
      rating: 5,
      avatar: 'JM'
    },
    {
      name: 'Sophie Leroy',
      role: 'Responsable Flotte',
      company: 'Transport Moderne',
      content: 'Les analytics nous donnent une visibilité complète sur nos opérations. Nous pouvons maintenant prendre des décisions basées sur des données concrètes.',
      rating: 5,
      avatar: 'SL'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment TransLinkPro transforme les opérations de transport 
            de nos clients partenaires
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-semibold">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-primary-600">
                    {testimonial.company}
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary-200" />
                <p className="text-gray-600 italic pl-6">
                  "{testimonial.content}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Rejoignez nos clients satisfaits et transformez votre gestion de flotte
          </p>
          <a
            href="/app-saas/auth/register"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Commencer maintenant</span>
          </a>
        </div>
      </div>
    </section>
  )
}



