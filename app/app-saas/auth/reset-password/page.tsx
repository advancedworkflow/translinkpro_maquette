'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Truck, Mail, ArrowLeft } from 'lucide-react'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
    console.log('Password reset request for:', email)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* Logo */}
            <div className="flex justify-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">TransLinkPro</span>
              </Link>
            </div>
            
            <div className="mt-8 bg-white py-8 px-4 shadow-sm border border-gray-200 sm:rounded-lg sm:px-10">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="mt-6 text-2xl font-light text-gray-900">
                  Email envoyé
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Vérifiez votre boîte de réception et suivez les instructions pour réinitialiser votre mot de passe.
                </p>
                <div className="mt-6">
                  <Link
                    href="/app-saas/auth/login"
                    className="inline-flex items-center text-sm font-medium text-gray-800 hover:text-gray-600"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour à la connexion
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">TransLinkPro</span>
            </Link>
          </div>
          
          <h2 className="mt-6 text-center text-3xl font-light text-gray-900">
            Mot de passe oublié
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-sm border border-gray-200 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Envoyer le lien de réinitialisation
                </button>
              </div>

              <div className="text-center">
                <Link
                  href="/app-saas/auth/login"
                  className="inline-flex items-center text-sm font-medium text-gray-800 hover:text-gray-600"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à la connexion
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

