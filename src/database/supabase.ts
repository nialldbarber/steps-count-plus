import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

/**
 * TODO: find a way to move these values into .env files
 */
const supabaseUrl = "https://smxhkzzxpbgykvkzgcup.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNteGhrenp4cGJneWt2a3pnY3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU1NDI2MzAsImV4cCI6MjAxMTExODYzMH0.fYkkoy14dp_HsSQrAGErknBpLgUfkH7C5w69BNJ8oPQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
