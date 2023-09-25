import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tokens } from "@/design-system/theme/design-tokens";
import { DashboardScreen } from "@/screens/dashboard";

export type RootStackParamList = {
  Dashboard: undefined;
  Challenges: undefined;
  Community: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

export default function Tabs() {
  const theme = useColorScheme();

  const backgroundColor =
    theme === "dark"
      ? tokens.mainBackgroundColorDark
      : tokens.mainBackgroundColor;

  const options = {
    headerShown: false,
  };

  return (
    <Navigator
      initialRouteName="Dashboard"
      sceneContainerStyle={{ backgroundColor }}
    >
      <Screen name="Dashboard" component={DashboardScreen} options={options} />
      <Screen name="Challenges" component={DashboardScreen} options={options} />
      <Screen name="Community" component={DashboardScreen} options={options} />
    </Navigator>
  );
}
