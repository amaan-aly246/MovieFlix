import { RegisterFormInput } from "@/app/(auth)/Register";
import { axiosPrivate } from "@/config/axios";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";

interface RegisterProps {
  userDetails: {
    email: string;
    password: string;
  };
  setError: UseFormSetError<RegisterFormInput>;
}

export const register = async ({ userDetails, setError }: RegisterProps) => {
  try {
    const response = await axiosPrivate.post("/auth/register", userDetails);
    if (response.data.success) {
      return response.data.userId;
    }
  } catch (error: unknown) {
    const err = error as AxiosError<ErrorResponse>;

    setError("root", {
      message:
        err.response?.data?.message || err.message || "An error occurred",
    });
  }
};
