import { expect, test } from '@playwright/test';

for (const width of [390, 768, 800, 900, 1024, 1440]) {
  test(`public header fits and Projects navigation works at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth, `unexpected horizontal overflow at ${width}px`).toBeLessThanOrEqual(width);

    if (width < 1024) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      const drawer = page.locator('div.fixed.inset-0.z-40');
      await expect(drawer.getByRole('link', { name: 'Projects', exact: true })).toBeVisible();
      await drawer.getByRole('link', { name: 'Projects', exact: true }).click();
    } else {
      await page.locator('header').getByRole('link', { name: 'Projects', exact: true }).click();
    }

    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.getByRole('heading', { level: 1 }).first())
      .toHaveText(/Real AI Products\. Real Results\./);

    if (width < 1024) {
      await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
    }
  });
}
