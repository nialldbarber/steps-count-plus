import { SettingsIcon } from "@/components/icons/settings";
import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";

type SettingsIconProps = {};

export default function ScreenHeader({}: SettingsIconProps) {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      // TODO: change this color
      backgroundColor="destructive"
      paddingTop="60px"
      paddingBottom="24px"
      paddingHorizontal="20px"
      justifyContent="space-between"
    >
      <SettingsIcon />
      <Text level="heading" size="34px">
        this is a header
      </Text>
    </Box>
  );
}
