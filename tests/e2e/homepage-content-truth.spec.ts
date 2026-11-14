import { expect, test } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`homepage claims and honest CTAs at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 }))
      .toHaveText('AI Solutions That Work for Your Business');

    await expect(page.getByRole('link', { name: /Explore Services/ })).toHaveCount(2);
    await expect(page.getByRole('link', { name: /View Our Work/ })).toHaveCount(2);

    for (const link of await page.getByRole('link', { name: /Explore Services/ }).all()) {
      await expect(link).toHaveAttribute('href', '/services');
    }
    for (const link of await page.getByRole('link', { name: /View Our Work/ }).all()) {
      await expect(link).toHaveAttribute('href', '/projects');
    }
    await expect(page.locator('a[href="/booking"]')).toHaveCount(0);

    const body = await page.locator('body').innerText();
    for (const claim of ['94%', '42K+', '1,200+', 'Avg. delivery timeline', '90+ Lighthouse', '8 Weeks', '8-week process']) {
      expect(body, `unverified statement: ${claim}`).not.toContain(claim);
    }
    await expect(page.getByRole('note').filter({ hasText: /Illustrative AI dashboard/ })).toBeVisible();
    const heroScreenshot = page.locator('img[src="/images/projects/mdeai-public-home.webp"]').first();
    await expect(heroScreenshot).toHaveJSProperty('complete', true);
    expect(await heroScreenshot.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  });

  test(`portfolio uses real public product screenshots at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/projects', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 }))
      .toHaveText('Real AI Products. Real Work.');
    await expect(page.getByRole('heading', { level: 2, name: 'MDE AI' })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 2, name: 'iPix' })).toHaveCount(1);
    await expect(page.locator('h3').filter({ hasText: /^Results$/ })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'View MDE AI Live' })).toHaveAttribute('href', 'https://www.mdeai.co/');
    await expect(page.getByRole('link', { name: 'View iPix Live' })).toHaveAttribute('href', 'https://www.ipix.co/');
    await expect(page.locator('a[href="/booking"]')).toHaveCount(0);

    const examples = page.locator('img[src^="/images/projects/"]');
    await expect(examples).toHaveCount(2);
    for (const img of await examples.all()) {
      await expect(img).toHaveJSProperty('complete', true);
      expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
    }
  });
}
