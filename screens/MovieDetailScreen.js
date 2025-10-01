import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { getMovieDetails, IMAGE_BASE_URL } from "../services/tmdbService";

export default function MovieDetailScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieDetails(movieId)
      .then((data) => setMovie(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff" }}>Cargando detalles...</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Error al cargar detalles.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }} style={styles.poster} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <View style={styles.details}>
        <Text style={styles.detailText}>⭐ Promedio de votos: {movie.vote_average}</Text>
        <Text style={styles.detailText}>📅 Fecha de estreno: {movie.release_date}</Text>
        <Text style={styles.detailText}>🎬 Duración: {movie.runtime} min</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 20,
  },
  poster: {
    width: "100%",
    height: 500,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  overview: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: 10,
  },
  detailText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
});
