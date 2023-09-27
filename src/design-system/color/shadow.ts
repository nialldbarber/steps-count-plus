import { colors } from "@/design-system/color/palettes";

export const shadow = ({
  width = 0,
  height = 3,
  opacity = 0.27,
  radius = 4.22,
  elevation = 6,
}: {
  width?: number;
  height?: number;
  opacity?: number;
  radius?: number;
  elevation?: number;
} = {}) => ({
  shadowColor: colors.black,
  shadowOffset: {
    width,
    height,
  },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation,
});
