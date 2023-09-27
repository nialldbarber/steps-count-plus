import { useMemo } from "react";
import { useAnimatedStyle } from "react-native-reanimated";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Stack } from "@/design-system/components/layouts/stack";
import { useHealthData } from "@/hooks/useHealthData";
import { useUnitsStore } from "@/stores/units";

export default function DashboardScreen() {
  const { units } = useUnitsStore();
  const { steps, flights, distance } = useHealthData(new Date());

  const handleUnits = useMemo(() => {
    if (units === "km") {
      return `${(distance / 1000).toFixed(2)} km`;
    }

    return `${(distance / 1609.34).toFixed(2)} miles`;
  }, [units]);

  const test = useAnimatedStyle(() => ({}));

  return (
    <MainScreenLayout>
      <Stack gutter="10px">
        <Text level="heading" size="30px">
          StepsCount+
        </Text>
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
