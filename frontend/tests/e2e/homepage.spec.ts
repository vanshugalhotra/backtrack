import { test, expect, request } from "@playwright/test";

test("homepage loads and shows content after login", async ({
  page,
  baseURL,
}) => {
  // 1. Create API request context for backend calls
  const apiContext = await request.newContext({
    baseURL: "http://localhost:3333", // your backend API base
  });

  // 2. Register a test user (adjust payload if your API differs)
  const registerResponse = await apiContext.post("/api/v1/auth/register", {
    data: {
      email: `pw_${Date.now()}@test.com`,
      password: "testpass123",
      role: "USER",
    },
  });

  expect(registerResponse.ok()).toBeTruthy();

  const { access_token } = await registerResponse.json();
  expect(access_token).toBeTruthy();

  // 3. Inject token into localStorage before page load
  await page.addInitScript(
    ([token]) => {
      localStorage.setItem("token", token);
    },
    [access_token]
  );

  // 4. Go to homepage
  await page.goto(baseURL!);

  // 5. Assert something visible (change selector to match your UI)
  await expect(page.getByText("Presented by ACM NIT Trichy")).toBeVisible();
});
