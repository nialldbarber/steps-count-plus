import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Setting2 } from "iconsax-react-native";
import type { Colors } from "@/design-system/color/palettes";
import Pressable from "@/design-system/components/common/pressable/pressable";
import { appTheme } from "@/design-system/theme/design-tokens";
import { hitSlopLarge } from "@/lib/hitSlop";
import type { RootStackParamList } from "@/navigation/stack/stack";
import { useThemeStore } from "@/stores/theme";

type SettingsIconProps = {
  /**
   * Refer back to colors for a full list of options
   * @default "black"
   */
  stroke?: Colors;
};

type SettingsModalScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Settings"
>;

export default function SettingsIcon({ stroke }: SettingsIconProps) {
  const { theme } = useThemeStore();
  const { navigate } = useNavigation<SettingsModalScreenNavigationProp>();

  return (
    <Pressable onPress={() => navigate("Settings")} hitSlop={hitSlopLarge}>
      <Setting2 size="32" color={stroke ?? appTheme[theme].settingsStroke} />
    </Pressable>
  );
}
