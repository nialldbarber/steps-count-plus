import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";

export default function InsightsScreen() {
  return (
    <MainScreenLayout>
      <Box>
        <Text level="heading" size="30px">
          The insights screen
        </Text>
      </Box>
    </MainScreenLayout>
  );
}
