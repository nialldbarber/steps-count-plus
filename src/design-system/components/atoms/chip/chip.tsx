import { StyleSheet } from "react-native";
import type { PressableProps } from "react-native";
import { colors } from "@/design-system/color/palettes";
import { shadow } from "@/design-system/color/shadow";
import { Text } from "@/design-system/components/atoms/text";
import { Pressable } from "@/design-system/components/common/pressable";
import { radius } from "@/design-system/layouts/radius";
import { space } from "@/design-system/layouts/space";
import { tokens } from "@/design-system/theme/design-tokens";

interface ChipProps extends PressableProps {
  label: string;
  isSelected?: boolean;
}

export default function Chip({
  isSelected = false,
  label,
  ...rest
}: ChipProps) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: isSelected
        ? tokens.chipActiveBackgroundColor
        : tokens.chipInactiveBackgroundColor,
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
      <Text style={styles.text} weight="bold">
        {label}
      </Text>
    </Pressable>
  );
}
