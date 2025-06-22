import { icons } from "@/constants/icons";
import { registerSchema } from "@/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { images } from "../../constants/images";
import CustomInput from "../components/CustomInput";

type RegisterFormInput = z.infer<typeof registerSchema>;
export default function Register() {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState(true);
  const onSubmit = async (data: RegisterFormInput) => {
    console.log("data is", data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
    } catch (error) {
      setError("root", {
        message: "Email already taken",
      });
    }
  };
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full h-full" />
      <SafeAreaView className="flex-1 px-10 py-16">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="flex items-center ">
          <Text className="text-purple-300 text-4xl font-bold mb-10">
            Register
          </Text>

          <View className="flex w-[80%] justify-center">
            {/* Email */}
            <View className="border-b border-white flex-row items-center pb-3">
              <Image source={icons.person} className="w-5 h-5" />

              <CustomInput control={control} name="email" placeholder="Email" />
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
                control={control}
                name="password"
                placeholder="Password"
                secureTextEntry={!showPassword}
              />
            </View>

            <View className="border-b border-white flex-row items-center pb-3 mt-10">
              <Image source={icons.closedeye} className="w-5 h-5" />
              <CustomInput
                control={control}
                name="confirm_password"
                placeholder="Confirm password"
                secureTextEntry={!showPassword}
              />
            </View>

            <TouchableOpacity
              className="mx-5 mt-5 bg-accent py-3.5 flex flex-row justify-center"
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmit)}>
              <Text className="text-white font-semibold text-base">
                {isSubmitting ? "Registering..." : "Register"}
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
                return router.replace("/(auth)/Login");
              }}>
              Already have an account?{" "}
              <Text className="text-purple-600 font-bold ">Login here!</Text>
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
}
