import { logout } from "@/functions/logout";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
const Profile = () => {

  const router = useRouter();
  const { setToken } = useAuth();
  const handleLogOut = () => {
    logout({ setToken })
    router.push("/")
  }
  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <Text className="text-white text-xl mb-4">Profile Screen</Text>
      <TouchableOpacity onPress={handleLogOut}>
        <Text className="text-blue-400 mt-2">Logout </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProtectedRoutes(Profile);
