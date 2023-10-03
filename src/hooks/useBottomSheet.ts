import { useCallback, useMemo } from "react";
import type { RefObject } from "react";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";

export function useBottomSheet(
  sheetRef: RefObject<BottomSheetModal>,
  points?: Array<string>,
) {
  const snapPoints = useMemo(() => points ?? ["25%", "50%"], [points]);
  const handlePresentModalPress = useCallback(() => {
    sheetRef.current?.present();
  }, [sheetRef]);
  return { snapPoints, handlePresentModalPress };
}
