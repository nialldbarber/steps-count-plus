import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Setting2 } from "iconsax-react-native";
import { useTranslation } from "react-i18next";
import type { Colors } from "@/design-system/color/palettes";
import { shadow } from "@/design-system/color/shadow";
import { Box } from "@/design-system/components/atoms/box";
import { Pressable } from "@/design-system/components/common/pressable";
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
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const { navigate } = useNavigation<SettingsModalScreenNavigationProp>();

  const styles = StyleSheet.create({
    background: {
      ...shadow(),
      backgroundColor: appTheme[theme].settingsStrokeBackground,
    },
  });

  return (
    <Pressable
      onPress={() => navigate("Settings")}
      a11yLabel={t("components.settings.a11yLabel")}
      a11yHint={t("components.settings.a11yHint")}
      a11yRole="button"
      hitSlop={hitSlopLarge}
    >
      <Box borderRadius="full" padding="6px" styles={styles.background}>
        <Setting2 size="32" color={stroke ?? appTheme[theme].settingsStroke} />
      </Box>
    </Pressable>
  );
}
