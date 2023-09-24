import { Appearance, Pressable, StyleSheet, Text } from "react-native";
import type { PressableProps, TextStyle, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { space } from "@/design-system/layouts/space";
import { tokens } from "@/design-system/theme/design-tokens";

const colorScheme = Appearance.getColorScheme();

type Variant = "primary" | "secondary" | "tertiary" | "link" | "destructive";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  children: string;
}

const buttonStyles: Record<Variant, ViewStyle> = {
  primary: {
    backgroundColor:
      colorScheme === "light"
        ? tokens.buttonPrimaryBackgroundColor
        : tokens.buttonSecondaryBackgroundColor,
  },
  secondary: {
    backgroundColor: tokens.buttonSecondaryBackgroundColor,
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
  children,
  ...rest
}: ButtonProps) {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      padding: space["16px"],
      borderRadius: tokens.buttonBorderRadius,
      ...buttonStyles[variant],
    },
    text: {
      // TODO: add global font weights
      fontWeight: "700",
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
        onPressIn={() => onPress("in")}
        onPressOut={() => onPress("out")}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </Animated.View>
  );
}
