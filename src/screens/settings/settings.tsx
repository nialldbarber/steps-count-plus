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
import { useUnitsStore } from "@/stores/units";
import type { Units } from "@/stores/units";

const themeOptions: Array<RadioButtonType> = [
  { id: "theme_first", label: "System", value: "system" },
  { id: "theme_second", label: "Light", value: "light" },
  { id: "theme_third", label: "Dark", value: "dark" },
];

const unitsOptions: Array<any> = [
  { id: "units_first", label: "km", value: "km" },
  { id: "units_second", label: "miles", value: "miles" },
];

export default function SettingsModalScreen() {
  const systemTheme = useColorScheme();
  const { theme, setTheme } = useThemeStore();
  const { units, setUnits } = useUnitsStore();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  function handleHaptic() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  function handleSetTheme(userSelectedTheme: Theme & "system") {
    handleHaptic();
    const _theme =
      userSelectedTheme === "system" ? systemTheme : userSelectedTheme;
    setSelectedTheme(userSelectedTheme);
    setTheme(_theme as Theme);
  }

  function handleSetUnits(userSelected: Units) {
    handleHaptic();
    setUnits(userSelected);
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
            Distance / Measurement
          </Text>
          <RadioButtons
            options={unitsOptions}
            defaultSelected={units}
            onSelect={handleSetUnits}
          />
        </Card>
      </Stack>
    </MainScreenLayout>
  );
}
