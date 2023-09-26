import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type DebugLayoutProps = {
  children: ReactNode;
};

export default function DebugLayout({ children }: DebugLayoutProps) {
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(255, 0, 0, 0.1)",
      borderColor: "red",
      borderWidth: 1,
    },
  });

  return (
    <View>
      <View pointerEvents="none" style={styles.container} />
      {children}
    </View>
  );
}
