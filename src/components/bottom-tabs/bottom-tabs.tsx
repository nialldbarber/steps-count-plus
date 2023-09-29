import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import CustomBottomTabsIcon from "@/components/bottom-tabs/bottom-tabs-icon";
import { colors } from "@/design-system/color/palettes";
import { shadow } from "@/design-system/color/shadow";
import { Text } from "@/design-system/components/atoms/text";
import { Pressable } from "@/design-system/components/common/pressable";
import { radius } from "@/design-system/layouts/radius";
import { heights } from "@/design-system/layouts/size";
import { appTheme } from "@/design-system/theme/design-tokens";
import { useThemeStore } from "@/stores/theme";

const CustomBottomTab = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { theme } = useThemeStore();

  const { width } = useWindowDimensions();
  const MARGIN = 20;
  const TAB_BAR_WIDTH = width - 2 * MARGIN;
  const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

  const translateAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(TAB_WIDTH * state.index, {
          damping: 15,
          restSpeedThreshold: 10,
        }),
      },
    ],
  }));

  const styles = StyleSheet.create({
    button: {
      flex: 1,
    },
    tabBarContainer: {
      flex: 1,
      flexDirection: "row",
      height: heights["90px"],
      position: "absolute",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "space-around",
      backgroundColor: appTheme[theme].bottomTabBackgroundColor,
      borderRadius: radius.full,
      overflow: "hidden",
      ...shadow(),
    },
    slidingTabContainer: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
      justifyContent: "center",
    },
    slidingTab: {
      width: 75,
      height: 75,
      backgroundColor: "rgba(209, 213, 219, 0.3)",
      borderRadius: radius.full,
      ...shadow(),
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
    },
  });

  return (
    <View
      style={[styles.tabBarContainer, { width: TAB_BAR_WIDTH, bottom: MARGIN }]}
    >
      <Animated.View
        style={[
          styles.slidingTabContainer,
          { width: TAB_WIDTH },
          translateAnimation,
        ]}
      >
        <View style={styles.slidingTab} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, { merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}
          >
            <View style={styles.contentContainer}>
              <CustomBottomTabsIcon route={route.name} isFocused={isFocused} />
              <Text
                color={
                  isFocused
                    ? appTheme[theme].bottomTabsTextActiveColor
                    : appTheme[theme].bottomTabsTextColor
                }
                size="11px"
                weight="bold"
              >
                {route.name}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default CustomBottomTab;
