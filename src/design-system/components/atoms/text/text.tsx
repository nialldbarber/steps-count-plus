import { Text as NativeText, StyleSheet } from "react-native";
import type { TextProps as NativeTextProps, TextStyle } from "react-native";
import maxFontSizeMultiplier from "@/constants/maxFontSizeMultiplier";
import { colors, type Colors } from "@/design-system/color/palettes";
import { renderStringWithEmoji } from "@/design-system/lib/renderStringWithEmoji";
import { appTheme } from "@/design-system/theme/design-tokens";
import { typeHierarchy } from "@/design-system/typography/font-size";
import type {
  FontSizes,
  TextTypes,
} from "@/design-system/typography/font-size";
import type { FontWeight } from "@/design-system/typography/font-weight";
import { fontWeight } from "@/design-system/typography/font-weight";
import { useThemeStore } from "@/stores/theme";

export interface TextProps extends NativeTextProps {
  size?: FontSizes;
  weight?: FontWeight;
  level?: TextTypes;
  color?: Colors | string;
  style?: TextStyle;
  withEmoji?: boolean;
}

export default function Text({
  weight = "medium",
  level = "text",
  size = level === "heading" ? "18px" : "16px",
  color,
  withEmoji = false,
  style,
  children,
}: TextProps) {
  const { theme } = useThemeStore();

  const styles = StyleSheet.create({
    text: {
      ...(level === "heading"
        ? typeHierarchy.heading[size]
        : typeHierarchy.text[size]),
      fontFamily: fontWeight[weight],
      color: color
        ? // @ts-expect-error
          colors[color]
        : theme
        ? appTheme[theme].mainBodyTextColor
        : colors.black,
    },
  });

  return (
    <NativeText
      style={[styles.text, { ...style }]}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      accessibilityRole={level === "heading" ? "header" : "text"}
    >
      {withEmoji ? renderStringWithEmoji(children) : children}
    </NativeText>
  );
}
