import { formatNumber } from "./numbers";

describe("lib -> numbers", () => {
  describe("formatNumber", () => {
    test("a number is converted to a string", () => {
      expect(formatNumber(2)).toBe("2");
    });

    test("a number longer than 4 digits should be formatted", () => {
      expect(formatNumber(2000)).toBe("2,000");
      expect(formatNumber(10000)).toBe("10,000");
      expect(formatNumber(1234567)).toBe("1,234,567");
    });

    test("should handle negative numbers", () => {
      expect(formatNumber(-1234567)).toBe("-1,234,567");
    });

    test("should handle zero", () => {
      expect(formatNumber(0)).toBe("0");
    });

    test("should handle floating point numbers (assuming US locale)", () => {
      expect(formatNumber(12345.6789)).toBe("12,345.679");
    });
  });
});
