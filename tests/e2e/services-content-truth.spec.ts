import { expect, test } from '@playwright/test';

for (const width of [390, 768, 1440]) {
  test(`services claims and CTA match real user journey at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/services', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page).toHaveTitle(/AMO AI/);

    const body = await page.locator('body').innerText();
    for (const unsupported of ['3.2x ROI', 'Average ROI', '68%', '94%', 'Book a demo', 'Production-tested technologies in active deployment', 'Specialized AI agent types deployable from this stack', 'Median time to full production deployment', 'Client codebase ownership — no vendor lock-in', 'Start with a strategy session']) {
      expect(body, `unsupported services copy: ${unsupported}`).not.toContain(unsupported);
    }

    await expect(page.getByRole('heading', { name: 'How we measure value' })).toBeVisible();
    const assessment = page.getByRole('link', { name: 'Explore AI Assessment', exact: true });
    await expect(assessment).toHaveCount(2);
    for (const link of await assessment.all()) {
      await expect(link).toHaveAttribute('href', '/wizard');
    }

    const finalAssessment = page.getByRole('link', { name: 'Start Your AI Assessment', exact: true });
    await expect(finalAssessment).toHaveAttribute('href', '/wizard');

    // Exercise lower sections and measure after finite entrance animations settle.
    // Do not navigate to the wizard: it can autosave an empty session on mount.
    const techSection = page.getByText('Choose tools to fit the use case', { exact: true });
    await techSection.scrollIntoViewIfNeeded();
    await expect(techSection).toBeVisible();
    await finalAssessment.scrollIntoViewIfNeeded();
    await expect(finalAssessment).toBeVisible();
    await page.evaluate(async () => {
      const finite = document.getAnimations().filter((animation) => {
        const timing = animation.effect?.getComputedTiming();
        return animation.playState === 'running' &&
          timing != null && Number.isFinite(timing.endTime) &&
          timing.endTime <= 2500;
      });
      await Promise.all(finite.map((animation) => animation.finished.catch(() => {})));
    });
    await expect.poll(() => page.evaluate(
      () => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - window.innerWidth
    ), { message: `post-animation layout should not overflow at ${width}px` })
      .toBeLessThanOrEqual(1);
  });
}
