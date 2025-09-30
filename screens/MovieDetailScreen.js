"use client"

import { useState, useEffect } from "react"
import {View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, SafeAreaView, StatusBar, TouchableOpacity} from "react-native"
import { getMovieDetails, getImageUrl, formatRuntime, formatDate } from "../services/tmdbService"

export default function MovieDetailScreen({ route, navigation }) {
  const { movieId } = route.params
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadMovieDetails()
  }, [movieId])

  const loadMovieDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getMovieDetails(movieId)
      setMovie(data)
    } catch (err) {
      setError("Error al cargar los detalles de la película.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={styles.loadingText}>Cargando detalles...</Text>
      </View>
    )
  }

  if (error || !movie) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || "Película no encontrada"}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Backdrop Image */}
        <View style={styles.backdropContainer}>
          <Image source={{ uri: getImageUrl(movie.backdrop_path) }} style={styles.backdrop} resizeMode="cover" />
          <View style={styles.backdropOverlay} />
          <TouchableOpacity style={styles.backButtonTop} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonIcon}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Movie Content */}
        <View style={styles.content}>
          {/* Poster and Basic Info */}
          <View style={styles.headerSection}>
            <Image source={{ uri: getImageUrl(movie.poster_path) }} style={styles.poster} resizeMode="cover" />
            <View style={styles.basicInfo}>
              <Text style={styles.title}>{movie.title}</Text>
              <View style={styles.metaInfo}>
                <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
              </View>
            </View>
          </View>

          {/* Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sinopsis</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detalles</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fecha de estreno:</Text>
              <Text style={styles.detailValue}>{formatDate(movie.release_date)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duración:</Text>
              <Text style={styles.detailValue}>{formatRuntime(movie.runtime)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Géneros:</Text>
              <Text style={styles.detailValue}>
                {movie.genres && movie.genres.length > 0 ? movie.genres.map((g) => g.name).join(", ") : "No disponible"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
    padding: 20,
  },
  backdropContainer: {
    height: 250,
    position: "relative",
  },
  backdrop: {
    width: "100%",
    height: "100%",
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  backButtonTop: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonIcon: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    marginTop: -50,
  },
  headerSection: {
    flexDirection: "row",
    marginBottom: 24,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: "#333",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  basicInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffd700",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  overview: {
    fontSize: 16,
    color: "#ccc",
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  detailLabel: {
    fontSize: 15,
    color: "#aaa",
    flex: 1,
  },
  detailValue: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#aaa",
  },
  errorText: {
    fontSize: 16,
    color: "#ff6b6b",
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#e50914",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})