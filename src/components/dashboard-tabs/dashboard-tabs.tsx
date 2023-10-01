import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Box } from "@/design-system/components/atoms/box";
import { Chip } from "@/design-system/components/atoms/chip";
import { Row } from "@/design-system/components/layouts/row";
import { useActiveValue } from "@/hooks/useActiveValue";
import { hitSlopLarge } from "@/lib/hitSlop";
import type { RootDashboardStackParamList } from "@/navigation/dashboard-stack/dashboard-stack";

const chipOptions: Array<{ id: number; label: string; view: string }> = [
  { id: 1, label: "24 hrs", view: "TwentyFourHours" },
  { id: 2, label: "7 days", view: "SevenDays" },
  { id: 3, label: "30 days", view: "ThirtyDays" },
  { id: 4, label: "1 year", view: "OneYear" },
];

type DashboardTabsNavigationProp<T extends keyof RootDashboardStackParamList> =
  NativeStackNavigationProp<RootDashboardStackParamList, T>;
type T = DashboardTabsNavigationProp<
  "OneYear" | "SevenDays" | "ThirtyDays" | "TwentyFourHours"
>;

export default function DashboardTabs({ ...rest }) {
  const { navigate } = useNavigation<T>();
  const { t } = useTranslation();
  const { value, handleActiveValue } = useActiveValue();

  return (
    <Box alignItems="center">
      <Row margin="15px" gutter="6px" a11yRole="tablist" scroll>
        {chipOptions.map(({ id, label, view }, index) => {
          return (
            <Chip
              key={id}
              label={label}
              onPress={() => {
                handleActiveValue(index);
                // handleTabView(view);
                navigate(view as T);
              }}
              a11yLabel={t("screen.stats.tabs.a11yLabel")}
              a11yRole="menu"
              hitSlop={hitSlopLarge}
              isSelected={index === value}
              {...rest}
            />
          );
        })}
      </Row>
    </Box>
  );
}
