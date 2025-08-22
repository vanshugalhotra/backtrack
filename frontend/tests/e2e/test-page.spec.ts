import { test, expect } from "@playwright/test";
import { loginAs } from "../utils/login";

const userEmail = process.env.USER_EMAIL!;
const userPassword = process.env.USER_PASSWORD!;

test.describe("Homepage Tests Section", () => {
  test("should display either tests grid or no-tests message", async ({
    page,
  }) => {
    // 1. Log in as USER
    await loginAs(page, userEmail, userPassword);

    // 2. Go to homepage
    await page.goto("/");

    // 3. Wait for one of the two states
    const testsGrid = page.getByTestId("tests-grid");
    const noTestsMessage = page.getByTestId("no-tests-message");

    await expect(
      testsGrid.or(noTestsMessage),
      "Neither tests grid nor no-tests message appeared"
    ).toBeVisible({ timeout: 10000 });

    // 4. If tests grid is visible, ensure it has at least one test card
    if (await testsGrid.isVisible()) {
      const childCount = await testsGrid.locator(">*").count();
      expect(childCount).toBeGreaterThan(0);
    }
  });
});
