import { useMemo } from "react";
import { formatNumber } from "@/lib/numbers";

export function useRemainingCount(goal: number, currentCount: number) {
  const countRemainingToGoal = useMemo(() => {
    const remainingSteps = goal - currentCount;
    if (remainingSteps <= 0) {
      return 0;
    }

    return formatNumber(remainingSteps);
  }, [goal, currentCount]);

  return { countRemainingToGoal };
}
