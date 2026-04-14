import { test, expect } from '@playwright/test';

test.describe('FAQ page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/faq');
  });

  test('page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/FAQ.*Haven/);
  });

  test('page heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: "Questions Jane hears a lot." })).toBeVisible();
  });

  test('accordion renders first question', async ({ page }) => {
    await expect(page.getByText('What happens during my first visit?')).toBeVisible();
  });

  test('accordion renders all 10 questions', async ({ page }) => {
    const questions = [
      'What happens during my first visit?',
      'What should I wear?',
      'Can I ask for more or less pressure?',
      'Is tipping expected?',
      "What's the cancellation policy?",
      'Is prenatal massage safe?',
      'Do you offer gift certificates?',
      'Where is parking?',
      'What payment methods do you accept?',
      'Is there a new client discount?',
    ];
    for (const q of questions) {
      await expect(page.getByText(q)).toBeVisible();
    }
  });

  test('accordion item expands on click', async ({ page }) => {
    const firstBtn = page.getByRole('button').filter({ hasText: 'What happens during my first visit?' });
    await expect(firstBtn).toBeVisible();
    // Initially closed
    await expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
    await firstBtn.click();
    // Now open
    await expect(firstBtn).toHaveAttribute('aria-expanded', 'true');
    // Answer text is visible
    await expect(page.getByText(/fill out a short health history form/)).toBeVisible();
  });

  test('accordion item collapses on second click', async ({ page }) => {
    const firstBtn = page.getByRole('button').filter({ hasText: 'What happens during my first visit?' });
    await firstBtn.click();
    await expect(firstBtn).toHaveAttribute('aria-expanded', 'true');
    await firstBtn.click();
    await expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('only one accordion item is open at a time', async ({ page }) => {
    const firstBtn = page.getByRole('button').filter({ hasText: 'What happens during my first visit?' });
    const secondBtn = page.getByRole('button').filter({ hasText: 'What should I wear?' });

    await firstBtn.click();
    await expect(firstBtn).toHaveAttribute('aria-expanded', 'true');

    await secondBtn.click();
    await expect(secondBtn).toHaveAttribute('aria-expanded', 'true');
    // First should now be closed
    await expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('cancellation policy answer mentions 24 hours', async ({ page }) => {
    const cancelBtn = page.getByRole('button').filter({ hasText: "What's the cancellation policy?" });
    await cancelBtn.click();
    await expect(page.getByText(/24 hours/)).toBeVisible();
  });

  test('new client discount answer mentions 20% off', async ({ page }) => {
    const discountBtn = page.getByRole('button').filter({ hasText: 'Is there a new client discount?' });
    await discountBtn.click();
    await expect(page.getByText(/20% off/)).toBeVisible();
  });

  test('bottom CTA has phone tel link', async ({ page }) => {
    const telLink = page.getByRole('link', { name: /\(518\) 555-0174/ });
    await expect(telLink).toBeVisible();
    await expect(telLink).toHaveAttribute('href', 'tel:+15185550174');
  });

  test('bottom CTA has Book Now link to /booking', async ({ page }) => {
    const bookNow = page.getByRole('link', { name: /Book Now/i }).last();
    await expect(bookNow).toBeVisible();
    await expect(bookNow).toHaveAttribute('href', '/booking');
  });

  test('footer BBC credit is present', async ({ page }) => {
    const bbcLink = page.locator('footer').getByRole('link', { name: /Built by BBC/i });
    await expect(bbcLink).toBeVisible();
  });
});
