import { useEffect, useState } from "react";
import { Platform } from "react-native";
import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthUnit,
} from "react-native-health";

/**
 * TODO:
 *
 * * Does the data update every time the app is active?
 * -- yes it does appear to reset after 24 hours
 * *
 */

const { Permissions } = AppleHealthKit.Constants;
const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      Permissions.Steps,
      Permissions.FlightsClimbed,
      Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

export function useHealthData(date: Date) {
  const [steps, setSteps] = useState(0);
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

    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("Error getting steps");
        return;
      }
      setSteps(results.value);
    });

    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps:", err);
        return;
      }
      setFlights(results.value);
    });

    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.log("Error getting the steps:", err);
        return;
      }
      setDistance(results.value);
    });

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
  });

  return { steps, flights, distance, activeEnergyBurned };
}
