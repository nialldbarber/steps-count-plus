import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Close } from "@/components/icons/close";
import { Box } from "@/design-system/components/atoms/box";
import { Chip } from "@/design-system/components/atoms/chip";
import { Text } from "@/design-system/components/atoms/text";
import { MainScreenLayout } from "@/design-system/components/layouts/main-screen";
import { Row } from "@/design-system/components/layouts/row";
import { useActiveValue } from "@/hooks/useActiveValue";
import { hitSlopLarge } from "@/lib/hitSlop";

type NewChallengeScreenProps = {};

type FilterItems = "Distance" | "Flights";
const chipOptions: Array<{ id: number; label: string; view: FilterItems }> = [
  { id: 1, label: "Distance", view: "Distance" },
  { id: 2, label: "Flights", view: "Flights" },
];

export default function NewChallengeScreen({}: NewChallengeScreenProps) {
  const { t } = useTranslation();
  const { params } = useRoute();
  const { value, handleActiveValue } = useActiveValue();
  const [currentFilter, setCurrentFilter] = useState<FilterItems | string>(
    params?.filter || "TwentyFourHours",
  );

  return (
    <>
      <Box position="absolute" top="15px" right="15px" zIndex="10px">
        <Close />
      </Box>
      <MainScreenLayout>
        <Box alignItems="center" paddingTop="30px">
          <Text level="heading" size="23px" color="black">
            Choose a measurement
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
      </MainScreenLayout>
    </>
  );
}
