import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../globals.css";
export default function AuthLayout() {
  <StatusBar hidden={true} />;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Register" />
      <Stack.Screen name="Login" />
    </Stack>
  );
}
