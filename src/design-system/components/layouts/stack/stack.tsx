import { Children, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import type { ViewProps } from "react-native";
import flattenChildren from "react-flatten-children";
import { space } from "@/design-system/layouts/space";
import type { Space } from "@/design-system/layouts/space";

interface StackProps extends ViewProps {
  margin?: Space;
  gutter?: Space;
  children: ReactNode;
}

export default function Stack({
  margin = space["0px"],
  gutter = space["0px"],
  children: childProp,
}: StackProps) {
  const children = flattenChildren(childProp);

  const styles = StyleSheet.create({
    container: {
      margin: space[margin],
    },
    gutter: {
      paddingTop: space[gutter],
      paddingBottom: space[gutter],
    },
    noGutter: {
      paddingVertical: 0,
    },
  });

  return (
    <View style={styles.container}>
      {Children.map(children, (child, index) => {
        const first = index === 0;
        const last = index === children.length - 1;
        const gutterStyles = first || last ? styles.noGutter : styles.gutter;

        return <View style={gutterStyles}>{child}</View>;
      })}
    </View>
  );
}
