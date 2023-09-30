import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@/design-system/components/atoms/box";
import { Card } from "@/design-system/components/atoms/card";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Stack } from "@/design-system/components/layouts/stack";
import { formatNumber } from "@/lib/numbers";
import { useGoalsStore } from "@/stores/goals";
import { useStepsStore } from "@/stores/steps";

type DailyStepsProps = {};

export function DailySteps({}: DailyStepsProps) {
  const { t } = useTranslation();
  const { dailySteps } = useStepsStore();
  const { stepsGoal } = useGoalsStore();

  const stepsRemainingToGoal = useMemo(() => {
    const remainingSteps = stepsGoal - dailySteps;
    if (remainingSteps <= 0) {
      return `0 remaining, nice work!`;
    }

    return `Steps left to goal: ${formatNumber(remainingSteps)}`;
  }, [stepsGoal, dailySteps]);

  return (
    <MainScreenLayout>
      <Stack gutter="10px">
        <Card cardType="emphasise">
          <Box alignItems="center">
            <Text level="heading" size="26px" weight="bold">
              Steps
            </Text>
            <Text level="text" size="20px">
              {t("screen.stats.steps", { steps: formatNumber(dailySteps) })}
            </Text>
            <Text level="text" size="20px">
              Current goal: {formatNumber(stepsGoal)}
            </Text>
            <Text level="text" size="20px">
              {stepsRemainingToGoal}
            </Text>
          </Box>
        </Card>
      </Stack>
    </MainScreenLayout>
  );
}
