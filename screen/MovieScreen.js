"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native"
import { getPopularMovies, getImageUrl } from "../services/tmdb-service"

export default function MoviesScreen({ navigation }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMovies()
  }, [])

  const loadMovies = async () => {
    try {
      const data = await getPopularMovies()
      setMovies(data)
    } catch (error) {
      console.error("Error cargando películas:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderMovie = ({ item }) => (
    <TouchableOpacity style={styles.movieCard} onPress={() => navigation.navigate("MovieDetail", { movieId: item.id })}>
      <Image source={{ uri: getImageUrl(item.poster_path) }} style={styles.poster} resizeMode="cover" />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
  listContainer: {
    padding: 8,
  },
  movieCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#1f1f1f",
    borderRadius: 8,
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    height: 240,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    padding: 8,
    paddingBottom: 4,
  },
  ratingContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  rating: {
    color: "#ffd700",
    fontSize: 12,
    fontWeight: "bold",
  },
})
