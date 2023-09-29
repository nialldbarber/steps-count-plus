import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Chart from "@/components/chart/chart";
import { Box } from "@/design-system/components/atoms/box";
import { Card } from "@/design-system/components/atoms/card";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Stack } from "@/design-system/components/layouts/stack";
import { useStepsStore } from "@/stores/steps";

type WeeklyStepsProps = {};

export function WeeklySteps({}: WeeklyStepsProps) {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { weeklySteps, weeklySegments } = useStepsStore();

  useEffect(() => {
    if (weeklySteps && weeklySegments) setLoading(false);
  }, [weeklySteps, weeklySegments]);

  return (
    <MainScreenLayout>
      <Stack gutter="10px">
        <Card cardType="emphasise">
          <Box flexDirection="row">
            <Text level="heading" size="26px">
              Weekly steps
            </Text>
          </Box>
          <Text level="text" size="20px">
            {t("screen.stats.steps", { steps: weeklySteps })}
          </Text>
          {!loading && <Chart data={weeklySegments} />}
        </Card>
      </Stack>
    </MainScreenLayout>
  );
}
