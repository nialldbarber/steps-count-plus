import { colors } from "../color/palettes";
import { radius } from "../layouts/radius";

export const tokens = {
  /**
   * @Screens
   */
  mainBackgroundColor: colors.white,
  mainBackgroundColorDark: colors.black,
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
  inputBackgroundColor: colors.greyThree,
  inputPlaceholderColor: colors.greyFour,
  inputBorderColor: colors.greyOne,
  inputDestructiveBorderColor: colors.destructive,
  /**
   * @type Icon
   */
  goBackStroke: colors.black,
  warningStroke: colors.destructive,
  warningText: colors.destructive,
  /**
   * @type Loader
   */
  loaderPrimaryOutlineColor: colors.white,
  loaderPrimaryActiveColor: colors.primaryDark,
} as const;

export type Tokens = keyof typeof tokens;
