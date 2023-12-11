import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/database/supabase";
import { appTheme } from "@/design-system/theme/design-tokens";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { Tabs } from "@/navigation/bottom-tabs";
import { AuthenticationScreen } from "@/screens/authentication";
import SignUpScreen from "@/screens/authentication/sign-up";
import { PremiumScreen } from "@/screens/premium";
import { SettingsModalScreen } from "@/screens/settings";
import { useThemeStore } from "@/stores/theme";

export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
  SignUp: undefined;
  Settings: undefined;
  Premium: undefined;
  NewChallenge: undefined;
};

const { Navigator, Group, Screen } =
  createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { theme } = useThemeStore();
  const [session, setSession] = useState<Session | null>(null);

  const contentStyle = {
    backgroundColor: appTheme[theme].mainBackgroundColor,
  };

  useEffectOnce(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  });

  return (
    <Navigator initialRouteName="Home">
      {session && session.user ? (
        <>
          <Group>
            <Screen
              name="Home"
              component={Tabs}
              options={{ contentStyle, headerShown: false }}
            />
          </Group>
          <Group screenOptions={{ presentation: "modal" }}>
            <Screen
              name="Settings"
              component={SettingsModalScreen}
              options={{ contentStyle, headerShown: false }}
            />
            <Screen
              name="Premium"
              component={PremiumScreen}
              options={{ contentStyle, headerShown: false }}
            />
          </Group>
        </>
      ) : (
        <>
          <Screen
            name="Authentication"
            component={AuthenticationScreen}
            options={{
              contentStyle,
              headerShown: false,
              animationTypeForReplace: session && session.user ? "pop" : "push",
            }}
          />
          <Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              contentStyle,
              headerShown: false,
            }}
          />
        </>
      )}
    </Navigator>
  );
}
