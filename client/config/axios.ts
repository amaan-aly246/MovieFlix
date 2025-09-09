import axios from "axios";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL_DEV!;
const RECOMMENDER_URL = process.env.EXPO_PUBLIC_RECOMMENDER_URL_DEV!
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});



export const axiosRecommender = axios.create({
  baseURL: RECOMMENDER_URL,
  headers: { "Content-Type": "application/json" },
});
