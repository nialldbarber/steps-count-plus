import { useRef } from "react";
import PagerView from "react-native-pager-view";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { flexStyles } from "@/design-system/common-styles/flex";
import { Chip } from "@/design-system/components/atoms/chip";
import { Row } from "@/design-system/components/layouts/row";
import { useActiveValue } from "@/hooks/useActiveValue";
import { useHealthData } from "@/hooks/useHealthData";
import { usePagerScrollHandler } from "@/hooks/usePagerScrollHandler";
import { hitSlopLarge } from "@/lib/hitSlop";
import { DailySteps } from "@/screens/steps/daily";
import { WeeklySteps } from "@/screens/steps/weekly";

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

const chipOptions: Array<{ id: number; label: string; view: number }> = [
  { id: 1, label: "24 hrs", view: 0 },
  { id: 2, label: "7 days", view: 1 },
  { id: 3, label: "30 days", view: 2 },
  { id: 4, label: "1 year", view: 3 },
];

export default function DashboardScreen() {
  useHealthData(new Date());

  const { value, handleActiveValue } = useActiveValue();
  const tabRef = useRef<PagerView>(null);
  const scrollOffset = useSharedValue(0);
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
  const handleTabView = (key: number) => tabRef?.current?.setPage(key);

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(scrollOffset.value, [0, 0.5, 1], [1, 0.8, 1], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    });
    const opacity = interpolate(scrollOffset.value, [0, 0.5, 1], [1, 0, 1], {
      extrapolateRight: Extrapolation.CLAMP,
      extrapolateLeft: Extrapolation.CLAMP,
    });
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <>
      <Row margin="15px" gutter="6px">
        {chipOptions.map(({ id, label, view }, index) => {
          return (
            <Chip
              key={id}
              label={label}
              onPress={() => {
                handleActiveValue(index);
                handleTabView(view);
              }}
              hitSlop={hitSlopLarge}
              isSelected={index === value}
            />
          );
        })}
      </Row>
      <AnimatedPager
        style={flexStyles.container}
        initialPage={0}
        ref={tabRef}
        overdrag
        onPageScroll={handler}
      >
        <Animated.View key="1" style={animatedStyles}>
          <DailySteps />
        </Animated.View>
        <Animated.View key="2" style={animatedStyles}>
          <WeeklySteps />
        </Animated.View>
      </AnimatedPager>
    </>
  );
}
