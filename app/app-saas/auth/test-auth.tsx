export default function TestAuthPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Test Auth Page
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Cette page teste le routage d'authentification.
        </p>
        
        <div className="space-y-4">
          <a 
            href="/app-saas/auth/login" 
            className="block w-full bg-trust text-white text-center py-2 px-4 rounded hover:bg-trust-dark transition-colors"
          >
            Page de Connexion
          </a>
          
          <a 
            href="/app-saas/auth/register" 
            className="block w-full bg-trust text-white text-center py-2 px-4 rounded hover:bg-trust-dark transition-colors"
          >
            Page d'Inscription
          </a>
          
          <a 
            href="/app-saas" 
            className="block w-full bg-green-500 text-white text-center py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            Dashboard SaaS
          </a>
        </div>
      </div>
    </div>
  )
}


