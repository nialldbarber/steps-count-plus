import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { Close } from "@/components/icons/close";
import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";

type PremiumScreenProps = {};

export default function PremiumScreen({}: PremiumScreenProps) {
  const { dismiss } = useBottomSheetModal();

  return (
    <MainScreenLayout>
      <Box flexDirection="row" justifyContent="space-between">
        <Text level="heading" size="30px" color="black">
          The premium screen
        </Text>
        <Close onPress={dismiss} />
      </Box>
    </MainScreenLayout>
  );
}
