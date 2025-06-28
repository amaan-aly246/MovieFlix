import { axiosPrivate } from "@/config/axios";
import { AxiosError } from "axios";
interface LogoutPropsType {
  setToken: (value: string | null) => void;
}
export const logout = async ({ setToken }: LogoutPropsType): Promise<void> => {
  try {
    const response = await axiosPrivate.post("/auth/logout");
    if (response.status == 200 || response.status == 204) {
      setToken(null);
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    console.log("error is ", err);
  }
};
