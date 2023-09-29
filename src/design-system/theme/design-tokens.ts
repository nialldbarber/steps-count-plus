import { colors } from "@/design-system/color/palettes";
import { radius } from "@/design-system/layouts/radius";

export const tokens = {
  /**
   * @type Headers
   */
  mainHeaderBackgroundColor: colors.white,
  /**
   * @type Screens
   */
  mainBackgroundColor: colors.white,
  /**
   * @type Text
   */
  mainBodyTextColor: colors.black,
  /**
   * @type Chip
   */
  chipInactiveBackgroundColor: colors.pureWhite,
  chipActiveBackgroundColor: colors.primary,
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
   * @type Bottoms tabs
   */
  bottomTabBackgroundColor: colors.pureWhite,
  bottomTabActiveTabBorder: colors.primary,
  bottomTabsIconStroke: colors.black,
  bottomTabsIconActiveStroke: colors.primary,
  bottomTabsTextColor: colors.black,
  bottomTabsTextActiveColor: colors.primary,
  /**
   * @type Icons
   */
  goBackStroke: colors.black,
  warningStroke: colors.destructive,
  warningText: colors.destructive,
  closeStroke: colors.black,
  settingsStroke: colors.black,
  /**
   * @type Loader
   */
  loaderPrimaryOutlineColor: colors.white,
  loaderPrimaryActiveColor: colors.primaryDark,
  /**
   * @type Card
   */
  cardInfoBackgroundColor: colors.secondary,
  cardInfoColor: colors.black,
  cardEncourageBackgroundColor: colors.orange_light,
  cardEncourageBorderColor: colors.orange,
  cardEmphasiseBackgroundColor: colors.pureWhite,
} as const;

export const tokensDark = {
  /**
   * @type Headers
   */
  mainHeaderBackgroundColor: colors.black,
  /**
   * @type Screens
   */
  mainBackgroundColor: colors.black,
  /**
   * @type Text
   */
  mainBodyTextColor: colors.white,
  /**
   * @type Chip
   */
  chipInactiveBackgroundColor: colors.pureWhite,
  chipActiveBackgroundColor: colors.primary,
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
   * @type Bottoms tabs
   */
  bottomTabBackgroundColor: colors.pureWhite,
  bottomTabActiveTabBorder: colors.primary,
  bottomTabsIconStroke: colors.black,
  bottomTabsIconActiveStroke: colors.primary,
  bottomTabsTextColor: colors.black,
  bottomTabsTextActiveColor: colors.primary,
  /**
   * @type Icon
   */
  goBackStroke: colors.white,
  warningStroke: colors.destructive,
  warningText: colors.destructive,
  closeStroke: colors.black,
  settingsStroke: colors.white,
  /**
   * @type Loader
   */
  loaderPrimaryOutlineColor: colors.white,
  loaderPrimaryActiveColor: colors.primaryDark,
  /**
   * @type Card
   */
  cardInfoBackgroundColor: colors.secondary,
  cardInfoColor: colors.black,
  cardEncourageBackgroundColor: colors.orange_light,
  cardEncourageBorderColor: colors.orange,
  cardEmphasiseBackgroundColor: colors.pureWhite,
} as const;

export const appTheme = {
  light: { ...tokens },
  dark: { ...tokensDark },
};

export type Tokens = keyof typeof tokens;
export type AppTheme = keyof typeof appTheme;
