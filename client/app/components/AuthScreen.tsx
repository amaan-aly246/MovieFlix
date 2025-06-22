import { icons } from "@/constants/icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/images";
import "../globals.css";
interface AuthScreenProps {
  mode: "login" | "register";
  onSubmit: () => void;
}

const AuthScreen = ({ mode, onSubmit }: AuthScreenProps) => {
  const isLogin = mode === "login";
  const [showPassword, setShowPassword] = useState(true);
  const handleTogglePassword = () => {
    console.log(showPassword);
    setShowPassword(!showPassword);
  };
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full h-full" />
      <SafeAreaView className="flex-1 px-10 py-16">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="flex items-center ">
          <Text className="text-purple-300 text-4xl font-bold mb-10">
            {isLogin ? "Login" : "Register"}
          </Text>

          <View className="flex w-[80%] justify-center">
            {/* Username */}
            <View className="border-b border-white flex-row items-center pb-3">
              <Image source={icons.person} className="w-5 h-5" />
              <TextInput
                placeholder="Username"
                placeholderTextColor="#a8b5db"
                className="ml-2 text-white p-1 w-[200px] h-[30px]"
              />
            </View>

            {/* Password */}
            <View className="border-b border-white flex-row items-center pb-3 mt-10">
              {showPassword ? (
                <Pressable onPress={handleTogglePassword}>
                  <Image source={icons.eye} className="w-5 h-5" />
                </Pressable>
              ) : (
                <Pressable onPress={handleTogglePassword}>
                  <Image source={icons.closedeye} className="w-5 h-5" />
                </Pressable>
              )}
              <TextInput
                placeholder="Password"
                placeholderTextColor="#a8b5db"
                secureTextEntry={!showPassword}
                className="ml-2 text-white p-1 w-[200px] h-[30px]"
              />
            </View>

            {/* Extra field for register */}
            {!isLogin && (
              <View className="border-b border-white flex-row items-center pb-3 mt-10">
                <Image source={icons.closedeye} className="w-5 h-5" />
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#a8b5db"
                  secureTextEntry
                  className="ml-2 text-white p-1 w-[200px] h-[30px]"
                />
              </View>
            )}

            <TouchableOpacity
              className="mx-5 mt-5 bg-accent py-3.5 flex flex-row justify-center"
              onPress={onSubmit}>
              <Text className="text-white font-semibold text-base">
                {isLogin ? "Login" : "Register"}
              </Text>
            </TouchableOpacity>

            <Text
              className="text-white text-[16px] mt-5"
              onPress={() => {
                if (isLogin) {
                  return router.replace("/(auth)/Register");
                }
                return router.replace("/(auth)/Login");
              }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Text className="text-purple-600 font-bold ">
                {isLogin ? "Register here!" : "Login here!"}
              </Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="absolute bottom-24 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
          onPress={() => router.push("/")}>
          <Image
            source={icons.arrow}
            className="size-5 mr-1 mt-0.5 rotate-180"
            tintColor="#fff"
          />
          <Text className="text-white font-semibold text-base">Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
