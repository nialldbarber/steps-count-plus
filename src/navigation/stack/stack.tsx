import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { appTheme } from "@/design-system/theme/design-tokens";
import { Tabs } from "@/navigation/bottom-tabs";
import { PremiumScreen } from "@/screens/premium";
import { SettingsModalScreen } from "@/screens/settings";
import { useThemeStore } from "@/stores/theme";

//import { AuthenticationScreen } from "@/screens/authentication";
//import SignUpScreen from "@/screens/authentication/sign-up";
//import { HomeScreen } from "@/screens/dashboard";

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

  const contentStyle = {
    backgroundColor: appTheme[theme].mainBackgroundColor,
  };

  return (
    <Navigator initialRouteName="Home">
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
  );
}
