import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft2 } from "iconsax-react-native";
import type { Colors } from "@/design-system/color/palettes";
import { colors } from "@/design-system/color/palettes";
import { tokens } from "@/design-system/theme/design-tokens";

type GoBackProps = {
  /**
   * Refer back to colors for a full list of options
   * @default "black"
   */
  stroke?: Colors;
};

export default function GoBack({ stroke }: GoBackProps) {
  const { goBack } = useNavigation();

  const getStrokeColor = () => {
    if (stroke !== undefined) {
      return colors[stroke];
    }

    return tokens.goBackStroke;
  };
  const strokeColor = getStrokeColor();

  return (
    <Pressable onPress={goBack}>
      <ArrowLeft2 size="32" color={strokeColor} />
    </Pressable>
  );
}
