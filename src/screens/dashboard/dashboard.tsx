import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Box } from "@/design-system/components/atoms/box";
import { Chip } from "@/design-system/components/atoms/chip";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Row } from "@/design-system/components/layouts/row";
import { Stack } from "@/design-system/components/layouts/stack";
import { useActiveValue } from "@/hooks/useActiveValue";
import { useHealthData } from "@/hooks/useHealthData";
import { hitSlopLarge } from "@/lib/hitSlop";
import { DailyDistance } from "@/screens/distance/daily";
import { MonthlyDistance } from "@/screens/distance/monthly";
import { WeeklyDistance } from "@/screens/distance/weekly";
import { YearlyDistance } from "@/screens/distance/yearly";
import { DailySteps } from "@/screens/steps/daily";
import { MonthlySteps } from "@/screens/steps/monthly";
import { WeeklySteps } from "@/screens/steps/weekly";
import { YearlySteps } from "@/screens/steps/yearly";

type FilterItems = "OneYear" | "SevenDays" | "ThirtyDays" | "TwentyFourHours";
const chipOptions: Array<{ id: number; label: string; view: FilterItems }> = [
  { id: 1, label: "24 hrs", view: "TwentyFourHours" },
  { id: 2, label: "7 days", view: "SevenDays" },
  { id: 3, label: "30 days", view: "ThirtyDays" },
  { id: 4, label: "1 year", view: "OneYear" },
];

export default function DashboardScreen() {
  useHealthData(new Date());
  const { t } = useTranslation();
  const { value, handleActiveValue } = useActiveValue();
  const { params } = useRoute();
  const [currentFilter, setCurrentFilter] = useState<FilterItems | string>(
    params?.filter || "TwentyFourHours",
  );

  return (
    <>
      <Box paddingLeft="24px">
        <Text size="14px" color="black">
          {t("screen.stats.filterText")}
        </Text>
      </Box>
      <Box>
        <Row
          marginHorizontal="15px"
          marginTop="12px"
          marginBottom="10px"
          gutter="5px"
          a11yRole="tablist"
          scroll
        >
          {chipOptions.map(({ id, label, view }, index) => {
            return (
              <Chip
                key={id}
                label={label}
                onPress={() => {
                  handleActiveValue(index);
                  setCurrentFilter(view);
                }}
                a11yLabel={t("screen.stats.tabs.a11yLabel")}
                a11yRole="menu"
                hitSlop={hitSlopLarge}
                isSelected={index === value}
                size="16px"
                height="36px"
              />
            );
          })}
        </Row>
      </Box>
      <MainScreenLayout>
        {currentFilter === "TwentyFourHours" && (
          <>
            <Box marginBottom="20px" alignItems="center">
              <Text level="heading" size="30px">
                Today
              </Text>
            </Box>
            <Stack gutter="10px">
              <DailySteps />
              <DailyDistance />
            </Stack>
          </>
        )}
        {currentFilter === "SevenDays" && (
          <>
            <Box marginBottom="20px" alignItems="center">
              <Text level="heading" size="30px">
                Last week
              </Text>
            </Box>
            <Stack gutter="10px">
              <WeeklySteps />
              <WeeklyDistance />
            </Stack>
          </>
        )}
        {currentFilter === "ThirtyDays" && (
          <>
            <Box marginBottom="20px" alignItems="center">
              <Text level="heading" size="30px">
                Last month
              </Text>
            </Box>
            <Stack gutter="10px">
              <MonthlySteps />
              <MonthlyDistance />
            </Stack>
          </>
        )}
        {currentFilter === "OneYear" && (
          <>
            <Box marginBottom="20px" alignItems="center">
              <Text level="heading" size="30px">
                Last year
              </Text>
            </Box>
            <Stack gutter="10px">
              <YearlySteps />
              <YearlyDistance />
            </Stack>
          </>
        )}
      </MainScreenLayout>
    </>
  );
}
