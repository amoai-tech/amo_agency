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
