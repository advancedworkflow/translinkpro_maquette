'use client'

import { useState } from 'react'
import { MapPin, TrendingUp, Users, Clock, DollarSign } from 'lucide-react'

interface LocalizedContentProps {
  type: 'hero' | 'kpi' | 'testimonial' | 'case-study'
  data?: any
}

export default function LocalizedContent({ type, data }: LocalizedContentProps) {
  switch (type) {
    case 'hero':
      return <HeroContent />
    case 'kpi':
      return <KPIContent data={data} />
    case 'testimonial':
      return <TestimonialContent data={data} />
    case 'case-study':
      return <CaseStudyContent data={data} />
    default:
      return null
  }
}

// Contenu Hero avec références locales
function HeroContent() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Optimisez votre transport au{' '}
          <span className="text-trust">Cameroun</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Rejoignez plus de 500 transporteurs qui économisent en moyenne{' '}
          <span className="font-semibold text-trust">450,000 XAF/mois</span>{' '}
          grâce à notre plateforme intelligente
        </p>
      </div>

      {/* Métriques locales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold text-trust mb-2">25%</div>
          <div className="text-sm text-gray-600">Réduction des coûts carburant</div>
          <div className="text-xs text-gray-500 mt-1">Route Douala-Yaoundé</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-trust mb-2">98%</div>
          <div className="text-sm text-gray-600">Livraisons à l'heure</div>
          <div className="text-xs text-gray-500 mt-1">Zone CEMAC</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-trust mb-2">2.5M XAF</div>
          <div className="text-sm text-gray-600">Revenus moyens/mois</div>
          <div className="text-xs text-gray-500 mt-1">Transporteurs actifs</div>
        </div>
      </div>
    </div>
  )
}

// KPIs avec données locales
function KPIContent({ data }: { data?: any }) {
  const localKPIs = [
    {
      title: 'Économies carburant',
      value: '325,000 XAF',
      change: '+18%',
      description: 'Ce mois vs mois dernier',
      context: 'Route Douala-Libreville optimisée'
    },
    {
      title: 'Temps de trajet',
      value: '4h 30min',
      change: '-25min',
      description: 'Temps moyen réduit',
      context: 'Douala → Yaoundé'
    },
    {
      title: 'Satisfaction client',
      value: '4.8/5',
      change: '+0.3',
      description: 'Note moyenne',
      context: 'Basée sur 150 évaluations'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {localKPIs.map((kpi, index) => (
        <div key={index} className="kpi-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-primary">{kpi.title}</h3>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">{kpi.change}</span>
            </div>
          </div>
          <div className="kpi-value text-trust mb-2">{kpi.value}</div>
          <div className="text-sm text-gray-600 mb-1">{kpi.description}</div>
          <div className="text-xs text-gray-500">{kpi.context}</div>
        </div>
      ))}
    </div>
  )
}

// Témoignages avec références locales
function TestimonialContent({ data }: { data?: any }) {
  const testimonials = [
    {
      name: 'Jean-Baptiste Manga',
      company: 'Transport Manga SARL',
      location: 'Douala',
      quote: 'Depuis que j\'utilise TransLink-Pro, mes revenus ont augmenté de 40%. Je fais maintenant 2.8M XAF par mois contre 2M avant.',
      savings: '800,000 XAF/mois',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Marie-Claire Nguema',
      company: 'Flotte Nguema',
      location: 'Libreville',
      quote: 'La réduction des kilomètres à vide m\'a fait économiser 300,000 XAF ce mois. L\'optimisation des trajets est remarquable.',
      savings: '300,000 XAF/mois',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Pierre Essomba',
      company: 'Transport Essomba',
      location: 'Yaoundé',
      quote: 'Mes clients sont plus satisfaits grâce aux livraisons à l\'heure. Mon taux de satisfaction est passé à 98%.',
      savings: '25% de clients en plus',
      image: '/api/placeholder/60/60'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Ils ont transformé leur business
        </h2>
        <p className="text-gray-600">
          Découvrez comment nos clients optimisent leurs revenus en Afrique Centrale
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="dashboard-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-trust rounded-full flex items-center justify-center text-white font-semibold">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-primary">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {testimonial.location}
                </div>
              </div>
            </div>
            
            <blockquote className="text-gray-700 mb-4 italic">
              "{testimonial.quote}"
            </blockquote>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800">Économies réalisées</span>
                <span className="text-lg font-bold text-green-600">{testimonial.savings}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Études de cas locales
function CaseStudyContent({ data }: { data?: any }) {
  const caseStudies = [
    {
      title: 'Transport Manga SARL - Douala',
      challenge: 'Réduire les coûts de carburant sur la route Douala-Yaoundé',
      solution: 'Optimisation des trajets et suivi en temps réel',
      results: [
        { metric: 'Économies carburant', value: '450,000 XAF/mois', change: '+35%' },
        { metric: 'Temps de trajet', value: '4h 15min', change: '-45min' },
        { metric: 'Satisfaction client', value: '4.9/5', change: '+0.8' }
      ],
      quote: 'TransLink-Pro a révolutionné notre façon de travailler. Nous sommes plus efficaces et rentables.',
      author: 'Jean-Baptiste Manga, PDG'
    },
    {
      title: 'Flotte Nguema - Libreville',
      challenge: 'Améliorer la gestion de flotte de 15 véhicules',
      solution: 'Dashboard centralisé et alertes intelligentes',
      results: [
        { metric: 'Disponibilité flotte', value: '96%', change: '+12%' },
        { metric: 'Coûts maintenance', value: '180,000 XAF/mois', change: '-25%' },
        { metric: 'Revenus totaux', value: '3.2M XAF/mois', change: '+28%' }
      ],
      quote: 'La visibilité en temps réel sur nos véhicules nous a permis d\'optimiser nos opérations.',
      author: 'Marie-Claire Nguema, Directrice'
    }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Études de cas réussies
        </h2>
        <p className="text-gray-600">
          Découvrez comment nos clients ont transformé leur business
        </p>
      </div>

      {caseStudies.map((study, index) => (
        <div key={index} className="dashboard-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">{study.title}</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Défi initial</h4>
                  <p className="text-gray-600">{study.challenge}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Solution TransLink-Pro</h4>
                  <p className="text-gray-600">{study.solution}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <blockquote className="italic text-gray-700 mb-2">
                    "{study.quote}"
                  </blockquote>
                  <cite className="text-sm text-gray-600">— {study.author}</cite>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Résultats obtenus</h4>
              <div className="space-y-4">
                {study.results.map((result, resultIndex) => (
                  <div key={resultIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{result.metric}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-trust">{result.value}</div>
                      <div className="text-sm text-green-600">{result.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Composant pour les prix en XAF
export function XAFPrice({ amount, className = '' }: { amount: number, className?: string }) {
  const formatted = new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)

  return (
    <span className={className}>
      {formatted}
    </span>
  )
}

// Composant pour les distances locales
export function LocalDistance({ 
  from, 
  to, 
  distance, 
  className = '' 
}: { 
  from: string, 
  to: string, 
  distance: number, 
  className?: string 
}) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <MapPin className="w-4 h-4 text-trust" />
      <span className="text-sm">
        {from} → {to}
      </span>
      <span className="text-xs text-gray-500">
        ({distance} km)
      </span>
    </div>
  )
}

// Composant pour les temps de trajet locaux
export function LocalTravelTime({ 
  route, 
  time, 
  className = '' 
}: { 
  route: string, 
  time: string, 
  className?: string 
}) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Clock className="w-4 h-4 text-trust" />
      <span className="text-sm">{route}</span>
      <span className="text-xs text-gray-500">({time})</span>
    </div>
  )
}
