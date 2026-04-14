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

  test('displays tagline and primary booking CTA', async ({ page }) => {
    await expect(page.getByText('Your peace starts here.')).toBeVisible();
    const bookFirstSession = page.getByRole('link', { name: /Book your first session/i });
    await expect(bookFirstSession).toBeVisible();
    await expect(bookFirstSession).toHaveAttribute('href', '/booking');
  });

  test('displays "See all services" link to /services', async ({ page }) => {
    const seeAllLink = page.getByRole('link', { name: /See all services/i });
    await expect(seeAllLink).toBeVisible();
    await expect(seeAllLink).toHaveAttribute('href', '/services');
  });

  test('services section heading is visible', async ({ page }) => {
    await expect(page.getByText('Find the right fit.')).toBeVisible();
  });

  test('shows 3 service preview cards with correct names', async ({ page }) => {
    await expect(page.getByText('Swedish Massage').first()).toBeVisible();
    await expect(page.getByText('Deep Tissue').first()).toBeVisible();
    await expect(page.getByText('Hot Stone').first()).toBeVisible();
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
    await expect(page.getByText("You're booking a person, not a service.")).toBeVisible();
    await expect(page.getByText(/Licensed Massage Therapist since 2000/)).toBeVisible();
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

  test('gift certificate section is present', async ({ page }) => {
    await expect(page.getByText('Give the gift of peace.')).toBeVisible();
    const giftLink = page.getByRole('link', { name: /Get a gift certificate/i });
    await expect(giftLink).toBeVisible();
    await expect(giftLink).toHaveAttribute('href', '/contact');
  });

  test('final booking CTA section is present', async ({ page }) => {
    await expect(page.getByText('Ready to feel better?')).toBeVisible();
    const bookYourSession = page.getByRole('link', { name: /Book your session/i });
    await expect(bookYourSession).toBeVisible();
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
