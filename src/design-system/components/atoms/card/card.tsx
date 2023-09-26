import { StyleSheet, type ViewProps, type ViewStyle } from "react-native";
import { Box } from "@/design-system/components/atoms/box";
import { radius } from "@/design-system/layouts/radius";
import { type Height, type Width } from "@/design-system/layouts/size";
import { space } from "@/design-system/layouts/space";
import { appTheme } from "@/design-system/theme/design-tokens";
import { useThemeStore } from "@/stores/theme";

type CardTypes = "info" | "warning" | "error" | "highlight";

interface CardProps extends ViewProps {
  cardTypes?: CardTypes;
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
  cardTypes = "info",
  width,
  height,
  children,
}: CardProps) {
  const { theme } = useThemeStore();

  const cardStyles: Record<CardTypes, ViewStyle> = {
    info: {
      backgroundColor: appTheme[theme].cardInfoBackgroundColor,
    },
    warning: {},
    error: {},
    highlight: {},
  };

  const styles = StyleSheet.create({
    container: {
      borderRadius: radius.large,
      padding: space["20px"],
      ...cardStyles[cardTypes],
    },
  });

  return <Box styles={styles.container}>{children}</Box>;
}
