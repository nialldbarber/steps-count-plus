import { Pressable } from "react-native";
import type { PressableProps } from "react-native";
import { Box } from "@/design-system/components/atoms/box";
import { Text } from "@/design-system/components/atoms/text";
import type { Theme } from "@/stores/theme";

export type RadioButtonType = {
  id: string;
  label: string;
  value: string;
  status?: "checked" | "unchecked";
};

export type RadioButtonsProps<T> = {
  options: Array<RadioButtonType>;
  defaultSelected: string;
  onSelect: (checked: T) => void;
};

interface RadioButtonProps<T>
  extends PressableProps,
    Pick<RadioButtonType, "label" | "value" | "status"> {
  onSelect: (checked: T) => void;
  isActive: boolean;
}

function RadioButton({
  label,
  value,
  onSelect,
  isActive,
}: RadioButtonProps<Theme>) {
  const MODE_MAP: Record<string, string> = {
    system: "⚙️",
    light: "🌝",
    dark: "🌚",
  };

  return (
    <Pressable onPress={() => onSelect(value as Theme)}>
      <Box
        padding="20px"
        marginVertical="15px"
        borderWidth={1}
        borderColor={isActive ? "destructive" : "white"}
        backgroundColor="white"
        borderRadius="medium"
        width="104px"
        shadow={isActive}
      >
        <Box alignItems="center">
          <Text withEmoji size="20px">
            {MODE_MAP[value]}
          </Text>
          <Text color="black">{label}</Text>
        </Box>
      </Box>
    </Pressable>
  );
}

export default function RadioButtons({
  options,
  defaultSelected,
  onSelect,
}: RadioButtonsProps<Theme>) {
  return (
    <Box flexDirection="row" justifyContent="space-between">
      {options.map(({ id, label, value, status }) => (
        <RadioButton
          key={id}
          label={label}
          value={value}
          status={status}
          onSelect={onSelect}
          isActive={defaultSelected === value}
        />
      ))}
    </Box>
  );
}
