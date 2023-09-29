import { StyleSheet } from "react-native";
import { SettingsIcon } from "@/components/icons/settings";
import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import { appTheme } from "@/design-system/theme/design-tokens";
import { useThemeStore } from "@/stores/theme";

type SettingsIconProps = {
  title: string;
};

export default function ScreenHeader({ title }: SettingsIconProps) {
  const { theme } = useThemeStore();

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
      <Text level="heading" weight="bold" size="34px">
        {title}
      </Text>
      <SettingsIcon />
    </Box>
  );
}
