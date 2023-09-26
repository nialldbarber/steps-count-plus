import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fatrows, People, Rank } from "iconsax-react-native";
import { ScreenHeader } from "@/components/screen-header";
import { tokens } from "@/design-system/theme/design-tokens";
import { typeHierarchy } from "@/design-system/typography/font-size";
import { ChallengeScreen } from "@/screens/challenges";
import { CommunityScreen } from "@/screens/community";
import { DashboardScreen } from "@/screens/dashboard";

export type RootBottomTabsParamList = {
  Dashboard: undefined;
  Challenges: undefined;
  Community: undefined;
};

const { Navigator, Screen } =
  createBottomTabNavigator<RootBottomTabsParamList>();

export default function Tabs() {
  const theme = useColorScheme();

  const backgroundColor =
    theme === "dark"
      ? tokens.mainBackgroundColorDark
      : tokens.mainBackgroundColor;

  return (
    <Navigator
      initialRouteName="Dashboard"
      sceneContainerStyle={{ backgroundColor }}
    >
      <Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          header: () => <ScreenHeader />,
          tabBarIcon: ({ focused }) => (
            <Fatrows
              size={28}
              color={
                focused
                  ? tokens.bottomTabsDashboardStroke
                  : tokens.bottomTabsDashboardActiveStroke
              }
            />
          ),
          tabBarLabelStyle: {
            ...typeHierarchy.text["10px"],
            fontWeight: "700",
          },
        }}
      />
      <Screen
        name="Challenges"
        component={ChallengeScreen}
        options={{
          header: () => <ScreenHeader />,
          tabBarIcon: ({ focused }) => (
            <Rank
              size={28}
              color={
                focused
                  ? tokens.bottomTabsDashboardStroke
                  : tokens.bottomTabsDashboardActiveStroke
              }
            />
          ),
          tabBarLabelStyle: {
            ...typeHierarchy.text["10px"],
            fontWeight: "700",
          },
        }}
      />
      <Screen
        name="Community"
        component={CommunityScreen}
        options={{
          header: () => <ScreenHeader />,
          tabBarIcon: ({ focused }) => (
            <People
              size={28}
              color={
                focused
                  ? tokens.bottomTabsDashboardStroke
                  : tokens.bottomTabsDashboardActiveStroke
              }
            />
          ),
          tabBarLabelStyle: {
            ...typeHierarchy.text["10px"],
            fontWeight: "700",
          },
        }}
      />
    </Navigator>
  );
}
