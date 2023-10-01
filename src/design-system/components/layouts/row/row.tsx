import { Children, type ReactNode } from "react";
import { ScrollView, type ViewProps } from "react-native";
import flattenChildren from "react-flatten-children";
import { Box } from "@/design-system/components/atoms/box";
import type { Space } from "@/design-system/layouts/space";
import type { A11y } from "@/types/a11y";

interface RowProps extends ViewProps, Partial<A11y> {
  margin?: Space;
  gutter?: Space;
  scroll?: boolean;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  children: ReactNode;
}

function InnerRow({
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

export default function Row({
  margin = "0px",
  gutter = "0px",
  scroll = false,
  justifyContent,
  a11yLabel,
  a11yHint,
  a11yRole,
  children,
}: RowProps) {
  return scroll ? (
    <ScrollView scrollEnabled={scroll} horizontal>
      <InnerRow
        margin={margin}
        gutter={gutter}
        justifyContent={justifyContent}
        a11yLabel={a11yLabel}
        a11yHint={a11yHint}
        a11yRole={a11yRole}
      >
        {children}
      </InnerRow>
    </ScrollView>
  ) : (
    <InnerRow
      margin={margin}
      gutter={gutter}
      justifyContent={justifyContent}
      a11yLabel={a11yLabel}
      a11yHint={a11yHint}
      a11yRole={a11yRole}
    >
      {children}
    </InnerRow>
  );
}
