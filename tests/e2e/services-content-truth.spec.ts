import { expect, test } from '@playwright/test';

for (const width of [390, 768, 1440]) {
  test(`services claims and CTA match real user journey at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/services', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page).toHaveTitle(/AMO AI/);

    const body = await page.locator('body').innerText();
    for (const unsupported of ['3.2x ROI', 'Average ROI', '68%', '94%', 'Book a demo']) {
      expect(body, `unsupported services copy: ${unsupported}`).not.toContain(unsupported);
    }

    await expect(page.getByRole('heading', { name: 'How we measure value' })).toBeVisible();
    const assessment = page.getByRole('link', { name: 'Explore AI Assessment', exact: true });
    await expect(assessment).toHaveCount(2);
    for (const link of await assessment.all()) {
      await expect(link).toHaveAttribute('href', '/wizard');
    }

    await expect.poll(async () => page.evaluate(
      () => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - window.innerWidth
    ), { message: `layout must settle without horizontal overflow at ${width}px` })
      .toBeLessThanOrEqual(1);

    await assessment.first().click();
    await expect(page).toHaveURL(/\/wizard$/);
    await expect(page.getByRole('heading', { level: 1 }).first())
      .toHaveText(/Tell us about your business/);
    // Read-only journey: do not submit, create accounts, or save wizard data.
  });
}
