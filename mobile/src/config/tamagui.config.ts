import { config } from '@tamagui/config';
import { createTamagui } from 'tamagui';

export const tamaguiConfig = createTamagui(config);

export type AppTamaguiConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}
