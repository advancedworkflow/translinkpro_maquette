'use client'

import Link from 'next/link'
import { Truck } from 'lucide-react'
import RegistrationWizard from '../../../../components/auth/RegistrationWizard'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg bg-trust">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900">TransLinkPro</span>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-gray-900 mb-2">
            Créer votre compte
          </h2>
            <p className="text-gray-600">
            Ou{' '}
              <Link href="/app-saas/auth/login" className="font-medium text-trust hover:underline transition-colors">
              connectez-vous à votre compte existant
            </Link>
          </p>
        </div>

          <RegistrationWizard />
        </div>
      </div>
    </div>
  )
}
