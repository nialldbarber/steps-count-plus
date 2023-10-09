import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Add } from "iconsax-react-native";
import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import { Pressable } from "@/design-system/components/common/pressable";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { appTheme } from "@/design-system/theme/design-tokens";
import { RootStackParamList } from "@/navigation/stack/stack";
import { useThemeStore } from "@/stores/theme";

type ChallengesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "NewChallenge"
>;

export default function ChallengeScreen() {
  const { theme } = useThemeStore();
  const { navigate } = useNavigation<ChallengesNavigationProp>();

  return (
    <>
      <MainScreenLayout>
        <Box>
          <Text level="heading" size="30px">
            The challenge screen
          </Text>
        </Box>
      </MainScreenLayout>
      <Box
        bottom="115px"
        right="28px"
        backgroundColor="pureWhite"
        alignItems="center"
        justifyContent="center"
        width="60px"
        height="60px"
        position="absolute"
        borderRadius="full"
        shadow
      >
        <Pressable onPress={() => navigate("NewChallenge")}>
          <Add size="40" color={appTheme[theme].plusStroke} />
        </Pressable>
      </Box>
    </>
  );
}
