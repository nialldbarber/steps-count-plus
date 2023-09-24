import { Pressable, Text, type PressableProps } from "react-native";

type Variant = "primary" | "secondary" | "tertiary" | "link" | "destructive";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  children: string;
}

export default function Button({ variant, children }: ButtonProps) {
  return (
    <Pressable>
      <Text>{children}</Text>
    </Pressable>
  );
}
