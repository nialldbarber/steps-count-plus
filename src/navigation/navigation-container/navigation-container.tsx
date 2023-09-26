import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/database/supabase";
import { Stack } from "@/navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Authentication: undefined;
  SignUp: undefined;
};

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
      <Stack />
    </NavigationContainer>
  );
}
