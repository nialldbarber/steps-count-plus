import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "@/stores/middleware";

type GoalsState = {
  stepsGoal: number;
  setStepsGoal: (steps: number) => void;
  distanceGoal: number;
  setDistanceGoal: (distance: number) => void;
  flightsGoal: number;
  setFlightsGoal: (distance: number) => void;
};

export const useGoalsStore = create(
  persist<GoalsState>(
    (set, _) => ({
      stepsGoal: 0,
      distanceGoal: 0,
      flightsGoal: 0,
      setStepsGoal: (steps) => {
        set({ stepsGoal: steps });
      },
      setDistanceGoal: (distance) => {
        set({ distanceGoal: distance });
      },
      setFlightsGoal: (flights) => {
        set({ flightsGoal: flights });
      },
    }),
    {
      name: "goals",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
