import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/database/supabase";
import { Button, Input, Stack } from "@/design-system/components";
import type { RootStackParamList } from "@/navigation/navigation-container/navigation-container";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

const signInSchema = z
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
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
type SignInSchema = z.infer<typeof signInSchema>;

export default function Authentication() {
  const { navigate } = useNavigation<SignUpScreenNavigationProp>();

  const [outcome, setOutcome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useForm<SignInSchema>();

  /**
   * Email
   */
  async function signInWithEmail() {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setIsLoading(false);
  }

  // async function signUpWithEmail() {
  //   setIsLoading(true);
  //   const { data, error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //   });

  //   if (error) Alert.alert(error.message);

  //   console.log(data);

  //   setIsLoading(false);
  // }

  /**
   * Google
   */

  /**
   * Facebook
   */

  /**
   * iOS
   */

  /**
   * Android/PlayStore?
   */
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Stack margin="12px">
          <Stack gutter="15px">
            <Input
              text={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              placeholder="Enter your email address"
              autoCapitalize="none"
            />
            <Input
              text={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter a password"
              secureTextEntry
            />
            {isLoading && <Text>Loading...</Text>}
            <Button onPress={signInWithEmail}>Log in</Button>
            <Button variant="secondary" onPress={() => navigate("SignUp")}>
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
