export default function SimpleDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard Simple</h1>
      <p className="text-gray-600">Cette page teste le dashboard sans composants complexes.</p>
      
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Statistiques</h3>
          <p className="text-sm text-gray-600">24 chauffeurs actifs</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Flotte</h3>
          <p className="text-sm text-gray-600">32 camions</p>
        </div>
      </div>
    </div>
  )
}


