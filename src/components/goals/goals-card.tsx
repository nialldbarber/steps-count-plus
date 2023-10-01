import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import Animated from "react-native-reanimated";
import { Box } from "@/design-system/components/atoms/box";
import { Button } from "@/design-system/components/atoms/button";
import { Card } from "@/design-system/components/atoms/card";
import { Chip } from "@/design-system/components/atoms/chip";
import { Text } from "@/design-system/components/atoms/text";
import { Row } from "@/design-system/components/layouts/row";
import { Stack } from "@/design-system/components/layouts/stack";
import { useActiveValue } from "@/hooks/useActiveValue";
import { useShakeAnimation } from "@/lib/animation";
import { hitSlopLarge } from "@/lib/hitSlop";
import { formatNumber } from "@/lib/numbers";

type GoalsCardProps = {
  title: string;
  goalAmount: number;
  units?: string;
  incrementBy: string;
  decrementBy: string;
  lowerLimit: number;
  upperLimit: number;
  goalCallback: any;
  options: Array<{ id: string; label: string; value: number }>;
};

export default function GoalsCard({
  title,
  goalAmount,
  units,
  incrementBy,
  decrementBy,
  lowerLimit,
  upperLimit,
  goalCallback,
  options,
}: GoalsCardProps) {
  const { t } = useTranslation();
  const timerRef = useRef(null);
  const { handleActiveValue } = useActiveValue(-1);
  const { handleShakeAnimation, useShakeAnimationStyles } = useShakeAnimation();

  function handleMinusGoal() {
    if (goalAmount > lowerLimit) {
      goalCallback(goalAmount - Number(decrementBy));
    }

    if (goalAmount <= lowerLimit) handleShakeAnimation();
  }

  function handlePlusGoal() {
    if (goalAmount <= upperLimit) {
      goalCallback(goalAmount + Number(incrementBy));
    }

    if (goalAmount >= upperLimit) handleShakeAnimation();
  }

  const goal = useMemo(() => {
    if (goalAmount === 0) return 0;
    return `${formatNumber(goalAmount)} `;
  }, [goalAmount]);

  return (
    <Card cardType="emphasise">
      <Stack gutter="5px">
        <Box alignItems="center">
          <Text level="heading" size="26px" weight="bold">
            {title}
          </Text>
        </Box>
        <Box alignItems="center">
          <Text level="text" weight="bold">
            Current goal
          </Text>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            variant="secondary"
            onPress={handleMinusGoal}
            onLongPress={handleMinusGoal}
            a11yLabel={t("components.goals.chip.decrease.a11yLabel")}
            a11yHint={t("components.goals.chip.decrease.a11yHint", {
              goalType: title.toLowerCase(),
              amount: decrementBy,
            })}
          >
            {`-${decrementBy}`}
          </Button>
          <Animated.View style={useShakeAnimationStyles}>
            <Text level="heading" size="28px">
              {goal}
              <Text size="12px" color="greyFour">
                {units}
              </Text>
            </Text>
          </Animated.View>
          <Button
            variant="secondary"
            onPress={handlePlusGoal}
            a11yLabel={t("components.goals.chip.increase.a11yLabel")}
            a11yHint={t("components.goals.chip.increase.a11yHint", {
              goalType: title.toLowerCase(),
              amount: incrementBy,
            })}
          >
            {`+${incrementBy}`}
          </Button>
        </Box>
        <Box alignItems="center">
          <Text level="text" weight="bold">
            Suggested goal
          </Text>
        </Box>
        <Box marginVertical="5px">
          <Row gutter="2px" justifyContent="space-between">
            {options.map(({ id, label, value: chipValue }, index) => {
              return (
                <Chip
                  key={id}
                  label={label}
                  onPress={() => {
                    handleActiveValue(index);
                    goalCallback(chipValue);
                  }}
                  a11yLabel={t("components.goals.chip.setAmounts.a11yLabel")}
                  a11yHint={t("components.goals.chip.setAmounts.a11yHint", {
                    goalType: title.toLowerCase(),
                    amount: chipValue,
                  })}
                  hitSlop={hitSlopLarge}
                  isSelected={chipValue === goalAmount}
                  a11yState={{ selected: chipValue === goalAmount }}
                  size="14px"
                  mode="dark"
                />
              );
            })}
          </Row>
        </Box>
      </Stack>
    </Card>
  );
}
