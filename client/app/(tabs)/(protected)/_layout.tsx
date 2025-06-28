import { useAuth } from "@/hooks/useAuth";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
export default function ProtectedLayout() {
  const { token, isValidating } = useAuth();

  if (isValidating) {
    console.log("validating...");
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!token) return <Redirect href="/(auth)/Login" />;

  return <Slot />;
}
