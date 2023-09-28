import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type StepsState = {
  daily: number;
  weekly: number;
  monthly: number;
};

type StepsActions = {
  setDailySteps: (steps: number) => void;
  setWeeklySteps: (steps: number) => void;
  setMonthlySteps: (steps: number) => void;
};

export const useStepsStore = create(
  immer<StepsState & StepsActions>((set) => ({
    daily: 0,
    weekly: 0,
    monthly: 0,
    setDailySteps: (steps: number) => set((state) => (state.daily = steps)),
    setWeeklySteps: (steps: number) => set((state) => (state.weekly = steps)),
    setMonthlySteps: (steps: number) => set((state) => (state.monthly = steps)),
  })),
);
