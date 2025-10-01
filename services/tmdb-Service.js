const API_KEY = "cdb8bf0a18250c2f4fe3ec249d1c01a3"
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

/**
 * Obtiene los detalles de una película por su ID
 */
export async function getMovieDetails(movieId) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`)

    if (!response.ok) {
      throw new Error("Error al obtener los detalles de la película")
    }

    return await response.json()
  } catch (error) {
    console.error("Error en getMovieDetails:", error)
    throw error
  }
}

/**
 * Obtiene películas populares
 */
export async function getPopularMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`)

    if (!response.ok) {
      throw new Error("Error al obtener películas populares")
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error en getPopularMovies:", error)
    throw error
  }
}

/**
 * Obtiene la URL completa de una imagen
 */
export function getImageUrl(path) {
  if (!path) return null
  return `${IMAGE_BASE_URL}${path}`
}

/**
 * Formatea la duración en minutos a horas y minutos
 */
export function formatRuntime(minutes) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}min`
}

/**
 * Formatea la fecha
 */
export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
