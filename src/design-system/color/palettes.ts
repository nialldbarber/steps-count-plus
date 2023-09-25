export const baseColors = {
  black: "#111",
  white: "#fff",
} as const;

export const greyColors = {
  greyOne: "#e5e7eb",
  greyTwo: "#d1d5db",
} as const;

export const coreColors = {
  primary: "#0063e1",
  secondary: "#84E1BC",
  tertiary: "",
  destructive: "#ef4444",
} as const;

export type BaseColors = keyof typeof baseColors;
export type GreyColors = keyof typeof greyColors;
export type CoreColors = keyof typeof coreColors;

export type Colors = BaseColors | GreyColors | CoreColors;

export const colors = {
  ...baseColors,
  ...coreColors,
  ...greyColors,
};
