'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Truck, CheckCircle } from 'lucide-react'
import AuthWrapper from '../../../components/auth/AuthWrapper'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // Simulate authentication callback
    const timer = setTimeout(() => {
      router.push('/app-saas')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <AuthWrapper>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Connexion réussie !
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Redirection vers votre tableau de bord...
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex items-center justify-center space-x-2">
            <Truck className="w-5 h-5 text-trust animate-pulse" />
            <span className="text-sm text-gray-600">Chargement...</span>
          </div>
        </div>
      </div>
      </div>
    </AuthWrapper>
  )
}