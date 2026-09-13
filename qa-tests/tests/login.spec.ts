import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('Student Login - Positive Case', async ({ page }) => {
    await page.goto('/studlog.html');

    // Fill in correct credentials
    await page.fill('#login_id', 'student1');
    await page.fill('#password', 'student123');
    
    // Click login button
    await page.click('button:has-text("Login")');

    // Should redirect to cam.html on successful login
    // We can just check if URL changes, but the API might not be running.
    // In a real E2E environment with backend running, this should pass.
    // For now we mock the API to ensure the UI behaves as expected.
    await page.route('/api/login', async route => {
      await route.fulfill({ status: 200, json: { message: 'Success' } });
    });

    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL(/.*cam.html/);
  });

  test('Student Login - Negative Case (Invalid Credentials)', async ({ page }) => {
    await page.goto('/studlog.html');

    // Mock the failure response
    await page.route('/api/login', async route => {
      await route.fulfill({ status: 401, json: { message: 'Unauthorized' } });
    });

    await page.fill('#login_id', 'wronguser');
    await page.fill('#password', 'wrongpass');
    await page.click('button:has-text("Login")');

    // Verify error message is shown
    const errorMessage = page.locator('#message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Invalid login ID or password');
  });

  test('Teacher Login - Positive Case', async ({ page }) => {
    await page.goto('/teacherlog.html');

    // Fill credentials (assuming default IDs based on typical similar projects)
    await page.fill('#login_id', 'teacher1');
    await page.fill('#password', 'teacher123');

    // Mock API
    await page.route('/api/teacher/login', async route => {
      await route.fulfill({ status: 200, json: { message: 'Success' } });
    });

    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL(/.*teacher.html/);
  });
});
