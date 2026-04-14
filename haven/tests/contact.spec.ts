import { test, expect } from '@playwright/test';

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact.*Haven/);
  });

  test('page heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Come find your quiet.' })).toBeVisible();
  });

  test('contact form has name field', async ({ page }) => {
    await expect(page.getByLabel('Name')).toBeVisible();
  });

  test('contact form has email field', async ({ page }) => {
    await expect(page.getByLabel('Email')).toBeVisible();
  });

  test('contact form has phone field (optional)', async ({ page }) => {
    // The label text is "Phone (optional)" — match by id or partial label
    const phoneField = page.locator('#phone');
    await expect(phoneField).toBeVisible();
  });

  test('contact form has message textarea', async ({ page }) => {
    await expect(page.getByLabel('Message')).toBeVisible();
  });

  test('contact form has submit button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Send message/i })).toBeVisible();
  });

  test('phone number is a tappable tel link', async ({ page }) => {
    const telLink = page.getByRole('link', { name: /\(518\) 555-0174/ }).first();
    await expect(telLink).toBeVisible();
    await expect(telLink).toHaveAttribute('href', 'tel:+15185550174');
  });

  test('email address is a mailto link', async ({ page }) => {
    const emailLink = page.getByRole('link', { name: /jane@havenmassageny.com/ }).first();
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:jane@havenmassageny.com');
  });

  test('hours table is visible', async ({ page }) => {
    await expect(page.getByText('Monday–Friday')).toBeVisible();
    await expect(page.getByText('Saturday')).toBeVisible();
    await expect(page.getByText('Closed')).toBeVisible();
  });

  test('Facebook link opens in new tab with noopener', async ({ page }) => {
    const fbLink = page.locator('main').getByRole('link', { name: /Haven on Facebook/ });
    await expect(fbLink).toBeVisible();
    await expect(fbLink).toHaveAttribute('target', '_blank');
    await expect(fbLink).toHaveAttribute('rel', /noopener/);
    await expect(fbLink).toHaveAttribute('href', 'https://facebook.com/havenmassageny');
  });

  test('Instagram link opens in new tab with noopener', async ({ page }) => {
    const igLink = page.locator('main').getByRole('link', { name: /Haven on Instagram/ });
    await expect(igLink).toBeVisible();
    await expect(igLink).toHaveAttribute('target', '_blank');
    await expect(igLink).toHaveAttribute('rel', /noopener/);
  });

  test('LinkedIn link opens in new tab with noopener', async ({ page }) => {
    const liLink = page.getByRole('link', { name: /Jane Smith LMT on LinkedIn/ });
    await expect(liLink).toBeVisible();
    await expect(liLink).toHaveAttribute('target', '_blank');
    await expect(liLink).toHaveAttribute('rel', /noopener/);
  });

  test('service area badges are visible', async ({ page }) => {
    await expect(page.getByText('Albany').first()).toBeVisible();
    await expect(page.getByText('Clifton Park').first()).toBeVisible();
    await expect(page.getByText('Saratoga Springs').first()).toBeVisible();
  });

  test('"Where to find Haven" section lists the three cities', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Where to find Haven' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Albany' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Clifton Park' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Saratoga Springs' })).toBeVisible();
  });

  test('footer BBC credit is present', async ({ page }) => {
    const bbcLink = page.locator('footer').getByRole('link', { name: /Built by BBC/i });
    await expect(bbcLink).toBeVisible();
  });
});
