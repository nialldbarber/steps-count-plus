import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { appTheme } from "@/design-system/theme/design-tokens";
import { ChallengeScreen } from "@/screens/challenges";
import NewChallengeScreen from "@/screens/new-challenge/new-challenge";
import { useThemeStore } from "@/stores/theme";

export type ChallengesStackParamList = {
  Challenges: undefined;
  NewChallenge: undefined;
};

const { Navigator, Screen } =
  createNativeStackNavigator<ChallengesStackParamList>();

export default function Navigation() {
  const { theme } = useThemeStore();

  const contentStyle = {
    backgroundColor: appTheme[theme].mainBackgroundColor,
  };

  return (
    <Navigator initialRouteName="Challenges">
      <Screen
        name="Challenges"
        component={ChallengeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="NewChallenge"
        component={NewChallengeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
