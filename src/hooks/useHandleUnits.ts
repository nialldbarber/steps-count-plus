import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Units } from "@/stores/units";

export function useHandleUnits(units: Units, distance: number) {
  const { t } = useTranslation();

  const handleUnits = useMemo(() => {
    if (units === "km") {
      return `${(distance / 1000).toFixed(2)} ${t("config.units.km")}`;
    }

    return `${(distance / 1609.34).toFixed(2)} ${t("config.units.miles")}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distance, units]);

  return { handleUnits };
}
