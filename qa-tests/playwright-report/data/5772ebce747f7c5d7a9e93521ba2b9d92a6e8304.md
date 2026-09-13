# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Authentication Flow >> Student Login - Negative Case (Invalid Credentials)
- Location: Online-exam-portal-main\qa-tests\tests\login.spec.ts:26:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:8080/studlog.html", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Authentication Flow', () => {
  4  |   test('Student Login - Positive Case', async ({ page }) => {
  5  |     await page.goto('/studlog.html');
  6  | 
  7  |     // Fill in correct credentials
  8  |     await page.fill('#login_id', 'student1');
  9  |     await page.fill('#password', 'student123');
  10 |     
  11 |     // Click login button
  12 |     await page.click('button:has-text("Login")');
  13 | 
  14 |     // Should redirect to cam.html on successful login
  15 |     // We can just check if URL changes, but the API might not be running.
  16 |     // In a real E2E environment with backend running, this should pass.
  17 |     // For now we mock the API to ensure the UI behaves as expected.
  18 |     await page.route('/api/login', async route => {
  19 |       await route.fulfill({ status: 200, json: { message: 'Success' } });
  20 |     });
  21 | 
  22 |     await page.click('button:has-text("Login")');
  23 |     await expect(page).toHaveURL(/.*cam.html/);
  24 |   });
  25 | 
  26 |   test('Student Login - Negative Case (Invalid Credentials)', async ({ page }) => {
> 27 |     await page.goto('/studlog.html');
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  28 | 
  29 |     // Mock the failure response
  30 |     await page.route('/api/login', async route => {
  31 |       await route.fulfill({ status: 401, json: { message: 'Unauthorized' } });
  32 |     });
  33 | 
  34 |     await page.fill('#login_id', 'wronguser');
  35 |     await page.fill('#password', 'wrongpass');
  36 |     await page.click('button:has-text("Login")');
  37 | 
  38 |     // Verify error message is shown
  39 |     const errorMessage = page.locator('#message');
  40 |     await expect(errorMessage).toBeVisible();
  41 |     await expect(errorMessage).toContainText('Invalid login ID or password');
  42 |   });
  43 | 
  44 |   test('Teacher Login - Positive Case', async ({ page }) => {
  45 |     await page.goto('/teacherlog.html');
  46 | 
  47 |     // Fill credentials (assuming default IDs based on typical similar projects)
  48 |     await page.fill('#login_id', 'teacher1');
  49 |     await page.fill('#password', 'teacher123');
  50 | 
  51 |     // Mock API
  52 |     await page.route('/api/teacher/login', async route => {
  53 |       await route.fulfill({ status: 200, json: { message: 'Success' } });
  54 |     });
  55 | 
  56 |     await page.click('button:has-text("Login")');
  57 |     await expect(page).toHaveURL(/.*teacher.html/);
  58 |   });
  59 | });
  60 | 
```