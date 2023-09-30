import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { CustomBottomTabs } from "@/components/bottom-tabs";
import { ScreenHeader } from "@/components/screen-header";
import { appTheme } from "@/design-system/theme/design-tokens";
import { ChallengeScreen } from "@/screens/challenges";
import { DashboardScreen } from "@/screens/dashboard";
import { GoalsScreen } from "@/screens/goals";
import { useThemeStore } from "@/stores/theme";

export type RootBottomTabsParamList = {
  Stats: undefined;
  Goals: undefined;
  Insights: undefined;
  Challenges: undefined;
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
        }}
      />
      <Screen
        name="Goals"
        component={GoalsScreen}
        options={{
          header: () => <ScreenHeader title={t("screen.goals.title")} />,
        }}
      />
      <Screen
        name="Insights"
        component={ChallengeScreen}
        options={{
          header: () => <ScreenHeader title={t("screen.insights.title")} />,
        }}
      />
      <Screen
        name="Challenges"
        component={ChallengeScreen}
        options={{
          header: () => <ScreenHeader title={t("screen.challenges.title")} />,
        }}
      />
    </Navigator>
  );
}
