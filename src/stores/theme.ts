import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "@/stores/middleware";

export type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initialiseTheme: () => void;
};

export const useThemeStore = create(
  persist<ThemeState>(
    (set, get) => ({
      theme: "light",
      setTheme: (theme) => {
        if (theme !== null) {
          set({ theme });
        }
      },
      initialiseTheme: () => {
        if (get().theme) {
          set({ theme: get().theme });
        }
      },
    }),
    {
      name: "app_theme",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
