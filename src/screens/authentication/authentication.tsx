import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/database/supabase";
import { Button, Input, Stack } from "@/design-system/components";
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
            <Button onPress={handleSubmit(onSubmit)} haptic="Medium">
              Log in
            </Button>
            <Button
              variant="secondary"
              onPress={() => navigate("SignUp")}
              testID="create-new-account"
              haptic="Medium"
            >
              Create new account
            </Button>
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
