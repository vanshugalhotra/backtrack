import { test, expect } from "@playwright/test";
import { loginAs } from "../utils/login";

const adminEmail = process.env.ADMIN_EMAIL!;
const adminPassword = process.env.ADMIN_PASSWORD!;

test.describe("Admin login and dashboard load", () => {
  test("should log in and view dashboard", async ({ page }) => {
    await loginAs(page, adminEmail, adminPassword);

    await page.goto("/admin");

    await expect(page.getByTestId("dashboard-title")).toBeVisible();
    await expect(page.getByTestId("stat-total-problems")).toBeVisible();
    await expect(page.getByTestId("stat-total-tests")).toBeVisible();
    await expect(page.getByTestId("stat-total-users")).toBeVisible();
  });
});
