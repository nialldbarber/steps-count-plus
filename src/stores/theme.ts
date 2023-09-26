import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initialiseTheme: () => Promise<void>;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  setTheme: async (theme) => {
    if (theme !== null) {
      await AsyncStorage.setItem("app_theme", theme);
      set({ theme });
    }
  },
  initialiseTheme: async () => {
    const savedTheme = await AsyncStorage.getItem("app_theme");
    if (savedTheme) {
      set({ theme: savedTheme as Theme });
    }
  },
}));
