import type { ReactNode } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Box } from "@/design-system/components/atoms/box";
import DebugLayout from "@/design-system/lib/debug-layout";

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
      <ScrollView>
        <DebugLayout>
          <Box padding="20px">{children}</Box>
        </DebugLayout>
      </ScrollView>
    </SafeAreaView>
  );
}
