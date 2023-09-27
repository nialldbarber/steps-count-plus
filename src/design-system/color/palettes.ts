export const baseColors = {
  black: "#101517",
  white: "#fff",
} as const;

export const greyColors = {
  greyOne: "#e5e7eb",
  greyTwo: "#d1d5db",
  greyThree: "#f7f7f7",
  greyFour: "#717171",
  greyFive: "#eef1ee",
} as const;

export const coreColors = {
  primary: "#0063e1",
  primaryDark: "#045fd1",
  secondary: "#84E1BC",
  tertiary: "",
  destructive: "#ef4444",
} as const;

export const tonalColors = {
  orange: "#e2572b",
  orange_light: "#fae5e1",
} as const;

export type BaseColors = keyof typeof baseColors;
export type GreyColors = keyof typeof greyColors;
export type CoreColors = keyof typeof coreColors;
export type TonalColors = keyof typeof tonalColors;

export type Colors = BaseColors | GreyColors | CoreColors | TonalColors;

export const colors = {
  ...baseColors,
  ...coreColors,
  ...greyColors,
  ...tonalColors,
};
