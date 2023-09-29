import { Pressable as NativePressable } from "react-native";
import type {
  GestureResponderEvent,
  PressableProps as NativePressableProps,
} from "react-native";
import * as Haptics from "expo-haptics";

interface PressableProps extends NativePressableProps {
  onPress: ((event?: GestureResponderEvent) => void) | null | undefined;
  haptics?: {
    type: "action" | "notification";
    level?: "Success" | "Warning" | "Error" | "Light" | "Medium" | "Heavy";
  };
}

export default function Pressable({
  haptics = { type: "action" },
  onPress,
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
    <NativePressable onPress={handleOnPress} {...rest}>
      {children}
    </NativePressable>
  );
}
