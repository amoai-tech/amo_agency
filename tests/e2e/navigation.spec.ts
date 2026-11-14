import { expect, test } from '@playwright/test';

for (const width of [390, 768, 800, 900, 1024, 1440]) {
  test(`public header fits and Projects navigation works at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth, `unexpected horizontal overflow at ${width}px`).toBeLessThanOrEqual(width);

    if (width < 1024) {
      const drawer = page.locator('div.fixed.inset-0.z-40');
      await expect(drawer).toHaveAttribute('inert', '');
      await expect(drawer).toHaveAttribute('aria-hidden', 'true');
      await page.getByRole('button', { name: 'Open menu' }).click();
      await expect(drawer).not.toHaveAttribute('inert');
      await expect(drawer).toHaveAttribute('aria-hidden', 'false');
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


// Regression: the closed drawer must not be keyboard-focusable and an open
// mobile/tablet drawer must not lock desktop scrolling after resizing.
test('tablet drawer respects keyboard focus and unlocks scrolling on resize', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 900 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const drawer = page.locator('div.fixed.inset-0.z-40');
  await expect(drawer).toHaveAttribute('inert', '');

  // The hidden drawer cannot enter the keyboard focus sequence.
  const hiddenProjects = drawer.getByRole('link', { name: 'Projects', exact: true, includeHidden: true });
  await expect(hiddenProjects).toHaveCount(1);
  await page.keyboard.press('Tab');
  const focusedInDrawer = await page.evaluate(() => {
    const drawer = document.querySelector('div.fixed.inset-0.z-40');
    return Boolean(drawer && document.activeElement && drawer.contains(document.activeElement));
  });
  expect(focusedInDrawer).toBe(false);

  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(drawer).not.toHaveAttribute('inert');
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden');

  await page.setViewportSize({ width: 1024, height: 900 });
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeHidden();
});
