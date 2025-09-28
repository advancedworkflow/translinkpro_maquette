'use client'

import { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  User,
  MessageSquare,
  FileText,
  Star
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    priority: 'medium',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const priorityOptions = [
    { value: 'low', label: 'Faible', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Moyen', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'Élevé', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-blue-100 text-trust' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simuler l'envoi
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setShowSuccess(true)
    
    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      priority: 'medium',
      message: ''
    })
    
    // Masquer le message de succès après 5 secondes
    setTimeout(() => setShowSuccess(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Contactez-nous</h1>
          <p className="text-gray-600">Notre équipe de support est là pour vous aider</p>
        </div>

        {/* Message de succès */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-trust mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-trust">Numéro de ticket: #TKT-2024-001234</p>
                <p className="text-sm text-trust">Vous pouvez suivre l'état de votre demande dans la section Tickets.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-6">Informations de contact</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-trust rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Téléphone</h3>
                    <p className="text-gray-600">+237 6XX XX XX XX</p>
                    <p className="text-sm text-gray-500">Lun-Ven: 8h-18h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-trust rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">support@translinkpro.cm</p>
                    <p className="text-sm text-gray-500">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-trust rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Adresse</h3>
                    <p className="text-gray-600">Douala, Cameroun</p>
                    <p className="text-sm text-gray-500">Bureau principal</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full bg-trust text-white py-3 px-4 rounded-lg hover:bg-trust-dark transition-colors flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat en direct
                </button>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-6">Envoyez-nous un message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700"
                      placeholder="+237 6XX XX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priorité
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700"
                    >
                      {priorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700"
                    placeholder="Résumé de votre demande"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700 resize-none"
                    placeholder="Décrivez votre problème ou votre question en détail..."
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    Temps de réponse moyen: 2-4 heures
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-trust text-white px-8 py-3 rounded-lg hover:bg-trust-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}