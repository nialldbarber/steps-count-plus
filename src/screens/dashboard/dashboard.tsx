import { useRef } from "react";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import PagerView from "react-native-pager-view";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useEvent,
  useHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Button } from "@/design-system/components/atoms/button";
import { Row } from "@/design-system/components/layouts/row";
import { useHealthData } from "@/hooks/useHealthData";
import { hitSlopLarge } from "@/lib/hitSlop";
import { DailySteps } from "@/screens/steps/daily";
import { WeeklySteps } from "@/screens/steps/weekly";
import { useUnitsStore } from "@/stores/units";

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

export function usePagerScrollHandler(handlers: any, dependencies?: any) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  const subscriberForEvents = ["onPageScroll"];

  return useEvent<any>(
    (event) => {
      "worklet";
      const { onPageScroll } = handlers;
      if (onPageScroll && event.eventName.endsWith("onPageScroll")) {
        onPageScroll(event, context);
      }
    },
    subscriberForEvents,
    doDependenciesDiffer,
  );
}

export default function DashboardScreen() {
  const tabRef = useRef<PagerView>(null);
  const { t } = useTranslation();
  const { units } = useUnitsStore();

  const scrollOffset = useSharedValue(0);

  const handler = usePagerScrollHandler({
    onPageScroll: (e: any) => {
      "worklet";
      scrollOffset.value = e.offset + e.position;
      //console.log(e.offset, e.position);
    },
  });

  useHealthData(new Date());

  // const handleUnits = useMemo(() => {
  //   if (units === "km") {
  //     return `${(distance / 1000).toFixed(2)} km`;
  //   }

  //   return `${(distance / 1609.34).toFixed(2)} miles`;
  // }, [distance, units]);

  const handleTabView = (key: number) => {
    tabRef?.current?.setPage(key);
  };

  const styles = StyleSheet.create({
    pagerView: {
      flex: 1,
    },
  });

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
