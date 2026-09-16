import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('Student Login - Positive Case', async ({ page }) => {
    await page.goto('/studlog.html');

    await page.fill('#login_id', 'student1');
    await page.fill('#password', 'student123');

    await page.click('button:has-text("Login")');
    await page.route('/api/login', async route => {
      await route.fulfill({ status: 200, json: { message: 'Success' } });
    });

    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL(/.*cam.html/);
  });

  test('Student Login - Negative Case (Invalid Credentials)', async ({ page }) => {
    await page.goto('/studlog.html');
    await page.route('/api/login', async route => {
      await route.fulfill({ status: 401, json: { message: 'Unauthorized' } });
    });

    await page.fill('#login_id', 'wronguser');
    await page.fill('#password', 'wrongpass');
    await page.click('button:has-text("Login")');


    const errorMessage = page.locator('#message');
    await expect(errorMessage).toBeHidden();
    await expect(errorMessage).toContainText('Invalid login ID or password');
  });

  test('Teacher Login - Positive Case', async ({ page }) => {
    await page.goto('/teacherlog.html');
    await page.fill('#login_id', 'teacher1');
    await page.fill('#password', 'teacher123');


    await page.route('/api/teacher/login', async route => {
      await route.fulfill({ status: 200, json: { message: 'Success' } });
    });

    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL(/.*teacher.html/);
  });
});
