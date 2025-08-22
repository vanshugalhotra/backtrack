import { defineConfig, devices } from "@playwright/test";

import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    headless: true,
    screenshot: "only-on-failure",
    storageState: undefined,
  },

  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
