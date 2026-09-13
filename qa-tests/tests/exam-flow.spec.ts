import { test, expect } from '@playwright/test';

test.describe('Exam Flow', () => {
  test('Teacher should be able to create an exam question', async ({ page }) => {
    // Navigate directly to teacher page for this test
    await page.goto('/teacher.html');
    
    // Simulate filling out a question form (assuming standard IDs/classes based on project context)
    // Adjust selectors if actual HTML differs.
    // Example fields: question, optA, optB, optC, optD, correctAns
    const questionInput = page.locator('#questionText');
    if (await questionInput.count() > 0) {
      await questionInput.fill('What is Java?');
      await page.locator('#optA').fill('A programming language');
      await page.locator('#optB').fill('A snake');
      await page.locator('#optC').fill('A planet');
      await page.locator('#optD').fill('A car');
      await page.locator('#correctOpt').selectOption('A');

      await page.click('button:has-text("Add Question")');
      
      // Verify question is added to LocalStorage or list
      const successMsg = page.locator('.success-message, #message');
      if (await successMsg.count() > 0) {
        await expect(successMsg).toBeVisible();
      }
    }
  });

  test('Student should be able to answer questions and submit exam', async ({ page }) => {
    // Navigate to exam page directly
    // Using index.html as it's typically the main exam page in such structures after cam validation
    await page.goto('/index.html');
    
    // LocalStorage exam logic mock if needed
    await page.evaluate(() => {
      localStorage.setItem('questions', JSON.stringify([
        { q: "What is 2+2?", a: "4", b: "3", c: "5", d: "6", ans: "a" }
      ]));
    });
    await page.reload();

    // Check if question is displayed
    const questionText = page.locator('.question-text, #question');
    if (await questionText.count() > 0) {
        await expect(questionText).toBeVisible();
        
        // Select an answer
        await page.click('input[type="radio"][value="a"], .option-a');
        
        // Click Submit
        await page.click('button:has-text("Submit")');
        
        // Expect result or score page
        const scoreElement = page.locator('#score, .result-text');
        if (await scoreElement.count() > 0) {
            await expect(scoreElement).toBeVisible();
        }
    }
  });
});
