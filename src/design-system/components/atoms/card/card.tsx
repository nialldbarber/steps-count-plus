import { StyleSheet, type ViewProps, type ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { shadow } from "@/design-system/color/shadow";
import { Box } from "@/design-system/components/atoms/box";
import { radius } from "@/design-system/layouts/radius";
import { type Height, type Width } from "@/design-system/layouts/size";
import { space } from "@/design-system/layouts/space";
import { appTheme } from "@/design-system/theme/design-tokens";
import { useThemeStore } from "@/stores/theme";

type CardTypes =
  | "info"
  | "encourage"
  | "emphasise"
  | "warning"
  | "error"
  | "highlight";

interface CardProps extends ViewProps {
  cardType?: CardTypes;
  width?: Width;
  height?: Height;
}

/**
 * * what should this card do?
 *
 * * it should show different states,
 * * custom backgrounds but mainly set ones
 *
 * * especially error states!
 *
 * * add height and width
 */

export default function Card({
  cardType = "info",
  width,
  height,
  children,
}: CardProps) {
  const { theme } = useThemeStore();

  const cardStyles: Record<CardTypes, ViewStyle> = {
    info: {
      backgroundColor: appTheme[theme].cardInfoBackgroundColor,
    },
    encourage: {
      backgroundColor: appTheme[theme].cardEncourageBackgroundColor,
      borderColor: appTheme[theme].cardEncourageBorderColor,
      borderWidth: 1,
    },
    emphasise: {
      backgroundColor: appTheme[theme].cardEmphasiseBackgroundColor,
    },
    highlight: {},
    warning: {},
    error: {},
  };

  const styles = StyleSheet.create({
    container: {
      borderRadius: radius.large,
      padding: space["20px"],
      ...cardStyles[cardType],
    },
  });

  return cardType === "highlight" ? (
    <Box borderRadius="large">
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#ef709b", "#fa9372"]}
        style={[styles.container, shadow()]}
      >
        {children}
      </LinearGradient>
    </Box>
  ) : (
    <Box styles={styles.container}>{children}</Box>
  );
}
