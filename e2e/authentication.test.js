describe("Authentication flow", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  // test("when pressing `Create new account` the user should be redirected to Create Account screen", () => {

  // })

  test("`Create new account` button should be visible", async () => {
    await expect(element(by.id("click-me-button"))).toBeVisible();
  });
});
