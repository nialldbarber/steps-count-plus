import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/database/supabase";
import { AuthenticationScreen } from "@/screens/authentication";
import { HomeScreen } from "@/screens/home";

export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        {session && session.user ? (
          <Screen name="Home" component={HomeScreen} />
        ) : (
          <Screen
            name="Authentication"
            component={AuthenticationScreen}
            options={{
              animationTypeForReplace: session && session.user ? "pop" : "push",
            }}
          />
        )}
      </Navigator>
    </NavigationContainer>
  );
}
