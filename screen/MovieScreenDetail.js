import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { IMAGE_BASE_URL } from "../services/tmdb-Service";

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
      <Text style={styles.detail}>📅 Estreno: {movie.release_date}</Text>
      <Text style={styles.detail}>⏱ Duración: {movie.runtime} min</Text>
      <Text style={styles.detail}>⭐ Rating: {movie.vote_average} / 10</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f8f8f8", 
    alignItems: "center" 
  },
  poster: { 
    width: 220, 
    height: 330, 
    borderRadius: 12, 
    marginBottom: 20, 
    shadowColor: "#000", 
    shadowOpacity: 0.2, 
    shadowOffset: { width: 0, height: 3 }, 
    shadowRadius: 4 
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 8, 
    color: "#222" 
  },
  tagline: { 
    fontSize: 14, 
    fontStyle: "italic", 
    marginBottom: 20, 
    textAlign: "center", 
    color: "#555" 
  },
  overview: { 
    fontSize: 15, 
    textAlign: "justify", 
    marginBottom: 20, 
    color: "#333" 
  },
  detail: { 
    fontSize: 15, 
    marginTop: 6, 
    color: "#666", 
    textAlign: "left" 
  },
});
