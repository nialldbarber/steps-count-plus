import type { EffectCallback } from "react";
import { useEffect } from "react";

export function useEffectIgnoreDeps(
  effect: EffectCallback,
  deps: Array<unknown>,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [deps]);
}
