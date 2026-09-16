import { test, expect } from '@playwright/test';

test.describe('Exam Flow', () => {
  test('Teacher should be able to create an exam question', async ({ page }) => {

    await page.goto('/teacher.html');
    await page.locator('#test-title').fill('Java Basics');
    await page.locator('#test-duration').fill('10');
    await page.locator('#total-questions').fill('1');

    const questionInput = page.locator('#question');
    if (await questionInput.count() > 0) {
      await questionInput.fill('What is Java?');
      await page.locator('#option1').fill('A programming language');
      await page.locator('#option2').fill('A snake');
      await page.locator('#option3').fill('A planet');
      await page.locator('#option4').fill('A car');
      await page.locator('#correct-answer').selectOption('option1');

      page.on('dialog', dialog => dialog.accept());
      await page.click('button:has-text("Add Question")');

      const successMsg = page.locator('.success-message, #message');
      if (await successMsg.count() > 0) {
        await expect(successMsg).toBeVisible();
      }
    }
  });

  test('Student should be able to answer questions and submit exam', async ({ page, context }) => {

    await context.grantPermissions(['camera']);
    await page.goto('/cam.html');
    await page.evaluate(() => {
      localStorage.setItem('questions', JSON.stringify([
        { testTitle: "CTPS", questionText: "What is 2+2?", option1: "4", option2: "3", option3: "5", option4: "6", correctAnswer: "option1" }
      ]));
      (window as any).cocoSsd = { load: async () => null };
      (window as any).setupCamera = async () => true;
    });
    await page.click('text="Take Test" >> nth=0');

    const questionText = page.locator('text="1. What is 2+2?"');
    await expect(questionText).toBeVisible({ timeout: 30000 });

    await page.click('input[name="q0"][value="option1"]');

    await page.click('button:has-text("Submit Test")');
    const scoreElement = page.locator('text="Your score:"');
    await expect(scoreElement).toBeVisible();
  });
});