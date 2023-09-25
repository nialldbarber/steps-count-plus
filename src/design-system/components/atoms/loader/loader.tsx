import { StyleSheet } from "react-native";
import type { ViewStyle } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Box } from "@/design-system/components/atoms/box";
import type { Variant } from "@/design-system/components/atoms/button/Button";
import { radius } from "@/design-system/layouts/radius";
import { tokens } from "@/design-system/theme/design-tokens";
import { useEffectOnce } from "@/hooks/useEffectOnce";

type LoaderProps = {
  variant?: Variant;
};

const loaderStyles: Record<Variant, ViewStyle> = {
  primary: {
    borderTopColor: tokens.loaderPrimaryOutlineColor,
    borderRightColor: tokens.loaderPrimaryOutlineColor,
    borderBottomColor: tokens.loaderPrimaryOutlineColor,
    borderLeftColor: tokens.loaderPrimaryActiveColor,
  },
  // TODO: add these in
  secondary: {
    borderTopColor: "#f5f5f5",
    borderRightColor: "#f5f5f5",
    borderBottomColor: "#f5f5f5",
    borderLeftColor: "green",
  },
  tertiary: {
    borderTopColor: "#f5f5f5",
    borderRightColor: "#f5f5f5",
    borderBottomColor: "#f5f5f5",
    borderLeftColor: "green",
  },
  link: {
    borderTopColor: "#f5f5f5",
    borderRightColor: "#f5f5f5",
    borderBottomColor: "#f5f5f5",
    borderLeftColor: "green",
  },
  destructive: {
    borderTopColor: "#f5f5f5",
    borderRightColor: "#f5f5f5",
    borderBottomColor: "#f5f5f5",
    borderLeftColor: "green",
  },
};

export default function Loader({ variant = "primary" }: LoaderProps) {
  const rotation = useSharedValue(0);
  const rotationStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${rotation.value}deg`,
      },
    ],
  }));

  useEffectOnce(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 650,
      }),
      -1,
    );
    return () => cancelAnimation(rotation);
  });

  const styles = StyleSheet.create({
    spinner: {
      height: 30,
      width: 30,
      borderRadius: radius.full,
      borderWidth: 5,
      ...loaderStyles[variant],
    },
  });

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Animated.View style={[styles.spinner, rotationStyles]} />
    </Box>
  );
}
