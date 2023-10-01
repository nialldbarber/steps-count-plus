import { Children, type ReactNode } from "react";
import type { ViewProps } from "react-native";
import flattenChildren from "react-flatten-children";
import { Box } from "@/design-system/components/atoms/box";
import type { Space } from "@/design-system/layouts/space";
import type { A11y } from "@/types/a11y";

interface RowProps extends ViewProps, Partial<A11y> {
  margin?: Space;
  gutter?: Space;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  children: ReactNode;
}

export default function Row({
  margin = "0px",
  gutter = "0px",
  justifyContent,
  a11yLabel,
  a11yHint,
  a11yRole,
  children: childProp,
}: RowProps) {
  const children = flattenChildren(childProp);

  return (
    <Box
      margin={margin}
      flexDirection="row"
      alignItems="center"
      justifyContent={justifyContent}
      a11yRole={a11yRole}
      a11yLabel={a11yLabel}
      a11yHint={a11yHint}
    >
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
