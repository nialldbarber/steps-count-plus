import { useState } from "react";
import { useColorScheme } from "react-native";
import * as Haptics from "expo-haptics";
import { Close } from "@/components/icons/close";
import { Box } from "@/design-system/components/atoms/box";
import { Card } from "@/design-system/components/atoms/card";
import { Spacer } from "@/design-system/components/atoms/spacer";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Stack } from "@/design-system/components/layouts/stack";
import { RadioButtons } from "@/design-system/components/molecules/radio-buttons";
import type { RadioButtonType } from "@/design-system/components/molecules/radio-buttons/radio-buttons";
import { appTheme } from "@/design-system/theme/design-tokens";
import { useThemeStore } from "@/stores/theme";
import type { Theme } from "@/stores/theme";

export default function SettingsModalScreen() {
  const systemTheme = useColorScheme();
  const { theme, setTheme } = useThemeStore();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const themeOptions: Array<RadioButtonType> = [
    { id: "rb_first", label: "System", value: "system" },
    { id: "rb_second", label: "Light", value: "light" },
    { id: "rb_third", label: "Dark", value: "dark" },
  ];

  function handleSetTheme(item: Theme & "system") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const _theme = item === "system" ? systemTheme : item;
    setSelectedTheme(item);
    setTheme(_theme as Theme);
  }

  return (
    <MainScreenLayout>
      <Close />
      <Box margin="10px">
        <Text level="heading" size="30px">
          Settings
        </Text>
      </Box>
      <Stack margin="10px">
        <Card cardTypes="info">
          <Text level="heading" color={appTheme[theme].cardInfoColor}>
            App theme (select your choice)
          </Text>
          <RadioButtons
            options={themeOptions}
            defaultSelected={selectedTheme}
            onSelect={handleSetTheme}
          />
        </Card>
        <Spacer height="30px" />
        <Card>
          <Text level="heading" color={appTheme[theme].cardInfoColor}>
            km / miles
          </Text>
        </Card>
      </Stack>
    </MainScreenLayout>
  );
}
