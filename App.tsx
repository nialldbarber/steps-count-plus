import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-pluralrules/locale-data/es";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Navigation } from "@/navigation/navigation-container";
import { useThemeStore } from "@/stores/theme";
import "@/lib/i18n";
import { flexStyles } from "@/design-system/common-styles/flex";
import { storage } from "@/lib/mmkv";

const ANIMATION = require("./assets/intro.json");

export default function App() {
  /**
   * TODO: permission?
   * * ask for apple health/google health permission here?
   *
   * ? onboarding flow
   * * allow notifications
   * * set goals
   * * explore communinty?
   */

  const systemTheme = useColorScheme();
  const { theme, initialiseTheme, setTheme } = useThemeStore();

  async function getTheme() {
    const savedTheme = storage.getString("app_theme");

    if (savedTheme) return;
    if (
      systemTheme !== undefined &&
      systemTheme !== theme &&
      systemTheme !== null
    ) {
      setTheme(systemTheme);
    }
  }

  useEffect(() => {
    initialiseTheme();
  }, [initialiseTheme]);

  useEffect(() => {
    getTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemTheme]);

  let [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_300Light,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={flexStyles.container}>
      <Navigation />
    </GestureHandlerRootView>
  );
}
