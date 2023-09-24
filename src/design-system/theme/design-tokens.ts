import { colors } from "../color/palettes";
import { radius } from "../layouts/radius";

export const tokens = {
  /**
   * @type Button
   */
  buttonPrimaryBackgroundColor: colors.primary,
  buttonPrimaryTextColor: colors.white,
  buttonSecondaryBackgroundColor: colors.secondary,
  buttonSecondaryTextColor: colors.black,
  buttonBorderRadius: radius.full,
  /**
   * @type Input
   */
  inputBackgroundColor: colors.white,
  inputBorderColor: colors.greyOne,
  inputDestructiveBorderColor: colors.destructive,
} as const;

export type Tokens = keyof typeof tokens;
