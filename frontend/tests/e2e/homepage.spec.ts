import { test, expect } from "@playwright/test";

const userEmail = process.env.USER_EMAIL!;
const userPassword = process.env.USER_PASSWORD!;

test.describe("Homepage loads after user login", () => {
  test("should log in and display homepage content", async ({ page, baseURL }) => {
    // 1. Go to login page
    await page.goto("/login");

    // 2. Fill in credentials from env
    await page.getByPlaceholder("Email").fill(userEmail);
    await page.getByPlaceholder("Password").fill(userPassword);

    // 3. Click login
    await page.getByRole("button", { name: /^Login$/ }).click();

    // 4. Go to homepage
    await page.goto(baseURL!);

    // 5. Assert UI via testids (safe against text changes)
    await expect(page.getByTestId("homepage-heading")).toBeVisible();
  });
});
