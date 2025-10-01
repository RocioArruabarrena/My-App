import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MovieScreen from "./screens/MoviesScreen"
import MovieDetailScreen from "./screens/MovieDetailScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="MovieScreen">
        <Stack.Screen name="MovieScreen" component={HomeScreen} options={{ title: "Película" }} />
        <Stack.Screen name="MovieDetail" component={DetailScreen} options={{ title: "Detalles" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
