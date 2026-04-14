import { test, expect } from '@playwright/test';

test.describe('Services page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/services');
  });

  test('page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Services.*Haven/);
  });

  test('page heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Find the right session.' })).toBeVisible();
  });

  test('displays all 5 services by name', async ({ page }) => {
    const serviceNames = [
      'Swedish Massage',
      'Deep Tissue',
      'Hot Stone',
      'Prenatal Massage',
      'Couples Massage',
    ];
    for (const name of serviceNames) {
      await expect(page.getByText(name).first()).toBeVisible();
    }
  });

  test('CBD add-on section is present', async ({ page }) => {
    await expect(page.getByText('CBD Oil Enhancement')).toBeVisible();
    await expect(page.getByText('+$25')).toBeVisible();
  });

  test('service prices are visible', async ({ page }) => {
    // Swedish: $95, Deep Tissue: $110, Hot Stone: $145, Prenatal: $105
    await expect(page.getByText(/\$95/).first()).toBeVisible();
    await expect(page.getByText(/\$110/).first()).toBeVisible();
    await expect(page.getByText(/\$145/).first()).toBeVisible();
    await expect(page.getByText(/\$105/).first()).toBeVisible();
  });

  test('new client offer banner shows 20% off', async ({ page }) => {
    await expect(page.getByText(/Your first visit is 20% off/)).toBeVisible();
  });

  test('booking CTA links to /booking', async ({ page }) => {
    const bookLinks = page.getByRole('link', { name: /Book your session/i });
    await expect(bookLinks.first()).toBeVisible();
    await expect(bookLinks.first()).toHaveAttribute('href', '/booking');
  });

  test('phone number is a tel link', async ({ page }) => {
    const telLink = page.getByRole('link', { name: /\(518\) 555-0174/ }).first();
    await expect(telLink).toHaveAttribute('href', 'tel:+15185550174');
  });

  test('footer BBC credit is present', async ({ page }) => {
    const bbcLink = page.locator('footer').getByRole('link', { name: /Built by BBC/i });
    await expect(bbcLink).toBeVisible();
  });
});
