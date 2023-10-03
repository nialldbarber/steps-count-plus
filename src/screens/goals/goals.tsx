import { useRef } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Trans, useTranslation } from "react-i18next";
import { DailyDistanceGoal } from "@/components/goals/distance";
import { DailyFlightsGoal } from "@/components/goals/flights";
import { DailyStepsGoal } from "@/components/goals/steps";
import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import { Pressable } from "@/design-system/components/common/pressable";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Stack } from "@/design-system/components/layouts/stack";
import { useBottomSheet } from "@/hooks/useBottomSheet";

export default function GoalsScreen() {
  const { t } = useTranslation();
  const bottomSheetRef = useRef(null);
  const { snapPoints, handlePresentModalPress } =
    useBottomSheet(bottomSheetRef);

  return (
    <>
      <MainScreenLayout>
        <Stack gutter="10px">
          <Text level="heading" color="greyFour" withEmoji>
            <Trans
              components={{
                bold: <Text color="primary" level="heading" />,
                modal: <Pressable onPress={handlePresentModalPress} />,
              }}
            >
              {t("screen.goals.introText")}
            </Trans>
          </Text>
          <DailyStepsGoal />
          <DailyDistanceGoal />
          <DailyFlightsGoal />
        </Stack>
      </MainScreenLayout>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
      >
        <Stack margin="20px">
          <Box>
            <Text>Infoooooooooo</Text>
          </Box>
        </Stack>
      </BottomSheetModal>
    </>
  );
}
