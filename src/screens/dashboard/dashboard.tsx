import { useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import PagerView from "react-native-pager-view";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Box } from "@/design-system/components/atoms/box";
import { Chip } from "@/design-system/components/atoms/chip";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Row } from "@/design-system/components/layouts/row";
import { Stack } from "@/design-system/components/layouts/stack";
import { useActiveValue } from "@/hooks/useActiveValue";
import { useHealthData } from "@/hooks/useHealthData";
import { usePagerScrollHandler } from "@/hooks/usePagerScrollHandler";
import { hitSlopLarge } from "@/lib/hitSlop";
import { DailyDistance } from "@/screens/distance/daily";
import { DailySteps } from "@/screens/steps/daily";
import { WeeklySteps } from "@/screens/steps/weekly";

const chipOptions: Array<{ id: number; label: string; view: string }> = [
  { id: 1, label: "24 hrs", view: "TwentyFourHours" },
  { id: 2, label: "7 days", view: "SevenDays" },
  { id: 3, label: "30 days", view: "ThirtyDays" },
  { id: 4, label: "1 year", view: "OneYear" },
];

type FilterItems = "OneYear" | "SevenDays" | "ThirtyDays" | "TwentyFourHours";

export default function DashboardScreen() {
  useHealthData(new Date());
  const { t } = useTranslation();
  const scrollOffset = useSharedValue(0);
  const { value, handleActiveValue } = useActiveValue();
  const { params } = useRoute();
  const [currentFilter, setCurrentFilter] = useState<FilterItems>(
    params?.filter || "TwentyFourHours",
  );

  const handler = usePagerScrollHandler({
    onPageScroll: (event: {
      eventName: "onPageScroll";
      offset: number;
      position: number;
    }) => {
      "worklet";
      scrollOffset.value = event.offset + event.position;
    },
  });

  // const animatedStyles = useAnimatedStyle(() => {
  //   const scale = interpolate(scrollOffset.value, [0, 0.5, 1], [1, 0.8, 1], {
  //     extrapolateRight: Extrapolation.CLAMP,
  //     extrapolateLeft: Extrapolation.CLAMP,
  //   });
  //   const opacity = interpolate(scrollOffset.value, [0, 0.5, 1], [1, 0, 1], {
  //     extrapolateRight: Extrapolation.CLAMP,
  //     extrapolateLeft: Extrapolation.CLAMP,
  //   });
  //   return {
  //     transform: [{ scale }],
  //     opacity,
  //   };
  // });

  return (
    <>
      <Box alignItems="center">
        <Row margin="15px" gutter="6px" a11yRole="tablist" scroll>
          {chipOptions.map(({ id, label, view }, index) => {
            return (
              <Chip
                key={id}
                label={label}
                onPress={() => {
                  handleActiveValue(index);
                  setCurrentFilter(view);
                }}
                a11yLabel={t("screen.stats.tabs.a11yLabel")}
                a11yRole="menu"
                hitSlop={hitSlopLarge}
                isSelected={index === value}
              />
            );
          })}
        </Row>
      </Box>
      <MainScreenLayout>
        {currentFilter === "TwentyFourHours" && (
          <Stack gutter="10px">
            <DailySteps />
            <DailyDistance />
          </Stack>
        )}
        {currentFilter === "SevenDays" && (
          <Stack gutter="10px">
            <WeeklySteps />
            <WeeklySteps />
          </Stack>
        )}
        {currentFilter === "ThirtyDays" && <Text>ThirtyDays</Text>}
        {currentFilter === "OneYear" && <Text>OneYear</Text>}
      </MainScreenLayout>
    </>
  );
}
