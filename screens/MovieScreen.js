import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { getMovieDetails, IMAGE_BASE_URL } from "../services/tmdbService";

export default function MoviesScreen({ navigation }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieDetails(1038392)
      .then((data) => setMovie(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff" }}>Cargando película...</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Error al cargar la película.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("MovieDetail", { movieId: movie.id })}
      >
        <Image source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }} style={styles.poster} />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview} numberOfLines={3}>
          {movie.overview}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 16,
    width: "90%",
    alignItems: "center",
  },
  poster: {
    width: 250,
    height: 370,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  overview: {
    color: "#ccc",
    marginTop: 8,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
});
