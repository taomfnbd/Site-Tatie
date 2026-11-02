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
test('administrator drafts survive reload, stay private, and can be discarded',async({page,browser,baseURL})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));let authenticated=false;
 await page.route('**/api/admin/session',route=>{if(route.request().method()==='DELETE')authenticated=false;return route.fulfill({json:{authenticated}});});
 await page.route('**/api/admin/login',route=>{authenticated=true;return route.fulfill({json:{authenticated:true}});});
 await page.goto('/?admin');await page.getByLabel('Mot de passe',{exact:true}).fill('test-password');await page.getByRole('button',{name:'Se connecter',exact:true}).click();
 const editable=page.locator('main h1 [contenteditable="true"]').first();await expect(editable).toBeVisible();await editable.fill('Brouillon de vérification');await editable.blur();await page.getByRole('button',{name:/Enregistrer$/}).click();
 await page.reload();await expect(page.locator('main h1')).toContainText('Brouillon de vérification');
 const visitor=await browser.newPage({baseURL});await visitor.goto('/');await expect(visitor.locator('main h1')).toContainText('Alaïs');await visitor.close();
 await page.getByRole('button',{name:'Repartir du site publié',exact:true}).click();await page.getByRole('button',{name:'Abandonner le brouillon',exact:true}).click();await expect(page.locator('main h1')).toContainText('Alaïs');
 expect(errors).toEqual([]);
});
test('a late anonymous session check cannot override a successful login',async({page})=>{
 await page.route('**/api/admin/session',async route=>{await new Promise(resolve=>setTimeout(resolve,1200));await route.fulfill({json:{authenticated:false}});});
 await page.route('**/api/admin/login',route=>route.fulfill({json:{authenticated:true}}));
 await page.goto('/?admin');await page.getByLabel('Mot de passe',{exact:true}).fill('test-password');await page.getByRole('button',{name:'Se connecter',exact:true}).click();
 await expect(page.locator('main h1 [contenteditable="true"]').first()).toBeVisible();
 await page.waitForTimeout(1400);
 await expect(page.locator('main h1 [contenteditable="true"]').first()).toBeVisible();await expect(page.getByRole('dialog')).toHaveCount(0);
});
