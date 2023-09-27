import { Fatrows, People, Rank } from "iconsax-react-native";
import { Box } from "@/design-system/components/atoms/box";
import { tokens } from "@/design-system/theme/design-tokens";

type CustomBottomTabsIconProps = {
  route: "Dashboard" | "Challenges" | "Community" | string;
  isFocused: boolean;
};

export default function CustomBottomTabsIcon({
  route,
  isFocused,
}: CustomBottomTabsIconProps) {
  const ICON_DIMENSIONS = 28;

  const icon = () => {
    switch (route) {
      case "Dashboard":
        return (
          <Fatrows
            size={ICON_DIMENSIONS}
            color={
              isFocused
                ? tokens.bottomTabsDashboardStroke
                : tokens.bottomTabsDashboardActiveStroke
            }
          />
        );
      case "Challenges":
        return (
          <Rank
            size={ICON_DIMENSIONS}
            color={
              isFocused
                ? tokens.bottomTabsDashboardStroke
                : tokens.bottomTabsDashboardActiveStroke
            }
          />
        );
      case "Community":
        return (
          <People
            size={ICON_DIMENSIONS}
            color={
              isFocused
                ? tokens.bottomTabsDashboardStroke
                : tokens.bottomTabsDashboardActiveStroke
            }
          />
        );
    }
  };

  return <Box>{icon()}</Box>;
}
