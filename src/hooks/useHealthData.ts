import { useEffect, useState } from "react";
import { Platform } from "react-native";
import AppleHealthKit, {
  HealthKitPermissions,
  HealthUnit,
} from "react-native-health";
import type { HealthInputOptions, HealthValue } from "react-native-health";
import { getStepsFromPeriod } from "@/lib/steps";
import { useHealthStore } from "@/stores/health";
import { useStepsStore } from "@/stores/steps";

const { Permissions } = AppleHealthKit.Constants;
const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      Permissions.Steps,
      Permissions.StepCount,
      Permissions.FlightsClimbed,
      Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

export function useHealthData(date: Date) {
  // const { daily, weekly, monthly } = useHealthStore((state) => state);
  const {
    dailySteps,
    weeklySteps,
    monthlySteps,
    setDailySteps,
    setWeeklySteps,
    setMonthlySteps,
  } = useStepsStore();
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);
  const [activeEnergyBurned, setActiveEnergyBurned] = useState(0);
  const [hasPermissions, setHasPermission] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "ios") return;

    AppleHealthKit.isAvailable((err, isAvailable) => {
      if (err) {
        console.log("Error checking availability", err);
        return;
      }
      if (!isAvailable) {
        console.log("Apple Health not available");
        return;
      }
      AppleHealthKit.initHealthKit(permissions, (initErr) => {
        if (initErr) {
          console.log("Error getting permissions");
          return;
        }
        setHasPermission(true);
      });
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) return;

    // Daily steps
    const dailyStepsOptions: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };
    AppleHealthKit.getStepCount(
      dailyStepsOptions,
      (error, results: HealthValue) => {
        if (error) return;
        setDailySteps(results.value);
      },
    );

    // Weekly steps
    // const weeklyStepsOptions: HealthInputOptions = {
    //   startDate: new Date(2023, 8, 25).toISOString(),
    //   endDate: new Date().toISOString(),
    //   includeManuallyAdded: true,
    // };
    // AppleHealthKit.getDailyStepCountSamples(
    //   weeklyStepsOptions,
    //   (error, results) => {
    //     if (error) return;
    //     console.log("================ start ==============");
    //     console.log(JSON.stringify(results, null, 2));
    //     console.log("================ end ==============");
    //     // setWeeklySteps(results);
    //   },
    // );

    getStepsFromPeriod(7, (error, totalSteps, segments) => {
      if (error) return;
      setWeeklySteps(totalSteps, segments);
    });

    getStepsFromPeriod(30, (error, totalSteps, segments) => {
      if (error) return;
      setMonthlySteps(totalSteps, segments);
    });

    // AppleHealthKit.getFlightsClimbed(options, (err, results) => {
    //   if (err) {
    //     console.log("Error getting the steps:", err);
    //     return;
    //   }
    //   setFlights(results.value);
    // });

    // AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
    //   if (err) {
    //     console.log("Error getting the steps:", err);
    //     return;
    //   }
    //   setDistance(results.value);
    // });

    // AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
    //   if (err) {
    //     console.log("Error getting the active energy burned:", err);
    //     return;
    //   }
    //   console.log(results);
    //   // setActiveEnergyBurned(results.values.);
    // });

    // AppleHealthKit.getAppleStandTime(options, (err, results) => {
    //   if (err) {
    //     console.log("Error getting the stand time:", err);
    //     return;
    //   }
    //   // console.log(results.values)
    // });
  }, [hasPermissions, setDailySteps, setWeeklySteps]);
}
