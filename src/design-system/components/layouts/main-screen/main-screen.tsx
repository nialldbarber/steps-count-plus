import type { ForwardedRef, ReactNode } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { flexStyles } from "@/design-system/common-styles/flex";
import { Box } from "@/design-system/components/atoms/box";

type MainScreenLayoutProps = {
  ref?: ForwardedRef<unknown>;
  children: ReactNode;
};

export default function MainScreenLayout({ children }: MainScreenLayoutProps) {
  return (
    <SafeAreaView style={flexStyles.container}>
      <ScrollView>
        <Box paddingTop="20px" paddingHorizontal="20px" paddingBottom="90px">
          {children}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
