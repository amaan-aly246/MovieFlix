import AuthContextProvider from "@/Context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./globals.css";
export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />

      <AuthContextProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </AuthContextProvider>
    </>
  );
}
