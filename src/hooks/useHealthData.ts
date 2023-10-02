import { useEffect, useState } from "react";
import { Platform } from "react-native";
import AppleHealthKit, {
  HealthKitPermissions,
  HealthUnit,
} from "react-native-health";
import type { HealthInputOptions, HealthValue } from "react-native-health";
import { getDistanceFromPeriod } from "@/lib/distance";
import { roundDown } from "@/lib/numbers";
import { getStepsFromPeriod } from "@/lib/steps";
import { convertMetersToKm } from "@/lib/units";
import { useDistanceStore } from "@/stores/distance";
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
  const { setDailySteps, setWeeklySteps, setMonthlySteps, setYearlySteps } =
    useStepsStore();
  const { setDailyDistance, setWeeklyDistance } = useDistanceStore();
  const [hasPermissions, setHasPermission] = useState(false);

  /**
   * =====================================================================
   * @type Initialisaton
   * =====================================================================
   */
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

    /**
     * =====================================================================
     * @type Steps
     * @period Daily
     * =====================================================================
     */
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

    /**
     * =====================================================================
     * @type Steps
     * @period Weekly
     * =====================================================================
     */
    getStepsFromPeriod(7, (error, totalSteps, segments) => {
      if (error) return;
      setWeeklySteps(totalSteps, segments);
    });

    /**
     * =====================================================================
     * @type Steps
     * @period Monthly
     * =====================================================================
     */
    getStepsFromPeriod(30, (error, totalSteps, segments) => {
      if (error) return;
      setMonthlySteps(totalSteps, segments);
    });

    /**
     * =====================================================================
     * @type Steps
     * @period Yearly
     * =====================================================================
     */
    getStepsFromPeriod(365, (error, totalSteps, segments) => {
      if (error) return;
      setYearlySteps(totalSteps, segments);
    });

    /**
     * =====================================================================
     * @type Distance
     * @period Daily
     * =====================================================================
     */
    const dailyDistanceAmount: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };
    AppleHealthKit.getDistanceWalkingRunning(
      dailyDistanceAmount,
      (err, results) => {
        if (err) {
          console.log("Error getting the steps:", err);
          return;
        }
        const value = convertMetersToKm(results.value).toFixed(2);
        setDailyDistance(Number(value));
      },
    );

    /**
     * =====================================================================
     * @type Distance
     * @period Weekly
     * =====================================================================
     */
    getDistanceFromPeriod(7, (error, totalDistance, segments) => {
      if (error) return;
      setWeeklyDistance(totalDistance, segments);
    });

    // AppleHealthKit.getFlightsClimbed(options, (err, results) => {
    //   if (err) {
    //     console.log("Error getting the steps:", err);
    //     return;
    //   }
    //   setFlights(results.value);
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
  }, [
    hasPermissions,
    setDailySteps,
    setWeeklySteps,
    setMonthlySteps,
    setDailyDistance,
  ]);
}
