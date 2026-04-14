import { test, expect } from '@playwright/test';

test.describe('Booking page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/booking');
  });

  test('page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Book a Session.*Haven/);
  });

  test('page heading "Time with Jane." is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Time with Jane.' })).toBeVisible();
  });

  test('"Before you come in" preparation section is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Before you come in' })).toBeVisible();
  });

  test('arrival tip is visible', async ({ page }) => {
    await expect(page.getByText(/Arrive five to ten minutes early/)).toBeVisible();
  });

  test('attire tip is visible', async ({ page }) => {
    await expect(page.getByText(/Wear something comfortable/)).toBeVisible();
  });

  test('pressure preference tip is visible', async ({ page }) => {
    await expect(page.getByText(/Tell Jane your pressure preference/)).toBeVisible();
  });

  test('meal tip is visible', async ({ page }) => {
    await expect(page.getByText(/Skip the heavy meal beforehand/)).toBeVisible();
  });

  test('cancellations section is present', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Cancellations' })).toBeVisible();
    await expect(page.getByText(/24 hours ahead/)).toBeVisible();
  });

  test('Acuity booking embed container is present', async ({ page }) => {
    await page.waitForLoadState('domcontentloaded');
    // The embed renders as an iframe pointing to Acuity
    const acuityEmbed = page.locator('iframe[src*="acuityscheduling.com"]');
    const hasIframe = await acuityEmbed.count() > 0;
    if (!hasIframe) {
      // Fallback: check the page source includes acuity reference
      const html = await page.content();
      expect(html.toLowerCase()).toContain('acuity');
    } else {
      await expect(acuityEmbed.first()).toBeVisible();
    }
  });

  test('phone fallback section is present', async ({ page }) => {
    await expect(page.getByText(/Prefer to call\? Jane answers personally\./)).toBeVisible();
  });

  test('phone number is a tappable tel link', async ({ page }) => {
    const telLink = page.getByRole('link', { name: /\(518\) 555-0174/ });
    await expect(telLink).toBeVisible();
    await expect(telLink).toHaveAttribute('href', 'tel:+15185550174');
  });

  test('footer BBC credit is present', async ({ page }) => {
    const bbcLink = page.locator('footer').getByRole('link', { name: /Built by BBC/i });
    await expect(bbcLink).toBeVisible();
  });

  test('all Book Now links on homepage point to /booking', async ({ page: homePage }) => {
    await homePage.goto('/');
    // Collect all Book Now links (service cards, nav, sticky, CTA sections)
    const bookLinks = homePage.getByRole('link', { name: /Book Now/i });
    const count = await bookLinks.count();
    expect(count).toBeGreaterThan(0);
    // Every Book Now link must go to /booking
    for (let i = 0; i < count; i++) {
      const href = await bookLinks.nth(i).getAttribute('href');
      expect(href).toBe('/booking');
    }
  });
});
