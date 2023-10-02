import { useTranslation } from "react-i18next";
import Chart from "@/components/chart/chart";
import { Box } from "@/design-system/components/atoms/box";
import { Card } from "@/design-system/components/atoms/card";
import { Text } from "@/design-system/components/atoms/text";
import { Stack } from "@/design-system/components/layouts/stack";
import { useStepsStore } from "@/stores/steps";

type MonthlyStepsProps = {};

export function MonthlySteps({}: MonthlyStepsProps) {
  const { t } = useTranslation();
  const { monthlySteps, monthlySegments } = useStepsStore();

  return (
    <Stack gutter="10px">
      <Card cardType="emphasise">
        <Box flexDirection="row">
          <Text level="heading" size="26px">
            Weekly steps
          </Text>
        </Box>
        <Text level="text" size="20px">
          {t("screen.stats.steps", { steps: monthlySteps })}
        </Text>
        <Chart data={monthlySegments} />
      </Card>
    </Stack>
  );
}
