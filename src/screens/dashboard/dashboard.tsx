import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Stack } from "@/design-system/components/layouts/stack";
import { useHealthData } from "@/hooks/useHealthData";

export default function DashboardScreen() {
  const { steps, flights, distance } = useHealthData(new Date());

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
          Distance: {`${(distance / 1000).toFixed(2)} km`}
        </Text>
      </Stack>
    </MainScreenLayout>
  );
}
