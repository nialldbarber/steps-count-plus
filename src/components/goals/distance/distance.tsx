import { useMemo } from "react";
import GoalsCard from "@/components/goals/goals-card";
import { useGoalsStore } from "@/stores/goals";
import { useUnitsStore } from "@/stores/units";

export default function DailyDistanceGoal() {
  const { distanceGoal, setDistanceGoal } = useGoalsStore();
  const { units } = useUnitsStore();

  const dailyDistanceOptions = [
    { id: `daily-distance-${1}`, label: `5 ${units}`, value: 5 },
    { id: `daily-distance-${2}`, label: `7 ${units}`, value: 7 },
    { id: `daily-distance-${3}`, label: `10 ${units}`, value: 10 },
    { id: `daily-distance-${4}`, label: `15 ${units}`, value: 15 },
  ];

  const pluralisation = useMemo(() => {
    if (units === "miles" && distanceGoal === 1) {
      return "mile";
    }

    return units;
  }, [units, distanceGoal]);

  return (
    <GoalsCard
      title="Distance"
      goalAmount={distanceGoal}
      units={pluralisation}
      incrementBy="0.5"
      decrementBy="0.5"
      lowerLimit={0.5}
      upperLimit={300}
      goalCallback={setDistanceGoal}
      options={dailyDistanceOptions}
    />
  );
}
