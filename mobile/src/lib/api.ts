import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../store/auth.store";
import { Platform } from "react-native";

const API_URL = Platform.OS === "android"
  ? "http://10.0.2.2:5197/api"
  : "http://localhost:5197/api";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const logout = useAuthStore.getState().logout;
      await logout();
    }
    return Promise.reject(error);
  },
);
