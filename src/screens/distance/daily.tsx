import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@/design-system/components/atoms/box";
import { Card } from "@/design-system/components/atoms/card";
import { Text } from "@/design-system/components/atoms/text";
import { Stack } from "@/design-system/components/layouts/stack";
import { formatNumber } from "@/lib/numbers";
import { useDistanceStore } from "@/stores/distance";
import { useGoalsStore } from "@/stores/goals";
import { useUnitsStore } from "@/stores/units";

type DailyDistanceProps = {};

export function DailyDistance({}: DailyDistanceProps) {
  const { t } = useTranslation();
  const { dailyDistance } = useDistanceStore();
  const { distanceGoal } = useGoalsStore();
  const { units } = useUnitsStore();

  const distanceRemainingToGoal = useMemo(() => {
    const remainingSteps = distanceGoal - dailyDistance;
    if (remainingSteps <= 0) {
      return `0 remaining, nice work!`;
    }

    return `${units} left to goal: ${remainingSteps}`;
  }, [distanceGoal, dailyDistance, units]);

  return (
    <Stack gutter="10px">
      <Card cardType="emphasise">
        <Box alignItems="center">
          <Text level="heading" size="26px" weight="bold">
            Distance
          </Text>
          <Text level="text" size="20px">
            {t("screen.stats.steps", { steps: formatNumber(dailyDistance) })}
          </Text>
          <Text level="text" size="20px">
            Current goal: {dailyDistance}
          </Text>
          <Text level="text" size="20px">
            {distanceRemainingToGoal}
          </Text>
        </Box>
      </Card>
    </Stack>
  );
}
