import { test, expect } from '@playwright/test';

const NETLIFY_URL = 'https://lab8chatapp.netlify.app/';

test.describe('Netlify Chat App (Gemini + Eliza)', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(NETLIFY_URL);
  });

  test('Gemini model responds with a message', async ({ page }) => {
    const chat = page.locator('chat-view');

    // Select Gemini model inside shadow root (Playwright automatically does this)
    await chat.locator('#bot-services').selectOption('gemini');

    // Fill and send message
    await chat.locator('#message-box').fill('Explain AI in one sentence');
    await chat.locator('#send-button').click();

    // Expect a Gemini-like response
    const botResponse = chat.locator('.bot-message:last-child');
    await expect(botResponse).toHaveText(/ai|intelligence|computer|learn/i, {
      timeout: 20000,
    });
  });

  test('Eliza model responds with a message', async ({ page }) => {
    const chat = page.locator('chat-view');

    // Select Eliza model
    await chat.locator('#bot-services').selectOption('eliza');

    await chat.locator('#message-box').fill('Hello there');
    await chat.locator('#send-button').click();

    const botResponse = chat.locator('.bot-message:last-child');

    await expect(botResponse).toContainText(/hello|why|you|feel|tell/i, {
      timeout: 8000,
    });
  });

  test('Switching between models works correctly', async ({ page }) => {
    const chat = page.locator('chat-view');

    // Test Gemini first
    await chat.locator('#bot-services').selectOption('gemini');
    await chat.locator('#message-box').fill('What is AI?');
    await chat.locator('#send-button').click();

    await expect(chat.locator('.bot-message:last-child')).toContainText(
      /AI|learn|intelligence/i,
      { timeout: 20000 }
    );

    // Then Eliza
    await chat.locator('#bot-services').selectOption('eliza');
    await chat.locator('#message-box').fill('What is AI?');
    await chat.locator('#send-button').click();

    await expect(chat.locator('.bot-message:last-child')).toContainText(
      /why|think|feel|you/i,
      { timeout: 8000 }
    );
  });

});
