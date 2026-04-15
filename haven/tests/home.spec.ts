import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Haven Therapeutic Massage/);
  });

  test('nav is visible', async ({ page }) => {
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
  });

  test('displays hero headline', async ({ page }) => {
    await expect(page.getByText('A private ritual for release, repair, and stillness.')).toBeVisible();
  });

  test('services section heading is visible', async ({ page }) => {
    await expect(page.getByText('Choose the pace, pressure, and care your body is asking for.')).toBeVisible();
  });

  test('shows 3 signature service names', async ({ page }) => {
    await expect(page.getByText('Grounding Reset').first()).toBeVisible();
    await expect(page.getByText('Targeted Therapeutic').first()).toBeVisible();
    await expect(page.getByText('Restorative Ritual').first()).toBeVisible();
  });

  test('service cards have Book Now links to /booking', async ({ page }) => {
    const bookNowLinks = page.getByRole('link', { name: 'Book Now' });
    // 3 service cards + nav = at least 3
    const count = await bookNowLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);
    // Verify the first service card Book Now goes to /booking
    await expect(bookNowLinks.first()).toHaveAttribute('href', '/booking');
  });

  test('new client offer banner shows 20% off', async ({ page }) => {
    await expect(page.getByText(/Your first visit is 20% off/)).toBeVisible();
  });

  test('Jane intro section is visible', async ({ page }) => {
    await expect(page.getByText('Bodywork that feels deeply personal, never clinical.')).toBeVisible();
  });

  test('testimonials section heading is visible', async ({ page }) => {
    await expect(page.getByText('What clients say')).toBeVisible();
  });

  test('all 3 testimonial names are present', async ({ page }) => {
    await expect(page.getByText('Sarah M.')).toBeVisible();
    await expect(page.getByText('David K.')).toBeVisible();
    await expect(page.getByText('Rachel T.')).toBeVisible();
  });

  test('availability notice mentions Albany, Clifton Park, Saratoga Springs', async ({ page }) => {
    await expect(page.getByText(/Albany/).first()).toBeVisible();
    await expect(page.getByText(/Clifton Park/).first()).toBeVisible();
    await expect(page.getByText(/Saratoga Springs/).first()).toBeVisible();
  });

  test('closing CTA section is present', async ({ page }) => {
    await expect(page.getByText('Come in carrying less. Leave with more room to breathe.')).toBeVisible();
    const bookLink = page.getByRole('link', { name: /Book a session/i }).first();
    await expect(bookLink).toBeVisible();
  });

  test('phone number is a tel link', async ({ page }) => {
    const telLink = page.getByRole('link', { name: /\(518\) 555-0174/ }).first();
    await expect(telLink).toHaveAttribute('href', 'tel:+15185550174');
  });

  test('footer contains BBC credit link', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    const bbcLink = footer.getByRole('link', { name: /Built by BBC/i });
    await expect(bbcLink).toBeVisible();
    await expect(bbcLink).toHaveAttribute('href', /big-bad-coding/);
  });

  test('skip to main content link is present', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: /Skip to main content/i });
    await expect(skipLink).toBeAttached();
  });

  test('nav Services link navigates to /services', async ({ page }) => {
    await page.getByRole('link', { name: 'Services' }).first().click();
    await expect(page).toHaveURL('/services');
  });
});
