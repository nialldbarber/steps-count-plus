import { useCallback, useMemo, useRef, useState } from "react";
import { useColorScheme } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { Close } from "@/components/icons/close";
import { Box } from "@/design-system/components/atoms/box";
import { Card } from "@/design-system/components/atoms/card";
import { Spacer } from "@/design-system/components/atoms/spacer";
import { Text } from "@/design-system/components/atoms/text";
import { Pressable } from "@/design-system/components/common/pressable";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Stack } from "@/design-system/components/layouts/stack";
import { RadioButtons } from "@/design-system/components/molecules/radio-buttons";
import type { RadioButtonType } from "@/design-system/components/molecules/radio-buttons/radio-buttons";
import { appTheme } from "@/design-system/theme/design-tokens";
import { hitSlopLarge } from "@/lib/hitSlop";
import { PremiumScreen } from "@/screens/premium";
import { useThemeStore } from "@/stores/theme";
import type { Theme } from "@/stores/theme";
import { useUnitsStore } from "@/stores/units";
import type { Units } from "@/stores/units";

const themeOptions: Array<RadioButtonType> = [
  { id: "theme_first", label: "System", value: "system" },
  { id: "theme_second", label: "Light", value: "light" },
  { id: "theme_third", label: "Dark", value: "dark" },
];

const unitsOptions: Array<RadioButtonType> = [
  { id: "units_first", label: "km", value: "km" },
  { id: "units_second", label: "miles", value: "miles" },
];

export default function SettingsModalScreen() {
  const { t } = useTranslation();
  const systemTheme = useColorScheme();
  const { theme, setTheme } = useThemeStore();
  const { units, setUnits } = useUnitsStore();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  function invokeHaptic() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  function handleSetTheme(userSelectedTheme: Theme & "system") {
    invokeHaptic();
    const _theme =
      userSelectedTheme === "system" ? systemTheme : userSelectedTheme;
    setSelectedTheme(userSelectedTheme);
    setTheme(_theme as Theme);
  }

  function handleSetUnits(userSelected: Units) {
    invokeHaptic();
    setUnits(userSelected);
  }

  return (
    <BottomSheetModalProvider>
      <MainScreenLayout>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          margin="10px"
        >
          <Text level="heading" size="30px">
            {t("screen.settings.heading")}
          </Text>
          <Close />
        </Box>
        <Box marginVertical="10px">
          <Card cardType="highlight">
            <Pressable onPress={handlePresentModalPress} hitSlop={hitSlopLarge}>
              <Box margin="10px">
                <Text level="heading" color={appTheme[theme].cardInfoColor}>
                  {t("screen.settings.premium.heading")}
                </Text>
              </Box>
            </Pressable>
          </Card>
        </Box>
        <Stack margin="10px">
          <Card cardType="info">
            <Text level="heading" color={appTheme[theme].cardInfoColor}>
              {t("screen.settings.theme")}
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
              {t("screen.settings.units")}
            </Text>
            <RadioButtons
              options={unitsOptions}
              defaultSelected={units}
              onSelect={handleSetUnits}
            />
          </Card>
        </Stack>
      </MainScreenLayout>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
      >
        <PremiumScreen />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
