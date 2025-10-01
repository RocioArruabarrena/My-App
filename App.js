import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MoviesScreen from "./screens/MoviesScreen"
import MovieDetailScreen from "./screens/MovieDetailScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#141414",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Movies" component={MoviesScreen} options={{ title: "Películas Populares" }} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: "Detalles" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

