import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";

export default function DashboardScreen() {
  return (
    <MainScreenLayout>
      <Box>
        <Text level="heading" size="30px" color="white">
          this is something
        </Text>
      </Box>
    </MainScreenLayout>
  );
}
