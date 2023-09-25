import { Children, type ReactNode } from "react";
import type { ViewProps } from "react-native";
import flattenChildren from "react-flatten-children";
import { Box } from "@/design-system/components/atoms/box";
import type { Space } from "@/design-system/layouts/space";

interface RowProps extends ViewProps {
  margin?: Space;
  gutter?: Space;
  children: ReactNode;
}

export default function Row({
  margin = "0px",
  gutter = "0px",
  children: childProp,
}: RowProps) {
  const children = flattenChildren(childProp);

  return (
    <Box margin={margin} flexDirection="row" alignItems="center">
      {Children.map(children, (child, index) => {
        const first = index === 0;
        const last = index === children.length - 1;
        return (
          <Box
            paddingLeft={first ? "0px" : gutter}
            paddingRight={last ? "0px" : gutter}
          >
            {child}
          </Box>
        );
      })}
    </Box>
  );
}
