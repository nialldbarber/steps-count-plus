import type { JestConfigWithTsJest } from "ts-jest";
import { defaults as tsjPreset } from "ts-jest/presets";

const config: JestConfigWithTsJest = {
  ...tsjPreset,
  preset: "react-native",
  cacheDirectory: ".jest/cache",
  clearMocks: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  testPathIgnorePatterns: ["\\.snap$", "<rootDir>/node_modules/"],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  transform: {
    "^.+\\.jsx$": "babel-jest",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.spec.json",
      },
    ],
  },
};

export default config;
