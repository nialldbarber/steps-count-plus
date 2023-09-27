import {
  Dimensions,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import CustomBottomTabsIcon from "@/components/bottom-tabs/bottom-tabs-icon";
import { Text } from "@/design-system/components/atoms/text";

export default function CustomBottomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  // const { width } = Dimensions.get("screen");
  // const MARGIN = 20;
  // const TAB_BAR_WIDTH = width - 2 * MARGIN;
  // const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

  // const tabWidth = useSharedValue(width - 2 * MARGIN);

  // const animatedStyles = useAnimatedStyle(
  //   () => ({
  //     transform: [{ translateX: 1 }],
  //   }),
  //   [],
  // );

  return (
    <View>
      <Text>hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flex: 1,
    flexDirection: "row",
    height: 90,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#0067FF",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  slidingTabContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  slidingTab: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
