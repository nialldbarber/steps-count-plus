import AppleHealthKit from "react-native-health";
import type { HealthInputOptions } from "react-native-health";
import type { DaysPrevious } from "@/types/stats";

export function getStepsFromPeriod(
  daysPrevious: DaysPrevious,
  callback: (...args: any[]) => void,
) {
  const endDate = new Date();
  const startDate = new Date();

  startDate.setDate(endDate.getDate() - daysPrevious + 1);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const options: HealthInputOptions = {
    startDate: startDate.toISOString(),
    endDate: new Date().toISOString(),
    period: 1444,
  };

  AppleHealthKit.getDailyStepCountSamples(options, (error, results) => {
    if (error) {
      console.log(
        `Error retrieving step counts for the past ${daysPrevious} days:`,
        error,
      );
      callback(error, null);
      return;
    }

    if (!results || !Array.isArray(results)) {
      console.error("Results is undefined or not an array", results);
      return;
    }

    const segments = results
      .map((value) => {
        return {
          timestamp: new Date().getTime(),
          value: value?.value,
        };
      })
      .reverse();

    const totalSteps = results.reduce((total, result) => {
      if (!result) {
        console.error("An individual result is undefined");
        return total;
      }
      return total + result?.value;
    }, 0);

    callback(null, Math.round(totalSteps), segments);
  });
}
