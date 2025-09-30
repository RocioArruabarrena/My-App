export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Aplicación de Películas TMDb - React Native</h1>
      <p className="mb-4">Esta es una aplicación React Native con Expo Go para mostrar películas de TMDb.</p>
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Archivos del proyecto:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>services/tmdbService.js - Servicio de API</li>
          <li>screens/MoviesScreen.js - Pantalla principal</li>
          <li>screens/MovieDetailScreen.js - Pantalla de detalle</li>
          <li>App.js - Navegación</li>
          <li>package.json - Dependencias</li>
          <li>app.json - Configuración Expo</li>
          <li>README.md - Documentación</li>
        </ul>
      </div>
    </div>
  )
}