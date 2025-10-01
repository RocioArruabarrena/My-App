// Servicio para consumir la API de The Movie DB
const API_KEY = "cdb8bf0a18250c2f4fe3ec249d1c01a3"; // Tu API Key
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


/**
 * Obtiene los detalles de una película por su ID
 * @param {number} movieId - ID de la película
 * @returns {Promise<Object>} - Datos de la película
 */
export const getMovieDetails = async (movieId = 1038392) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`
    );

    if (!response.ok) {
      throw new Error("Error al obtener los detalles de la película");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getMovieDetails:", error);
    throw error;
  }
};

export { IMAGE_BASE_URL };
