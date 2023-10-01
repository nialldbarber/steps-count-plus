import { Pressable } from "react-native";
import type { PressableProps } from "react-native";
import * as Haptics from "expo-haptics";
import { Warning2 } from "iconsax-react-native";
import type { FieldError } from "react-hook-form";
import { Box } from "@/design-system/components/atoms/box";
import { Spacer } from "@/design-system/components/atoms/spacer";
import { Text } from "@/design-system/components/atoms/text";
import { tokens } from "@/design-system/theme/design-tokens";

interface CheckboxProps extends PressableProps {
  value?: any;
  isError?: FieldError;
  errorMessage?: string;
  errorAlign?: "left" | "right";
  onValueChange?: any;
  label?: string;
}

export default function Checkbox({
  label,
  value,
  isError,
  errorMessage,
  errorAlign,
  onValueChange,
  ...rest
}: CheckboxProps) {
  const handleValueChange = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newValue = !value;
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <>
      <Box
        flexDirection="row"
        justifyContent={errorAlign === "left" ? "flex-start" : "flex-end"}
      >
        <Pressable onPress={handleValueChange} {...rest}>
          <Box flexDirection="row" alignItems="center">
            <Box
              width="20px"
              height="20px"
              backgroundColor={value ? "black" : "white"}
              borderWidth={2}
              borderRadius={5}
              borderColor="black"
              marginRight="10px"
            />
            <Text size="14px">{label}</Text>
          </Box>
        </Pressable>
      </Box>
      {isError && (
        <Box
          flexDirection="row"
          alignItems="center"
          marginTop="8px"
          marginRight="8px"
        >
          <Warning2 size={18} color={tokens.warningStroke} />
          <Spacer width="8px" />
          <Text size="11px" color="destructive" weight="semiBold">
            {errorMessage}
          </Text>
        </Box>
      )}
    </>
  );
}
