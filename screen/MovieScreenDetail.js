import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { IMAGE_BASE_URL } from "../services/tmdbService";

export default function DetailScreen({ route }) {
  const { movie } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.tagline}>{movie.tagline}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.detail}>Fecha de estreno: {movie.release_date}</Text>
      <Text style={styles.detail}>Duración: {movie.runtime} min</Text>
      <Text style={styles.detail}>Rating: {movie.vote_average} / 10</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  poster: { width: 200, height: 300, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  tagline: { fontSize: 13, fontWeight: "justify", marginBottom: 25, textAlign: "center", color: "#300e0eff" },
  overview: { fontSize: 16, textAlign: "justify", marginBottom: 15, textAlign: "center" },
  detail: { fontSize: 16, marginTop: 5 },
});
