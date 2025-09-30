// Servicio para consumir la API de The Movie DB
const API_KEY = "cdb8bf0a18250c2f4fe3ec249d1c01a3" // Reemplazar con tu API key de TMDb
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

/**
 * Obtiene los detalles de una película por su ID
 * @param {number} movieId - ID de la película
 * @returns {Promise<Object>} - Datos de la película
 */
export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`)

    if (!response.ok) {
      throw new Error("Error al obtener los detalles de la película")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error en getMovieDetails:", error)
    throw error
  }
}

/**
 * Obtiene películas populares
 * @returns {Promise<Array>} - Lista de películas populares
 */
export const getPopularMovies = async () => {
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