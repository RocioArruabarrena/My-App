import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IMAGE_BASE_URL } from "../services/tmdb-Service";

export default function MovieCard({ movie, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview} numberOfLines={3}>
          {movie.overview}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#b82828ff",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    elevation: 3,
  },
  poster: { width: 100, height: 150, borderRadius: 10 },
  info: { flex: 1, marginLeft: 10, justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  overview: { fontSize: 14, color: "#c59191ff" },
});