import { Pressable, View } from "react-native";
import type { PressableProps } from "react-native";
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
    const newValue = !value;
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <Box>
      <Pressable
        onPress={handleValueChange}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        {...rest}
      >
        <Text>{label}</Text>
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: value ? "black" : "white",
            borderWidth: 2,
            borderColor: "black",
            marginLeft: 10,
          }}
        />
      </Pressable>
      {isError && (
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent={errorAlign === "left" ? "flex-start" : "flex-end"}
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
    </Box>
  );
}
