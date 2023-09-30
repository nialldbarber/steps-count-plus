import { useEffect } from "react";
import { StyleSheet } from "react-native";
import type { PressableProps, TextStyle, ViewStyle } from "react-native";
import type { ImpactFeedbackStyle } from "expo-haptics";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { shadow } from "@/design-system/color/shadow";
import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import { Pressable } from "@/design-system/components/common/pressable";
import { space } from "@/design-system/layouts/space";
import { appTheme } from "@/design-system/theme/design-tokens";
import { useThemeStore } from "@/stores/theme";

export type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "link"
  | "destructive";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  haptic?: keyof typeof ImpactFeedbackStyle;
  isLoading?: boolean;
  isDisabled?: boolean;
  children: string;
}

export default function Button({
  variant = "primary",
  haptic,
  isLoading = false,
  isDisabled = false,
  isActive = false,
  children,
  ...rest
}: ButtonProps) {
  const { theme } = useThemeStore();
  const accessibilityLabel = `${children} button`;

  const buttonStyles: Record<Variant, ViewStyle> = {
    primary: {
      backgroundColor: appTheme[theme].buttonPrimaryBackgroundColor,
    },
    secondary: {
      backgroundColor: appTheme[theme].buttonSecondaryBackgroundColor,
      borderColor: appTheme[theme].buttonSecondaryBackgroundColor,
      borderWidth: 2,
    },
    tertiary: {},
    link: {},
    destructive: {},
  };

  const textStyles: Record<Variant, TextStyle> = {
    primary: {
      color: appTheme[theme].buttonPrimaryTextColor,
    },
    secondary: {
      color: appTheme[theme].buttonSecondaryTextColor,
    },
    tertiary: {},
    link: {},
    destructive: {},
  };

  const styles = StyleSheet.create({
    button: {
      position: "relative",
      alignItems: "center",
      height: space["60px"],
      paddingHorizontal: space["20px"],
      justifyContent: "center",
      borderRadius: appTheme[theme].buttonBorderRadius,
      ...buttonStyles[variant],
      ...shadow(),
    },
    text: {
      ...textStyles[variant],
    },
  });

  const loader = useSharedValue(0);
  const size = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: size.value }],
  }));
  const loaderStyle = useAnimatedStyle(() => ({
    opacity: loader.value,
  }));

  const onPress = (direction: "in" | "out") => {
    size.value = withSpring(direction === "in" ? 0.95 : 1, {
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
    });
  };

  useEffect(() => {
    if (isLoading) {
      loader.value = withTiming(1, { duration: 500 });
    } else {
      loader.value = withTiming(0, { duration: 100 });
    }
  }, [isLoading, loader]);

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        {...rest}
        style={styles.button}
        onPressIn={() => {
          onPress("in");
          if (haptic !== undefined) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle[haptic]);
          }
        }}
        onPressOut={() => onPress("out")}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      >
        <Box flexDirection="row">
          <Text style={styles.text}>{children}</Text>
        </Box>
      </Pressable>
      {/* <Box position="absolute" right="20px" top="15px">
        <Animated.View style={loaderStyle}>
          <Loader variant={variant} />
        </Animated.View>
      </Box> */}
    </Animated.View>
  );
}
