import { useEffect } from "react";
import { Alert } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
//import { openInbox } from "react-native-email-link";
import { z } from "zod";
import GoBack from "@/components/go-back/go-back";
import { supabase } from "@/database/supabase";
import {
  Button,
  Checkbox,
  Input,
  MainScreenLayout,
  Stack,
} from "@/design-system/components";

/**
 * TODOS:
 * * confirm password isn't working
 * ? need to log out what happens, is there anything in hook form that i can use?
 *
 * * redirect from email just goes to localhost:3000
 * ? this needs to go back to the app, perhaps that can be configured in supabase?
 *
 * * sign up with google
 * ? I need to get a client token?
 */

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
    formState: { errors, isSubmitting, isSubmitSuccessful },
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      //openInbox();
    }
  }, [isSubmitSuccessful]);

  return (
    <MainScreenLayout>
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
          <Button
            onPress={handleSubmit(onSubmit)}
            haptic="Medium"
            isLoading={isSubmitting}
          >
            Sign up
          </Button>
        </Stack>
      </Stack>
    </MainScreenLayout>
  );
}
