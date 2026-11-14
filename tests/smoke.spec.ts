import { test, expect } from '@playwright/test';

// Read-only real browser checks; never create live users or save wizard data.
test('home renders AMO AI without JavaScript errors',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await expect(page).toHaveTitle(/AMO AI/);
 await expect(page.getByRole('heading',{level:1})).toBeVisible();
 expect(errors).toEqual([]);
});
for(const [path,label] of [
 ['/services',/AI services/i],['/wizard',/Tell us about your business/i],
 ['/agents',/AI Agents/i],['/auth',/AI transformation/i]
] as const){
 test(`public ${path} renders`,async({page})=>{
  await page.goto(path);
  await expect(page.getByRole('heading',{level:1})).toContainText(label);
  await expect(page).toHaveTitle(/AMO AI/);
 });
}
for(const path of ['/app/dashboard','/app/crm/pipelines','/app/agents']){
 test(`protected ${path} redirects to sign-in`,async({page})=>{
  await page.goto(path);
  await expect(page).toHaveURL(/\/auth(?:\?|$)/);
 });
}
test('signup confirms email with mocked Supabase response',async({page})=>{
 await page.route('**/auth/v1/signup*',async route=>{
  await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({
    user:{id:'d5942ad3-e8a5-491c-90f2-9458bb61ac2a',email:'example+test@example.org',user_metadata:{},app_metadata:{},aud:'authenticated',created_at:new Date().toISOString()},
    session:null
  })});
 });
 await page.goto('/auth');
 await page.getByRole('button',{name:'Create Account'}).first().click();
 await page.getByPlaceholder('Jane Smith').fill('Test Customer');
 await page.locator('input[type="email"]').fill('example+test@example.org');
 await page.locator('input[type="password"]').fill('SecureTest123!Q');
 await page.locator('input[type="password"]').blur();
 await page.getByRole('button',{name:'Create Account'}).last().click();
 await expect(page.getByRole('status')).toContainText('Check your email');
 await expect(page).toHaveURL(/\/auth$/);
});
test('robots, sitemap and favicon are real static files',async({request})=>{
 const robots=await request.get('/robots.txt');
 expect(robots.ok()).toBeTruthy();
 expect(await robots.text()).toContain('Sitemap: https://www.amoai.ca/sitemap.xml');
 const sitemap=await request.get('/sitemap.xml');
 expect(sitemap.ok()).toBeTruthy();
 expect(await sitemap.text()).toContain('<urlset');
 const favicon=await request.get('/favicon.svg');
 expect(favicon.ok()).toBeTruthy();
 expect(await favicon.text()).toContain('<svg');
});
for(const path of ['/','/services','/wizard','/auth','/agents','/web-design']){
 test(`390px mobile has no horizontal overflow: ${path}`,async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto(path);
  await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  await page.waitForTimeout(500);
  const overflow=await page.evaluate(()=>Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)-innerWidth);
  expect(overflow,`Horizontal scroll on ${path}`).toBeLessThanOrEqual(1);
 });
}

/**
 * Authenticated UI smoke fixtures are intentionally mocked; these do not certify
 * live Supabase login, tenant isolation, or write operations.
 */
for (const [path, expectedText] of [
  ['/app/dashboard', /Start Your AI Transformation/i],
  ['/app/crm/pipelines', /No pipelines/i],
  ['/app/agents', /Total Runs/i],
] as const) {
  test(`authenticated fixture renders ${path}`, async ({ page }) => {
    const userId = 'c6637019-e135-4b55-8e25-3750f95a4732';
    const payload = { sub: userId, aud: 'authenticated', role: 'authenticated', exp: 9999999999 };
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      Buffer.from(JSON.stringify(payload)).toString('base64url') + '.mock';
    const session = {
      access_token: jwt, refresh_token: 'not-a-live-refresh-token',
      token_type: 'bearer', expires_at: 9999999999, expires_in: 3600,
      user: {
        id: userId, email: 'test@example.org', aud: 'authenticated', role: 'authenticated',
        app_metadata: { provider: 'email', providers: ['email'] },
        user_metadata: { name: 'Demo User' },
        created_at: '2026-01-01T00:00:00Z',
      },
    };

    await page.addInitScript((fixture) => {
      for (const project of ['example', 'icpzzsslayhywxoniekw']) {
        localStorage.setItem(`sb-${project}-auth-token`, JSON.stringify(fixture));
      }
    }, session);

    await page.route('**/functions/v1/make-server-283466b6/**', async (route) => {
      const url = new URL(route.request().url());
      let result: Record<string, unknown> = {};
      if (url.pathname.includes('/wizard/list/')) result = { sessions: [] };
      if (url.pathname.endsWith('/crm/pipelines')) result = { pipelines: [] };
      if (url.pathname.endsWith('/ai/run-logs')) result = { logs: [], total: 0 };
      if (url.pathname.endsWith('/ai/cache-stats')) result = { error: 'No per-user cache metrics' };
      if (url.pathname.endsWith('/ai/aggregate-stats')) result = {
        totalRuns: 0, successRuns: 0, failedRuns: 0, successRate: 0,
        totalTokens: 0, avgDuration: 0, activeCacheEntries: 0,
        cacheMetricsAvailable: false, byType: {}, model: 'mock',
      };
      if (url.pathname.includes('/strategy/metrics')) result = { pendingApprovals: 0 };
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(result) });
    });

    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(path);
    await expect(page).toHaveURL(new RegExp(path.replaceAll('/', '\\/') + '$'));
    await expect(page.locator('body')).toContainText(expectedText);
    expect(errors).toEqual([]);
  });
}

test('deep page gets a single route-correct canonical link', async ({ page, request }) => {
  const raw = await (await request.get('/services')).text();
  // Vite SPA serves common index.html; never falsely declare the homepage
  // canonical for every deep URL before JS has rendered the route.
  expect(raw).not.toContain('<link rel="canonical" href="https://www.amoai.ca/"');
  await page.goto('/services');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.amoai.ca/services');
  await page.goto('/about');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.amoai.ca/about');
});
