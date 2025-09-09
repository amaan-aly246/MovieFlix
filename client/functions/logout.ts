import { axiosPrivate } from "@/config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
interface LogoutPropsType {
  setToken: (value: string | null) => void;
  setWatchList: (value: string[]) => void;
  setUserId: (value: string | null) => void;
  setReccMoviesDetails: (value: MovieDetails[]) => void;
}
export const logout = async ({ setToken, setWatchList, setUserId, setReccMoviesDetails }: LogoutPropsType): Promise<void> => {
  try {
    const response = await axiosPrivate.post("/auth/logout");
    if (response.status == 200 || response.status == 204) {
      await AsyncStorage.removeItem("accessToken");
      setToken(null);
      setWatchList([]);
      setUserId(null)
      // @ts-ignore
      setReccMoviesDetails([])
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    console.log("error is ", err);
  }
};
