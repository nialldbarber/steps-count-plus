import { Alert, SafeAreaView, ScrollView } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/database/supabase";
import { flexStyles } from "@/design-system/common-styles/flex";
import { Box } from "@/design-system/components/atoms/box";
import { Button } from "@/design-system/components/atoms/button";
import { Input } from "@/design-system/components/atoms/input";
import { Spacer } from "@/design-system/components/atoms/spacer";
import { Text } from "@/design-system/components/atoms/text";
import { Stack } from "@/design-system/components/layouts/stack";
import type { RootStackParamList } from "@/navigation/navigation-container/navigation-container";

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

const signInSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});
type SignInSchema = z.infer<typeof signInSchema>;

export default function Authentication() {
  const { navigate } = useNavigation<SignUpScreenNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
  }

  return (
    <SafeAreaView style={flexStyles.container}>
      <ScrollView>
        <Box alignItems="center" justifyContent="center">
          <Box height="1/2" width="1/2" backgroundColor="black" />
          <Text level="heading" size="26px">
            StepCount+
          </Text>
        </Box>
        <Stack margin="12px">
          <Stack gutter="12px">
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
                  errorMessage={errors.email && errors.email?.message}
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
                  isError={errors.password}
                  errorMessage={errors.password && errors.password.message}
                  secureTextEntry
                />
              )}
              name="password"
            />
            {isSubmitting && <Text>Loading...</Text>}
            <Spacer height="20px" />
            <Button onPress={handleSubmit(onSubmit)} haptic="Medium">
              Log in
            </Button>
            <Button
              variant="secondary"
              onPress={() => navigate("SignUp")}
              testID="create-new-account"
              haptic="Light"
            >
              Create new account
            </Button>
          </Stack>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}
