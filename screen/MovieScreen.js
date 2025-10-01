import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { getMovieDetails } from "../services/tmdb-Service";
import MovieCard from "../components/Card";

export default function HomeScreen({ navigation }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieDetails().then(data => {
      setMovie(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center" }} />
    );
  }

  return (
    <View style={styles.container}>
      <MovieCard
        movie={movie}
        onPress={() => navigation.navigate("Detail", { movie })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});