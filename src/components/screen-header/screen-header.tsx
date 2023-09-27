import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { SettingsIcon } from "@/components/icons/settings";
import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import { appTheme } from "@/design-system/theme/design-tokens";
import { useThemeStore } from "@/stores/theme";

type SettingsIconProps = {};

export default function ScreenHeader({}: SettingsIconProps) {
  const { theme } = useThemeStore();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: appTheme[theme].mainHeaderBackgroundColor,
    },
  });

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      paddingTop="60px"
      paddingBottom="24px"
      paddingHorizontal="20px"
      justifyContent="space-between"
      styles={styles.container}
    >
      <Text level="heading" size="34px">
        {t("heading")}
      </Text>
      <SettingsIcon />
    </Box>
  );
}
