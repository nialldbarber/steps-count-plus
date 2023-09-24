import { StyleSheet, TextInput } from "react-native";
import type { TextInputProps } from "react-native";
import { space } from "@/design-system/layouts/space";
import { tokens } from "@/design-system/theme/design-tokens";

interface InputProps extends TextInputProps {
  text: string;
  onChangeText: (text: any) => void;
}

export default function Input({ text, onChangeText, ...rest }: InputProps) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: tokens.inputBackgroundColor,
      borderWidth: 2,
      padding: space["12px"],
      borderColor: tokens.inputBorderColor,
      borderRadius: space["6px"],
    },
  });

  return (
    <TextInput
      value={text}
      onChangeText={onChangeText}
      style={styles.container}
      {...rest}
    />
  );
}
