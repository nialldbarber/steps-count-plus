import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import type { AccessibilityRole } from "react-native";
import { View } from "react-native";
import { colors, type Colors } from "@/design-system/color/palettes";
import { shadow as dropShadow } from "@/design-system/color/shadow";
import type { Radius } from "@/design-system/layouts/radius";
import { radius } from "@/design-system/layouts/radius";
import type { Height, Width } from "@/design-system/layouts/size";
import { heights, widths } from "@/design-system/layouts/size";
import type { Space } from "@/design-system/layouts/space";
import { space } from "@/design-system/layouts/space";
import type { NegativeZIndex, ZIndex } from "@/design-system/layouts/zIndex";
import { zIndex } from "@/design-system/layouts/zIndex";
import type { A11y } from "@/types/a11y";

function resolveToken<TokenName extends string, TokenValue, CustomValue>(
  scale: Record<TokenName, TokenValue>,
  value: TokenName | { custom: CustomValue } | undefined,
) {
  return value
    ? typeof value === "object"
      ? value.custom
      : scale[value]
    : undefined;
}

type BoxProps = {
  a11yRole?: AccessibilityRole;
  alignSelf?: "flex-start" | "flex-end" | "center" | "stretch";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch";
  borderWidth?: number;
  borderStyle?: "none" | "dotted" | "dashed" | "solid";
  borderColor?: Colors;
  borderRadius?: Radius;
  borderTopLeftRadius?: Radius;
  borderTopRightRadius?: Radius;
  borderBottomLeftRadius?: Radius;
  borderBottomRightRadius?: Radius;
  bottom?: Space;
  flex?: number;
  flexBasis?: 0;
  flexDirection?: "row" | "row-reverse" | "column";
  flexGrow?: 0 | 1;
  flexShrink?: 0 | 1;
  flexWrap?: "wrap";
  left?: Space;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  margin?: Space;
  marginBottom?: Space;
  marginHorizontal?: Space;
  marginLeft?: Space;
  marginRight?: Space;
  marginTop?: Space;
  marginVertical?: Space;
  padding?: Space;
  paddingBottom?: Space;
  paddingHorizontal?: Space;
  paddingLeft?: Space;
  paddingRight?: Space;
  paddingTop?: Space;
  paddingVertical?: Space;
  position?: "absolute" | "relative";
  right?: Space;
  top?: Space;
  height?: Height | Space;
  width?: Width | Space;
  overflow?: "hidden" | "visible" | "scroll";
  backgroundColor?: Colors;
  styles?: any;
  shadow?: boolean;
  zIndex?: ZIndex | NegativeZIndex;
} & (
  | {
      borderBottomRadius?: number;
      borderLeftRadius?: never;
      borderRightRadius?: never;
      borderTopRadius?: number;
    }
  | {
      borderBottomRadius?: never;
      borderLeftRadius?: number;
      borderRightRadius?: number;
      borderTopRadius?: never;
    }
) &
  (
    | {
        background?: Colors;
        //shadow?: never;
      }
    | {
        background: Colors;
        //shadow: Shadow;
      }
  ) &
  Partial<A11y>;

export default function Box({
  a11yRole,
  a11yLabel,
  a11yHint,
  alignSelf,
  alignItems,
  borderStyle,
  borderWidth,
  borderColor,
  borderRadius,
  borderBottomRadius,
  borderLeftRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderRightRadius,
  borderTopRadius,
  bottom,
  flex,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  left,
  justifyContent,
  margin,
  marginBottom,
  marginHorizontal,
  marginLeft,
  marginRight,
  marginTop,
  marginVertical,
  padding,
  paddingBottom,
  paddingHorizontal,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingVertical,
  position,
  right,
  top,
  styles: customStyles,
  width: _width,
  height: _height,
  overflow,
  backgroundColor,
  zIndex: _zIndex,
  shadow = false,
  children,
}: PropsWithChildren<BoxProps>) {
  const width = resolveToken({ ...widths, ...space }, _width);
  const height = resolveToken({ ...heights, ...space }, _height);

  const styles = useMemo(() => {
    return {
      alignSelf,
      alignItems,
      borderWidth,
      borderStyle,
      borderColor: colors[borderColor],
      borderBottomLeftRadius:
        radius[borderBottomLeftRadius] ??
        radius[borderBottomRadius] ??
        radius[borderLeftRadius] ??
        radius[borderRadius],
      borderBottomRightRadius:
        radius[borderBottomRightRadius] ??
        radius[borderBottomRadius] ??
        radius[borderRightRadius] ??
        radius[borderRadius],
      borderTopLeftRadius:
        radius[borderTopLeftRadius] ??
        radius[borderTopRadius] ??
        radius[borderLeftRadius] ??
        radius[borderRadius],
      borderTopRightRadius:
        radius[borderTopRightRadius] ??
        radius[borderTopRadius] ??
        radius[borderRightRadius] ??
        radius[borderRadius],
      flex,
      flexBasis,
      flexDirection,
      flexGrow,
      flexShrink,
      flexWrap,
      justifyContent,
      margin: space[margin],
      marginBottom: space[marginBottom],
      marginHorizontal: space[marginHorizontal],
      marginLeft: space[marginLeft],
      marginRight: space[marginRight],
      marginTop: space[marginTop],
      marginVertical: space[marginVertical],
      padding: space[padding],
      paddingBottom: space[paddingBottom],
      paddingHorizontal: space[paddingHorizontal],
      paddingLeft: space[paddingLeft],
      paddingRight: space[paddingRight],
      paddingTop: space[paddingTop],
      paddingVertical: space[paddingVertical],
      position,
      top: space[top],
      right: space[right],
      left: space[left],
      bottom: space[bottom],
      height,
      width,
      overflow,
      backgroundColor: colors[backgroundColor],
      zIndex: zIndex[_zIndex],
    };
  }, [
    alignSelf,
    flex,
    alignItems,
    borderWidth,
    borderStyle,
    borderColor,
    borderBottomLeftRadius,
    borderBottomRadius,
    borderBottomRightRadius,
    borderLeftRadius,
    borderRadius,
    borderRightRadius,
    borderTopLeftRadius,
    borderTopRadius,
    borderTopRightRadius,
    bottom,
    flexBasis,
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    height,
    justifyContent,
    left,
    margin,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical,
    padding,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical,
    position,
    right,
    top,
    width,
    overflow,
    backgroundColor,
    _zIndex,
  ]);

  return (
    <View
      style={[
        styles,
        customStyles,
        shadow ? dropShadow({ elevation: 1, opacity: 0.15 }) : null,
      ]}
      accessibilityRole={a11yRole}
      accessibilityLabel={a11yLabel}
      accessibilityHint={a11yHint}
    >
      {children}
    </View>
  );
}
