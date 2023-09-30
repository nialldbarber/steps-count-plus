import { StyleSheet } from "react-native";
import type { PressableProps, ViewStyle } from "react-native";
import { colors } from "@/design-system/color/palettes";
import { shadow } from "@/design-system/color/shadow";
import { Text } from "@/design-system/components/atoms/text";
import { Pressable } from "@/design-system/components/common/pressable";
import { radius } from "@/design-system/layouts/radius";
import { space } from "@/design-system/layouts/space";
import { tokens } from "@/design-system/theme/design-tokens";
import type { FontSizes } from "@/design-system/typography/font-size";

type ChipMode = "light" | "dark";
interface ChipProps extends PressableProps {
  mode?: ChipMode;
  size?: FontSizes;
  label: string;
  isSelected?: boolean;
}

export default function Chip({
  mode = "light",
  isSelected = false,
  size,
  label,
  ...rest
}: ChipProps) {
  const backgroundStyles: Record<ChipMode, ViewStyle> = {
    light: {
      backgroundColor: isSelected
        ? tokens.chipActiveBackgroundColor
        : tokens.chipInactiveBackgroundColor,
    },
    dark: {
      backgroundColor: isSelected
        ? tokens.chipDarkActiveBackgroundColor
        : tokens.chipDarkInactiveBackgroundColor,
    },
  };

  const styles = StyleSheet.create({
    container: {
      ...backgroundStyles[mode],
      height: space["38px"],
      paddingHorizontal: space["15px"],
      borderRadius: radius.full,
      alignItems: "center",
      justifyContent: "center",
      ...shadow(),
    },
    text: {
      color: isSelected ? "white" : colors.black,
    },
  });

  return (
    <Pressable style={styles.container} {...rest}>
      <Text style={styles.text} weight="bold" size={size}>
        {label}
      </Text>
    </Pressable>
  );
}
