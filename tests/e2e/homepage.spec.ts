import { expect, test } from '@playwright/test';

const publicRoutes = [
  { path: '/', name: 'Homepage', heading: /AI Solutions That Work for Your Business/ },
  { path: '/services', name: 'Services', heading: /AI services bring speed and impact at any scale/ },
  { path: '/projects', name: 'Projects', heading: /Real AI Products\. Real Work\./ },
  { path: '/mvp-builder', name: 'MVP Builder', heading: /Your AI product,\s*live in 6 weeks/ },
  { path: '/mvp-v2', name: 'MVP v2', heading: /Your AI Product,\s*Live in 6 Weeks/ },
] as const;

const viewports = [
  { name: 'desktop', width: 1365, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
] as const;

for (const viewport of viewports) {
  test.describe(viewport.name + ' public routes', () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of publicRoutes) {
      test(`${route.name} (${route.path}) renders without a React crash`, async ({ page }) => {
        const errors: string[] = [];
        page.on('pageerror', (error) => errors.push(error.message));

        const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
        expect(response?.status(), route.path + ' HTTP status').toBe(200);

        await expect(page.locator('#root')).not.toBeEmpty();
        await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
        await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText(route.heading);
        await expect(page.getByText('Something went wrong', { exact: false })).toHaveCount(0);
        await expect(page.getByRole('heading', { name: '404', exact: true })).toHaveCount(0);
        await expect(page.getByText('Unexpected Application Error!', { exact: false })).toHaveCount(0);
        await expect(page.locator('#root')).not.toContainText(
          /is not defined|ReferenceError/,
        );
        expect(errors, route.path + ' browser exceptions').toEqual([]);
      });
    }
  });
}

// Positive control: prove the 404 assertion matches the app's real NotFound UI.
test('unknown public route renders the actual 404 fallback', async ({ page }) => {
  await page.goto('/nonexistent-route-for-smoke-test');
  await expect(page.getByRole('heading', { level: 1, name: '404', exact: true })).toBeVisible();
  await expect(page.getByText('Page not found', { exact: true })).toBeVisible();
});
