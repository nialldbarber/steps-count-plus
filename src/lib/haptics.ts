import * as Haptics from "expo-haptics";

export const HapticFeedback = {
  light: "Light",
  medium: "Medium",
  heavy: "Heavy",
  success: "Success",
  warning: "Warning",
  error: "Error",
} as const;

type HapticFeedbackType = (typeof HapticFeedback)[keyof typeof HapticFeedback];

export const hapticToTrigger = (
  haptic: HapticFeedbackType,
  hapticType: "alert" | "notification" = "alert",
) => ({
  [haptic]: () =>
    hapticType === "notification"
      ? Haptics.notificationAsync(Haptics.NotificationFeedbackType[haptic])
      : Haptics.impactAsync(Haptics.ImpactFeedbackStyle[haptic]),
});
