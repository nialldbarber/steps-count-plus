import { Trans, useTranslation } from "react-i18next";
import { Box } from "@/design-system/components/atoms/box";
import { Card } from "@/design-system/components/atoms/card";
import { Text } from "@/design-system/components/atoms/text";
import { Stack } from "@/design-system/components/layouts/stack";
import { useRemainingCount } from "@/hooks/useRemainingCount";
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
  const { countRemainingToGoal } = useRemainingCount(
    distanceGoal,
    dailyDistance,
  );

  return (
    <Stack gutter="10px">
      <Card cardType="emphasise">
        <Box alignItems="center">
          <Text level="heading" size="26px" weight="bold">
            {t("screen.stats.24hrs.distance.title")}
          </Text>
          <Text size="20px">
            {t("screen.stats.24hrs.distance.amount", {
              distance: formatNumber(dailyDistance),
              unit: units,
            })}
          </Text>
          <Text size="20px">
            {t("screen.stats.24hrs.distance.currentGoal", {
              goal: formatNumber(distanceGoal),
              unit: units,
            })}
          </Text>
          <Text size="20px">
            <Trans
              components={{
                bold: <Text color="primary" size="20px" weight="bold" />,
              }}
            >
              {t("screen.stats.24hrs.distance.remaining", {
                remaining: countRemainingToGoal,
                unit: units,
              })}
            </Trans>
          </Text>
        </Box>
      </Card>
    </Stack>
  );
}
