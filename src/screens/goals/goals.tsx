import { DailyDistanceGoal } from "@/components/goals/distance";
import { DailyFlightsGoal } from "@/components/goals/flights";
import { DailyStepsGoal } from "@/components/goals/steps";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Stack } from "@/design-system/components/layouts/stack";

export default function GoalsScreen() {
  return (
    <MainScreenLayout>
      <Stack gutter="10px">
        <DailyStepsGoal />
        <DailyDistanceGoal />
        <DailyFlightsGoal />
      </Stack>
    </MainScreenLayout>
  );
}
