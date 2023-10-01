import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CloseCircle } from "iconsax-react-native";
import type { Colors } from "@/design-system/color/palettes";
import { Pressable } from "@/design-system/components/common/pressable";
import { zIndex } from "@/design-system/layouts/zIndex";
import { appTheme } from "@/design-system/theme/design-tokens";
import { hitSlopLarge } from "@/lib/hitSlop";
import { useThemeStore } from "@/stores/theme";

type CloseProps = {
  /**
   * Refer back to colors for a full list of options
   * @default "black"
   */
  onPress?: (...args: any[]) => void;
  stroke?: Colors;
};

export default function Close({ onPress, stroke }: CloseProps) {
  const { goBack } = useNavigation();
  const { theme } = useThemeStore();

  const styles = StyleSheet.create({
    container: {
      zIndex: zIndex["1px"],
    },
  });

  return (
    <Pressable
      onPress={onPress ?? goBack}
      hitSlop={hitSlopLarge}
      style={styles.container}
      haptics={{ type: "action", level: "Light" }}
    >
      <CloseCircle size={32} color={stroke ?? appTheme[theme].goBackStroke} />
    </Pressable>
  );
}
