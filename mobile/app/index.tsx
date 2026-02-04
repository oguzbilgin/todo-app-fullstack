import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/auth.store";

export default function Index() {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  return <Redirect href="/(tabs)" />;
}
