import type { ForwardedRef, ReactNode } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Box } from "@/design-system/components/atoms/box";

type MainScreenLayoutProps = {
  ref?: ForwardedRef<unknown>;
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
      <ScrollView>
        <Box padding="20px">{children}</Box>
      </ScrollView>
    </SafeAreaView>
  );
}
