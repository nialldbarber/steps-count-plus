import { by, device, element, expect } from "detox";

describe("Dashboard flow", () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: { health: "YES" },
      newInstance: true,
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test("First test", async () => {
    await expect(element(by.text("screen.stats.filterText"))).toBeVisible();
  });
});
