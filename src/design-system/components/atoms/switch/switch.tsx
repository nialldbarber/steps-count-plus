import { Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

interface SwitchProps extends PressableProps {
  status?: "selected" | "unselected";
}

export default function Switch({ status }: SwitchProps) {
  return (
    <Pressable>
      <Animated.View />
      <Animated.View />
    </Pressable>
  );
}
