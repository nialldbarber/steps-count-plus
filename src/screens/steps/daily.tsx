import { useMemo } from "react";
import { PixelRatio, StyleSheet, View } from "react-native";
import { useFont } from "@shopify/react-native-skia";
import { Trans, useTranslation } from "react-i18next";
import { DonutChart } from "@/components/chart/donut";
import { Box } from "@/design-system/components/atoms/box";
import { Card } from "@/design-system/components/atoms/card";
import { Text } from "@/design-system/components/atoms/text";
import { Stack } from "@/design-system/components/layouts/stack";
import { space } from "@/design-system/layouts/space";
import { useRemainingCount } from "@/hooks/useRemainingCount";
import { formatNumber } from "@/lib/numbers";
import { useGoalsStore } from "@/stores/goals";
import { useStepsStore } from "@/stores/steps";

type DailyStepsProps = {};

const RADIUS = PixelRatio.roundToNearestPixel(170);
const STROKE_WIDTH = 12;

export function DailySteps({}: DailyStepsProps) {
  const { t } = useTranslation();
  const { dailySteps } = useStepsStore();
  const { stepsGoal } = useGoalsStore();
  const { countRemainingToGoal } = useRemainingCount(stepsGoal, dailySteps);

  const styles = StyleSheet.create({
    container: {
      width: RADIUS * 2,
      height: RADIUS * 2,
      marginVertical: space["20px"],
    },
  });

  //const percentageComplete = 0.25;

  const calculatePercentage = useMemo(() => {
    return dailySteps / stepsGoal;
  }, [dailySteps, stepsGoal]);

  const font = useFont(
    require("../../../assets/fonts/PlusJakartaSans-Bold.ttf"),
    80,
  );
  const smallerFont = useFont(
    require("../../../assets/fonts/PlusJakartaSans-Bold.ttf"),
    18,
  );

  if (!font || !smallerFont) return <View />;

  return (
    <Stack gutter="10px">
      <Card cardType="emphasise">
        <Box alignItems="center">
          <Text level="heading" size="26px" weight="bold">
            {t("screen.stats.24hrs.steps.title")}
          </Text>
          <View style={styles.container}>
            <DonutChart
              radius={RADIUS}
              strokeWidth={STROKE_WIDTH}
              targetPercentage={calculatePercentage}
              font={font}
              smallerFont={smallerFont}
              amount={dailySteps}
              message={t("screen.stats.24hrs.steps.currentGoal", {
                goal: formatNumber(stepsGoal),
              })}
            />
          </View>
          <Text size="20px">
            <Trans
              components={{
                bold: <Text color="primary" size="20px" weight="bold" />,
              }}
            >
              {t("screen.stats.24hrs.steps.remaining", {
                remaining: countRemainingToGoal,
              })}
            </Trans>
          </Text>
        </Box>
      </Card>
    </Stack>
  );
}
