import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type Units = "miles" | "km";

type UnitsState = {
  units: Units;
  setUnits: (units: Units) => void;
};

export const useUnitsStore = create<UnitsState>((set) => ({
  units: "km",
  setUnits: async (units) => {
    if (units !== null) {
      await AsyncStorage.setItem("app_units", units);
      set({ units });
    }
  },
}));
