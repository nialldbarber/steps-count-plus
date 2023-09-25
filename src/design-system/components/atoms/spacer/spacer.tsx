import type { ViewProps } from "react-native";
import { Box } from "@/design-system/components/atoms/box";
import type { Space } from "@/design-system/layouts/space";
import { space } from "@/design-system/layouts/space";

interface SpacerProps extends ViewProps {
  width?: Space;
  height?: Space;
}

export default function Spacer({ width, height }: SpacerProps) {
  return <Box width={space[width]} height={space[height]} />;
}
