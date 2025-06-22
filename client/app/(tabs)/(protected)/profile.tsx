import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
const Profile = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <Text className="text-white text-xl mb-4">Profile Screen</Text>

      <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
        <Text className="text-blue-400">Go to Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/Register")}>
        <Text className="text-blue-400 mt-2">Go to Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
