import type { TextInputProps } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import { Warning2 } from "iconsax-react-native";
import type { FieldError } from "react-hook-form";
import { shadow } from "@/design-system/color/shadow";
import { Box } from "@/design-system/components/atoms/box";
import { Spacer } from "@/design-system/components/atoms/spacer";
import { Text } from "@/design-system/components/atoms/text";
import { space } from "@/design-system/layouts/space";
import { tokens } from "@/design-system/theme/design-tokens";

interface InputProps extends TextInputProps {
  text: string;
  isError?: FieldError;
  errorMessage?: string;
  onChangeText: (text: any) => void;
}

export default function Input({
  text,
  isError,
  errorMessage,
  onChangeText,
  ...rest
}: InputProps) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: tokens.inputBackgroundColor,
      borderWidth: 2,
      padding: space["20px"],
      borderColor: isError ? tokens.inputDestructiveBorderColor : "transparent",
      borderRadius: space["15px"],
      ...shadow(),
    },
    placeholderText: {
      color: tokens.inputPlaceholderColor,
    },
  });

  return (
    <Box>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        style={styles.container}
        placeholderTextColor={styles.placeholderText.color}
        {...rest}
      />
      {isError && (
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
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
