import type { ReactNode } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type MainScreenLayoutProps = {
  children: ReactNode;
};

export default function MainScreenLayout({ children }: MainScreenLayoutProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
}
