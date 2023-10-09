import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";

type NewChallengeScreenProps = {};

export default function NewChallengeScreen({}: NewChallengeScreenProps) {
  return (
    <MainScreenLayout>
      <Box flexDirection="row" justifyContent="space-between">
        <Text level="heading" size="30px" color="black">
          The new challenge modal
        </Text>
      </Box>
    </MainScreenLayout>
  );
}
