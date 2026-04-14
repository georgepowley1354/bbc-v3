import { test, expect } from '@playwright/test';

test.describe('About page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/About Jane.*Haven/);
  });

  test('page heading is visible', async ({ page }) => {
    // Heading contains a <br> so match partial text
    await expect(page.getByText("You're booking a person,")).toBeVisible();
  });

  test("Jane's story section is present", async ({ page }) => {
    await expect(page.getByText(/Jane got her license in 2000/)).toBeVisible();
    await expect(page.getByText(/one therapist, one client at a time/)).toBeVisible();
  });

  test("philosophy blockquote is visible", async ({ page }) => {
    await expect(page.getByText(/Massage done well isn.t a luxury/)).toBeVisible();
    await expect(page.getByText('— Jane Smith, LMT')).toBeVisible();
  });

  test('"Your first visit" section has 4 numbered steps', async ({ page }) => {
    await expect(page.getByText("Here's what happens.")).toBeVisible();
    // Step headings
    await expect(page.getByText('A brief intake form')).toBeVisible();
    await expect(page.getByText('A short conversation')).toBeVisible();
    await expect(page.getByText('Your full session')).toBeVisible();
    await expect(page.getByText('No rushing at the end')).toBeVisible();
  });

  test('credentials section is present', async ({ page }) => {
    await expect(page.getByText('The background behind the work.')).toBeVisible();
    // Credential list is labelled
    const credList = page.getByRole('list', { name: /Jane Smith credentials/ });
    await expect(credList).toBeVisible();
  });

  test('key credential items are listed', async ({ page }) => {
    await expect(page.getByText(/New York State Licensed Massage Therapist/)).toBeVisible();
    await expect(page.getByText(/Licensed since 2000/)).toBeVisible();
    await expect(page.getByText(/Certified in Prenatal Massage Therapy/)).toBeVisible();
  });

  test('service areas notice mentions all three cities', async ({ page }) => {
    await expect(page.getByText(/Albany/).first()).toBeVisible();
    await expect(page.getByText(/Clifton Park/).first()).toBeVisible();
    await expect(page.getByText(/Saratoga Springs/).first()).toBeVisible();
  });

  test('booking CTA section links to /booking', async ({ page }) => {
    await expect(page.getByText('Ready to come in?')).toBeVisible();
    const bookLink = page.getByRole('link', { name: /Book your session/i });
    await expect(bookLink).toBeVisible();
    await expect(bookLink).toHaveAttribute('href', '/booking');
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
