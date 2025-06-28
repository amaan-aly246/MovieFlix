import axios from "@/config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkAuth = async (
  setToken: any,
  setUserId: any,
  setIsValidating: any
) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) return;

    const res = await axios.post(
      "/auth/verifytoken",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      setToken(token);
      setUserId(res.data.userId);
    } else {
      setToken(null);
      setUserId(null);
    }
  } catch (error: any) {
    console.log("token verification failed with error. ", error);
    setToken(null);
    setUserId(null);
  } finally {
    setIsValidating(false);
  }
};
