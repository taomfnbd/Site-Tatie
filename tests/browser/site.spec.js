import { test,expect } from '@playwright/test';
import { publicRoutes } from '../../src/utils/business.js';
test('public routes render a single H1, canonical URL and no browser errors',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const route of publicRoutes) {
  const response=await page.goto(route);expect(response.status()).toBe(200);await expect(page.locator('main h1')).toHaveCount(1);
  expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe('https://alais-tavernier-naturopathe.fr'+route);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 }
 expect(errors).toEqual([]);
});
test('mobile identity and booking visible; menu closes via button, Escape and navigation',async({page})=>{
 await page.goto('/');await expect(page.locator('header').getByText('Alaïs Tavernier')).toBeVisible();
 const book=page.locator('main').getByRole('link',{name:'Prendre rendez-vous',exact:true}).first();await expect(book).toBeInViewport();
 const open=page.getByRole('button',{name:'Ouvrir le menu'});
 await open.click();await expect(page.getByRole('button',{name:'Fermer le menu'})).toHaveAttribute('aria-expanded','true');
 await page.getByRole('button',{name:'Fermer le menu'}).click();await expect(open).toHaveAttribute('aria-expanded','false');
 await open.click();await page.keyboard.press('Escape');await expect(open).toBeFocused();
 await open.click();await page.locator('#mobile-navigation').getByRole('link',{name:'Contact',exact:true}).click();await expect(page).toHaveURL(/\/contact$/);await expect(open).toHaveAttribute('aria-expanded','false');
});
test('navigation scrolls to top and legacy hashes preserve admin query',async({page})=>{
 await page.goto('/contact');await page.locator('footer').getByRole('link',{name:'Naturopathie',exact:true}).click();await expect(page).toHaveURL(/\/naturopathie$/);await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
 await page.goto('/?admin#/reflexologie');await expect(page).toHaveURL(/\/reflexologie\?admin=?$/);await expect(page.getByRole('dialog')).toBeVisible();
});
test('unknown route is a real 404 with useful content',async({page})=>{const response=await page.goto('/page-inexistante-test');expect(response.status()).toBe(404);await expect(page.locator('h1')).toHaveText('Cette page est introuvable');await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content',/noindex/);});
test('public pages and FAQ remain usable without JavaScript',async({browser,baseURL})=>{
 const context=await browser.newContext({javaScriptEnabled:false,baseURL});const page=await context.newPage();await page.goto('/reflexologie');await expect(page.locator('h1')).toHaveText('La réflexologie');const second=page.locator('details').nth(1);await second.locator('summary').click();await expect(second).toHaveAttribute('open','');await context.close();
});
test('public visitors never restore stored CMS content',async({page})=>{
 await page.goto('/');await page.evaluate(()=>{localStorage.setItem('page_home','[]');localStorage.setItem('cms_global_content',JSON.stringify({header:{brand:{name:'FAUX BROUILLON'}}}));sessionStorage.setItem('admin_auth','true');});await page.reload();await expect(page.locator('main h1')).toContainText('Alaïs');await expect(page.getByText('FAUX BROUILLON')).toHaveCount(0);
});
