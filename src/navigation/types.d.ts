// Stack
export type RootStackParamsList = {
  Home: undefined;
  Authentication: undefined;
  SignUp: undefined;
  Settings: undefined;
  Premium: undefined;
  NewChallenge: undefined;
};

// Bottom Tabs
export type RootBottomTabsParamList = {
  Stats: undefined;
  Goals: undefined;
  Insights: undefined;
  Challenges: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamsList {}
  }
}
