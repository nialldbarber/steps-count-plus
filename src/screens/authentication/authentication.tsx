import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { supabase } from "@/database/supabase";
import { Button, Input, Stack } from "@/design-system/components";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Email
   */
  async function signInWithEmail() {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setIsLoading(false);
  }

  async function signUpWithEmail() {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setIsLoading(false);
  }

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
            <Button onPress={signInWithEmail}>Sign in</Button>
            <Button variant="secondary" onPress={signUpWithEmail}>
              Sign up
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
