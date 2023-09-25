import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/database/supabase";
import { tokens } from "@/design-system/theme/design-tokens";
import { Tabs } from "@/navigation/bottom-tabs";
import { AuthenticationScreen } from "@/screens/authentication";
import SignUpScreen from "@/screens/authentication/sign-up";
import { HomeScreen } from "@/screens/dashboard";

export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
  SignUp: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const theme = useColorScheme();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const contentStyle = {
    backgroundColor:
      theme === "dark"
        ? tokens.mainBackgroundColorDark
        : tokens.mainBackgroundColor,
  };

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen
          name="Home"
          component={Tabs}
          options={{ contentStyle, headerShown: false }}
        />
        {/* {session && session.user ? (
          <Screen
            name="Home"
            component={HomeScreen}
            options={{ contentStyle }}
          />
        ) : (
          <>
            <Screen
              name="Authentication"
              component={AuthenticationScreen}
              options={{
                contentStyle,
                headerShown: false,
                animationTypeForReplace:
                  session && session.user ? "pop" : "push",
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
        )} */}
      </Navigator>
    </NavigationContainer>
  );
}
