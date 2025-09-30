"use client"

import { useState, useEffect } from "react"
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, SafeAreaView, StatusBar} from "react-native"
import { getPopularMovies, getImageUrl } from "../services/tmdbService"

export default function MoviesScreen({ navigation }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadMovies()
  }, [])

  const loadMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getPopularMovies()
      setMovies(data)
    } catch (err) {
      setError("Error al cargar las películas. Por favor, verifica tu API key.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleMoviePress = (movie) => {
    navigation.navigate("MovieDetail", { movieId: movie.id })
  }

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity style={styles.movieCard} onPress={() => handleMoviePress(item)} activeOpacity={0.7}>
      <Image source={{ uri: getImageUrl(item.poster_path) }} style={styles.poster} resizeMode="cover" />
      <View style={styles.movieInfo}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.overview} numberOfLines={3}>
          {item.overview}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
          <Text style={styles.releaseDate}>{new Date(item.release_date).getFullYear()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={styles.loadingText}>Cargando películas...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadMovies}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Películas Populares</Text>
        <Text style={styles.headerSubtitle}>TMDb</Text>
      </View>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: "#141414",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#e50914",
    fontWeight: "600",
  },
  listContainer: {
    padding: 16,
  },
  movieCard: {
    flexDirection: "row",
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  poster: {
    width: 120,
    height: 180,
    backgroundColor: "#333",
  },
  movieInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    color: "#aaa",
    lineHeight: 20,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffd700",
  },
  releaseDate: {
    fontSize: 14,
    color: "#888",
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
  retryButton: {
    backgroundColor: "#e50914",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})