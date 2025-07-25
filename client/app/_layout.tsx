import AuthContextProvider from "@/Context/AuthContext";
import UserContextProvider from "@/Context/UserContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./globals.css";
export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />

      <AuthContextProvider>
        <UserContextProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </UserContextProvider>
      </AuthContextProvider>
    </>
  );
}
