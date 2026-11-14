import { expect, test } from '@playwright/test';

const publicRoutes = [
  { path: '/', name: 'Homepage' },
  { path: '/services', name: 'Services' },
  { path: '/projects', name: 'Projects' },
  { path: '/mvp-builder', name: 'MVP Builder' },
  { path: '/mvp-v2', name: 'MVP v2' },
] as const;

const viewports = [
  { name: 'desktop', width: 1365, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
] as const;

for (const viewport of viewports) {
  test.describe(viewport.name + ' public routes', () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of publicRoutes) {
      test(route.name + ' (' + route.path + ') renders without a React crash', async ({ page }) => {
        const errors: string[] = [];
        page.on('pageerror', (error) => errors.push(error.message));

        const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
        expect(response?.status(), route.path + ' HTTP status').toBe(200);

        await expect(page.locator('#root')).not.toBeEmpty();
        await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
        await expect(page.getByText('Unexpected Application Error!', { exact: false })).toHaveCount(0);
        await expect(page.locator('#root')).not.toContainText(
          /(?:useState|useEffect|motion|isInView) is not defined/,
        );
        expect(errors, route.path + ' browser exceptions').toEqual([]);
      });
    }
  });
}
