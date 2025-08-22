import { test, expect } from "@playwright/test";
import { loginAs } from "../utils/login";

const userEmail = process.env.USER_EMAIL!;
const userPassword = process.env.USER_PASSWORD!;

test.describe("Homepage loads after user login", () => {
  test("should log in and display homepage content", async ({ page, baseURL }) => {
    await loginAs(page, userEmail, userPassword);

    await page.goto(baseURL!);

    await expect(page.getByTestId("homepage-heading")).toBeVisible();
  });
});
