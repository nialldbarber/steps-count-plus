import { Pressable, StyleSheet } from "react-native";
import type { PressableProps, TextStyle, ViewStyle } from "react-native";
import type {
  ImpactFeedbackStyle,
  NotificationFeedbackType,
} from "expo-haptics";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Text } from "@/design-system/components/atoms/text";
import { space } from "@/design-system/layouts/space";
import { tokens } from "@/design-system/theme/design-tokens";

type Variant = "primary" | "secondary" | "tertiary" | "link" | "destructive";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  haptic?: keyof typeof ImpactFeedbackStyle;
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
  children,
  ...rest
}: ButtonProps) {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      padding: space["20px"],
      borderRadius: tokens.buttonBorderRadius,
      ...buttonStyles[variant],
    },
    text: {
      ...textStyles[variant],
    },
  });

  const size = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: size.value }],
  }));
  const onPress = (direction: "in" | "out") => {
    size.value = withSpring(direction === "in" ? 0.98 : 1, {
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
    });
  };

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
        <Text style={styles.text} weight="bold">
          {children}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
