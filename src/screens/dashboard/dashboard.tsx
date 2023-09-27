import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Chart } from "@/components/chart";
import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Stack } from "@/design-system/components/layouts/stack";
import { useHealthData } from "@/hooks/useHealthData";
import { useUnitsStore } from "@/stores/units";

const data = [
  {
    timestamp: 1679913600000,
    value: 403,
  },
  {
    timestamp: 1679827200000,
    value: 6001,
  },
  {
    timestamp: 1679740800000,
    value: 10000,
  },
  {
    timestamp: 1679654400000,
    value: 2001,
  },
  {
    timestamp: 1679568000000,
    value: 200,
  },
  {
    timestamp: 1679481600000,
    value: 4001,
  },
  {
    timestamp: 1679395200000,
    value: 9000,
  },
];

export default function DashboardScreen() {
  const { t } = useTranslation();
  const { units } = useUnitsStore();
  const { steps, flights, distance } = useHealthData(new Date());

  const handleUnits = useMemo(() => {
    if (units === "km") {
      return `${(distance / 1000).toFixed(2)} km`;
    }

    return `${(distance / 1609.34).toFixed(2)} miles`;
  }, [distance, units]);

  return (
    <MainScreenLayout>
      <Stack gutter="10px">
        <Box flexDirection="row">
          <Text level="heading">Day</Text>
          <Text level="heading">Week</Text>
          <Text level="heading">Month</Text>
        </Box>
        <Text level="text" size="20px">
          {t("screen.dashboard.steps", { steps: steps.toString() })}
        </Text>
        <Text level="text" size="20px">
          {t("screen.dashboard.flights", { flights })}
        </Text>
        <Text level="text" size="20px">
          {t("screen.dashboard.distance", { distance: handleUnits })}
        </Text>
        <Box width="full">
          <Chart data={data} />
        </Box>
      </Stack>
    </MainScreenLayout>
  );
}
