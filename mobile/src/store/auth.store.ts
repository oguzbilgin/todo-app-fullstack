import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { create } from "zustand";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  bootstrap: () => Promise<void>;
};

const API_URL = Platform.OS === "android"
  ? "http://10.0.2.2:5197/api"
  : "http://localhost:5197/api";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password,
      });

      const token = res.data.token;

      await SecureStore.setItemAsync("token", token);

      set({ token, isAuthenticated: true });
      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.error ?? "Sign in failed",
      });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email, password) => {
    try {
      set({ loading: true, error: null });

      await axios.post(`${API_URL}/auth/signup`, {
        email,
        password,
      });

      return true;
    } catch (err: any) {
      set({ error: err.response?.data?.error ?? "Sign up failed" });

      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    set({ token: null, isAuthenticated: false });
  },

  bootstrap: async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      set({ token, isAuthenticated: true });
    }
    set({ loading: false });
  },
}));
