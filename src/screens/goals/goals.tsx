import { Trans, useTranslation } from "react-i18next";
import { DailyDistanceGoal } from "@/components/goals/distance";
import { DailyFlightsGoal } from "@/components/goals/flights";
import { DailyStepsGoal } from "@/components/goals/steps";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Stack } from "@/design-system/components/layouts/stack";

export default function GoalsScreen() {
  const { t } = useTranslation();

  return (
    <MainScreenLayout>
      <Stack gutter="10px">
        <Text level="heading" color="greyFour" withEmoji>
          <Trans
            components={{
              bold: <Text color="primary" size="20px" weight="bold" />,
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
  );
}
