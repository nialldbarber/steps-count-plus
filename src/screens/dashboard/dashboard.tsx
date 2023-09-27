import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Stack } from "@/design-system/components/layouts/stack";
import { useHealthData } from "@/hooks/useHealthData";
import { useUnitsStore } from "@/stores/units";

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
          Steps: {steps.toString()}
        </Text>
        <Text level="text" size="20px">
          Flights: {JSON.stringify(flights)}
        </Text>
        <Text level="text" size="20px">
          Distance: {handleUnits}
        </Text>
      </Stack>
    </MainScreenLayout>
  );
}
