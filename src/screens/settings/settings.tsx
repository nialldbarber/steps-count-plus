import { Close } from "@/components/icons/close";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";

export default function SettingsModalScreen() {
  return (
    <MainScreenLayout>
      <Close />
      <Text level="heading" size="30px">
        Settings
      </Text>
    </MainScreenLayout>
  );
}
