import { Text as NativeText, StyleSheet } from "react-native";
import type { TextProps as NativeTextProps, TextStyle } from "react-native";
import { colors, type Colors } from "@/design-system/color/palettes";
import { renderStringWithEmoji } from "@/design-system/lib/renderStringWithEmoji";
import { typeHierarchy } from "@/design-system/typography/font-size";
import type {
  FontSizes,
  TextTypes,
} from "@/design-system/typography/font-size";
import type { FontWeight } from "@/design-system/typography/font-weight";
import { fontWeight } from "@/design-system/typography/font-weight";

export interface TextProps extends NativeTextProps {
  size?: FontSizes;
  weight?: FontWeight;
  level?: TextTypes;
  color?: Colors;
  style?: TextStyle;
  withEmoji?: boolean;
}

export default function Text({
  size = "16px",
  weight = "medium",
  level = "text",
  color = "black",
  withEmoji = false,
  style,
  children,
}: TextProps) {
  const styles = StyleSheet.create({
    text: {
      ...(level === "heading"
        ? typeHierarchy.heading[size]
        : typeHierarchy.text[size]),
      fontFamily: fontWeight[weight],
      color: colors[color],
    },
  });

  return (
    <NativeText style={[styles.text, { ...style }]}>
      {withEmoji ? renderStringWithEmoji(children) : children}
    </NativeText>
  );
}
