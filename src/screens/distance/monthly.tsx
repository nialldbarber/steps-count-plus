import { useTranslation } from "react-i18next";
import { Box } from "@/design-system/components/atoms/box";
import { Card } from "@/design-system/components/atoms/card";
import { Text } from "@/design-system/components/atoms/text";
import { Stack } from "@/design-system/components/layouts/stack";
import { formatNumber } from "@/lib/numbers";
import { convertMetersToKm } from "@/lib/units";
import { useDistanceStore } from "@/stores/distance";
import { useUnitsStore } from "@/stores/units";

type DailyDistanceProps = {};

export function MonthlyDistance({}: DailyDistanceProps) {
  const { t } = useTranslation();
  const { monthlyDistance } = useDistanceStore();
  const { units } = useUnitsStore();

  const num = convertMetersToKm(monthlyDistance);

  return (
    <Stack gutter="10px">
      <Card cardType="emphasise">
        <Box alignItems="center">
          <Text level="heading" size="26px" weight="bold">
            {t("screen.stats.24hrs.distance.title")}
          </Text>
          <Text size="20px">
            {t("screen.stats.24hrs.distance.amount", {
              distance: formatNumber(num),
              unit: units,
            })}
          </Text>
        </Box>
      </Card>
    </Stack>
  );
}
