import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
export function ProtectedRoutes(Component: React.ComponentType<any>) {
  return function Protected(props: any) {
    const { token, isValidating } = useAuth();
    if (isValidating) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4F46E5" />
        </View>
      );
    }

    if (!token) {
      return <Redirect href={{ pathname: "/(auth)/Login" }} />;
    }

    return <Component {...props} />;
  };
}
