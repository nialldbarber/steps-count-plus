module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@/screens": "./src/screens",
            "@/components": "./src/components",
            "@/database": "./src/database",
            "@/design-system": "./src/design-system",
            "@/navigation": "./src/navigation",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
