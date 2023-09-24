export const radius = {
  "0px": 0,
  "1px": 1,
  "2px": 2,
  "3px": 3,
  "4px": 4,
  "5px": 5,
  "6px": 6,
  "8px": 8,
  "10px": 10,
  "60px": 60,
  "100px": 100,
} as const;

export type Radius = keyof typeof radius;
