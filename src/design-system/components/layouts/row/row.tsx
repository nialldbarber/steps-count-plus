import { Children, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import type { ViewProps } from "react-native";
import flattenChildren from "react-flatten-children";
import { Box } from "@/design-system/components/atoms/box";
import { space } from "@/design-system/layouts/space";
import type { Space } from "@/design-system/layouts/space";

interface RowProps extends ViewProps {
  margin?: Space;
  gutter?: Space;
  children: ReactNode;
}

export default function Row({
  margin = space["0px"],
  gutter = space["0px"],
  children: childProp,
}: RowProps) {
  const children = flattenChildren(childProp);

  const styles = StyleSheet.create({
    gutter: {
      paddingLeft: space[gutter],
      paddingRight: space[gutter],
    },
    noGutter: {
      paddingHorizontal: 0,
    },
  });

  return (
    <Box flexDirection="row" alignItems="center">
      {Children.map(children, (child, index) => {
        const first = index === 0;
        const last = index === children.length - 1;
        const gutterStyles = first || last ? styles.noGutter : styles.gutter;

        return <View style={gutterStyles}>{child}</View>;
      })}
    </Box>
  );
}
