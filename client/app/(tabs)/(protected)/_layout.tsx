import { Redirect, Slot } from "expo-router";

export default function ProtectedLayout() {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href="/(auth)/Login" />;

  return <Slot />;
}
