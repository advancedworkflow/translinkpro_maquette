export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Test Page - TransLink-Pro
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Si vous voyez cette page, le routage Next.js fonctionne correctement.
        </p>
        
        <div className="space-y-4">
          <a 
            href="/app-saas/auth/login" 
            className="block w-full bg-red-500 text-white text-center py-2 px-4 rounded hover:bg-red-600 transition-colors"
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
          
          <a 
            href="/" 
            className="block w-full bg-gray-500 text-white text-center py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          >
            Page d'Accueil
          </a>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Serveur: http://localhost:3001</p>
          <p>Testez chaque lien pour vérifier le fonctionnement</p>
        </div>
      </div>
    </div>
  )
}