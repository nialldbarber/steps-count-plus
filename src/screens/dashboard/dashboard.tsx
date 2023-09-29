import { useRef } from "react";
import { StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Button } from "@/design-system/components/atoms/button";
import { Row } from "@/design-system/components/layouts/row";
import { useHealthData } from "@/hooks/useHealthData";
import { usePagerScrollHandler } from "@/hooks/usePagerScrollHandler";
import { hitSlopLarge } from "@/lib/hitSlop";
import { DailySteps } from "@/screens/steps/daily";
import { WeeklySteps } from "@/screens/steps/weekly";

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

export default function DashboardScreen() {
  useHealthData(new Date());

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

  const styles = StyleSheet.create({
    pagerView: {
      flex: 1,
    },
  });

  return (
    <>
      <Row margin="15px" gutter="10px">
        <Button
          onPress={() => handleTabView(0)}
          haptic="Medium"
          hitSlop={hitSlopLarge}
        >
          Daily
        </Button>
        <Button
          onPress={() => handleTabView(1)}
          haptic="Medium"
          hitSlop={hitSlopLarge}
        >
          Weekly
        </Button>
      </Row>
      <AnimatedPager
        style={styles.pagerView}
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
