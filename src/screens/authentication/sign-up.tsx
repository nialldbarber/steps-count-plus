import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import GoBack from "@/components/go-back/go-back";
import { supabase } from "@/database/supabase";
import { Button, Input, Stack } from "@/design-system/components";
import { Checkbox } from "@/design-system/components/atoms/checkbox";

const signUpSchema = z
  .object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });
type SignUpSchema = z.infer<typeof signUpSchema>;

export default function Authentication() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <GoBack />
        <Stack margin="12px">
          <Stack gutter="15px">
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  text={value}
                  onChangeText={(text) => onChange(text)}
                  keyboardType="email-address"
                  placeholder="Enter your email address"
                  autoCapitalize="none"
                  isError={errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  text={value}
                  onChangeText={(text) => onChange(text)}
                  placeholder="Enter a password"
                  secureTextEntry
                  isError={errors.password}
                  errorMessage={errors?.password?.message}
                />
              )}
              name="password"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  text={value}
                  onChangeText={(text) => onChange(text)}
                  placeholder="Confirm password"
                  secureTextEntry
                  isError={errors.confirmPassword}
                  errorMessage={errors?.confirmPassword?.message}
                />
              )}
              name="confirmPassword"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  label="Accept terms & conditions"
                  onValueChange={onChange}
                  value={value}
                  isError={errors.terms}
                  errorMessage={errors?.terms?.message}
                  errorAlign="left"
                />
              )}
              name="terms"
            />
            {isSubmitting && <Text>Loading...</Text>}
            <Button onPress={handleSubmit(onSubmit)}>Sign up</Button>
          </Stack>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
