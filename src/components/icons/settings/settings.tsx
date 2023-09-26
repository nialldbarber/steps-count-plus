import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Setting2 } from "iconsax-react-native";
import type { Colors } from "@/design-system/color/palettes";
import { colors } from "@/design-system/color/palettes";
import { tokens } from "@/design-system/theme/design-tokens";
import { hitSlopLarge } from "@/lib/hitSlop";
import type { RootStackParamList } from "@/navigation/stack/stack";

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
  const { navigate } = useNavigation<SettingsModalScreenNavigationProp>();

  const getStrokeColor = () => {
    if (stroke !== undefined) {
      return colors[stroke];
    }

    return tokens.goBackStroke;
  };
  const strokeColor = getStrokeColor();

  return (
    <Pressable onPress={() => navigate("Settings")} hitSlop={hitSlopLarge}>
      <Setting2 size="32" color="red" />
    </Pressable>
  );
}
