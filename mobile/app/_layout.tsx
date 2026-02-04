import { tamaguiConfig } from "@/config/tamagui.config";
import { useAuthStore } from "@/store/auth.store";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { TamaguiProvider } from "tamagui";
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function RootLayout() {
  const bootstrap = useAuthStore((s) => s.bootstrap);
  const loading = useAuthStore((s) => s.loading);

  const [isBootstrapped, setIsBootstrapped] = useState(false);

  useEffect(() => {
    const init = async () => {
      await bootstrap();
      setIsBootstrapped(true);
    };
    init();
  }, [bootstrap]);

  if (!isBootstrapped || loading) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <Stack screenOptions={{ headerShown: false }} />
      </TamaguiProvider>
    </GestureHandlerRootView>
  )
}
