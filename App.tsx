import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-pluralrules/locale-data/es";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Navigation } from "@/navigation/navigation-container";
import { useThemeStore } from "@/stores/theme";
import "@/lib/i18n";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
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

  const [fontsLoaded] = useFonts({
    "PlusJakartaSans-Bold": require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-ExtraBold": require("./assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "PlusJakartaSans-ExtraLight": require("./assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "PlusJakartaSans-Light": require("./assets/fonts/PlusJakartaSans-Light.ttf"),
    "PlusJakartaSans-Medium": require("./assets/fonts/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-Regular": require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-SemiBold": require("./assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={flexStyles.container}>
      <BottomSheetModalProvider>
        <Navigation />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
