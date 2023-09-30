/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
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
          "@/stores": "./src/stores",
          "@/translations": "./src/translations",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
