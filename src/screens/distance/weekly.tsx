import { useTranslation } from "react-i18next";
import { Box } from "@/design-system/components/atoms/box";
import { Card } from "@/design-system/components/atoms/card";
import { Text } from "@/design-system/components/atoms/text";
import { Stack } from "@/design-system/components/layouts/stack";
import { convertMetersToKm } from "@/lib/units";
import { useDistanceStore } from "@/stores/distance";
import { useUnitsStore } from "@/stores/units";

type DailyDistanceProps = {};

export function WeeklyDistance({}: DailyDistanceProps) {
  const { t } = useTranslation();
  const { weeklyDistance } = useDistanceStore();
  const { units } = useUnitsStore();

  return (
    <Stack gutter="10px">
      <Card cardType="emphasise">
        <Box alignItems="center">
          <Text level="heading" size="26px" weight="bold">
            {t("screen.stats.24hrs.distance.title")}
          </Text>
          <Text size="20px">
            {t("screen.stats.24hrs.distance.amount", {
              distance: convertMetersToKm(weeklyDistance),
              unit: units,
            })}
          </Text>
        </Box>
      </Card>
    </Stack>
  );
}
