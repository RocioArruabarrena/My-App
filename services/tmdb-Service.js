const API_KEY = "cdb8bf0a18250c2f4fe3ec249d1c01a3"
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

export const getMovieDetails = async (movieId = 1038392) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
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