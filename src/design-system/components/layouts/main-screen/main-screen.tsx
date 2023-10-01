import type { ForwardedRef, ReactNode } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { flexStyles } from "@/design-system/common-styles/flex";
import { Box } from "@/design-system/components/atoms/box";

type MainScreenLayoutProps = {
  scroll?: boolean;
  ref?: ForwardedRef<unknown>;
  children: ReactNode;
};

function InnerScreenLayout({ children }: { children: ReactNode }) {
  return (
    <Box paddingTop="20px" paddingHorizontal="20px" paddingBottom="90px">
      {children}
    </Box>
  );
}

export default function MainScreenLayout({
  scroll = true,
  children,
}: MainScreenLayoutProps) {
  if (scroll) {
    return (
      <SafeAreaView style={flexStyles.container}>
        <ScrollView>
          <InnerScreenLayout>{children}</InnerScreenLayout>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return <InnerScreenLayout>{children}</InnerScreenLayout>;
}
