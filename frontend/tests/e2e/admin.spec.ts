import { test, expect } from '@playwright/test';

const adminEmail = process.env.ADMIN_EMAIL!;
const adminPassword = process.env.ADMIN_PASSWORD!;

test.describe('Admin login and dashboard load', () => {
  test('should allow admin to log in and view dashboard', async ({ page }) => {
    await page.goto('/login');

    await page.getByPlaceholder('Email').fill(adminEmail);
    await page.getByPlaceholder('Password').fill(adminPassword);
    await page.getByRole('button', { name: /^Login$/ }).click();

    await page.goto('/admin');

    await expect(page.getByTestId('dashboard-title')).toBeVisible();
    await expect(page.getByTestId('stat-total-problems')).toBeVisible();
    await expect(page.getByTestId('stat-total-tests')).toBeVisible();
    await expect(page.getByTestId('stat-total-users')).toBeVisible();
  });
});
