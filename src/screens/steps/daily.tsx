import { useTranslation } from "react-i18next";
import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Stack } from "@/design-system/components/layouts/stack";
import { useStepsStore } from "@/stores/steps";

type DailyStepsProps = {};

export function DailySteps({}: DailyStepsProps) {
  const { t } = useTranslation();
  const { dailySteps } = useStepsStore();

  return (
    <MainScreenLayout>
      <Stack gutter="10px">
        <Box flexDirection="row">
          <Text level="heading" size="26px">
            Daily steps
          </Text>
        </Box>
        <Text level="text" size="20px">
          {t("screen.dashboard.steps", { steps: dailySteps })}
        </Text>
      </Stack>
    </MainScreenLayout>
  );
}
