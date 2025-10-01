"use client"

import { useState, useEffect } from "react"
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from "react-native"
import { getMovieDetails, getImageUrl, formatRuntime, formatDate } from "../services/tmdb-service"

export default function MovieDetailScreen({ route }) {
  const { movieId } = route.params
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMovieDetails()
  }, [])

  const loadMovieDetails = async () => {
    try {
      const data = await getMovieDetails(movieId)
      setMovie(data)
    } catch (error) {
      console.error("Error cargando detalles:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    )
  }

  if (!movie) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No se pudo cargar la película</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: getImageUrl(movie.backdrop_path || movie.poster_path) }}
        style={styles.backdrop}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>

        <View style={styles.metaContainer}>
          <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
          <Text style={styles.meta}>{formatRuntime(movie.runtime)}</Text>
          <Text style={styles.meta}>{new Date(movie.release_date).getFullYear()}</Text>
        </View>

        <View style={styles.genresContainer}>
          {movie.genres.map((genre) => (
            <View key={genre.id} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Sinopsis</Text>
        <Text style={styles.overview}>{movie.overview}</Text>

        <Text style={styles.sectionTitle}>Información</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Fecha de estreno:</Text>
          <Text style={styles.infoValue}>{formatDate(movie.release_date)}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  centerContainer: {
    flex: 1,
    backgroundColor: "#141414",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  rating: {
    color: "#ffd700",
    fontSize: 16,
    fontWeight: "bold",
  },
  meta: {
    color: "#aaa",
    fontSize: 14,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  genreTag: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  genreText: {
    color: "#fff",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    marginTop: 8,
  },
  overview: {
    color: "#ccc",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  infoLabel: {
    color: "#aaa",
    fontSize: 14,
  },
  infoValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
  },
})
