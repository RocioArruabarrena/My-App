import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/MovieScreen";
import DetailScreen from "./screen/MovieScreenDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieScreen">
        <Stack.Screen name="MovieScreen" component={HomeScreen} options={{ title: "Película" }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Detalles" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}