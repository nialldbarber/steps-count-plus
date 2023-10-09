import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type DistanceSegments = Array<{
  timestamp: number;
  value: number;
}>;

type DistanceState = {
  dailyDistance: number;
  dailyDistanceSegments: DistanceSegments;
  weeklyDistance: number;
  weeklyDistanceSegments: DistanceSegments;
  monthlyDistance: number;
  monthlyDistanceSegments: DistanceSegments;
  yearlyDistance: number;
  yearlyDistanceSegments: DistanceSegments;
};

type DistanceActions = {
  setDailyDistance: (steps: number, segments: DistanceSegments) => void;
  setWeeklyDistance: (steps: number, segments: DistanceSegments) => void;
  setMonthlyDistance: (steps: number, segments: DistanceSegments) => void;
  setYearlyDistance: (steps: number, segments: DistanceSegments) => void;
};

export const useDistanceStore = create(
  immer<DistanceState & DistanceActions>((set) => ({
    dailyDistance: 0,
    dailyDistanceSegments: [],
    weeklyDistance: 0,
    weeklyDistanceSegments: [],
    monthlyDistance: 0,
    monthlyDistanceSegments: [],
    yearlyDistance: 0,
    yearlyDistanceSegments: [],
    setDailyDistance: (distance: number, segments: DistanceSegments) =>
      set((state) => {
        state.dailyDistance = distance;
        state.dailyDistanceSegments = segments;
      }),
    setWeeklyDistance: (distance: number, segments: DistanceSegments) =>
      set((state) => {
        state.weeklyDistance = distance;
        state.weeklyDistanceSegments = segments;
      }),
    setMonthlyDistance: (distance: number, segments: DistanceSegments) =>
      set((state) => {
        state.monthlyDistance = distance;
        state.monthlyDistanceSegments = segments;
      }),
    setYearlyDistance: (distance: number, segments: DistanceSegments) =>
      set((state) => {
        state.yearlyDistance = distance;
        state.yearlyDistanceSegments = segments;
      }),
  })),
);
