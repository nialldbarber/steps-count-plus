import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../screens/home";

export type RootStackParamList = {
  Home: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen name="Home" component={HomeScreen} />
      </Navigator>
    </NavigationContainer>
  );
}
