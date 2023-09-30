export const space = {
  "0px": 0,
  "1px": 1,
  "2px": 2,
  "3px": 3,
  "4px": 4,
  "5px": 5,
  "6px": 6,
  "8px": 8,
  "10px": 10,
  "12px": 12,
  "15px": 15,
  "16px": 16,
  "19px": 19,
  "20px": 20,
  "24px": 24,
  "28px": 28,
  "30px": 30,
  "32px": 32,
  "34px": 34,
  "36px": 36,
  "38px": 38,
  "42px": 42,
  "44px": 44,
  "52px": 52,
  "60px": 60,
  "72px": 72,
  "80px": 80,
  "90px": 90,
  "104px": 104,
} as const;

export const negativeSpace = {
  "-1px": -1,
  "-2px": -2,
  "-3px": -3,
  "-4px": -4,
  "-5px": -5,
  "-6px": -6,
  "-8px": -8,
  "-10px": -10,
  "-12px": -12,
  "-15px": -15,
  "-16px": -16,
  "-19px": -19,
  "-20px": -20,
  "-24px": -24,
  "-28px": -28,
  "-30px": -30,
  "-32px": -32,
  "-34px": -34,
  "-36px": -36,
  "-38px": -38,
  "-42px": -42,
  "-44px": -44,
  "-52px": -52,
  "-60px": -60,
  "-72px": -72,
  "-80px": -80,
  "-90px": -90,
  "-104px": -104,
} as const;

export type Space = keyof typeof space;
export type NegativeSpace = keyof typeof negativeSpace;
