import { icons } from "@/constants/icons";
import { login } from "@/functions/login";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Keyboard, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import CustomInput from "../components/CustomInput";
export type LoginFormInput = z.infer<typeof loginSchema>;
export default function Login() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(true);
  const { setToken } = useAuth();
  const onSubmit = async ({ email, password }: LoginFormInput) => {

    const userDetails = {
      email,
      password,
    };
    Keyboard.dismiss()
    const id = await login({ userDetails, setError, setToken });
    console.log("id is", id);
    router.replace("/")
  };
  return (
    <View className="flex-1 bg-primary pt-20">
      <SafeAreaView className="flex-1 px-10 py-16">
        <View className="flex items-center ">
          <Text className="text-purple-300 text-4xl font-bold mb-10">
            Login
          </Text>

          <View className="flex w-[80%] justify-center">
            {/* Email */}
            <View className="border-b border-white flex-row items-center pb-3">
              <Image source={icons.person} className="w-5 h-5" />
              <CustomInput name="email" placeholder="Email" control={control} />
            </View>

            {/* Password */}
            <View className="border-b border-white flex-row items-center pb-3 mt-10">
              {showPassword ? (
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Image source={icons.eye} className="w-5 h-5" />
                </Pressable>
              ) : (
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Image source={icons.closedeye} className="w-5 h-5" />
                </Pressable>
              )}
              <CustomInput
                name="password"
                placeholder="Password"
                control={control}
                secureTextEntry={!showPassword}
              />
            </View>

            <TouchableOpacity
              className="mx-5 mt-5 bg-accent py-3.5 flex flex-row justify-center"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}>
              <Text className="text-white font-semibold text-base">
                {isSubmitting ? "Logging..." : "Login"}
              </Text>
            </TouchableOpacity>

            {errors.root && (
              <Text
                style={{ color: "red", alignSelf: "stretch" }}
                className=" text-2xl  mt-5">
                {errors.root?.message}
              </Text>
            )}
            <Text
              className="text-white text-[16px] mt-5"
              onPress={() => {
                return router.replace("/(auth)/Register");
              }}>
              Don't have an account? {""}
              <Text className="text-purple-600 font-bold ">Register here!</Text>
            </Text>
          </View>
        </View>

        {/* back to home btn */}
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
}
