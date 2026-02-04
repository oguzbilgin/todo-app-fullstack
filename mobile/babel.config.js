module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',

      [
        '@tamagui/babel-plugin',
        {
          config: './src/config/tamagui.config.ts',
          components: ['tamagui'],
        },
      ],

      [
        'module-resolver',
        {
          alias: {
            '@': './src',
          },
        },
      ],
    ],
  };
};
