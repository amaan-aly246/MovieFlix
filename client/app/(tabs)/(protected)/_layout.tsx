import { useAuth } from "@/hooks/useAuth";
import { Redirect, Slot } from "expo-router";
export default function ProtectedLayout() {
  const { token } = useAuth();

  if (!token) return <Redirect href="/(auth)/Login" />;

  return <Slot />;
}
