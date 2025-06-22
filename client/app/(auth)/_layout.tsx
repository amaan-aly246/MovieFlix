import { Stack } from "expo-router";
import { StatusBar } from "react-native";
export default function AuthLayout() {
  return (
    <>
      <StatusBar hidden={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" />
        <Stack.Screen name="Login" />
      </Stack>
    </>
  );
}
