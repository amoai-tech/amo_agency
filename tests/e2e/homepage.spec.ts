import { test, expect } from '@playwright/test';

test('homepage renders without crashing', async ({ page }) => {
  const errors: string[] = [];

  page.on('pageerror', error => {
    errors.push(error.message);
  });

  const response = await page.goto('/');
  expect(response?.status()).toBe(200);

  await expect(page.locator('#root')).not.toBeEmpty();
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

  expect(errors).toEqual([]);
});
