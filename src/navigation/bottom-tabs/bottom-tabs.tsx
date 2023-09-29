import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Award, Chart, ChemicalGlass, People } from "iconsax-react-native";
import { useTranslation } from "react-i18next";
import { CustomBottomTabs } from "@/components/bottom-tabs";
import { ScreenHeader } from "@/components/screen-header";
import { appTheme, tokens } from "@/design-system/theme/design-tokens";
import { typeHierarchy } from "@/design-system/typography/font-size";
import { ChallengeScreen } from "@/screens/challenges";
import { CommunityScreen } from "@/screens/community";
import { DashboardScreen } from "@/screens/dashboard";
import { useThemeStore } from "@/stores/theme";

export type RootBottomTabsParamList = {
  Stats: undefined;
  Goals: undefined;
  Insights: undefined;
  Community: undefined;
};

const { Navigator, Screen } =
  createBottomTabNavigator<RootBottomTabsParamList>();
const CustomBottom = (props: BottomTabBarProps) => (
  <CustomBottomTabs {...props} />
);

export default function Tabs() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const backgroundColor = appTheme[theme].mainBackgroundColor;

  return (
    <Navigator
      initialRouteName="Stats"
      sceneContainerStyle={{ backgroundColor }}
      tabBar={CustomBottom}
    >
      <Screen
        name="Stats"
        component={DashboardScreen}
        options={{
          header: () => <ScreenHeader title={t("screen.stats.title")} />,
          tabBarIcon: ({ focused }) => (
            <Chart
              size={28}
              color={
                focused
                  ? tokens.bottomTabsIconActiveStroke
                  : tokens.bottomTabsIconStroke
              }
            />
          ),
          tabBarLabelStyle: {
            ...typeHierarchy.text["10px"],
            fontWeight: "800",
            color: tokens.bottomTabsTextColor,
          },
        }}
      />
      <Screen
        name="Goals"
        component={ChallengeScreen}
        options={{
          header: () => <ScreenHeader title={t("screen.goals.title")} />,
          tabBarIcon: ({ focused }) => (
            <Award
              size={28}
              color={
                focused
                  ? tokens.bottomTabsIconActiveStroke
                  : tokens.bottomTabsIconStroke
              }
            />
          ),
          tabBarLabelStyle: {
            ...typeHierarchy.text["10px"],
            fontWeight: "800",
            color: tokens.bottomTabsTextColor,
          },
        }}
      />
      <Screen
        name="Insights"
        component={ChallengeScreen}
        options={{
          header: () => <ScreenHeader title={t("screen.insights.title")} />,
          tabBarIcon: ({ focused }) => (
            <ChemicalGlass
              size={28}
              color={
                focused
                  ? tokens.bottomTabsIconActiveStroke
                  : tokens.bottomTabsIconStroke
              }
            />
          ),
          tabBarLabelStyle: {
            ...typeHierarchy.text["10px"],
            fontWeight: "800",
            color: tokens.bottomTabsTextColor,
          },
        }}
      />
      <Screen
        name="Community"
        component={CommunityScreen}
        options={{
          header: () => <ScreenHeader title={t("screen.community.title")} />,
          tabBarIcon: ({ focused }) => (
            <People
              size={28}
              color={
                focused
                  ? tokens.bottomTabsIconActiveStroke
                  : tokens.bottomTabsIconStroke
              }
            />
          ),
          tabBarLabelStyle: {
            ...typeHierarchy.text["10px"],
            fontWeight: "800",
            color: tokens.bottomTabsTextColor,
          },
        }}
      />
    </Navigator>
  );
}
