import { Box, MainScreenLayout, Text } from "@/design-system/components";
import { useHealthData } from "@/hooks/useHealthData";

export default function DashboardScreen() {
  const { steps, flights, distance } = useHealthData(new Date());

  return (
    <MainScreenLayout>
      <Box>
        <Text level="heading" size="30px" color="white">
          this is something
        </Text>
        <Text level="heading" size="30px" color="white">
          {steps.toString()}
        </Text>
        <Text level="heading" size="30px" color="white">
          {JSON.stringify(flights)}
        </Text>
        <Text level="heading" size="30px" color="white">
          POOP: {JSON.stringify(distance)}
        </Text>
      </Box>
    </MainScreenLayout>
  );
}
