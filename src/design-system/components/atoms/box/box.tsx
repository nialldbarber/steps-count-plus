import { useMemo, type ReactNode } from "react";
import { View } from "react-native";
import type { Colors } from "@/design-system/color/palettes";
import { Height, heights, Width } from "@/design-system/layouts/size";
import { space, type Space } from "@/design-system/layouts/space";

type BoxProps = {
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch";
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  bottom?: Space;
  children?: ReactNode;
  flexBasis?: 0;
  flexDirection?: "row" | "row-reverse" | "column";
  flexGrow?: 0 | 1;
  flexShrink?: 0 | 1;
  flexWrap?: "wrap";
  height?: Height;
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
  width?: Width;
  overflow?: "hidden" | "visible" | "scroll";
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
  );

export default function Box({
  alignItems,
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
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  height,
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
  width,
  overflow,
  children,
}: BoxProps) {
  const styles = useMemo(() => {
    return {
      alignItems,
      borderBottomLeftRadius:
        borderBottomLeftRadius ??
        borderBottomRadius ??
        borderLeftRadius ??
        borderRadius,
      borderBottomRightRadius:
        borderBottomRightRadius ??
        borderBottomRadius ??
        borderRightRadius ??
        borderRadius,
      borderTopLeftRadius:
        borderTopLeftRadius ??
        borderTopRadius ??
        borderLeftRadius ??
        borderRadius,
      borderTopRightRadius:
        borderTopRightRadius ??
        borderTopRadius ??
        borderRightRadius ??
        borderRadius,
      bottom,
      flexBasis,
      flexDirection,
      flexGrow,
      flexShrink,
      flexWrap,
      height: heights[height],
      justifyContent,
      left: space[left],
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
      right,
      top,
      width,
      overflow,
    };
  }, [
    alignItems,
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
  ]);

  // @ts-expect-error
  return <View style={styles}>{children}</View>;
}
