import { Award, Chart, ChemicalGlass, People } from "iconsax-react-native";
import { Box } from "@/design-system/components/atoms/box";
import { tokens } from "@/design-system/theme/design-tokens";

type CustomBottomTabsIconProps = {
  route: "Stats" | "Goals" | "Insights" | "Community" | string;
  isFocused: boolean;
};

export default function CustomBottomTabsIcon({
  route,
  isFocused,
}: CustomBottomTabsIconProps) {
  const ICON_DIMENSIONS = 28;

  const icon = () => {
    switch (route) {
      case "Stats":
        return (
          <Chart
            size={ICON_DIMENSIONS}
            color={
              isFocused
                ? tokens.bottomTabsIconActiveStroke
                : tokens.bottomTabsIconStroke
            }
          />
        );
      case "Goals":
        return (
          <Award
            size={ICON_DIMENSIONS}
            color={
              isFocused
                ? tokens.bottomTabsIconActiveStroke
                : tokens.bottomTabsIconStroke
            }
          />
        );
      case "Insights":
        return (
          <ChemicalGlass
            size={ICON_DIMENSIONS}
            color={
              isFocused
                ? tokens.bottomTabsIconActiveStroke
                : tokens.bottomTabsIconStroke
            }
          />
        );
      case "Community":
        return (
          <People
            size={ICON_DIMENSIONS}
            color={
              isFocused
                ? tokens.bottomTabsIconActiveStroke
                : tokens.bottomTabsIconStroke
            }
          />
        );
    }
  };

  return <Box>{icon()}</Box>;
}
