import { formatNumber } from "./numbers";

describe("lib -> numbers", () => {
  describe("formatNumber", () => {
    test("a number is converted to a string", () => {
      expect(formatNumber(2)).toBe("2");
    });

    test("a number longer than 4 digits should be formatted", () => {
      expect(formatNumber(2000)).toBe("2,000");
      expect(formatNumber(10000)).toBe("10,000");
    });
  });
});
