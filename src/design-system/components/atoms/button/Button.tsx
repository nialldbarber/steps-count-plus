import { Pressable, StyleSheet, Text } from "react-native";
import type { PressableProps, TextStyle, ViewStyle } from "react-native";
import { space } from "@/design-system/layouts/space";
import { tokens } from "@/design-system/theme/design-tokens";

type Variant = "primary" | "secondary" | "tertiary" | "link" | "destructive";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  children: string;
}

const buttonStyles: Record<Variant, ViewStyle> = {
  primary: {
    backgroundColor: tokens.buttonPrimaryBackgroundColor,
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
      padding: space["10px"],
      borderRadius: space["5px"],
      ...buttonStyles[variant],
    },
    text: {
      ...textStyles[variant],
    },
  });

  return (
    <Pressable {...rest} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}
