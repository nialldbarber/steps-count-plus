export const baseColors = {
  black: "#111",
  white: "#fff",
} as const;

export const greyColors = {
  greyOne: "#e5e7eb",
  greyTwo: "#d1d5db",
} as const;

export const coreColors = {
  primary: "#0284c7",
  secondary: "#84E1BC",
  tertiary: "",
  destructive: "#ef4444",
} as const;

export type BaseColors = keyof typeof baseColors;
export type CoreColors = keyof typeof coreColors;

export const colors = {
  ...baseColors,
  ...coreColors,
  ...greyColors,
};
