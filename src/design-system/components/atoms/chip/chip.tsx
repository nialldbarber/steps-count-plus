import { StyleSheet } from "react-native";
import type { ViewStyle } from "react-native";
import { colors } from "@/design-system/color/palettes";
import { shadow } from "@/design-system/color/shadow";
import { Text } from "@/design-system/components/atoms/text";
import { Pressable } from "@/design-system/components/common/pressable";
import type { PressableProps } from "@/design-system/components/common/pressable/pressable";
import { radius } from "@/design-system/layouts/radius";
import { widths, type Width } from "@/design-system/layouts/size";
import { space } from "@/design-system/layouts/space";
import { tokens } from "@/design-system/theme/design-tokens";
import type { FontSizes } from "@/design-system/typography/font-size";

type ChipMode = "light" | "dark";
interface ChipProps extends PressableProps {
  mode?: ChipMode;
  size?: FontSizes;
  a11yLabel: string;
  label: string;
  isSelected?: boolean;
  width?: Width;
}

export default function Chip({
  mode = "light",
  isSelected = false,
  size,
  label,
  width,
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
      height: space["38px"],
      paddingHorizontal: space["15px"],
      borderRadius: radius.full,
      alignItems: "center",
      justifyContent: "center",
      ...backgroundStyles[mode],
      ...shadow(),
      width: widths[width],
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
