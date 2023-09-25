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
            "@/components": "./src/components",
            "@/constants": "./src/constants",
            "@/database": "./src/database",
            "@/design-system": "./src/design-system",
            "@/hooks": "./src/hooks",
            "@/lib": "./src/lib",
            "@/navigation": "./src/navigation",
            "@/screens": "./src/screens",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
