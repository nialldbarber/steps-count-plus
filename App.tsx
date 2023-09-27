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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Navigation } from "@/navigation/navigation-container";
import { useThemeStore } from "@/stores/theme";
import "@/lib/i18n";

export default function App() {
  const systemTheme = useColorScheme();
  const { theme, initialiseTheme, setTheme } = useThemeStore();

  async function getTheme() {
    const savedTheme = await AsyncStorage.getItem("app_theme");

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

  return <Navigation />;
}
