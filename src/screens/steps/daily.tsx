import { useTranslation } from "react-i18next";
import { Box } from "@/design-system/components/atoms/box";
import { Card } from "@/design-system/components/atoms/card";
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
        <Card cardType="emphasise">
          <Box alignItems="center">
            <Text level="heading" size="26px" weight="bold">
              Steps
            </Text>
            <Text level="text" size="20px">
              {t("screen.stats.steps", { steps: dailySteps })}
            </Text>
          </Box>
        </Card>
      </Stack>
    </MainScreenLayout>
  );
}
