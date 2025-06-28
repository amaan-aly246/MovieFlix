import { LoginFormInput } from "@/app/(auth)/Login";
import { axiosPrivate } from "@/config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
interface LoginProps {
  userDetails: {
    email: string;
    password: string;
  };
  setError: UseFormSetError<LoginFormInput>;
  setToken: (value: string | null) => void;
}
export const login = async ({
  userDetails,
  setError,
  setToken,
}: LoginProps): Promise<Object | null> => {
  try {
    const response = (await axiosPrivate.post("/auth/login", userDetails)).data;
    await AsyncStorage.setItem("accessToken", response.data.accessToken);
    setToken(response.data.accessToken);
    return response.data.userId;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    setError("root", {
      message:
        err.response?.data?.message || err.message || "An error occurred",
    });
    return null;
  }
};
