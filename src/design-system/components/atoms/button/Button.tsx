import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import type { PressableProps, TextStyle, ViewStyle } from "react-native";
import type { ImpactFeedbackStyle } from "expo-haptics";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Box } from "@/design-system/components/atoms/box";
import { Loader } from "@/design-system/components/atoms/loader";
import { Text } from "@/design-system/components/atoms/text";
import { space } from "@/design-system/layouts/space";
import { tokens } from "@/design-system/theme/design-tokens";

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

const buttonStyles: Record<Variant, ViewStyle> = {
  primary: {
    backgroundColor: tokens.buttonPrimaryBackgroundColor,
  },
  secondary: {
    backgroundColor: "transparent",
    borderColor: tokens.buttonSecondaryBackgroundColor,
    borderWidth: 2,
  },
  tertiary: {},
  link: {},
  destructive: {},
};

const textStyles: Record<Variant, TextStyle> = {
  primary: {
    color: tokens.buttonPrimaryTextColor,
  },
  secondary: {
    color: tokens.buttonSecondaryTextColor,
  },
  tertiary: {},
  link: {},
  destructive: {},
};

export default function Button({
  variant = "primary",
  haptic,
  isLoading = false,
  isDisabled = false,
  children,
  ...rest
}: ButtonProps) {
  const styles = StyleSheet.create({
    button: {
      position: "relative",
      alignItems: "center",
      height: space["60px"],
      justifyContent: "center",
      // padding: space["20px"],
      borderRadius: tokens.buttonBorderRadius,
      ...buttonStyles[variant],
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
    size.value = withSpring(direction === "in" ? 0.98 : 1, {
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
  }, [isLoading]);

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
      >
        <Box flexDirection="row">
          <Text style={styles.text} weight="bold">
            {children}
          </Text>
        </Box>
      </Pressable>
      <Box position="absolute" right="20px" top="15px">
        <Animated.View style={loaderStyle}>
          <Loader variant={variant} />
        </Animated.View>
      </Box>
    </Animated.View>
  );
}
