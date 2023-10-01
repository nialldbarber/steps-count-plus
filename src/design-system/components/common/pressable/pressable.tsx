import { Pressable as NativePressable } from "react-native";
import type { PressableProps as NativePressableProps } from "react-native";
import * as Haptics from "expo-haptics";
import type { A11y } from "@/types/a11y";

export interface PressableProps extends NativePressableProps, A11y {
  onPress?: (...args: any[]) => any;
  haptics?: {
    type: "action" | "notification";
    level?: "Success" | "Warning" | "Error" | "Light" | "Medium" | "Heavy";
  };
}

export default function Pressable({
  onPress,
  haptics = { type: "action" },
  a11yLabel,
  a11yHint,
  a11yRole = "button",
  a11yState,
  children,
  ...rest
}: PressableProps) {
  const handleOnPress = () => {
    if (onPress === null) return;
    onPress && onPress();
    if (haptics?.type === "action") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return (
    <NativePressable
      onPress={handleOnPress}
      {...rest}
      accessible
      accessibilityLabel={a11yLabel}
      accessibilityHint={a11yHint}
      accessibilityRole={a11yRole}
      accessibilityState={a11yState}
    >
      {children}
    </NativePressable>
  );
}
