import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CloseCircle } from "iconsax-react-native";
import type { Colors } from "@/design-system/color/palettes";
import { space } from "@/design-system/layouts/space";
import { zIndex } from "@/design-system/layouts/zIndex";
import { appTheme } from "@/design-system/theme/design-tokens";
import { hitSlopLarge } from "@/lib/hitSlop";
import { useThemeStore } from "@/stores/theme";

type CloseProps = {
  /**
   * Refer back to colors for a full list of options
   * @default "black"
   */
  stroke?: Colors;
};

export default function Close({ stroke }: CloseProps) {
  const { goBack } = useNavigation();
  const { theme } = useThemeStore();

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: space["20px"],
      right: space["20px"],
      zIndex: zIndex["1px"],
    },
  });

  return (
    <Pressable onPress={goBack} hitSlop={hitSlopLarge} style={styles.container}>
      <CloseCircle size={32} color={stroke ?? appTheme[theme].goBackStroke} />
    </Pressable>
  );
}
