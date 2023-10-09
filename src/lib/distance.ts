import AppleHealthKit from "react-native-health";
import type { HealthInputOptions } from "react-native-health";
import type { DaysPrevious } from "@/types/stats";
import { convertMetersToKm } from "./units";

export function getDistanceFromPeriod(
  daysPrevious: DaysPrevious,
  callback: (...args: any[]) => void,
  period?: number,
) {
  const endDate = new Date();
  const startDate = new Date();

  startDate.setDate(endDate.getDate() - daysPrevious + 1);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const options: HealthInputOptions = {
    startDate: startDate.toISOString(),
    endDate: new Date().toISOString(),
    // period: period ?? 1444,
    ascending: true,
  };

  AppleHealthKit.getDailyDistanceWalkingRunningSamples(
    options,
    (error, results) => {
      if (error) {
        console.log(
          `Error retrieving distance counts for the past ${daysPrevious} days:`,
          error,
        );
        callback(error, null);
        return;
      }

      if (!results || !Array.isArray(results)) {
        console.error("Results is undefined or not an array", results);
        return;
      }

      const segments = results.map((value) => ({
        timestamp: new Date().getTime(),
        value: convertMetersToKm(value?.value),
      }));

      const totalDistance = results.reduce((total, result) => {
        if (!result) {
          console.error("An individual result is undefined");
          return total;
        }
        return total + result?.value;
      }, 0);

      callback(null, Math.round(totalDistance), segments);
    },
  );
}
