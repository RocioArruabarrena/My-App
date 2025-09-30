import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1a1a2e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Películas Populares",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            title: "Detalles de la Película",
            headerShown: true,
          }}
        />
      </Stack>
    </>
  )
}