import type { PropsWithChildren } from "react";
import { Children } from "react";
import type { ViewProps } from "react-native";
import flattenChildren from "react-flatten-children";
import { Box } from "@/design-system/components/atoms/box";
import type { Space } from "@/design-system/layouts/space";

interface StackProps extends ViewProps {
  margin?: Space;
  gutter?: Space;
}

export default function Stack({
  margin = "0px",
  gutter = "0px",
  children: childProp,
}: PropsWithChildren<StackProps>) {
  const children = flattenChildren(childProp);

  return (
    <Box margin={margin}>
      {Children.map(children, (child, index) => {
        const first = index === 0;
        const last = index === children.length - 1;

        return (
          <Box
            paddingTop={first ? "0px" : gutter}
            paddingBottom={last ? "0px" : gutter}
          >
            {child}
          </Box>
        );
      })}
    </Box>
  );
}
